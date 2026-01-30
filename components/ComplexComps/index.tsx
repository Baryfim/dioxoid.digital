'use client';

import React from 'react';
import { Bell, Search, Menu, Box, Clock, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '../Button/index';
import styles from './ComplexComps.module.scss';

// --- Tooltip ---
export const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className={styles.tooltip}>
    {children}
    <div className={styles.tooltipContent}>
      {text}
    </div>
  </div>
);

// --- Notification / Badge ---
export const NotificationBadge: React.FC<{ type?: 'success' | 'warning' | 'error' | 'neutral'; children: React.ReactNode }> = ({ type = 'neutral', children }) => {
  return (
    <span className={`${styles.notificationBadge} ${styles[type]}`}>
      <span className={styles.badgeDot} />
      {children}
    </span>
  );
};

// --- Progress Bar ---
export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className={styles.progressBar}>
    <div 
      className={styles.progressFill}
      style={{ width: `${progress}%` }}
    />
  </div>
);

// --- Alert ---
export const Alert: React.FC<{ type: 'info' | 'success' | 'warning' | 'error'; title: string; children: React.ReactNode }> = ({ type, title, children }) => {
  const iconMap = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle
  };
  const Icon = iconMap[type];
  
  return (
    <div className={styles.alert}>
       <div className={`${styles.alertBorder} ${styles[type]}`} />
       <div className={styles.alertContent}>
         <div className={styles.alertIcon}>
           <Icon size={16} strokeWidth={2} />
         </div>
         <div className={styles.alertText}>
           <h5 className={styles.alertTitle}>{title}</h5>
           <div className={styles.alertDescription}>{children}</div>
         </div>
       </div>
    </div>
  );
};

// --- Editorial Notification ---
export const EditorialNotification: React.FC<{ title: string; time: string; category: string; children: React.ReactNode }> = ({ title, time, category, children }) => (
  <div className={styles.editorialNotification}>
    <div className={styles.notificationHeader}>
      <span className={styles.category}>{category}</span>
      <span className={styles.time}>
        <Clock size={10} />
        {time}
      </span>
    </div>
    <h5 className={styles.notificationTitle}>{title}</h5>
    <p className={styles.notificationBody}>
      {children}
    </p>
  </div>
);

// --- Empty State ---
export const EmptyState: React.FC = () => (
    <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
            <Box size={18} strokeWidth={1.5} />
        </div>
        <h4 className={styles.emptyTitle}>No Active Projects</h4>
        <p className={styles.emptyDescription}>
          Your workspace is currently empty. Start a new collaboration to populate this view.
        </p>
        <Button size="sm" variant="outline">Create Project</Button>
    </div>
);

// --- Statement Header (Redesigned) ---
export const HeaderExample: React.FC = () => (
  <header className={styles.header}>
     <div className={styles.headerLogo}>LUMINA</div>
     
     <nav className={styles.headerNav}>
        {['Work', 'Studio', 'Insights'].map((item) => (
           <a key={item} href="#" className={styles.headerNavLink} data-cursor-hover>
              {item}
              <span className={styles.headerNavUnderline}></span>
           </a>
        ))}
     </nav>

     <div className={styles.headerActions}>
        <button className={styles.headerSearchButton} data-cursor-hover>
           <Search size={20} strokeWidth={1.5} />
        </button>
        <div className={styles.headerDivider}></div>
        <button className={styles.headerMenuButton} data-cursor-hover>
           <span>Menu</span>
           <div className={styles.headerMenuIcon}>
              <span></span>
              <span></span>
           </div>
        </button>
     </div>
  </header>
);

// --- Statement Footer (Redesigned) ---
export const FooterExample: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footerGrid}>
       <div className={styles.footerBrand}>
          <h2 className={styles.footerTitle}>
            LUMINA<br/>STUDIO
          </h2>
          <p className={styles.footerSubtitle}>
             Crafting digital experiences with precision, intellect, and soul.
          </p>
       </div>
       
       <div className={styles.footerColumn}>
          <h5 className={styles.footerHeading}>Sitemap</h5>
          <ul className={styles.footerList}>
             {['Work', 'Services', 'Agency', 'Careers'].map(item => (
                <li key={item}><a href="#" className={styles.footerLink} data-cursor-hover>{item}</a></li>
             ))}
          </ul>
       </div>

       <div className={styles.footerColumn}>
          <h5 className={styles.footerHeading}>Social</h5>
          <ul className={styles.footerList}>
             {['Instagram', 'Twitter', 'LinkedIn', 'Medium'].map(item => (
                <li key={item}><a href="#" className={styles.footerLink} data-cursor-hover>{item}</a></li>
             ))}
          </ul>
       </div>
       
       <div className={styles.footerColumn}>
          <h5 className={styles.footerHeading}>Legal</h5>
          <ul className={styles.footerList}>
             {['Privacy', 'Terms', 'Cookies'].map(item => (
                <li key={item}><a href="#" className={styles.footerLegalLink} data-cursor-hover>{item}</a></li>
             ))}
          </ul>
       </div>
    </div>
    
    <div className={styles.footerBottom}>
       <span className={styles.footerCopyright}>&copy; 2024 Lumina. All rights reserved.</span>
       <button className={styles.footerBackToTop} data-cursor-hover>
          Back to Top
       </button>
    </div>
  </footer>
);

// --- Minimal Sidebar (Redesigned) ---
export const SidebarExample: React.FC = () => (
  <div className={styles.sidebar}>
     <div className={styles.sidebarBrand}>
        <div className={styles.sidebarLogo}>L</div>
     </div>
     
     <nav className={styles.sidebarNav}>
        {['Dashboard', 'Projects', 'Analytics', 'Settings'].map((item, i) => (
           <a key={item} href="#" className={`${styles.sidebarNavLink} ${i === 1 ? styles.sidebarNavLinkActive : ''}`} data-cursor-hover>
              {item}
           </a>
        ))}
     </nav>
     
     <div className={styles.sidebarFooter}>
        <a href="#" className={styles.sidebarProfile} data-cursor-hover>
           <div className={styles.sidebarAvatar}></div>
           Profile
        </a>
     </div>
  </div>
);
