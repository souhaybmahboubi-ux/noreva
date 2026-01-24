
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-8 left-8 z-[150] font-sans">
      <!-- غطاء الخلفية للإغلاق -->
      @if (isOpen()) {
        <div class="fixed inset-0 z-[-1]" (click)="isOpen.set(false)"></div>
      }

      <!-- قائمة العملات (Liquid Glass Menu) -->
      @if (isOpen()) {
        <div class="absolute bottom-full left-0 mb-6 w-56 bg-white/60 backdrop-blur-[40px] border border-white/40 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
           <div class="p-2 space-y-1">
             @for (curr of currencyService.currencies; track curr.code) {
               <button 
                 (click)="selectCurrency(curr.code)"
                 class="w-full text-right px-6 py-4 flex items-center justify-between hover:bg-black/5 rounded-[2rem] transition-all group"
                 [class.bg-black/5]="currencyService.selectedCurrency().code === curr.code"
               >
                 <span class="font-black text-[11px] text-black/70 group-hover:text-black">{{ curr.name }}</span>
                 <span class="text-xl">{{ curr.flag }}</span>
               </button>
             }
           </div>
        </div>
      }

      <!-- زر العملة العائم (Noticeable Liquid Glass Button) -->
      <button 
        (click)="toggle()"
        class="group flex items-center gap-5 px-6 py-4 bg-black/95 text-white backdrop-blur-3xl border border-white/20 rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden"
      >
        <!-- تأثير اللمعان الزجاجي -->
        <div class="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="flex flex-col items-start leading-none relative z-10 text-right">
            <!-- الكلمة بارزة جداً كما طلبت -->
            <span class="font-black text-[9px] uppercase tracking-[0.3em] text-white/50 mb-1">العملة الحالية</span>
            <span class="font-black text-xs tracking-tight">{{ currencyService.selectedCurrency().name }}</span>
        </div>
        
        <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 relative z-10 group-hover:bg-white/20 transition-colors">
            <span class="text-xl">{{ currencyService.selectedCurrency().flag }}</span>
        </div>
      </button>
    </div>
  `
})
export class CurrencySelectorComponent {
  currencyService = inject(CurrencyService);
  isOpen = signal(false);

  toggle() { this.isOpen.update(v => !v); }
  selectCurrency(code: string) {
    this.currencyService.setCurrency(code);
    this.isOpen.set(false);
  }
}
