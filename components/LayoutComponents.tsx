'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { H3, Paragraph } from './Typography';

// --- Signature Card (Dark Mode Adapted) ---
interface SignatureCardProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
}

export const SignatureCard: React.FC<SignatureCardProps> = ({ category, title, description, imageUrl, reverse = false }) => (
  <div className="group relative w-full overflow-hidden border border-stone-800 bg-stone-900/50 hover:border-stone-600 transition-colors duration-500">
    <div className={`grid md:grid-cols-12 h-full min-h-[500px]`}>
      <div className={`relative h-64 md:h-full md:col-span-7 overflow-hidden ${reverse ? 'md:order-last' : ''}`}>
        <img 
          src={imageUrl} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
        />
      </div>

      <div className={`relative flex flex-col justify-between p-8 md:p-12 md:col-span-5`}>
        <div>
           <div className="flex items-center gap-3 mb-8">
             <span className="w-2 h-2 bg-white rounded-full" />
             <span className="text-xs font-mono tracking-widest uppercase text-stone-400">{category}</span>
           </div>
           <H3 className="mb-6 text-white">{title}</H3>
           <Paragraph className="text-stone-500">{description}</Paragraph>
        </div>
        
        <div className="mt-8 md:mt-0 pt-8 border-t border-stone-800 flex items-center justify-between">
           <span className="text-xs font-mono text-stone-600">CASE STUDY</span>
           <button className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center transition-all hover:bg-white hover:text-black hover:scale-110">
             <ArrowUpRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Minimal Accordion ---
export const MinimalAccordion: React.FC = () => {
  const [active, setActive] = useState<number | null>(0);
  const items = [
    { id: "01", title: "Philosophy", content: "We believe in the reduction of noise. Digital products should be silent, powerful tools." },
    { id: "02", title: "Technology", content: "WebGL, Rust, React, and Python. We use whatever tool provides the highest fidelity." },
    { id: "03", title: "Execution", content: "Precise. Timeless. We do not ship untill it feels inevitable." }
  ];

  return (
    <div className="w-full space-y-0 border-t border-stone-800">
      {items.map((item, idx) => (
        <div key={idx} className="group border-b border-stone-800">
          <button
            onClick={() => setActive(active === idx ? null : idx)}
            className="flex items-start justify-between w-full text-left py-8"
          >
            <div className="flex gap-6 md:gap-12 items-baseline">
               <span className="text-xs font-mono text-stone-600">{item.id}</span>
               <span className={`text-2xl md:text-3xl font-light transition-colors duration-300 ${active === idx ? 'text-white' : 'text-stone-500 group-hover:text-stone-300'}`}>
                 {item.title}
               </span>
            </div>
            <span className={`flex items-center justify-center w-6 h-6 transition-all duration-300 ${active === idx ? 'rotate-45 text-white' : 'text-stone-600'}`}>
              <Plus size={20} />
            </span>
          </button>
          <div 
            className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${active === idx ? 'max-h-32 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
          >
             <p className="text-stone-400 max-w-md ml-16 md:ml-20 leading-relaxed font-light">
               {item.content}
             </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Editorial Tabs ---
export const EditorialTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Analytics', 'Settings'];


  return (
    <div className="flex gap-8 border-b border-stone-800 pb-4">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`
            text-xs tracking-widest uppercase transition-all duration-300 relative
            ${activeTab === tab 
              ? 'text-white' 
              : 'text-stone-600 hover:text-stone-400'}
          `}
        >
          {tab}
          {activeTab === tab && (
            <span className="absolute -bottom-4 left-0 w-full h-[1px] bg-white" />
          )}
        </button>
      ))}
    </div>
  );
};

// --- Minimal Breadcrumbs ---
export const MinimalBreadcrumbs: React.FC = () => (
  <nav className="flex items-center text-[10px] font-mono text-stone-500 uppercase tracking-wider">
    <a href="#" className="hover:text-white transition-colors">Index</a>
    <span className="mx-2 text-stone-700">/</span>
    <span className="text-stone-300">Work</span>
  </nav>
);
