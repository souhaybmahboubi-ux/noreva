
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

  setCurrency(code: string) {
    const currency = this.currencies.find(c => c.code === code);
    if (currency) {
      this.selectedCurrency.set(currency);
    }
  }

  // Helper to format price
  formatPrice(sarPrice: number): string {
    const current = this.selectedCurrency();
    const converted = sarPrice * current.rate;
    
    // Changed to 2 decimal places for high value currencies per request (e.g. 2.50 instead of 2.500)
    const displayValue = ['KWD', 'BHD', 'OMR'].includes(current.code) 
      ? converted.toFixed(2) 
      : Math.ceil(converted).toFixed(0); // Round up for SAR/AED/QAR for cleaner look

    return `${displayValue} ${current.symbol}`;
  }
  
  // Return just the number for calculations if needed
  convertValue(sarPrice: number): number {
    return sarPrice * this.selectedCurrency().rate;
  }
}
