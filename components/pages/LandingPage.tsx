'use client';

import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Zap } from 'lucide-react';
import { H1, H2, SectionLabel } from '../Typography';
import { ScrambleText, Reveal, WORKS_DATA } from '../AppContent';
import { ViewState } from '../../types';

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
      className="relative min-h-[100svh] flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 lg:px-20 overflow-hidden bg-black"
    >
      {/* RICH DYNAMIC BACKGROUND */}
      <div className="absolute inset-0 bg-stone-950 z-0 overflow-hidden pointer-events-none">
         {/* Ambient Glows */}
         <div className="absolute top-[-10%] left-[-10%] w-[120vw] h-[120vw] bg-indigo-950/30 rounded-full blur-[150px] animate-pulse duration-[10000ms] opacity-70 mix-blend-screen" />
         <div className="absolute top-[30%] right-[-10%] w-[100vw] h-[100vw] bg-emerald-950/20 rounded-full blur-[180px] animate-float [animation-delay:2s] opacity-60 mix-blend-screen" />
         <div className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-violet-950/25 rounded-full blur-[120px] opacity-50 mix-blend-screen" />
         
         {/* Stardust */}
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-50 contrast-150 mix-blend-overlay" />
         
         {/* Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-30"></div>
      </div>

      <div className="relative z-10 w-full select-none mt-20 md:mt-0">
        <Reveal delay={1200}>
          <div className="flex items-center gap-4 mb-8 md:mb-12 border-l border-white/20 pl-6">
             <div className="flex gap-1">
                {[1,2,3].map(i => (
                  <div key={i} className={`w-0.5 h-4 bg-emerald-500 animate-pulse`} style={{ animationDelay: `${i*150}ms` }}></div>
                ))}
             </div>
             <ScrambleText text="ACCEPTING CLIENTS FOR Q4 2024" className="text-[10px] font-mono tracking-[0.2em] text-emerald-500" trigger={loaded} delay={1800} />
          </div>
        </Reveal>

        {/* MOUSE REVEAL TITLE */}
        <div className="relative group cursor-default mb-12 md:mb-16">
           {/* Spotlight Effect */}
           <div 
             className="hidden md:block absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-color-dodge"
             style={{
               background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(52, 211, 153, 0.25), transparent 60%)`
             }}
           />
           
           <h1 className="text-[13vw] font-bold text-stone-100 tracking-tighter opacity-0 animate-blur-in [animation-delay:500ms] fill-mode-forwards leading-[0.85] mix-blend-difference break-all md:break-normal">
              DIGITAL
           </h1>
           <h1 className="text-[13vw] font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-stone-400 via-stone-200 to-stone-600 tracking-tighter opacity-0 animate-blur-in [animation-delay:700ms] fill-mode-forwards leading-[0.85] pr-4 break-all md:break-normal">
              ALCHEMY
           </h1>
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 border-t border-white/10 pt-12 items-end">
           <div className="md:col-span-4 hidden md:block">
              <Reveal delay={1400}>
                <div className="space-y-4 font-mono text-[10px] text-stone-500 tracking-widest">
                   <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>AVAILABLE</span>
                      <span className="text-emerald-500">TRUE</span>
                   </div>
                   <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>LATENCY</span>
                      <span>12ms</span>
                   </div>
                </div>
              </Reveal>
           </div>
           
           <div className="md:col-span-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
              <Reveal delay={1600} className="max-w-lg">
                <p className="text-lg md:text-xl lg:text-2xl font-light text-stone-300 leading-relaxed">
                   We architect <span className="text-white font-normal border-b border-emerald-500/50">digital cathedrals</span>. 
                   Forging artifacts that defy standard grid systems.
                </p>
              </Reveal>
              
              <Reveal delay={1800}>
                <button onClick={() => onNavigate('work')} className="group cursor-hover relative px-8 py-4 md:px-10 md:py-5 bg-white text-black overflow-hidden active:scale-95 transition-transform duration-200 inline-block w-full md:w-auto">
                   <span className="relative z-10 text-xs font-bold uppercase tracking-[0.25em] group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-4">
                      Enter Archive
                      <ArrowRight className="w-4 h-4" />
                   </span>
                   <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] z-0"></div>
                </button>
              </Reveal>
           </div>
        </div>
      </div>
    </section>
  );
};

const Manifesto = () => (
  <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-stone-950 border-t border-stone-900 relative overflow-hidden">
     <div className="max-w-4xl">
        <SectionLabel>Manifesto</SectionLabel>
        <Reveal>
          <p className="text-2xl md:text-5xl lg:text-6xl font-serif italic text-stone-400 leading-tight mb-12">
             &ldquo;The web has become <span className="text-white">static</span>. We are here to bring the <span className="text-emerald-500">kinetic</span>.&rdquo;
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-stone-500 font-light text-base md:text-lg">
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
   <section className="py-24 md:py-40 bg-black overflow-hidden relative border-t border-stone-900">
      <div className="px-6 md:px-12 lg:px-20 mb-12 md:mb-20 flex justify-between items-end">
         <Reveal>
            <SectionLabel>Selected Work</SectionLabel>
         </Reveal>
         <button onClick={() => onNavigate('work')} className="hidden md:flex items-center gap-2 text-stone-500 hover:text-white transition-colors text-sm uppercase tracking-widest group cursor-hover">
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
         </button>
      </div>

      <div className="flex gap-6 md:gap-12 px-6 md:px-12 lg:px-20 overflow-x-auto pb-12 md:pb-20 hide-scrollbar snap-x cursor-grab active:cursor-grabbing">
         {WORKS_DATA.slice(0, 3).map((item, i) => (
            <div 
               key={i} 
               onClick={() => onCaseSelect(item.id)}
               className="relative group w-[85vw] md:w-[45vw] flex-shrink-0 aspect-[4/5] md:aspect-[16/10] overflow-hidden grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-700 bg-stone-900 cursor-hover border border-stone-800 hover:border-emerald-500/50 snap-center"
            >
              <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-all z-10"></div>
              <img 
                 src={item.img} 
                 alt={item.title}
                 className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute bottom-0 left-0 p-6 md:p-12 z-20 translate-y-0 md:translate-y-8 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                 <div className="flex items-center gap-3 mb-2 md:mb-4">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-xs font-mono uppercase tracking-widest text-white">{item.cat}</span>
                 </div>
                 <h3 className="text-4xl md:text-7xl text-white font-medium leading-none tracking-tighter">{item.title}</h3>
              </div>
           </div>
         ))}
      </div>
      
      <div className="px-6 md:hidden flex justify-center">
        <button onClick={() => onNavigate('work')} className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors text-xs uppercase tracking-widest group cursor-hover">
            View Full Archive
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
         </button>
      </div>
   </section>
);

const Services = () => (
  <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-stone-950 border-t border-stone-900">
     <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-4">
           <Reveal>
             <SectionLabel>Capabilities</SectionLabel>
             <H2 className="mt-6 md:mt-8 mb-4 md:mb-8 text-white">Full Cycle<br/>Production.</H2>
             <p className="text-stone-400">From the first spark of an idea to the final deployment on the edge network.</p>
           </Reveal>
        </div>
        <div className="lg:col-span-8 grid md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
           {[
              { title: "Strategy", items: ["Brand Positioning", "Digital Transformation", "Market Analysis", "User Research"] },
              { title: "Design", items: ["Art Direction", "UI/UX System", "Motion Design", "3D Asset Creation"] },
              { title: "Engineering", items: ["WebGL / GLSL", "Full-Stack React", "Performance Optimization", "Headless CMS"] },
              { title: "Content", items: ["Copywriting", "Technical Writing", "Video Production", "Sound Design"] }
           ].map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group">
                   <h3 className="text-xl md:text-2xl text-white mb-4 md:mb-6 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"></span>
                      {s.title}
                   </h3>
                   <ul className="space-y-3">
                      {s.items.map((item, j) => (
                         <li key={j} className="text-stone-500 text-sm md:text-base border-b border-stone-900 pb-2 flex justify-between group-hover:text-stone-300 transition-colors cursor-default">
                            <span>{item}</span>
                            <span className="opacity-0 group-hover:opacity-100 text-emerald-500 text-[10px] uppercase tracking-widest transition-opacity hidden md:block">+</span>
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
  <section className="py-16 md:py-20 border-y border-stone-900 bg-stone-950 overflow-hidden">
     <div className="flex gap-12 md:gap-20 animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
           <div key={i} className="flex gap-12 md:gap-20 items-center opacity-50 md:opacity-30 md:hover:opacity-100 transition-all duration-500">
              {["REACT", "NEXT.JS", "TYPESCRIPT", "WEBGL", "THREE.JS", "GSAP", "TAILWIND", "NODE.JS", "PYTHON", "AWS", "VERCEL"].map((tech) => (
                 <span key={tech} className="text-3xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-600 tracking-tighter cursor-default hover:text-white transition-colors">
                    {tech}
                 </span>
              ))}
           </div>
        ))}
     </div>
  </section>
);

const Process = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => (
    <section className="py-24 md:py-40 bg-stone-950 px-6 md:px-12 lg:px-20 border-t border-stone-900">
       <div className="grid lg:grid-cols-2 gap-12 md:gap-20 mb-20">
          <div>
             <SectionLabel>Process</SectionLabel>
             <H2 className="mt-6 md:mt-8 text-stone-200">The<br/>Algorithm.</H2>
          </div>
          <div className="space-y-8 md:space-y-12">
             {[
                "We deconstruct your reality.",
                "We rebuild it with better physics.",
                "We deploy to the global edge."
             ].map((text, i) => (
                <Reveal key={i} delay={i * 100}>
                   <div className="flex gap-4 md:gap-8 items-start group">
                      <span className="font-mono text-emerald-500/50 pt-1 md:pt-2 text-sm md:text-base">0{i+1}</span>
                      <h3 className="text-xl md:text-3xl text-stone-400 group-hover:text-white transition-colors font-light leading-snug">{text}</h3>
                   </div>
                </Reveal>
             ))}
          </div>
       </div>

       {/* Mid-Page CTA */}
       <div className="flex justify-center border-t border-stone-800 pt-12">
          <button 
             onClick={() => onNavigate('contact')}
             className="group flex items-center gap-6 px-8 py-4 bg-stone-900 border border-stone-800 hover:border-emerald-500/50 hover:bg-black transition-all duration-500 rounded-full"
          >
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-300 group-hover:text-white">Start The Algorithm</span>
             <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight size={14} />
             </div>
          </button>
       </div>
    </section>
);

const Clients = () => (
   <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-black">
      <SectionLabel>Network</SectionLabel>
      <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-900 border border-stone-900">
         {["Apex", "Vertex", "Oura", "Nebula", "Quant", "Helix", "Sol", "Flux"].map((client, i) => (
            <div key={i} className="bg-black p-8 md:p-12 flex items-center justify-center group hover:bg-stone-950 transition-colors">
               <span className="text-lg md:text-xl font-mono uppercase tracking-widest text-stone-600 group-hover:text-white transition-colors">{client}</span>
            </div>
         ))}
      </div>
   </section>
);

const Reviews = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => (
   <section className="py-32 px-6 md:px-12 lg:px-20 bg-stone-950 border-t border-stone-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-900/5 to-transparent pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
         {/* Left: The Signal Visualizer */}
         <div className="order-2 lg:order-1 relative h-[400px] border border-stone-800 bg-stone-900/50 flex flex-col items-center justify-center overflow-hidden group">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
            
            {/* Radar Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent w-[200%] h-full animate-scan -skew-x-12 opacity-50"></div>

            {/* Central HUD */}
            <div className="relative z-10 flex flex-col items-center gap-6">
               <div className="w-24 h-24 border-2 border-emerald-500/30 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 border border-emerald-500/50 rounded-full animate-ping opacity-20 duration-[2s]"></div>
                  <Zap size={32} className="text-emerald-500" />
               </div>
               <div className="font-mono text-xs text-emerald-500 uppercase tracking-widest animate-pulse">
                  Signal Detected
               </div>
               <div className="flex gap-1 h-8 items-end">
                  {[...Array(5)].map((_, i) => (
                     <div key={i} className="w-1 bg-emerald-500/50 animate-bounce" style={{ height: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s` }}></div>
                  ))}
               </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/30"></div>
            <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/30"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/30"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/30"></div>
         </div>

         {/* Right: The Content */}
         <div className="order-1 lg:order-2">
            <SectionLabel>Incoming Transmission</SectionLabel>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mt-8 mb-12 leading-[1.1]">
               &ldquo;Dioxoid operates on a different frequency. They didn&apos;t just build a site; they built a <span className="italic text-emerald-500 border-b border-emerald-500/30 pb-2">cult object</span>.&rdquo;
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between border-t border-stone-800 pt-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-800 rounded-full overflow-hidden border border-stone-700">
                     <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover grayscale" alt="Sarah K." />
                  </div>
                  <div>
                     <div className="text-white text-sm font-bold uppercase tracking-widest">Sarah K.</div>
                     <div className="text-stone-500 text-xs font-mono">CTO, Vertex Financial</div>
                  </div>
               </div>

               {/* New CTA in this section */}
               <button 
                  onClick={() => onNavigate('contact')}
                  className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white hover:text-emerald-400 transition-colors cursor-hover"
               >
                  Verify Signal
                  <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center group-hover:border-emerald-400 group-hover:scale-110 transition-all">
                     <ArrowUpRight size={14} />
                  </div>
               </button>
            </div>
         </div>
      </div>
   </section>
);

const CTA = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => (
   <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 bg-black border-t border-stone-900 text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
      <div className="relative z-10">
         <Reveal>
            <h2 className="text-[15vw] leading-[0.8] font-bold text-white tracking-tighter mb-8 cursor-default pointer-events-none select-none">
               START<br/>PROJECT
            </h2>
         </Reveal>
         <Reveal delay={200}>
            <p className="text-stone-500 text-lg md:text-2xl font-light mb-12 max-w-2xl mx-auto">
               Our schedule is calibrated for Q4. Initiate the protocol to secure your slot in the production queue.
            </p>
         </Reveal>
         <Reveal delay={400}>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-8 py-5 md:px-12 md:py-6 bg-white text-black text-xs md:text-sm font-bold uppercase tracking-[0.25em] hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-105 w-full md:w-auto"
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
