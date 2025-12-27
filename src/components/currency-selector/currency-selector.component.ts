
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[60] font-sans">
      <!-- Backdrop to close on click outside -->
      @if (isOpen()) {
        <div class="fixed inset-0 z-[-1] bg-black/5 backdrop-blur-[2px]" (click)="isOpen.set(false)"></div>
      }

      <!-- Dropdown Menu (Opens Upwards) -->
      @if (isOpen()) {
        <div class="absolute bottom-full left-0 mb-4 w-52 md:w-64 bg-white/90 backdrop-blur-3xl border border-white/50 rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.25)] overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-400 origin-bottom-left">
           <div class="max-h-[400px] md:max-h-[500px] overflow-y-auto custom-scrollbar p-2 space-y-1.5">
             <div class="px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100 mb-1.5">اختر العملة</div>
             @for (curr of currencyService.currencies; track curr.code) {
               <button 
                 (click)="selectCurrency(curr.code)"
                 class="w-full text-right px-4 py-3 md:px-5 md:py-4 flex items-center justify-between hover:bg-white/80 rounded-2xl transition-all duration-200 group active:scale-95"
                 [class.bg-white]="currencyService.selectedCurrency().code === curr.code"
                 [class.shadow-md]="currencyService.selectedCurrency().code === curr.code"
                 [class.ring-2]="currencyService.selectedCurrency().code === curr.code"
                 [class.ring-primary-100]="currencyService.selectedCurrency().code === curr.code"
               >
                 <span class="font-bold text-gray-800 text-sm md:text-base group-hover:text-primary-700 truncate ml-2">{{ curr.name }}</span>
                 <div class="flex items-center gap-3 flex-shrink-0">
                    <span class="text-[10px] md:text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">{{ curr.code }}</span>
                    <span class="text-xl md:text-2xl filter drop-shadow-sm">{{ curr.flag }}</span>
                 </div>
               </button>
             }
           </div>
        </div>
      }

      <!-- Main Trigger Button -->
      <button 
        (click)="toggle()"
        class="flex items-center gap-4 md:gap-5 px-5 py-4 md:px-7 md:py-5 bg-white/70 backdrop-blur-3xl border border-white/60 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] rounded-[2rem] hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-500 group min-w-[160px] md:min-w-[210px]"
      >
        <span class="text-2xl md:text-4xl filter drop-shadow-md flex-shrink-0 transform group-hover:rotate-12 transition-transform duration-500">{{ currencyService.selectedCurrency().flag }}</span>
        <div class="flex flex-col items-start leading-tight overflow-hidden text-right flex-grow">
            <span class="font-bold text-gray-500 text-[10px] md:text-xs uppercase tracking-tighter mb-0.5">العملة</span>
            <span class="font-black text-primary-950 text-sm md:text-lg truncate w-full">{{ currencyService.selectedCurrency().name }}</span>
        </div>
        
        <div class="w-8 h-8 md:w-11 md:h-11 rounded-full bg-primary-50 flex items-center justify-center mr-1 md:mr-2 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 flex-shrink-0 shadow-sm">
            <svg class="w-3.5 h-3.5 md:w-5 md:h-5 text-primary-600 group-hover:text-white transition-transform duration-500" [class.rotate-180]="isOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </button>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
      width: 5px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.08);
      border-radius: 20px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: rgba(0,0,0,0.15);
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
