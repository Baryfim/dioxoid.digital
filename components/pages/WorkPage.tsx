'use client';

import React, { useState, useMemo } from 'react';
import { ArrowRight, LayoutGrid, List, Search } from 'lucide-react';
import { H2, SectionLabel } from '../Typography';
import { WORKS_DATA } from '../AppContent';
import styles from './WorkPage/WorkPage.module.scss';

const WorkPage = ({ onCaseSelect }: { onCaseSelect: (id: string) => void }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredWorks = useMemo(() => {
    return WORKS_DATA.filter(work => {
      const matchesFilter = filter === 'All' || work.cat === filter;
      const matchesSearch = work.title.toLowerCase().includes(search.toLowerCase()) || 
                            work.cat.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

    return (
     <div className={styles.page}>
       <div className={styles.header}>
         <div>
          <SectionLabel>The Archive</SectionLabel>
          <H2 className={styles.headerTitle}>Selected<br/>Artifacts.</H2>
         </div>
         <div className={styles.controls}>
           <div className={styles.searchWrapper}>
             <Search className={styles.searchIcon} />
             <input 
              type="text" 
              placeholder="Search artifacts..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
              data-cursor-hover
             />
           </div>

           <div className={styles.filters}>
             {['All', 'Fintech', 'Health', 'Art', 'R&D'].map(f => (
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
             
           <div className={styles.viewToggle}>
            <button onClick={() => setViewMode('grid')} className={`${styles.viewToggleButton} ${viewMode === 'grid' ? styles.viewToggleButtonActive : styles.viewToggleButtonInactive}`} data-cursor-hover>
              <LayoutGrid size={16} />
            </button>
            <button onClick={() => setViewMode('list')} className={`${styles.viewToggleButton} ${viewMode === 'list' ? styles.viewToggleButtonActive : styles.viewToggleButtonInactive}`} data-cursor-hover>
              <List size={16} />
            </button>
           </div>
         </div>
       </div>

       {filteredWorks.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>No artifacts found.</p>
        </div>
       ) : (
        <div className={`${styles.results} ${viewMode === 'grid' ? styles.resultsGrid : styles.resultsList}`}>
          {filteredWorks.map((work, i) => (
            <div 
              key={work.id} 
              onClick={() => onCaseSelect(work.id)}
              className={`${styles.workItem} ${viewMode === 'grid' && i % 2 === 1 ? styles.workItemOffset : ''}`}
              style={{ animationDelay: `${i * 100}ms` }}
              data-cursor-hover
            >
              {viewMode === 'grid' ? (
                <>
                 <div className={styles.gridImage}>
                   <div className={styles.gridImageOverlay}></div>
                   <img src={work.img} alt={work.title} className={styles.gridImageImg} />
                 </div>
                 <div className={styles.gridInfo}>
                   <div>
                     <h3 className={styles.gridTitle}>{work.title}</h3>
                     <p className={styles.gridDesc}>{work.desc}</p>
                   </div>
                   <div className={styles.gridMeta}>
                    <span className={styles.gridCategory}>{work.cat}</span>
                    <span className={styles.gridYear}>{work.year}</span>
                   </div>
                 </div>
                </>
              ) : (
                <div className={styles.listRow}>
                  <div className={styles.listLeft}>
                    <span className={styles.listIndex}>0{i+1}</span>
                    <div className={styles.listThumb}>
                     <img src={work.img} className={styles.listThumbImg} alt={work.title} />
                    </div>
                    <h3 className={styles.listTitle}>{work.title}</h3>
                  </div>
                  <div className={styles.listRight}>
                    <span className={styles.listDesc}>{work.desc}</span>
                    <span className={styles.listTag}>{work.cat}</span>
                    <ArrowRight className={styles.listArrow} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
       )}
     </div>
    );
};

export default WorkPage;
