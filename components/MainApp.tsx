'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Preloader, FullScreenMenu, Nav, Footer } from './AppContent';
import LandingPage from './pages/LandingPage';
import WorkPage from './pages/WorkPage';
import JournalPage from './pages/JournalPage';
import ContactPage from './pages/ContactPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ArticlePage from './pages/ArticlePage';
import { ViewState } from '../types';

// Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let requestRef: number;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Instant update for the dot to prevent lag perception
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      // Physics-based lerp for the outline (smooth delay)
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      // 0.15 provides a snappy but fluid feel
      cursorX = lerp(cursorX, mouseX, 0.15);
      cursorY = lerp(cursorY, mouseY, 0.15);

      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }

      requestRef = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestRef = requestAnimationFrame(animate);

    // Enhanced hover detection
    const handleMouseOver = (e: MouseEvent) => {
       const target = e.target as HTMLElement;
       const isInteractive = target.matches('button, a, input, textarea, [role="button"]') ||
                             target.closest('.cursor-hover') !== null ||
                             target.closest('a') !== null ||
                             target.closest('button') !== null;
       setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      {/* The Dot - Instant feedback */}
      <div 
        ref={dotRef} 
        className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full mix-blend-difference will-change-transform top-0 left-0"
      />
      
      {/* The Outline - Smooth Follow */}
      <div 
        ref={cursorRef} 
        className={`absolute top-0 left-0 border border-white/40 rounded-full mix-blend-difference will-change-transform transition-all duration-300 ease-out flex items-center justify-center
        ${isHovering ? 'w-16 h-16 border-emerald-400 bg-emerald-500/10' : 'w-6 h-6'}
        ${isClicked ? 'scale-75' : 'scale-100'}
        `}
      >
        {/* Optional crosshair or center point when hovering */}
        <div className={`w-0.5 h-0.5 bg-white/50 rounded-full transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </div>
  );
};

const MainApp: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  const handleCaseSelect = (id: string) => {
    setActiveCaseId(id);
    handleNavigate('case-study');
  };

  const handleArticleSelect = (id: string) => {
    setActiveArticleId(id);
    handleNavigate('article');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      <CustomCursor />
      <Preloader onComplete={() => setLoaded(true)} />
      
      {loaded && (
        <div className="animate-fade-in">
          {currentView !== 'article' && (
             <Nav onNavigate={handleNavigate} onMenuOpen={() => setIsMenuOpen(true)} />
          )}

          <FullScreenMenu 
             isOpen={isMenuOpen} 
             onClose={() => setIsMenuOpen(false)} 
             onNavigate={handleNavigate} 
          />
          
          <main>
            {currentView === 'home' && <LandingPage loaded={loaded} onNavigate={handleNavigate} onCaseSelect={handleCaseSelect} />}
            {currentView === 'work' && <WorkPage onCaseSelect={handleCaseSelect} />}
            {currentView === 'journal' && <JournalPage onArticleSelect={handleArticleSelect} />}
            {currentView === 'contact' && <ContactPage />}
            {currentView === 'case-study' && <CaseStudyPage id={activeCaseId} onNavigate={handleNavigate} />}
            {currentView === 'article' && <ArticlePage id={activeArticleId} onBack={() => handleNavigate('journal')} />}
          </main>

          {currentView !== 'article' && <Footer onNavigate={handleNavigate} />}
        </div>
      )}
    </div>
  );
};

export default MainApp;
