
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-6 left-6 z-[60] font-sans">
      <!-- Backdrop to close on click outside -->
      @if (isOpen()) {
        <div class="fixed inset-0 z-[-1]" (click)="isOpen.set(false)"></div>
      }

      <!-- Dropdown Menu (Opens Upwards) -->
      @if (isOpen()) {
        <div class="absolute bottom-full left-0 mb-3 w-48 bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300 origin-bottom-left">
           <div class="max-h-[60vh] overflow-y-auto custom-scrollbar p-1.5 space-y-1">
             @for (curr of currencyService.currencies; track curr.code) {
               <button 
                 (click)="selectCurrency(curr.code)"
                 class="w-full text-right px-4 py-3 flex items-center justify-between hover:bg-white/60 rounded-xl transition-all duration-200 group active:scale-95"
                 [class.bg-white]="currencyService.selectedCurrency().code === curr.code"
                 [class.shadow-sm]="currencyService.selectedCurrency().code === curr.code"
               >
                 <span class="font-bold text-gray-800 text-sm group-hover:text-primary-700">{{ curr.name }}</span>
                 <div class="flex items-center gap-2">
                    <span class="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{{ curr.code }}</span>
                    <span class="text-xl filter drop-shadow-sm">{{ curr.flag }}</span>
                 </div>
               </button>
             }
           </div>
        </div>
      }

      <!-- Main Trigger Button -->
      <button 
        (click)="toggle()"
        class="flex items-center gap-3 px-4 py-3 bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/5 rounded-2xl hover:bg-white/60 hover:scale-105 active:scale-95 transition-all duration-300 group"
      >
        <span class="text-2xl filter drop-shadow-sm">{{ currencyService.selectedCurrency().flag }}</span>
        <div class="flex flex-col items-start leading-none">
            <span class="font-bold text-gray-800 text-xs text-right">العملة</span>
            <span class="font-black text-primary-800 text-sm">{{ currencyService.selectedCurrency().name }}</span>
        </div>
        
        <div class="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center mr-1 group-hover:bg-primary-500 group-hover:text-white transition-colors">
            <svg class="w-4 h-4 text-gray-600 group-hover:text-white transition-transform duration-300" [class.rotate-180]="isOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </button>
    </div>
  `,
  styles: [`
    /* Clean scrollbar for the dropdown */
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.1);
      border-radius: 20px;
    }
  `]
})
export class CurrencySelectorComponent {
  currencyService = inject(CurrencyService);
  isOpen = signal(false);

  toggle() {
    this.isOpen.update(v => !v);
  }

  selectCurrency(code: string) {
    this.currencyService.setCurrency(code);
    this.isOpen.set(false);
  }
}
