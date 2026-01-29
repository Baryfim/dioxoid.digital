'use client';

import React from 'react';
import { Bell, Search, Menu, Box, Clock, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from './Button';

// --- Tooltip ---
export const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative group inline-block">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-white bg-stone-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-sm">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-stone-800"></div>
    </div>
  </div>
);

// --- Notification / Badge ---
export const NotificationBadge: React.FC<{ type?: 'success' | 'warning' | 'error' | 'neutral'; children: React.ReactNode }> = ({ type = 'neutral', children }) => {
  const styles = {
    neutral: { bg: 'bg-stone-100', text: 'text-stone-600', dot: 'bg-stone-400' },
    success: { bg: 'bg-emerald-50', text: 'text-stone-700', dot: 'bg-emerald-500/70' },
    warning: { bg: 'bg-amber-50', text: 'text-stone-700', dot: 'bg-amber-500/70' },
    error:   { bg: 'bg-rose-50', text: 'text-stone-700', dot: 'bg-rose-500/70' }
  };
  const style = styles[type];

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border border-transparent ${style.bg} ${style.text} transition-colors`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${style.dot}`} />
      {children}
    </span>
  );
};

// --- Progress Bar ---
export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
    <div 
      className="h-full bg-gradient-to-r from-stone-800 via-stone-700 to-stone-900 rounded-full transition-all duration-1000 ease-out shadow-sm"
      style={{ width: `${progress}%` }}
    />
  </div>
);

// --- Alert ---
export const Alert: React.FC<{ type: 'info' | 'success' | 'warning' | 'error'; title: string; children: React.ReactNode }> = ({ type, title, children }) => {
  const map = {
    info: { border: 'bg-indigo-500', icon: Info },
    success: { border: 'bg-emerald-500', icon: CheckCircle },
    warning: { border: 'bg-amber-500', icon: AlertTriangle },
    error: { border: 'bg-rose-500', icon: XCircle }
  };
  const { border, icon: Icon } = map[type];
  
  return (
    <div className="relative overflow-hidden pl-5 pr-6 py-5 rounded-lg bg-white border border-stone-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] transition-shadow duration-300">
       <div className={`absolute left-0 top-0 bottom-0 w-1 ${border}`} />
       <div className="flex gap-4">
         <div className="pt-0.5 text-stone-400">
           <Icon size={16} strokeWidth={2} />
         </div>
         <div className="space-y-1">
           <h5 className="text-sm font-medium text-stone-900">{title}</h5>
           <div className="text-sm text-stone-500 leading-relaxed max-w-lg">{children}</div>
         </div>
       </div>
    </div>
  );
};

// --- Editorial Notification ---
export const EditorialNotification: React.FC<{ title: string; time: string; category: string; children: React.ReactNode }> = ({ title, time, category, children }) => (
  <div className="p-6 bg-white border border-stone-100 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 w-full">
    <div className="flex justify-between items-center mb-3">
      <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400">{category}</span>
      <span className="text-xs text-stone-300 font-mono flex items-center gap-1">
        <Clock size={10} />
        {time}
      </span>
    </div>
    <h5 className="text-base font-medium text-stone-900 mb-2">{title}</h5>
    <p className="text-sm text-stone-500 leading-relaxed border-l-2 border-stone-100 pl-3">
      {children}
    </p>
  </div>
);

// --- Empty State ---
export const EmptyState: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-stone-200 rounded-2xl bg-stone-50/30">
        <div className="w-10 h-10 mb-5 rounded-full bg-white border border-stone-100 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-stone-300">
            <Box size={18} strokeWidth={1.5} />
        </div>
        <h4 className="text-stone-900 font-medium mb-1.5">No Active Projects</h4>
        <p className="text-stone-500 text-sm max-w-[260px] mx-auto mb-6 leading-relaxed">
          Your workspace is currently empty. Start a new collaboration to populate this view.
        </p>
        <Button size="sm" variant="outline" className="bg-white hover:bg-white shadow-sm hover:shadow">Create Project</Button>
    </div>
);

