'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { JOURNAL_DATA } from '../AppContent';

const ArticlePage = ({ id, onBack }: { id: string | null, onBack: () => void }) => {
  const post = JOURNAL_DATA.find(p => p.id === id) || JOURNAL_DATA[0];

  return (
    <article className="min-h-screen bg-stone-50 animate-fade-in text-stone-900 selection:bg-emerald-500 selection:text-white pb-40">
       {/* Header */}
       <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-6 md:px-12 lg:px-20 border-b border-stone-200">
          <button onClick={onBack} className="group flex items-center gap-2 text-stone-500 hover:text-black mb-8 md:mb-12 cursor-hover transition-colors">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             <span className="text-xs font-mono uppercase tracking-widest">Back to Journal</span>
          </button>
          
          <div className="max-w-4xl">
             <div className="flex gap-4 items-center mb-6 md:mb-8">
                <span className="px-3 py-1 bg-stone-200 rounded-full text-[10px] uppercase tracking-wider text-stone-600">{post.cat}</span>
                <span className="text-xs font-mono text-stone-400">{post.readTime} read</span>
             </div>
             <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-stone-900 leading-[1] md:leading-[0.9] tracking-tight mb-8 md:mb-12">
                {post.title}
             </h1>
             <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-stone-500 border-t border-stone-200 pt-8">
                <span>By Alexander V.</span>
                <span className="w-px h-3 bg-stone-300"></span>
                <span>{post.date}</span>
             </div>
          </div>
       </div>

       {/* Hero Image */}
       <div className="w-full h-[50vh] md:h-[60vh] overflow-hidden sticky top-0 -z-10 opacity-100">
          <img src={post.img} className="w-full h-full object-cover" alt={post.title} />
       </div>

       {/* Content */}
       <div className="max-w-3xl mx-auto px-6 -mt-20 md:-mt-32 bg-stone-50 pt-16 md:pt-20 relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
          <p className="text-xl md:text-3xl font-serif italic text-stone-600 leading-relaxed mb-12">
             &ldquo;The screen is not a window, it is a surface. We must treat it as a material that can be folded, torn, and reconstructed.&rdquo;
          </p>
          
          <div className="prose prose-lg prose-stone max-w-none text-base md:text-lg leading-loose font-light text-stone-800">
             <p>
                In the early days of the web, we were constrained by bandwidth and processing power. We built grids because they were efficient. We built static layouts because they were safe. But safety is the enemy of alchemy.
             </p>
             <p>
                At Dioxoid, we believe that the interface is disappearing. We are moving towards an era of ambient computing, where the digital layer overlays reality seamlessly. But until then, the screen remains our canvas.
             </p>
             <h3 className="font-sans font-bold text-xl md:text-2xl mt-12 mb-6">The Physics of Pixels</h3>
             <p>
                Why should a button just change color? Why shouldn&apos;t it have mass, velocity, and resistance? By applying Newtonian physics to UI elements, we create a subconscious connection between the user and the machine. It feels real because it behaves like reality.
             </p>
             <figure className="my-12">
                <div className="bg-stone-200 h-48 md:h-64 w-full flex items-center justify-center text-stone-400 font-mono text-sm px-4 text-center">
                   [ Interactive WebGL Module Placeholder ]
                </div>
                <figcaption className="text-center text-xs font-mono text-stone-500 mt-4 uppercase tracking-widest">Fig 1.0 - Inertia Simulation</figcaption>
             </figure>
             <p>
                This is not just aesthetic. It is functional. When an interface responds with weight, users are more careful. When it responds with speed, they are more decisive. We are not just designing pixels; we are designing behavior.
             </p>
             <p>
                The future isn&apos;t flat. It isn&apos;t skeuomorphic. It is elemental.
             </p>
          </div>

          <div className="mt-20 pt-12 border-t border-stone-200">
             <h4 className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-6">Share this signal</h4>
             <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Copy Link'].map(link => (
                   <button key={link} className="text-sm font-bold underline decoration-stone-300 hover:decoration-black underline-offset-4 cursor-hover transition-all">
                      {link}
                   </button>
                ))}
             </div>
          </div>
       </div>
    </article>
  );
};

export default ArticlePage;
