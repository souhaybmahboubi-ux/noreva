
import { Injectable, signal } from '@angular/core';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Rate relative to SAR (Base)
  flag: string;
  country: string; // Country code for matching
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  readonly currencies: Currency[] = [
    { code: 'SAR', name: 'السعودية', symbol: 'ر.س', rate: 1, flag: '🇸🇦', country: 'SA' },
    { code: 'AED', name: 'الإمارات', symbol: 'د.إ', rate: 0.98, flag: '🇦🇪', country: 'AE' },
    { code: 'KWD', name: 'الكويت', symbol: 'د.ك', rate: 0.08, flag: '🇰🇼', country: 'KW' },
    { code: 'BHD', name: 'البحرين', symbol: 'د.ب', rate: 0.10, flag: '🇧🇭', country: 'BH' },
    { code: 'OMR', name: 'عمان', symbol: 'ر.ع', rate: 0.10, flag: '🇴🇲', country: 'OM' },
    { code: 'QAR', name: 'قطر', symbol: 'ر.ق', rate: 0.97, flag: '🇶🇦', country: 'QA' }
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
   * Detects user's country via IP geolocation and sets currency
   */
  async detectAndSetCurrency() {
    try {
      // Use free IP geolocation API
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      if (data && data.country_code) {
        const countryCode = data.country_code.toUpperCase();

        // Find matching currency for the country
        const currency = this.currencies.find(c => c.country === countryCode);

        if (currency) {
          this.setCurrency(currency.code);
          console.log(`Currency set to ${currency.code} based on location: ${countryCode}`);
          return;
        }
      }
    } catch (error) {
      console.warn('IP geolocation failed, using default currency');
    }

    // Default to SAR if detection fails or country not in list
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
