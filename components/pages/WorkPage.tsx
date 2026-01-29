'use client';

import React, { useState, useMemo } from 'react';
import { ArrowRight, LayoutGrid, List, Search } from 'lucide-react';
import { H2, SectionLabel } from '../Typography';
import { WORKS_DATA } from '../AppContent';

const WorkPage = ({ onCaseSelect }: { onCaseSelect: (id: string) => void }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredWorks = useMemo(() => {
    return WORKS_DATA.filter(work => {
      const matchesFilter = filter === 'All' || work.cat === filter;
      const matchesSearch = work.title.toLowerCase().includes(search.toLowerCase()) || 
                            work.cat.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-black px-6 md:px-12 lg:px-20 animate-fade-in pb-20">
       <div className="mb-12 flex flex-col xl:flex-row justify-between items-end gap-10">
          <div>
            <SectionLabel>The Archive</SectionLabel>
            <H2 className="mt-6 text-white">Selected<br/>Artifacts.</H2>
          </div>
          <div className="w-full xl:w-auto flex flex-col lg:flex-row gap-6 items-start lg:items-center">
             {/* Search */}
             <div className="relative group w-full lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 w-4 h-4 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search artifacts..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-none py-3 pl-10 pr-4 text-xs font-mono uppercase tracking-widest text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-stone-700 cursor-hover"
                />
             </div>

             {/* Filters */}
             <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                {['All', 'Fintech', 'Health', 'Art', 'R&D'].map(f => (
                   <button 
                     key={f} 
                     onClick={() => setFilter(f)}
                     className={`px-3 py-2 md:px-4 md:py-3 border rounded-none text-[10px] uppercase tracking-widest transition-all cursor-hover flex-grow md:flex-grow-0 ${
                       filter === f 
                         ? 'border-emerald-500 text-black bg-emerald-500' 
                         : 'border-stone-800 text-stone-500 hover:border-stone-600 hover:text-white bg-transparent'
                     }`}
                   >
                      {f}
                   </button>
                ))}
             </div>
             
             {/* View Toggle */}
             <div className="hidden md:flex border border-stone-800">
               <button onClick={() => setViewMode('grid')} className={`p-3 cursor-hover ${viewMode === 'grid' ? 'bg-stone-800 text-white' : 'text-stone-600'}`}>
                 <LayoutGrid size={16} />
               </button>
               <button onClick={() => setViewMode('list')} className={`p-3 cursor-hover ${viewMode === 'list' ? 'bg-stone-800 text-white' : 'text-stone-600'}`}>
                 <List size={16} />
               </button>
             </div>
          </div>
       </div>

       {filteredWorks.length === 0 ? (
         <div className="py-40 text-center border-t border-stone-900">
            <p className="text-stone-500 font-mono uppercase tracking-widest">No artifacts found.</p>
         </div>
       ) : (
         <div className={`transition-all duration-500 ${viewMode === 'grid' ? 'grid md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24' : 'flex flex-col gap-0'}`}>
            {filteredWorks.map((work, i) => (
               <div 
                 key={work.id} 
                 onClick={() => onCaseSelect(work.id)}
                 className={`group cursor-hover animate-fade-in ${viewMode === 'grid' && i % 2 === 1 ? 'md:translate-y-24' : ''}`}
                 style={{ animationDelay: `${i * 100}ms` }}
               >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="relative aspect-[4/3] overflow-hidden bg-stone-900 mb-6 md:mb-8 border border-stone-800 group-hover:border-stone-700">
                         <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-transparent transition-all duration-700 z-10"></div>
                         <img src={work.img} alt={work.title} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale group-hover:grayscale-0" />
                      </div>
                      <div className="flex justify-between items-baseline border-b border-stone-800 pb-4 group-hover:border-stone-500 transition-colors">
                         <div>
                            <h3 className="text-2xl md:text-4xl text-stone-300 group-hover:text-white transition-colors mb-1">{work.title}</h3>
                            <p className="text-[10px] md:text-xs font-mono text-stone-600">{work.desc}</p>
                         </div>
                         <div className="text-right">
                           <span className="block text-xs font-mono uppercase tracking-widest text-stone-500 group-hover:text-emerald-400 transition-colors">{work.cat}</span>
                           <span className="text-[10px] text-stone-700">{work.year}</span>
                         </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-t border-stone-900 group-hover:bg-stone-900/20 md:px-4 md:-mx-4 transition-colors gap-6 md:gap-0">
                       <div className="flex items-center gap-6 md:gap-12">
                          <span className="text-xs font-mono text-stone-600">0{i+1}</span>
                          <div className="w-full md:w-32 h-40 md:h-20 overflow-hidden bg-stone-900 block border border-stone-800">
                            <img src={work.img} className="w-full h-full object-cover opacity-80 md:opacity-50 group-hover:opacity-100 grayscale-0 md:grayscale group-hover:grayscale-0 transition-all" alt={work.title} />
                          </div>
                          <h3 className="text-2xl md:text-4xl text-stone-300 group-hover:text-white transition-colors">{work.title}</h3>
                       </div>
                       <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto">
                          <span className="hidden md:block text-xs font-mono uppercase tracking-widest text-stone-500">{work.desc}</span>
                          <span className="px-3 py-1 border border-stone-800 rounded-full text-[10px] uppercase tracking-wider text-stone-500 group-hover:border-stone-600 transition-colors">{work.cat}</span>
                          <ArrowRight className="w-5 h-5 text-stone-600 group-hover:text-emerald-400 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                       </div>
                    </div>
                  )}
               </div>
            ))}
         </div>
       )}
    </div>
  );
};

export default WorkPage;
