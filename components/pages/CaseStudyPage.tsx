'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { H1 } from '../Typography';
import { WORKS_DATA } from '../AppContent';
import { Button } from '../Button';
import { ViewState } from '../../types';
import styles from './CaseStudyPage/CaseStudyPage.module.scss';

const CaseStudyPage = ({ id, onNavigate }: { id: string | null, onNavigate: (view: ViewState) => void }) => {
  const work = WORKS_DATA.find(w => w.id === id) || WORKS_DATA[0];

  return (
    <div className={styles.page}>
       <div className={styles.backNav}>
          <button onClick={() => onNavigate('work')} className={styles.backButton} data-cursor-hover>
             <ArrowLeft size={16} className={styles.backIcon} />
             <span className={styles.backLabel}>Back</span>
          </button>
       </div>

       <div className={styles.hero}>
          <div className={styles.heroOverlay}></div>
          <img src={work.img} className={styles.heroImage} style={{ animationDuration: '60s' }} alt={work.title} />
          <div className={styles.heroContent}>
             <div className={styles.heroRow}>
                <div>
                   <div className={styles.heroBadge}>
                      <span className={styles.heroDot}></span>
                      <span className={styles.heroBadgeText}>Case Study</span>
                   </div>
                   <H1 className={styles.heroTitle}>{work.title}</H1>
                   <p className={styles.heroDesc}>{work.desc}</p>
                </div>
                <div className={styles.heroYear}>
                   <span className={styles.heroYearLabel}>Deployed</span>
                   <span className={styles.heroYearValue}>{work.year}</span>
                </div>
             </div>
          </div>
       </div>

       <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
             {[
                { label: "Performance", val: "99/100" },
                { label: "Conversion", val: "+42%" },
                { label: "Stack", val: "Next.js / WebGL" },
                { label: "Timeline", val: "12 Weeks" }
             ].map((stat, i) => (
                <div key={i} className={styles.statItem}>
                   <div className={styles.statLabel}>{stat.label}</div>
                   <div className={styles.statValue}>{stat.val}</div>
                </div>
             ))}
          </div>
       </div>

       <div className={styles.contentSection}>
          <div className={styles.sidebar}>
             <div>
                <h4 className={styles.blockLabel}>The Challenge</h4>
                <p className={styles.blockText}>
                   The client needed to redefine their digital presence. The market was saturated with sterile, corporate identities. They needed something that felt alive, organic, and dangerously fast.
                </p>
             </div>
             <div>
                <h4 className={styles.blockLabel}>The Solution</h4>
                <p className={styles.blockText}>
                   We built a custom WebGL render pipeline to handle real-time data visualization without compromising the frame rate. The interface treats data as a physical material.
                </p>
             </div>
             <div>
                <Button className={styles.ctaButton}>
                   Visit Live Site
                </Button>
             </div>
          </div>
          
          <div className={styles.content}>
             <div>
                <p className={styles.quote}>
                   &ldquo;We didn&apos;t just want a website. We wanted a <span className={styles.quoteEmphasis}>financial operating system</span> that felt like it was from 2030.&rdquo;
                </p>
                <div className={styles.media}>
                   <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600" className={styles.mediaImage} alt="Dashboard View" />
                </div>
                <div className={styles.mediaMeta}>
                   <span>Dashboard View</span>
                   <span>01 / 04</span>
                </div>
             </div>

             <div className={styles.gallery}>
                <div className={styles.galleryItem}>
                   <div className={styles.galleryImageFrame}>
                      <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1000" className={styles.galleryImage} alt="Mobile" />
                   </div>
                   <p className={styles.galleryCaption}>Mobile responsiveness was paramount.</p>
                </div>
                <div className={`${styles.galleryItem} ${styles.galleryItemOffset}`}>
                   <div className={styles.galleryImageFrame}>
                      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" className={styles.galleryImage} alt="Dark Mode" />
                   </div>
                   <p className={styles.galleryCaption}>Dark mode implementation.</p>
                </div>
             </div>
          </div>
       </div>

       <div className={styles.nextSection}>
          <button onClick={() => onNavigate('work')} className={styles.nextButton} data-cursor-hover>
             <span className={styles.nextLabel}>Next Artifact</span>
             <h2 className={styles.nextTitle}>
                OURA.AI
             </h2>
          </button>
       </div>
    </div>
  );
};

export default CaseStudyPage;
