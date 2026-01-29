'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { ViewState, WorkItem, JournalItem } from '../types';

// --- DATA ---
export const WORKS_DATA: WorkItem[] = [
  { id: "apex", title: "Apex.Fin", cat: "Fintech", year: "2024", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000", desc: "Institutional grade trading interface." },
  { id: "oura", title: "Oura.AI", cat: "Health", year: "2023", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000", desc: "Biometric visualization engine." },
  { id: "void", title: "Void/Form", cat: "Architecture", year: "2024", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1000", desc: "Spatial computing for architects." },
  { id: "helios", title: "Helios", cat: "Energy", year: "2022", img: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?auto=format&fit=crop&q=80&w=1000", desc: "Solar array management system." },
  { id: "neura", title: "Neura", cat: "R&D", year: "2023", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000", desc: "Neural network topography." },
  { id: "chroma", title: "Chroma", cat: "Art", year: "2024", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000", desc: "Digital gallery experience." },
];

export const JOURNAL_DATA: JournalItem[] = [
  { id: "1", date: "Oct 12, 2024", title: "The End of Interface", cat: "Theory", readTime: "5 min", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" },
  { id: "2", date: "Sep 28, 2024", title: "Motion as Meaning", cat: "Design", readTime: "3 min", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000" },
  { id: "3", date: "Aug 15, 2024", title: "WebGL Performance at Scale", cat: "Engineering", readTime: "8 min", img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1000" },
  { id: "4", date: "Jul 04, 2024", title: "Typography in VR", cat: "Future", readTime: "6 min", img: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&q=80&w=1000" },
];

// --- COMPONENTS ---

export const ScrambleText = ({ text, className = "", delay = 0, trigger = true }: { text: string, className?: string, delay?: number, trigger?: boolean }) => {
  const [display, setDisplay] = useState(text.split('').map(() => ' '));
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  
  useEffect(() => {
    if (!trigger) return;
    
    let frame = 0;
    const queue = text.split('').map((char, i) => ({
      char,
      start: Math.floor(Math.random() * 40) + (delay / 10),
      end: Math.floor(Math.random() * 40) + (delay / 10) + 20
    }));
    
    let id: number;
    const update = () => {
      let complete = 0;
      const next = display.map((old, i) => {
        if (frame >= queue[i].end) {
          complete++;
          return queue[i].char;
        }
        if (frame >= queue[i].start) {
          return chars[Math.floor(Math.random() * chars.length)];
        }
        return old;
      });
      
      setDisplay(next);
      if (complete < queue.length) {
        frame++;
        id = requestAnimationFrame(update);
      }
    };
    
    const timeout = setTimeout(() => {
      id = requestAnimationFrame(update);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(id);
    };
  }, [text, trigger]);
  
  return <span className={className}>{display.join('')}</span>;
};

export const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-20 blur-lg'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setHide(true), 800);
          setTimeout(onComplete, 1600);
          return 100;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  if (hide) return (
    <div className="fixed inset-0 z-[99999] bg-stone-950 pointer-events-none transition-transform duration-1000 ease-[cubic-bezier(0.83,0,0.17,1)] -translate-y-full flex flex-col items-center justify-center">
       <div className="text-[15vw] font-bold text-white leading-none tracking-tighter mix-blend-difference">DIOXOID</div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[99999] bg-stone-950 flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="flex justify-between mb-2 font-mono text-[10px] uppercase tracking-widest text-stone-500">
          <ScrambleText text="INITIALIZING DIOXOID..." />
          <span>{progress}%</span>
        </div>
        <div className="w-full h-[2px] bg-stone-900 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-75 ease-linear"
            style={{ width: `${progress}%`, boxShadow: '0 0 10px white' }}
          />
        </div>
      </div>
    </div>
  );
};

export const FullScreenMenu = ({ isOpen, onClose, onNavigate }: { isOpen: boolean, onClose: () => void, onNavigate: (view: ViewState) => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-stone-950 flex flex-col animate-fade-in overflow-y-auto">
       <div className="absolute top-0 right-0 p-6 md:p-12">
          <button onClick={onClose} className="group flex items-center gap-3 text-white hover:text-emerald-500 transition-colors cursor-hover">
             <span className="text-xs font-mono uppercase tracking-widest hidden sm:inline">Close</span>
             <div className="p-2 border border-stone-800 rounded-sm group-hover:border-emerald-500 transition-colors">
                <X size={20} />
             </div>
          </button>
       </div>

       <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-20">
          <div className="grid lg:grid-cols-2 w-full gap-12 lg:gap-20">
             <div className="space-y-4">
                {['Home', 'Work', 'Journal', 'Contact'].map((item, i) => (
                   <div key={item} className="overflow-hidden">
                      <button 
                         onClick={() => {
                            onNavigate(item.toLowerCase() as ViewState);
                            onClose();
                         }}
                         className="block text-[15vw] md:text-[8vw] leading-[0.9] font-bold text-transparent text-stroke-white hover:text-white transition-all duration-500 tracking-tighter cursor-hover animate-blur-in origin-left lg:hover:scale-105 lg:hover:translate-x-10 text-left w-full"
                         style={{ animationDelay: `${i * 100}ms` }}
                      >
                         {item}
                      </button>
                   </div>
                ))}
             </div>
             
             <div className="flex flex-col justify-end pb-0 lg:pb-12 space-y-8 lg:space-y-12">
                <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                   <h4 className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-4">Connect</h4>
                   <div className="flex flex-wrap gap-6 md:gap-8 text-white text-base md:text-lg">
                      <a href="#" className="hover:text-emerald-500 transition-colors cursor-hover">Twitter</a>
                      <a href="#" className="hover:text-emerald-500 transition-colors cursor-hover">LinkedIn</a>
                      <a href="#" className="hover:text-emerald-500 transition-colors cursor-hover">Instagram</a>
                   </div>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
                   <h4 className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-4">Office</h4>
                   <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                      Minato-ku, Tokyo<br/>
                      107-0062, Japan
                   </p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export const Nav = ({ onNavigate, onMenuOpen }: { onNavigate: (view: ViewState) => void, onMenuOpen: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white py-6 md:py-8 px-6 md:px-12 flex justify-between items-center pointer-events-none">
    <div onClick={() => onNavigate('home')} className="flex flex-col gap-0.5 z-50 pointer-events-auto cursor-pointer group cursor-hover">
       <span className="font-bold text-lg md:text-xl tracking-tighter leading-none group-hover:tracking-widest transition-all duration-500">DIOXOID</span>
       <span className="text-[8px] font-mono tracking-[0.3em] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">STUDIO</span>
    </div>
    
    <div className="hidden lg:flex gap-16 text-xs font-mono uppercase tracking-widest z-50 pointer-events-auto">
      {['Work', 'Journal', 'Contact'].map((item) => (
        <button 
          key={item} 
          onClick={() => onNavigate(item.toLowerCase() as ViewState)} 
          className="relative group overflow-hidden cursor-hover text-left"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
          <span className="absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-emerald-400">
            {item}
          </span>
        </button>
      ))}
    </div>
    
    <button onClick={onMenuOpen} className="flex items-center gap-3 z-50 pointer-events-auto group cursor-hover">
      <span className="hidden md:inline text-xs font-mono uppercase tracking-widest group-hover:text-emerald-400 transition-colors">Menu</span>
      <div className="space-y-1.5 p-2 border border-transparent group-hover:border-stone-800 rounded-sm transition-colors">
        <span className="block w-6 h-[1px] bg-white group-hover:w-4 group-hover:bg-emerald-400 transition-all duration-300 ml-auto"></span>
        <span className="block w-4 h-[1px] bg-white group-hover:w-6 group-hover:bg-emerald-400 transition-all duration-300 ml-auto"></span>
      </div>
    </button>
  </nav>
);

export const Footer = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => (
   <footer className="bg-white py-12 px-6 md:px-12 border-t border-stone-200">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">Systems Online</span>
         </div>
         <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
            Dioxoid Studio &copy; 2024
         </div>
         <div className="flex gap-6 text-[10px] font-mono uppercase tracking-widest text-stone-900">
            <a href="#" className="hover:text-emerald-500 transition-colors cursor-hover">Tw</a>
            <a href="#" className="hover:text-emerald-500 transition-colors cursor-hover">In</a>
            <a href="#" className="hover:text-emerald-500 transition-colors cursor-hover">Ig</a>
         </div>
      </div>
   </footer>
);
