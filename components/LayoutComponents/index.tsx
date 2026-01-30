'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { H3, Paragraph } from './Typography';
import styles from './LayoutComponents.module.scss';

// --- Signature Card (Dark Mode Adapted) ---
interface SignatureCardProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
}

export const SignatureCard: React.FC<SignatureCardProps> = ({ category, title, description, imageUrl, reverse = false }) => (
  <div className={styles.signatureCard}>
    <div className={styles.cardGrid}>
      <div className={`${styles.imageContainer} ${reverse ? styles.reverse : ''}`}>
        <img 
          src={imageUrl} 
          alt={title} 
        />
      </div>

      <div className={styles.contentContainer}>
        <div>
           <div className={styles.category}>
             <span className={styles.categoryDot} />
             <span className={styles.categoryText}>{category}</span>
           </div>
           <H3 className={styles.title}>{title}</H3>
           <Paragraph className={styles.description}>{description}</Paragraph>
        </div>
        
        <div className={styles.footer}>
           <span className={styles.footerLabel}>CASE STUDY</span>
           <button className={styles.footerButton}>
             <ArrowUpRight className={styles.footerIcon} />
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
    <div className={styles.minimalAccordion}>
      {items.map((item, idx) => (
        <div key={idx} className={`${styles.accordionItem} ${active === idx ? styles.active : ''}`}>
          <button
            onClick={() => setActive(active === idx ? null : idx)}
            className={styles.accordionButton}
          >
            <div className={styles.buttonContent}>
               <span className={styles.itemNumber}>{item.id}</span>
               <span className={styles.itemTitle}>
                 {item.title}
               </span>
            </div>
            <span className={styles.iconWrapper}>
              <Plus size={20} />
            </span>
          </button>
          <div className={`${styles.accordionContent} ${active === idx ? styles.active : ''}`}>
             <p>
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
    <div className={styles.editorialTabs}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={activeTab === tab ? styles.active : ''}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// --- Minimal Breadcrumbs ---
export const MinimalBreadcrumbs: React.FC = () => (
  <nav className={styles.breadcrumbs}>
    <a href="#" className={styles.breadcrumbLink}>Index</a>
    <span className={styles.breadcrumbSeparator}>/</span>
    <span className={styles.breadcrumbCurrent}>Work</span>
  </nav>
);
