'use client';

import React from 'react';
import { SectionLabel } from '../Typography';
import styles from './ContactPage/ContactPage.module.scss';

const ContactPage = () => (
    <section className={styles.page}>
      <div className={styles.background}></div>
      
      <div className={styles.content}>
         <div>
            <SectionLabel>Запрос</SectionLabel>
            <h2 className={styles.title}>
               ДАВАЙТЕ<br/>ПОГОВОРИМ.
            </h2>
            <div className={styles.contactInfo}>
               <p>hello@dioxoid.studio</p>
               <p>+81 03-1234-5678</p>
            </div>
         </div>
         
         <div className={styles.formWrap}>
            <form className={styles.form}>
               {["Имя", "Компания", "Email", "Бюджет"].map(label => (
                  <div key={label} className={styles.formField}>
                     <input 
                        type="text" 
                        className={styles.input} 
                        placeholder={label} 
                     />
                     <label className={styles.label}>
                        {label}
                     </label>
                  </div>
               ))}
               <div className={styles.submitWrap}>
                  <button type="button" className={styles.submitButton} data-cursor-hover>
                     Отправить трансмиссию
                  </button>
               </div>
            </form>
         </div>
      </div>
   </section>
);

export default ContactPage;
