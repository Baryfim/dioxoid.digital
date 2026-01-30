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
             <span className={styles.backLabel}>Назад</span>
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
                      <span className={styles.heroBadgeText}>Кейс</span>
                   </div>
                   <H1 className={styles.heroTitle}>{work.title}</H1>
                   <p className={styles.heroDesc}>{work.desc}</p>
                </div>
                <div className={styles.heroYear}>
                   <span className={styles.heroYearLabel}>Развёрнуто</span>
                   <span className={styles.heroYearValue}>{work.year}</span>
                </div>
             </div>
          </div>
       </div>

       <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
             {[
                { label: "Производительность", val: "99/100" },
                { label: "Конверсия", val: "+42%" },
                { label: "Стек", val: "Next.js / WebGL" },
                { label: "Сроки", val: "12 недель" }
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
                <h4 className={styles.blockLabel}>Задача</h4>
                <p className={styles.blockText}>
                   Клиенту нужно было переосмыслить своё цифровое присутствие. Рынок был насыщен стерильными корпоративными идентичностями. Им нужно было что-то, что ощущалось живым, органичным и небезопасно быстрым.
                </p>
             </div>
             <div>
                <h4 className={styles.blockLabel}>Решение</h4>
                <p className={styles.blockText}>
                   Мы создали пользовательский конвейер рендеринга WebGL для обработки визуализации данных в реальном времени без ущерба для частоты кадров. Интерфейс обращается с данными как с физическим материалом.
                </p>
             </div>
             <div>
                <Button className={styles.ctaButton}>
                   Посетить сайт
                </Button>
             </div>
          </div>
          
          <div className={styles.content}>
             <div>
                <p className={styles.quote}>
                   &ldquo;Мы хотели не просто сайт. Мы хотели <span className={styles.quoteEmphasis}>финансовую операционную систему</span>, которая ощущалась бы из 2030 года.&rdquo;
                </p>
                <div className={styles.media}>
                   <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600" className={styles.mediaImage} alt="Панель управления" />
                </div>
                <div className={styles.mediaMeta}>
                   <span>Панель управления</span>
                   <span>01 / 04</span>
                </div>
             </div>

             <div className={styles.gallery}>
                <div className={styles.galleryItem}>
                   <div className={styles.galleryImageFrame}>
                      <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1000" className={styles.galleryImage} alt="Мобильная версия" />
                   </div>
                   <p className={styles.galleryCaption}>Адаптивность под мобильные устройства была первостепенной.</p>
                </div>
                <div className={`${styles.galleryItem} ${styles.galleryItemOffset}`}>
                   <div className={styles.galleryImageFrame}>
                      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" className={styles.galleryImage} alt="Тёмная тема" />
                   </div>
                   <p className={styles.galleryCaption}>Реализация тёмной темы.</p>
                </div>
             </div>
          </div>
       </div>

       <div className={styles.nextSection}>
          <button onClick={() => onNavigate('work')} className={styles.nextButton} data-cursor-hover>
             <span className={styles.nextLabel}>Следующий артефакт</span>
             <h2 className={styles.nextTitle}>
                OURA.AI
             </h2>
          </button>
       </div>
    </div>
  );
};

export default CaseStudyPage;
