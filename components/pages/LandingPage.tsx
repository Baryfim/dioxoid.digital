'use client';

import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Zap } from 'lucide-react';
import { H2, SectionLabel } from '../Typography';
import { ScrambleText, Reveal, WORKS_DATA } from '../AppContent';
import { ViewState } from '../../types';
import styles from './LandingPage/LandingPage.module.scss';

const Hero = ({ loaded, onNavigate }: { loaded: boolean, onNavigate: (view: ViewState) => void }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
      <section 
         ref={containerRef}
         onMouseMove={handleMouseMove}
         className={styles.hero}
      >
      {/* RICH DYNAMIC BACKGROUND */}
      <div className={styles.heroBackground}>
         {/* Ambient Glows */}
         <div className={styles.heroGlowOne} />
         <div className={styles.heroGlowTwo} />
         <div className={styles.heroGlowThree} />
         
         {/* Stardust */}
         <div className={styles.heroNoise} />
         
         {/* Grid */}
         <div className={styles.heroGrid}></div>
      </div>

      <div className={styles.heroContent}>
        <Reveal delay={1200}>
          <div className={styles.heroStatus}>
             <div className={styles.heroStatusBars}>
                {[1,2,3].map(i => (
                  <div key={i} className={styles.heroStatusBar} style={{ animationDelay: `${i*150}ms` }}></div>
                ))}
             </div>
             <ScrambleText text="ПРИНИМАЕМ КЛИЕНТОВ НА Q4 2024" className={styles.heroLabel} trigger={loaded} delay={1800} />
          </div>
        </Reveal>

        {/* MOUSE REVEAL TITLE */}
        <div className={styles.heroTitleWrap}>
           {/* Spotlight Effect */}
           <div 
             className={styles.heroSpotlight}
             style={{
               background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(52, 211, 153, 0.25), transparent 60%)`
             }}
           />
           
           <h1 className={styles.heroTitlePrimary} style={{ animationDelay: '500ms' }}>
              DIOXOID
           </h1>
           <h1 className={styles.heroTitleSecondary} style={{ animationDelay: '700ms' }}>
              DIGITAL
           </h1>
        </div>

        <div className={styles.heroGridRow}>
           <div className={styles.heroStats}>
              <Reveal delay={1400}>
                <div className={styles.heroStatsList}>
                   <div className={styles.heroStatsRow}>
                      <span>ДОСТУПЕН</span>
                      <span className={styles.heroStatsValue}>ДА</span>
                   </div>
                   <div className={styles.heroStatsRow}>
                      <span>ЗАДЕРЖКА</span>
                      <span>12мс</span>
                   </div>
                </div>
              </Reveal>
           </div>
           
           <div className={styles.heroRight}>
              <Reveal delay={1600} className={styles.heroIntroWrap}>
                <p className={styles.heroIntro}>
                   Мы создаём <span className={styles.heroIntroEmphasis}>цифровые соборы</span>. 
                   Куём артефакты, которые бросают вызов стандартным системам сеток.
                </p>
              </Reveal>
              
              <Reveal delay={1800}>
                <button onClick={() => onNavigate('work')} className={styles.heroCta} data-cursor-hover>
                   <span className={styles.heroCtaText}>
                      Войти в Архив
                      <ArrowRight className={styles.heroCtaIcon} />
                   </span>
                   <div className={styles.heroCtaBg}></div>
                </button>
              </Reveal>
           </div>
        </div>
      </div>
    </section>
  );
};

const Manifesto = () => (
  <section className={styles.manifesto}>
     <div className={styles.manifestoContent}>
        <SectionLabel>Манифест</SectionLabel>
        <Reveal>
          <p className={styles.manifestoQuote}>
             &ldquo;Веб стал <span className={styles.manifestoWhite}>статичным</span>. Мы здесь, чтобы вернуть <span className={styles.manifestoAccent}>кинетику</span>.&rdquo;
          </p>
        </Reveal>
        <div className={styles.manifestoGrid}>
           <Reveal delay={200}>
             <p>
                Мы верим, что цифровые переживания должны подчиняться законам физики. Они должны иметь вес, инерцию и сопротивление. Когда вы взаимодействуете с интерфейсом Dioxoid, вы не просто нажимаете кнопки; вы манипулируете цифровой средой.
             </p>
           </Reveal>
           <Reveal delay={400}>
             <p>
                Наша миссия - разрушить шаблонный интернет и перестроить его вручную написанным кодом, индивидуальными взаимодействиями и уровнем полировки, граничащим с одержимостью.
             </p>
           </Reveal>
        </div>
     </div>
  </section>
);

const SelectedWork = ({ onNavigate, onCaseSelect }: { onNavigate: (view: ViewState) => void, onCaseSelect: (id: string) => void }) => (
     <section className={styles.selectedWork}>
         <div className={styles.selectedHeader}>
         <Reveal>
            <SectionLabel>Избранные работы</SectionLabel>
         </Reveal>
            <button onClick={() => onNavigate('work')} className={styles.selectedButton} data-cursor-hover>
            Смотреть все
               <ArrowRight className={styles.selectedButtonIcon} />
         </button>
      </div>

         <div className={styles.workScroller}>
         {WORKS_DATA.slice(0, 3).map((item, i) => (
            <div 
               key={i} 
               onClick={() => onCaseSelect(item.id)}
                  className={styles.workCard}
                  data-cursor-hover
            >
                 <div className={styles.workCardOverlay}></div>
              <img 
                 src={item.img} 
                 alt={item.title}
                    className={styles.workCardImage} 
              />
                 <div className={styles.workCardContent}>
                    <div className={styles.workCardMeta}>
                       <span className={styles.workCardDot}></span>
                       <span className={styles.workCardCategory}>{item.cat}</span>
                 </div>
                    <h3 className={styles.workCardTitle}>{item.title}</h3>
              </div>
           </div>
         ))}
      </div>
      
         <div className={styles.workMobileCta}>
           <button onClick={() => onNavigate('work')} className={styles.workMobileButton} data-cursor-hover>
            Смотреть весь архив
               <ArrowRight className={styles.workMobileIcon} />
         </button>
      </div>
   </section>
);

const Services = () => (
  <section className={styles.services}>
     <div className={styles.servicesGrid}>
        <div className={styles.servicesLeft}>
           <Reveal>
             <SectionLabel>Возможности</SectionLabel>
             <H2 className={styles.servicesTitle}>Полный цикл<br/>производства.</H2>
             <p className={styles.servicesDesc}>От первой искры идеи до финального развёртывания на граничной сети.</p>
           </Reveal>
        </div>
        <div className={styles.servicesList}>
           {[
              { title: "Стратегия", items: ["Позиционирование бренда", "Цифровая трансформация", "Анализ рынка", "Исследование пользователей"] },
              { title: "Дизайн", items: ["Арт-дирекция", "UI/UX система", "Моушн дизайн", "Создание 3D-ассетов"] },
              { title: "Разработка", items: ["WebGL / GLSL", "Full-Stack React", "Оптимизация производительности", "Headless CMS"] },
              { title: "Контент", items: ["Копирайтинг", "Техническая документация", "Видеопродукция", "Саунд-дизайн"] }
           ].map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className={styles.serviceItem}>
                   <h3 className={styles.serviceTitle}>
                      <span className={styles.serviceDot}></span>
                      {s.title}
                   </h3>
                   <ul className={styles.serviceList}>
                      {s.items.map((item, j) => (
                         <li key={j} className={styles.serviceListItem}>
                            <span>{item}</span>
                            <span className={styles.serviceListIndicator}>+</span>
                         </li>
                      ))}
                   </ul>
                </div>
              </Reveal>
           ))}
        </div>
     </div>
  </section>
);

const TechStack = () => (
  <section className={styles.techStack}>
     <div className={styles.techMarquee}>
        {[...Array(2)].map((_, i) => (
           <div key={i} className={styles.techRow}>
              {["REACT", "NEXT.JS", "TYPESCRIPT", "WEBGL", "THREE.JS", "GSAP", "TAILWIND", "NODE.JS", "PYTHON", "AWS", "VERCEL"].map((tech) => (
                 <span key={tech} className={styles.techItem}>
                    {tech}
                 </span>
              ))}
           </div>
        ))}
     </div>
  </section>
);

const Process = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => (
     <section className={styles.process}>
        <div className={styles.processGrid}>
          <div>
             <SectionLabel>Процесс</SectionLabel>
              <H2 className={styles.processTitle}>Наш<br/>алгоритм.</H2>
          </div>
           <div className={styles.processSteps}>
             {[
                "Мы деконструируем вашу реальность.",
                "Мы перестраиваем её с лучшей физикой.",
                "Мы разворачиваем на глобальной сети."
             ].map((text, i) => (
                <Reveal key={i} delay={i * 100}>
                    <div className={styles.processStep}>
                       <span className={styles.processIndex}>0{i+1}</span>
                       <h3 className={styles.processText}>{text}</h3>
                   </div>
                </Reveal>
             ))}
          </div>
       </div>

       {/* Mid-Page CTA */}
       <div className={styles.processCtaWrap}>
          <button 
             onClick={() => onNavigate('contact')}
             className={styles.processCtaButton}
             data-cursor-hover
          >
             <span className={styles.processCtaText}>Запустить алгоритм</span>
             <div className={styles.processCtaIcon}>
                <ArrowRight size={14} />
             </div>
          </button>
       </div>
    </section>
);

const Clients = () => (
     <section className={styles.clients}>
      <SectionLabel>Сеть</SectionLabel>
         <div className={styles.clientsGrid}>
         {["Apex", "Vertex", "Oura", "Nebula", "Quant", "Helix", "Sol", "Flux"].map((client, i) => (
               <div key={i} className={styles.clientsItem}>
                  <span className={styles.clientsText}>{client}</span>
            </div>
         ))}
      </div>
   </section>
);

const Reviews = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => (
     <section className={styles.reviews}>
      {/* Background Decor */}
         <div className={styles.reviewsGlow} />
      
         <div className={styles.reviewsGrid}>
         {/* Left: The Signal Visualizer */}
            <div className={styles.reviewsVisualizer}>
            {/* Grid Background */}
               <div className={styles.reviewsGridBg}></div>
            
            {/* Radar Sweep */}
               <div className={styles.reviewsSweep}></div>

            {/* Central HUD */}
               <div className={styles.reviewsHud}>
                  <div className={styles.reviewsPulse}>
                     <div className={styles.reviewsPing}></div>
                     <Zap size={32} className={styles.reviewsIcon} />
               </div>
                  <div className={styles.reviewsSignal}>
                  Сигнал обнаружен
               </div>
                  <div className={styles.reviewsBars}>
                  {[...Array(5)].map((_, i) => (
                        <div key={i} className={styles.reviewsBar} style={{ height: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s` }}></div>
                  ))}
               </div>
            </div>

            {/* Corner Accents */}
               <div className={`${styles.reviewsCorner} ${styles.reviewsCornerTopLeft}`}></div>
               <div className={`${styles.reviewsCorner} ${styles.reviewsCornerTopRight}`}></div>
               <div className={`${styles.reviewsCorner} ${styles.reviewsCornerBottomLeft}`}></div>
               <div className={`${styles.reviewsCorner} ${styles.reviewsCornerBottomRight}`}></div>
         </div>

         {/* Right: The Content */}
            <div className={styles.reviewsContent}>
            <SectionLabel>Входящая трансмиссия</SectionLabel>
               <h2 className={styles.reviewsQuote}>
                  &ldquo;Dioxoid работает на другой частоте. Они не просто создали сайт; они создали <span className={styles.reviewsQuoteEmphasis}>культовый объект</span>.&rdquo;
            </h2>
            
               <div className={styles.reviewsFooter}>
                  <div className={styles.reviewsAuthor}>
                     <div className={styles.reviewsAvatar}>
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" className={styles.reviewsAvatarImg} alt="Сара К." />
                  </div>
                  <div>
                        <div className={styles.reviewsName}>Сара К.</div>
                        <div className={styles.reviewsRole}>CTO, Vertex Financial</div>
                  </div>
               </div>

               {/* New CTA in this section */}
                  <button 
                     onClick={() => onNavigate('contact')}
                     className={styles.reviewsCta}
                     data-cursor-hover
                  >
                  Проверить сигнал
                     <div className={styles.reviewsCtaIcon}>
                     <ArrowUpRight size={14} />
                  </div>
               </button>
            </div>
         </div>
      </div>
   </section>
);

