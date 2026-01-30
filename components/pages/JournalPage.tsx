'use client';

import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { H2, SectionLabel } from '../Typography';
import { JOURNAL_DATA } from '../AppContent';
import styles from './JournalPage/JournalPage.module.scss';

const JournalPage = ({ onArticleSelect }: { onArticleSelect: (id: string) => void }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredPosts = useMemo(() => {
    return JOURNAL_DATA.filter(post => {
      const matchesFilter = filter === 'All' || post.cat === filter;
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className={styles.page}>
       <div className={styles.container}>
          <SectionLabel>The Signal</SectionLabel>
          <H2 className={styles.title}>Thoughts on<br/>Entropy.</H2>
          
          <div className={styles.filtersRow}>
             <div className={styles.filters}>
                {['All', 'Theory', 'Design', 'Engineering', 'Future'].map(f => (
                   <button 
                     key={f} 
                     onClick={() => setFilter(f)}
                     className={`${styles.filterButton} ${filter === f ? styles.filterButtonActive : styles.filterButtonInactive}`}
                     data-cursor-hover
                   >
                      {f}
                   </button>
                ))}
             </div>
             <div className={styles.searchWrapper}>
                <input 
                  type="text" 
                  placeholder="Filter signals..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={styles.searchInput}
                  data-cursor-hover
                />
             </div>
          </div>
          
          <div className={styles.list}>
             {filteredPosts.map((post, i) => (
                <div 
                  key={post.id} 
                  onClick={() => onArticleSelect(post.id)}
                  className={styles.postItem}
                  data-cursor-hover
                >
                   <div className={styles.postRow}>
                      <div className={styles.postLeft}>
                         <span className={styles.postDate}>{post.date}</span>
                         <div className={styles.postBody}>
                            <h3 className={styles.postTitle}>{post.title}</h3>
                            <div className={styles.postMeta}>
                               <span className={styles.postMetaLink}>Read Article</span>
                               <span className={styles.postMetaTime}>{post.readTime} read</span>
                            </div>
                         </div>
                      </div>
                      <div className={styles.postRight}>
                         <span className={styles.postTag}>{post.cat}</span>
                         <ArrowRight className={styles.postArrow} />
                      </div>
                   </div>
                 
                   <div className={styles.hoverImage}>
                      <img src={post.img} className={styles.hoverImageImg} alt={post.title} />
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default JournalPage;
