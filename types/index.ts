import { ReactNode } from 'react';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type Size = 'sm' | 'md' | 'lg';

export type ViewState = 'home' | 'work' | 'journal' | 'contact' | 'case-study' | 'article';

export interface WorkItem {
  id: string;
  title: string;
  cat: string;
  year: string;
  img: string;
  desc: string;
}

export interface JournalItem {
  id: string;
  date: string;
  title: string;
  cat: string;
  readTime: string;
  img: string;
}
