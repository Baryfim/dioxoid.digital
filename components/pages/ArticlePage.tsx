'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { JOURNAL_DATA } from '../AppContent';
import styles from './ArticlePage/ArticlePage.module.scss';

const ArticlePage = ({ id, onBack }: { id: string | null, onBack: () => void }) => {
  const post = JOURNAL_DATA.find(p => p.id === id) || JOURNAL_DATA[0];

  return (
    <article className={styles.page}>
       <div className={styles.header}>
          <button onClick={onBack} className={styles.backButton} data-cursor-hover>
             <ArrowLeft size={16} className={styles.backIcon} />
             <span className={styles.backLabel}>Back to Journal</span>
          </button>
          
          <div className={styles.headerContent}>
             <div className={styles.headerMeta}>
                <span className={styles.categoryBadge}>{post.cat}</span>
                <span className={styles.readTime}>{post.readTime} read</span>
             </div>
             <h1 className={styles.title}>
                {post.title}
             </h1>
             <div className={styles.byline}>
                <span>By Alexander V.</span>
                <span className={styles.bylineSeparator}></span>
                <span>{post.date}</span>
             </div>
          </div>
       </div>

       <div className={styles.hero}>
          <img src={post.img} className={styles.heroImage} alt={post.title} />
       </div>

       <div className={styles.content}>
          <p className={styles.leadQuote}>
             &ldquo;The screen is not a window, it is a surface. We must treat it as a material that can be folded, torn, and reconstructed.&rdquo;
          </p>
          
          <div className={styles.body}>
             <p>
                In the early days of the web, we were constrained by bandwidth and processing power. We built grids because they were efficient. We built static layouts because they were safe. But safety is the enemy of alchemy.
             </p>
             <p>
                At Dioxoid, we believe that the interface is disappearing. We are moving towards an era of ambient computing, where the digital layer overlays reality seamlessly. But until then, the screen remains our canvas.
             </p>
             <h3>The Physics of Pixels</h3>
             <p>
                Why should a button just change color? Why shouldn&apos;t it have mass, velocity, and resistance? By applying Newtonian physics to UI elements, we create a subconscious connection between the user and the machine. It feels real because it behaves like reality.
             </p>
             <figure className={styles.figure}>
                <div className={styles.figurePlaceholder}>
                   [ Interactive WebGL Module Placeholder ]
                </div>
                <figcaption className={styles.figureCaption}>Fig 1.0 - Inertia Simulation</figcaption>
             </figure>
             <p>
                This is not just aesthetic. It is functional. When an interface responds with weight, users are more careful. When it responds with speed, they are more decisive. We are not just designing pixels; we are designing behavior.
             </p>
             <p>
                The future isn&apos;t flat. It isn&apos;t skeuomorphic. It is elemental.
             </p>
          </div>

          <div className={styles.shareSection}>
             <h4 className={styles.shareTitle}>Share this signal</h4>
             <div className={styles.shareLinks}>
                {['Twitter', 'LinkedIn', 'Copy Link'].map(link => (
                   <button key={link} className={styles.shareButton} data-cursor-hover>
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
