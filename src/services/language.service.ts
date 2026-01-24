
import { Injectable, signal, computed, effect } from '@angular/core';

export type Language = 'ar' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLang = signal<Language>('ar');
  isRtl = computed(() => this.currentLang() === 'ar');

  constructor() {
    const saved = localStorage.getItem('recuvia_lang') as Language;
    if (saved) {
      this.currentLang.set(saved);
    }

    effect(() => {
      const lang = this.currentLang();
      localStorage.setItem('recuvia_lang', lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    });
  }

  setLanguage(lang: Language) {
    this.currentLang.set(lang);
  }

  toggleLanguage() {
    this.currentLang.update(l => l === 'ar' ? 'en' : 'ar');
  }
}
