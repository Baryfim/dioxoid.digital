'use client';

import React from 'react';
import { SectionLabel } from '../Typography';

const ContactPage = () => (
    <section className="min-h-screen bg-stone-100 text-stone-900 pt-24 md:pt-32 pb-40 px-6 md:px-12 lg:px-20 relative overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-stone-200 via-stone-100 to-stone-50 opacity-50"></div>
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20">
         <div>
            <SectionLabel>Inquiry</SectionLabel>
            <h2 className="text-[15vw] lg:text-[10rem] leading-[0.8] font-bold tracking-tighter mb-8 md:mb-12 mt-8 md:mt-12 mix-blend-multiply text-stone-900">
               LET&apos;S<br/>TALK.
            </h2>
            <div className="space-y-2 text-lg md:text-2xl font-light text-stone-600">
               <p>hello@dioxoid.studio</p>
               <p>+81 03-1234-5678</p>
            </div>
         </div>
         
         <div className="flex flex-col justify-end">
            <form className="space-y-8 md:space-y-12">
               {["Name", "Company", "Email", "Budget"].map(label => (
                  <div key={label} className="relative">
                     <input 
                        type="text" 
                        className="w-full bg-transparent border-b border-stone-300 py-3 md:py-4 text-lg md:text-2xl outline-none focus:border-black transition-colors placeholder-transparent peer text-stone-900 rounded-none" 
                        placeholder={label} 
                     />
                     <label className="absolute left-0 top-3 md:top-4 text-stone-400 text-xs md:text-sm uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-black pointer-events-none">
                        {label}
                     </label>
                  </div>
               ))}
               <div className="pt-8">
                  <button type="button" className="bg-black text-white px-8 py-5 md:px-12 md:py-6 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-emerald-600 transition-colors w-full md:w-auto cursor-hover">
                     Send Transmission
                  </button>
               </div>
            </form>
         </div>
      </div>
   </section>
);

export default ContactPage;
