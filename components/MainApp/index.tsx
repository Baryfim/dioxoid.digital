'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Preloader, FullScreenMenu, Nav, Footer } from '../AppContent';
import LandingPage from '../pages/LandingPage';
import WorkPage from '../pages/WorkPage';
import JournalPage from '../pages/JournalPage';
import ContactPage from '../pages/ContactPage';
import CaseStudyPage from '../pages/CaseStudyPage';
import ArticlePage from '../pages/ArticlePage';
import styles from './MainApp.module.scss';

type ViewState = 'home' | 'work' | 'journal' | 'contact' | 'case-study' | 'article';

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
                      target.closest('[data-cursor-hover]') !== null ||
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
    <div className={styles.cursorContainer}>
      <div ref={dotRef} className={styles.cursorDot} />
      <div 
        ref={cursorRef} 
        className={`${styles.cursorOutline} ${isHovering ? styles.hovering : ''} ${isClicked ? styles.clicked : ''}`}
      >
        <div className={`${styles.centerDot} ${isHovering ? styles.visible : ''}`} />
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

  // Initialize view from URL on first load
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname;
    
    switch (true) {
      case path === '/':
        setCurrentView('home');
        break;
      case path === '/work':
        setCurrentView('work');
        break;
      case path === '/journal':
        setCurrentView('journal');
        break;
      case path === '/contact':
        setCurrentView('contact');
        break;
      case path.startsWith('/case-study/'):
        const caseId = path.split('/')[2];
        setActiveCaseId(caseId);
        setCurrentView('case-study');
        break;
      case path.startsWith('/article/'):
        const articleId = path.split('/')[2];
        setActiveArticleId(articleId);
        setCurrentView('article');
        break;
      default:
        setCurrentView('home');
    }
  }, []); // Run only once on mount

  // Update URL when view changes without reloading
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const viewToUrl: Record<ViewState, string> = {
      'home': '/',
      'work': '/work',
      'journal': '/journal',
      'contact': '/contact',
      'case-study': activeCaseId ? `/case-study/${activeCaseId}` : '/case-study',
      'article': activeArticleId ? `/article/${activeArticleId}` : '/article',
    };

    const url = viewToUrl[currentView];
    if (window.location.pathname !== url) {
      window.history.pushState({}, '', url);
    }
  }, [currentView, activeCaseId, activeArticleId]);

  // Handle browser back/forward buttons
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const path = window.location.pathname;
      
      switch (true) {
        case path === '/':
          setCurrentView('home');
          break;
        case path === '/work':
          setCurrentView('work');
          break;
        case path === '/journal':
          setCurrentView('journal');
          break;
        case path === '/contact':
          setCurrentView('contact');
          break;
        case path.startsWith('/case-study/'):
          const caseId = path.split('/')[2];
          setActiveCaseId(caseId);
          setCurrentView('case-study');
          break;
        case path.startsWith('/article/'):
          const articleId = path.split('/')[2];
          setActiveArticleId(articleId);
          setCurrentView('article');
          break;
        default:
          setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  const handleCaseSelect = (id: string) => {
    setActiveCaseId(id);
    setCurrentView('case-study');
    setIsMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  const handleArticleSelect = (id: string) => {
    setActiveArticleId(id);
    setCurrentView('article');
    setIsMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={styles.mainApp}>
      <CustomCursor />
      <Preloader onComplete={() => setLoaded(true)} />
      
      {loaded && (
        <div className={styles.contentWrapper}>
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
