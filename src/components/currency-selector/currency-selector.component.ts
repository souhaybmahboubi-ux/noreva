
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
        <div class="absolute bottom-full left-0 mb-4 w-52 md:w-56 bg-white/20 backdrop-blur-[40px] border border-white/40 rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-400 origin-bottom-left">
           <div class="max-h-[350px] md:max-h-[400px] overflow-y-auto custom-scrollbar p-2 space-y-1.5">
             <div class="px-4 py-3 text-[11px] font-black text-gray-500 uppercase tracking-widest text-right border-b border-white/20 mb-1.5">اختر العملة</div>
             @for (curr of currencyService.currencies; track curr.code) {
               <button 
                 (click)="selectCurrency(curr.code)"
                 class="w-full text-right px-4 py-3 md:px-5 md:py-4 flex items-center justify-between hover:bg-white/30 rounded-2xl transition-all duration-200 group active:scale-95"
                 [class.bg-white/40]="currencyService.selectedCurrency().code === curr.code"
                 [class.shadow-sm]="currencyService.selectedCurrency().code === curr.code"
                 [class.ring-1]="currencyService.selectedCurrency().code === curr.code"
                 [class.ring-white/50]="currencyService.selectedCurrency().code === curr.code"
               >
                 <span class="font-bold text-gray-900 text-sm md:text-base group-hover:text-primary-800 truncate ml-2">{{ curr.name }}</span>
                 <div class="flex items-center gap-3 flex-shrink-0">
                    <span class="text-[10px] md:text-xs font-bold text-gray-600 bg-white/30 px-2 py-1 rounded-lg">{{ curr.code }}</span>
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
        class="flex items-center gap-4 md:gap-4 px-5 py-4 md:px-5 md:py-3.5 bg-white/30 backdrop-blur-[35px] border border-white/50 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] rounded-[2rem] hover:bg-white/40 hover:scale-105 active:scale-95 transition-all duration-500 group min-w-[160px] md:min-w-[180px]"
      >
        <span class="text-2xl md:text-3xl filter drop-shadow-md flex-shrink-0 transform group-hover:rotate-12 transition-transform duration-500">{{ currencyService.selectedCurrency().flag }}</span>
        <div class="flex flex-col items-start leading-tight overflow-hidden text-right flex-grow">
            <span class="font-bold text-gray-600 text-[10px] uppercase tracking-tighter mb-0.5">العملة</span>
            <span class="font-black text-primary-950 text-sm md:text-base truncate w-full">{{ currencyService.selectedCurrency().name }}</span>
        </div>
        
        <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/30 flex items-center justify-center mr-1 md:mr-1.5 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 flex-shrink-0 shadow-sm border border-white/20">
            <svg class="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-600 group-hover:text-white transition-transform duration-500" [class.rotate-180]="isOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
