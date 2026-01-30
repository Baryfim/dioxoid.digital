'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ViewState, WorkItem, JournalItem } from '../types';
import styles from './AppContent.module.scss';

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
      className={`${styles.reveal} ${isVisible ? styles.revealVisible : styles.revealHidden} ${className}`}
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
    <div className={`${styles.preloader} ${styles.hiding}`}>
       <div className={styles.preloaderTitle}>DIOXOID</div>
    </div>
  );

  return (
    <div className={styles.preloader}>
      <div className={styles.preloaderContent}>
        <div className={styles.preloaderHeader}>
          <ScrambleText text="INITIALIZING DIOXOID..." />
          <span>{progress}%</span>
        </div>
        <div className={styles.preloaderProgress}>
          <div 
            className={styles.preloaderFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export const FullScreenMenu = ({ isOpen, onClose, onNavigate }: { isOpen: boolean, onClose: () => void, onNavigate: (view: ViewState) => void }) => {
  if (!isOpen) return null;

    return (
     <div className={styles.fullScreenMenu}>
       <div className={styles.menuCloseWrapper}>
         <button onClick={onClose} className={styles.closeBtn} data-cursor-hover>
           <span className={styles.closeText}>Close</span>
           <div className={styles.closeIcon}>
             <X size={20} />
           </div>
         </button>
       </div>

       <div className={styles.menuContent}>
         <div className={styles.menuGrid}>
           <div className={styles.menuLinks}>
             {['Home', 'Work', 'Journal', 'Contact'].map((item, i) => (
               <div key={item} className={styles.menuItem}>
                 <button 
                   onClick={() => {
                     onNavigate(item.toLowerCase() as ViewState);
                     onClose();
                   }}
                   style={{ animationDelay: `${i * 100}ms` }}
                   data-cursor-hover
                 >
                   {item}
                 </button>
               </div>
             ))}
           </div>
             
           <div className={styles.menuInfo}>
             <div className={styles.infoSection} style={{ animationDelay: '500ms' }}>
               <h4>Connect</h4>
               <div className={styles.socialLinks}>
                 <a href="#" data-cursor-hover>Twitter</a>
                 <a href="#" data-cursor-hover>LinkedIn</a>
                 <a href="#" data-cursor-hover>Instagram</a>
               </div>
             </div>
             <div className={styles.infoSection} style={{ animationDelay: '700ms' }}>
               <h4>Office</h4>
               <p className={styles.address}>
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
  <nav className={styles.nav}>
    <div onClick={() => onNavigate('home')} className={styles.logo} data-cursor-hover>
       <span className={styles.logoText}>DIOXOID</span>
       <span className={styles.logoSub}>STUDIO</span>
    </div>
    
    <div className={styles.navLinks}>
      {['Work', 'Journal', 'Contact'].map((item) => (
        <button 
          key={item} 
          onClick={() => onNavigate(item.toLowerCase() as ViewState)}
          data-cursor-hover
        >
          <span className={styles.linkText}>{item}</span>
          <span className={styles.linkHover}>
            {item}
          </span>
        </button>
      ))}
    </div>
    
    <button onClick={onMenuOpen} className={styles.menuBtn} data-cursor-hover>
      <span className={styles.menuText}>Menu</span>
      <div className={styles.menuIcon}>
        <span />
        <span />
      </div>
    </button>
  </nav>
);

export const Footer = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.status}>
        <div className={styles.statusDot}></div>
        <span className={styles.statusText}>Systems Online</span>
      </div>
      <div className={styles.copyright}>
        Dioxoid Studio &copy; 2024
      </div>
      <div className={styles.socialLinks}>
        <a href="#" data-cursor-hover>Tw</a>
        <a href="#" data-cursor-hover>In</a>
        <a href="#" data-cursor-hover>Ig</a>
      </div>
    </div>
  </footer>
);
