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
             <ScrambleText text="ACCEPTING CLIENTS FOR Q4 2024" className={styles.heroLabel} trigger={loaded} delay={1800} />
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
              DIGITAL
           </h1>
           <h1 className={styles.heroTitleSecondary} style={{ animationDelay: '700ms' }}>
              ALCHEMY
           </h1>
        </div>

        <div className={styles.heroGridRow}>
           <div className={styles.heroStats}>
              <Reveal delay={1400}>
                <div className={styles.heroStatsList}>
                   <div className={styles.heroStatsRow}>
                      <span>AVAILABLE</span>
                      <span className={styles.heroStatsValue}>TRUE</span>
                   </div>
                   <div className={styles.heroStatsRow}>
                      <span>LATENCY</span>
                      <span>12ms</span>
                   </div>
                </div>
              </Reveal>
           </div>
           
           <div className={styles.heroRight}>
              <Reveal delay={1600} className={styles.heroIntroWrap}>
                <p className={styles.heroIntro}>
                   We architect <span className={styles.heroIntroEmphasis}>digital cathedrals</span>. 
                   Forging artifacts that defy standard grid systems.
                </p>
              </Reveal>
              
              <Reveal delay={1800}>
                <button onClick={() => onNavigate('work')} className={styles.heroCta} data-cursor-hover>
                   <span className={styles.heroCtaText}>
                      Enter Archive
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
        <SectionLabel>Manifesto</SectionLabel>
        <Reveal>
          <p className={styles.manifestoQuote}>
             &ldquo;The web has become <span className={styles.manifestoWhite}>static</span>. We are here to bring the <span className={styles.manifestoAccent}>kinetic</span>.&rdquo;
          </p>
        </Reveal>
        <div className={styles.manifestoGrid}>
           <Reveal delay={200}>
             <p>
                We believe that digital experiences should adhere to the laws of physics. They should have weight, momentum, and resistance. When you interact with a Dioxoid interface, you are not just clicking buttons; you are manipulating a digital environment.
             </p>
           </Reveal>
           <Reveal delay={400}>
             <p>
                Our mission is to dismantle the template-driven internet and rebuild it with handcrafted code, bespoke interactions, and a level of polish that borders on the obsessive.
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
            <SectionLabel>Selected Work</SectionLabel>
         </Reveal>
            <button onClick={() => onNavigate('work')} className={styles.selectedButton} data-cursor-hover>
            View All
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
            View Full Archive
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
             <SectionLabel>Capabilities</SectionLabel>
             <H2 className={styles.servicesTitle}>Full Cycle<br/>Production.</H2>
             <p className={styles.servicesDesc}>From the first spark of an idea to the final deployment on the edge network.</p>
           </Reveal>
        </div>
        <div className={styles.servicesList}>
           {[
              { title: "Strategy", items: ["Brand Positioning", "Digital Transformation", "Market Analysis", "User Research"] },
              { title: "Design", items: ["Art Direction", "UI/UX System", "Motion Design", "3D Asset Creation"] },
              { title: "Engineering", items: ["WebGL / GLSL", "Full-Stack React", "Performance Optimization", "Headless CMS"] },
              { title: "Content", items: ["Copywriting", "Technical Writing", "Video Production", "Sound Design"] }
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
             <SectionLabel>Process</SectionLabel>
              <H2 className={styles.processTitle}>The<br/>Algorithm.</H2>
          </div>
           <div className={styles.processSteps}>
             {[
                "We deconstruct your reality.",
                "We rebuild it with better physics.",
                "We deploy to the global edge."
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
             <span className={styles.processCtaText}>Start The Algorithm</span>
             <div className={styles.processCtaIcon}>
                <ArrowRight size={14} />
             </div>
          </button>
       </div>
    </section>
);

const Clients = () => (
     <section className={styles.clients}>
      <SectionLabel>Network</SectionLabel>
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
                  Signal Detected
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
            <SectionLabel>Incoming Transmission</SectionLabel>
               <h2 className={styles.reviewsQuote}>
                  &ldquo;Dioxoid operates on a different frequency. They didn&apos;t just build a site; they built a <span className={styles.reviewsQuoteEmphasis}>cult object</span>.&rdquo;
            </h2>
            
               <div className={styles.reviewsFooter}>
                  <div className={styles.reviewsAuthor}>
                     <div className={styles.reviewsAvatar}>
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" className={styles.reviewsAvatarImg} alt="Sarah K." />
                  </div>
                  <div>
                        <div className={styles.reviewsName}>Sarah K.</div>
                        <div className={styles.reviewsRole}>CTO, Vertex Financial</div>
                  </div>
               </div>

               {/* New CTA in this section */}
                  <button 
                     onClick={() => onNavigate('contact')}
                     className={styles.reviewsCta}
                     data-cursor-hover
                  >
                  Verify Signal
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
               START<br/>PROJECT
            </h2>
         </Reveal>
         <Reveal delay={200}>
               <p className={styles.ctaText}>
               Our schedule is calibrated for Q4. Initiate the protocol to secure your slot in the production queue.
            </p>
         </Reveal>
         <Reveal delay={400}>
               <button 
                 onClick={() => onNavigate('contact')}
                 className={styles.ctaButton}
                 data-cursor-hover
               >
               Initiate Protocol
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
