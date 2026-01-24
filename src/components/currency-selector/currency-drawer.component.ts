
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-currency-drawer',
    standalone: true,
    imports: [CommonModule],
    template: `
    @if (currencyService.isDrawerOpen()) {
       <div class="fixed inset-0 z-[250] flex justify-start ltr:justify-end rtl:justify-start font-sans">
         <div class="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" (click)="currencyService.closeDrawer()"></div>
         <div class="relative w-full max-w-sm bg-white h-full flex flex-col shadow-2xl animate-slide-down">
           <div class="p-6 border-b border-gray-100 flex items-center justify-between h-16 md:h-20 bg-black">
              <h2 class="text-xl font-black italic tracking-tighter uppercase text-noreva-bone">{{ langService.currentLang() === 'ar' ? 'العملة' : 'CURRENCY' }}</h2>
              <button (click)="currencyService.closeDrawer()" type="button" class="p-3">
                <svg class="w-6 h-6 text-noreva-bone" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
           </div>
           <div class="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar bg-white">
              @for (curr of currencyService.currencies; track curr.code) {
                <button 
                  (click)="selectCurrency(curr.code)"
                  class="w-full text-start px-6 py-5 flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-all group"
                  [class.bg-gray-100]="currencyService.selectedCurrency().code === curr.code"
                >
                  <div class="flex items-center gap-4">
                    <span class="text-2xl">{{ curr.flag }}</span>
                    <span class="font-black text-xs text-black/80 group-hover:text-black uppercase tracking-widest">{{ langService.currentLang() === 'ar' ? curr.name : curr.code }}</span>
                  </div>
                  @if (currencyService.selectedCurrency().code === curr.code) {
                    <div class="w-1.5 h-1.5 bg-black rounded-full"></div>
                  }
                </button>
              }
           </div>
         </div>
       </div>
    }
  `
})
export class CurrencyDrawerComponent {
    currencyService = inject(CurrencyService);
    langService = inject(LanguageService);

    selectCurrency(code: string) {
        this.currencyService.setCurrency(code);
        setTimeout(() => this.currencyService.closeDrawer(), 250);
    }
}