// --- Statement Header (Redesigned) ---
export const HeaderExample: React.FC = () => (
  <header className="w-full py-8 flex items-center justify-between border-b border-stone-100 bg-white">
     <div className="font-bold text-2xl tracking-tighter text-stone-900">LUMINA</div>
     
     <nav className="hidden md:flex items-center gap-12">
        {['Work', 'Studio', 'Insights'].map((item) => (
           <a key={item} href="#" className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors relative group">
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-stone-900 transition-all duration-300 group-hover:w-full"></span>
           </a>
        ))}
     </nav>

     <div className="flex items-center gap-6">
        <button className="text-stone-400 hover:text-stone-900 transition-colors">
           <Search size={20} strokeWidth={1.5} />
        </button>
        <div className="w-px h-6 bg-stone-200 hidden sm:block"></div>
        <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-stone-900 hover:text-stone-600 transition-colors">
           <span>Menu</span>
           <div className="flex flex-col gap-1 items-end">
              <span className="w-4 h-[1px] bg-current"></span>
              <span className="w-6 h-[1px] bg-current"></span>
           </div>
        </button>
     </div>
  </header>
);

// --- Statement Footer (Redesigned) ---
export const FooterExample: React.FC = () => (
  <footer className="w-full bg-white pt-20 pb-12 border-t border-stone-100">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
       <div className="md:col-span-5">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-stone-900 leading-[0.8] mb-8">
            LUMINA<br/>STUDIO
          </h2>
          <p className="text-stone-500 max-w-sm text-lg font-light">
             Crafting digital experiences with precision, intellect, and soul.
          </p>
       </div>
       
       <div className="md:col-start-7 md:col-span-2">
          <h5 className="font-mono text-xs text-stone-400 uppercase tracking-widest mb-6">Sitemap</h5>
          <ul className="space-y-4">
             {['Work', 'Services', 'Agency', 'Careers'].map(item => (
                <li key={item}><a href="#" className="text-stone-900 hover:text-stone-500 transition-colors text-lg">{item}</a></li>
             ))}
          </ul>
       </div>

       <div className="md:col-span-2">
          <h5 className="font-mono text-xs text-stone-400 uppercase tracking-widest mb-6">Social</h5>
          <ul className="space-y-4">
             {['Instagram', 'Twitter', 'LinkedIn', 'Medium'].map(item => (
                <li key={item}><a href="#" className="text-stone-900 hover:text-stone-500 transition-colors text-lg">{item}</a></li>
             ))}
          </ul>
       </div>
       
       <div className="md:col-span-2">
          <h5 className="font-mono text-xs text-stone-400 uppercase tracking-widest mb-6">Legal</h5>
          <ul className="space-y-4">
             {['Privacy', 'Terms', 'Cookies'].map(item => (
                <li key={item}><a href="#" className="text-stone-500 hover:text-stone-900 transition-colors text-sm">{item}</a></li>
             ))}
          </ul>
       </div>
    </div>
    
    <div className="flex flex-col md:flex-row justify-between items-end border-t border-stone-100 pt-8">
       <span className="text-stone-400 text-xs font-mono uppercase tracking-wider">&copy; 2024 Lumina. All rights reserved.</span>
       <button className="mt-4 md:mt-0 px-6 py-2 border border-stone-200 rounded-full text-xs font-medium uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors">
          Back to Top
       </button>
    </div>
  </footer>
);

// --- Minimal Sidebar (Redesigned) ---
export const SidebarExample: React.FC = () => (
  <div className="w-64 h-full min-h-[400px] bg-stone-50/50 flex flex-col p-8">
     <div className="mb-12">
        <div className="w-8 h-8 bg-stone-900 text-white flex items-center justify-center font-bold text-sm">L</div>
     </div>
     
     <nav className="space-y-6 flex-1">
        {['Dashboard', 'Projects', 'Analytics', 'Settings'].map((item, i) => (
           <a key={item} href="#" className={`block text-lg ${i === 1 ? 'text-stone-900 font-medium' : 'text-stone-400 hover:text-stone-600'} transition-colors`}>
              {item}
           </a>
        ))}
     </nav>
     
     <div className="pt-8 border-t border-stone-200/50">
        <a href="#" className="flex items-center gap-3 text-sm text-stone-500 hover:text-stone-900">
           <div className="w-6 h-6 rounded-full bg-stone-200"></div>
           Profile
        </a>
     </div>
  </div>
);
