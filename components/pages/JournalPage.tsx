'use client';

import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { H2, SectionLabel } from '../Typography';
import { JOURNAL_DATA } from '../AppContent';

const JournalPage = ({ onArticleSelect }: { onArticleSelect: (id: string) => void }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredPosts = useMemo(() => {
    return JOURNAL_DATA.filter(post => {
      const matchesFilter = filter === 'All' || post.cat === filter;
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-stone-950 px-6 md:px-12 lg:px-20 animate-fade-in pb-40">
       <div className="max-w-5xl mx-auto">
          <SectionLabel>The Signal</SectionLabel>
          <H2 className="mt-6 mb-12 text-white">Thoughts on<br/>Entropy.</H2>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 md:mb-20 border-b border-stone-800 pb-8">
             <div className="flex flex-wrap gap-2">
                {['All', 'Theory', 'Design', 'Engineering', 'Future'].map(f => (
                   <button 
                     key={f} 
                     onClick={() => setFilter(f)}
                     className={`text-[10px] md:text-xs uppercase tracking-widest transition-colors cursor-hover px-2 py-1 ${
                       filter === f ? 'text-emerald-500' : 'text-stone-500 hover:text-white'
                     }`}
                   >
                      {f}
                   </button>
                ))}
             </div>
             <div className="relative group w-full md:w-64">
                <input 
                  type="text" 
                  placeholder="Filter signals..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent border-b border-stone-800 py-2 text-xs font-mono uppercase tracking-widest text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-stone-700 cursor-hover"
                />
             </div>
          </div>
          
          <div className="space-y-0">
             {filteredPosts.map((post, i) => (
                <div 
                  key={post.id} 
                  onClick={() => onArticleSelect(post.id)}
                  className="group relative border-b border-stone-800 py-12 md:py-16 cursor-hover transition-all hover:bg-stone-900/30 md:px-4 md:-mx-4"
                >
                   <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 relative z-10">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-16 md:items-baseline w-full">
                         <span className="font-mono text-xs text-stone-600 w-24 shrink-0">{post.date}</span>
                         <div className="w-full">
                            <h3 className="text-2xl md:text-3xl lg:text-5xl text-stone-300 group-hover:text-white transition-colors mb-2">{post.title}</h3>
                            <div className="flex gap-4 items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0">
                               <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-500">Read Article</span>
                               <span className="text-[10px] font-mono text-stone-600">{post.readTime} read</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 mt-4 md:mt-0">
                         <span className="px-3 py-1 border border-stone-800 rounded-full text-[10px] uppercase tracking-wider text-stone-500 group-hover:border-stone-600 transition-colors">{post.cat}</span>
                         <ArrowRight className="w-5 h-5 text-stone-600 group-hover:text-emerald-400 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                      </div>
                   </div>
                 
                   {/* Hover Image Reveal (Desktop Only) */}
                   <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-64 h-40 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-500 grayscale hidden lg:block">
                      <img src={post.img} className="w-full h-full object-cover" alt={post.title} />
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default JournalPage;