const CTA = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => (
     <section className={styles.cta}>
         <div className={styles.ctaOverlay}></div>
      
         <div className={styles.ctaContent}>
         <Reveal>
               <h2 className={styles.ctaTitle}>
               НАЧАТЬ<br/>ПРОЕКТ
            </h2>
         </Reveal>
         <Reveal delay={200}>
               <p className={styles.ctaText}>
               Наш график настроен на Q4. Запустите протокол, чтобы закрепить своё место в очереди производства.
            </p>
         </Reveal>
         <Reveal delay={400}>
               <button 
                 onClick={() => onNavigate('contact')}
                 className={styles.ctaButton}
                 data-cursor-hover
               >
               Инициировать протокол
            </button>
         </Reveal>
      </div>
   </section>
);

const LandingPage = ({ loaded, onNavigate, onCaseSelect }: { loaded: boolean, onNavigate: (view: ViewState) => void, onCaseSelect: (id: string) => void }) => (
  <>
    <Hero loaded={loaded} onNavigate={onNavigate} />
    <Manifesto />
    <SelectedWork onNavigate={onNavigate} onCaseSelect={onCaseSelect} />
    <Services />
    <TechStack />
    <Process onNavigate={onNavigate} />
    <Clients />
    <Reviews onNavigate={onNavigate} />
    <CTA onNavigate={onNavigate} />
  </>
);

export default LandingPage;
