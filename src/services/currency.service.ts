
import { Injectable, signal, computed } from '@angular/core';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Rate relative to SAR (Base)
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  readonly currencies: Currency[] = [
    { code: 'SAR', name: 'السعودية', symbol: 'ر.س', rate: 1, flag: '🇸🇦' },
    { code: 'AED', name: 'الإمارات', symbol: 'د.إ', rate: 0.98, flag: '🇦🇪' },
    { code: 'KWD', name: 'الكويت', symbol: 'د.ك', rate: 0.08, flag: '🇰🇼' },
    { code: 'BHD', name: 'البحرين', symbol: 'د.ب', rate: 0.10, flag: '🇧🇭' },
    { code: 'OMR', name: 'عمان', symbol: 'ر.ع', rate: 0.10, flag: '🇴🇲' },
    { code: 'QAR', name: 'قطر', symbol: 'ر.ق', rate: 0.97, flag: '🇶🇦' }
  ];

  selectedCurrency = signal<Currency>(this.currencies[0]);
  isDrawerOpen = signal(false);

  openDrawer() { this.isDrawerOpen.set(true); }
  closeDrawer() { this.isDrawerOpen.set(false); }
  toggleDrawer() { this.isDrawerOpen.update(v => !v); }

  setCurrency(code: string) {
    const currency = this.currencies.find(c => c.code === code);
    if (currency) {
      this.selectedCurrency.set(currency);
    }
  }

  /**
   * Automatically detects the user's country using timezone and browser locale
   */
  detectAndSetCurrency() {
    try {
      // 1. Check by Timezone (Most reliable for GCC)
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const tzMap: Record<string, string> = {
        'Asia/Riyadh': 'SAR',
        'Asia/Dubai': 'AED',
        'Asia/Kuwait': 'KWD',
        'Asia/Bahrain': 'BHD',
        'Asia/Muscat': 'OMR',
        'Asia/Qatar': 'QAR',
        'Asia/Aden': 'SAR' // Often maps to SAR for commerce
      };

      if (tzMap[timezone]) {
        this.setCurrency(tzMap[timezone]);
        return;
      }

      // 2. Check by Browser Locale Fallback
      const locales = navigator.languages || [navigator.language];
      for (const locale of locales) {
        const upperLocale = locale.toUpperCase();
        if (upperLocale.includes('SA')) { this.setCurrency('SAR'); return; }
        if (upperLocale.includes('AE')) { this.setCurrency('AED'); return; }
        if (upperLocale.includes('KW')) { this.setCurrency('KWD'); return; }
        if (upperLocale.includes('BH')) { this.setCurrency('BHD'); return; }
        if (upperLocale.includes('OM')) { this.setCurrency('OMR'); return; }
        if (upperLocale.includes('QA')) { this.setCurrency('QAR'); return; }
      }
    } catch (e) {
      console.warn('Currency detection failed, defaulting to SAR');
    }

    // Default to SAR
    this.setCurrency('SAR');
  }

  formatPrice(sarPrice: number): string {
    const current = this.selectedCurrency();
    const converted = sarPrice * current.rate;

    const displayValue = ['KWD', 'BHD', 'OMR', 'SAR', 'AED'].includes(current.code)
      ? converted.toFixed(2)
      : Math.ceil(converted).toFixed(0);

    return `${displayValue} ${current.symbol}`;
  }
}
