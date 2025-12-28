
import { Injectable, signal, inject, ApplicationRef } from '@angular/core';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Rate relative to AED (Base)
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private appRef = inject(ApplicationRef);

  readonly currencies: Currency[] = [
    { code: 'AED', name: 'الإمارات', symbol: 'د.إ', rate: 1.0000, flag: '🇦🇪' },
    { code: 'SAR', name: 'السعودية', symbol: 'ر.س', rate: 1.0213, flag: '🇸🇦' },
    { code: 'KWD', name: 'الكويت', symbol: 'د.ك', rate: 0.0839, flag: '🇰🇼' },
    { code: 'BHD', name: 'البحرين', symbol: 'د.ب', rate: 0.1026, flag: '🇧🇭' },
    { code: 'OMR', name: 'عمان', symbol: 'ر.ع', rate: 0.1049, flag: '🇴🇲' },
    { code: 'QAR', name: 'قطر', symbol: 'ر.ق', rate: 0.9915, flag: '🇶🇦' },
    { code: 'LYD', name: 'ليبيا', symbol: 'ل.د', rate: 1.3124, flag: '🇱🇾' },
    { code: 'EGP', name: 'مصر', symbol: 'ج.م', rate: 13.6983, flag: '🇪🇬' },
    { code: 'IQD', name: 'العراق', symbol: 'د.ع', rate: 356.7868, flag: '🇮🇶' },
    { code: 'JOD', name: 'الأردن', symbol: 'د.أ', rate: 0.1931, flag: '🇯🇴' }
  ];

  selectedCurrency = signal<Currency>(this.getInitialCurrency());

  constructor() {
    this.initAutoDetection();
  }

  private initAutoDetection() {
    if (typeof window === 'undefined') return;

    // Only auto-detect if the user hasn't manually selected a currency in the past
    if (!localStorage.getItem('manual_currency_selection')) {
      this.detectCurrency();
    }
  }

  private getInitialCurrency(): Currency {
    if (typeof window === 'undefined') return this.currencies[0];

    const saved = localStorage.getItem('selected_currency');
    if (saved) {
      const found = this.currencies.find(c => c.code === saved);
      if (found) return found;
    }
    return this.currencies[0];
  }

  private async detectCurrency() {
    // Try multiple sources for reliability
    const sources = [
      { url: 'https://ipwho.is/', parser: (data: any) => data.currency?.code || data.country_code },
      { url: 'https://ipapi.co/json/', parser: (data: any) => data.currency || data.country_code }
    ];

    for (const source of sources) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout per source

        const response = await fetch(source.url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) continue;

        const data = await response.json();
        let code = source.parser(data);

        if (code) {
          code = code.toUpperCase();
          // If the parser returned a country code, map it to currency
          if (code.length === 2) {
            code = this.mapCountryToCurrency(code);
          }

          const found = this.currencies.find(c => c.code === code);
          if (found) {
            this.selectedCurrency.set(found);
            localStorage.setItem('selected_currency', found.code);
            this.appRef.tick(); // Force UI update
            return; // Success, stop trying other sources
          }
        }
      } catch (e) {
        console.warn(`Currency detection source ${source.url} failed:`, e);
      }
    }
  }

  private mapCountryToCurrency(countryCode: string): string {
    const map: { [key: string]: string } = {
      'AE': 'AED', 'SA': 'SAR', 'KW': 'KWD', 'BH': 'BHD',
      'OM': 'OMR', 'QA': 'QAR', 'LY': 'LYD', 'EG': 'EGP',
      'IQ': 'IQD', 'JO': 'JOD'
    };
    return map[countryCode] || '';
  }

  setCurrency(code: string) {
    const currency = this.currencies.find(c => c.code === code);
    if (currency) {
      this.selectedCurrency.set(currency);
      localStorage.setItem('selected_currency', code);
      localStorage.setItem('manual_currency_selection', 'true'); // Flag that user made a choice
      this.appRef.tick();
    }
  }

  formatPrice(basePrice: number): string {
    const current = this.selectedCurrency();
    const converted = basePrice * current.rate;

    let displayValue: string;

    if (current.code === 'IQD') {
      displayValue = Math.round(converted).toLocaleString('en-US');
    } else if (['KWD', 'BHD', 'OMR', 'JOD'].includes(current.code)) {
      displayValue = converted.toFixed(3);
    } else {
      displayValue = converted.toFixed(2);
    }

    return `${displayValue} ${current.symbol}`;
  }

  convertValue(basePrice: number): number {
    return basePrice * this.selectedCurrency().rate;
  }
}
