'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { H1 } from '../Typography';
import { WORKS_DATA } from '../AppContent';
import { Button } from '../Button';
import { ViewState } from '../../types';

const CaseStudyPage = ({ id, onNavigate }: { id: string | null, onNavigate: (view: ViewState) => void }) => {
  const work = WORKS_DATA.find(w => w.id === id) || WORKS_DATA[0];

  return (
    <div className="min-h-screen bg-black animate-fade-in text-white selection:bg-emerald-500 selection:text-black">
       {/* Nav Back */}
       <div className="fixed top-6 md:top-24 left-6 md:left-12 z-40 mix-blend-difference">
          <button onClick={() => onNavigate('work')} className="group flex items-center gap-2 text-white/50 hover:text-white cursor-hover transition-colors bg-black/20 backdrop-blur-sm p-2 rounded-full md:bg-transparent md:p-0">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             <span className="hidden md:inline text-xs font-mono uppercase tracking-widest">Back</span>
          </button>
       </div>

       {/* Hero Image */}
       <div className="h-[60vh] md:h-[85vh] w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
          <img src={work.img} className="w-full h-full object-cover scale-105 animate-slow-spin" style={{ animationDuration: '60s' }} alt={work.title} />
          <div className="absolute bottom-0 left-0 p-6 md:p-12 lg:p-20 z-20 w-full">
             <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8">
                <div>
                   <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="block text-emerald-500 font-mono text-xs uppercase tracking-widest">Case Study</span>
                   </div>
                   <H1 className="text-white mb-2">{work.title}</H1>
                   <p className="text-lg md:text-2xl text-stone-300 font-light max-w-2xl">{work.desc}</p>
                </div>
                <div className="hidden md:block text-right">
                   <span className="text-stone-500 font-mono text-xs block mb-2 uppercase tracking-widest">Deployed</span>
                   <span className="text-white text-4xl font-light">{work.year}</span>
                </div>
             </div>
          </div>
       </div>

       {/* Statistics Strip */}
       <div className="border-y border-stone-800 bg-stone-950">
          <div className="px-6 md:px-12 lg:px-20 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
             {[
                { label: "Performance", val: "99/100" },
                { label: "Conversion", val: "+42%" },
                { label: "Stack", val: "Next.js / WebGL" },
                { label: "Timeline", val: "12 Weeks" }
             ].map((stat, i) => (
                <div key={i} className="border-l border-stone-800 pl-6">
                   <div className="text-[10px] md:text-xs font-mono text-stone-500 uppercase tracking-widest mb-2">{stat.label}</div>
                   <div className="text-lg md:text-2xl text-white font-medium break-words">{stat.val}</div>
                </div>
             ))}
          </div>
       </div>

       {/* Content */}
       <div className="px-6 md:px-12 lg:px-20 py-24 md:py-32 grid lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-4 space-y-12 md:space-y-16 lg:sticky lg:top-32 h-fit">
             <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-500 mb-4">The Challenge</h4>
                <p className="text-stone-400 leading-relaxed text-base md:text-lg">
                   The client needed to redefine their digital presence. The market was saturated with sterile, corporate identities. They needed something that felt alive, organic, and dangerously fast.
                </p>
             </div>
             <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-500 mb-4">The Solution</h4>
                <p className="text-stone-400 leading-relaxed text-base md:text-lg">
                   We built a custom WebGL render pipeline to handle real-time data visualization without compromising the frame rate. The interface treats data as a physical material.
                </p>
             </div>
             <div>
                <Button className="w-full bg-white text-black hover:bg-emerald-500 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold py-4">
                   Visit Live Site
                </Button>
             </div>
          </div>
          
          <div className="lg:col-span-8 space-y-12 md:space-y-20">
             <div>
                <p className="text-2xl md:text-5xl font-light text-white leading-tight mb-12 md:mb-20">
                   &ldquo;We didn&apos;t just want a website. We wanted a <span className="text-emerald-500">financial operating system</span> that felt like it was from 2030.&rdquo;
                </p>
                <div className="aspect-video bg-stone-900 mb-4 md:mb-8 overflow-hidden rounded-sm border border-stone-800">
                   <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-[2s]" alt="Dashboard View" />
                </div>
                <div className="flex justify-between text-xs font-mono text-stone-500 uppercase tracking-widest">
                   <span>Dashboard View</span>
                   <span>01 / 04</span>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <div className="aspect-[3/4] bg-stone-900 overflow-hidden border border-stone-800">
                      <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-80" alt="Mobile" />
                   </div>
                   <p className="text-sm text-stone-500">Mobile responsiveness was paramount.</p>
                </div>
                <div className="space-y-4 md:pt-20">
                   <div className="aspect-[3/4] bg-stone-900 overflow-hidden border border-stone-800">
                      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-80" alt="Dark Mode" />
                   </div>
                   <p className="text-sm text-stone-500">Dark mode implementation.</p>
                </div>
             </div>
          </div>
       </div>

       {/* Next Project */}
       <div className="py-24 md:py-40 bg-stone-950 border-t border-stone-900 flex justify-center px-6">
          <button onClick={() => onNavigate('work')} className="text-center group cursor-hover w-full">
             <span className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-6 block">Next Artifact</span>
             <h2 className="text-5xl md:text-9xl text-stone-800 group-hover:text-white transition-colors duration-500 font-bold tracking-tighter break-all">
                OURA.AI
             </h2>
          </button>
       </div>
    </div>
  );
};

export default CaseStudyPage;
