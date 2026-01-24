import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-black text-white py-24 border-t border-white/5 font-sans">
      <div class="container mx-auto px-6">
        
        <div class="mb-10">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8 text-center max-w-3xl mx-auto mb-10">
            <a routerLink="/about" class="text-xs font-black hover:text-white/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'من نحن' : 'ABOUT' }}</a>
            <a routerLink="/tracking" class="text-xs font-black hover:text-white/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'تتبع الطلب' : 'TRACKING' }}</a>
            <a routerLink="/shipping" class="text-xs font-black hover:text-white/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'الشحن' : 'SHIPPING' }}</a>
            <a routerLink="/privacy" class="text-xs font-black hover:text-white/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'الخصوصية' : 'PRIVACY' }}</a>
            <a routerLink="/terms" class="text-xs font-black hover:text-white/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'الشروط' : 'TERMS' }}</a>
            <a routerLink="/help" class="text-xs font-black hover:text-white/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'المساعدة' : 'HELP' }}</a>
          </div>
        </div>

        <!-- Stable Centered Selectors -->
        <div class="flex flex-col items-center justify-center gap-8 mb-16 border-t border-white/5 pt-10">
           <div class="flex items-center gap-12 text-sm font-black uppercase tracking-[0.2em]">
              <button (click)="langService.toggleLanguage()" class="text-white hover:text-[#4a4945] transition-colors min-w-[80px]">
                {{ langService.currentLang() === 'ar' ? 'English' : 'عربي' }}
              </button>
              
              <div class="relative group">
                <button (click)="currencyService.toggleDrawer()" class="text-white hover:text-white/60 transition-colors flex items-center gap-2">
                  <svg class="w-3 h-3 transition-transform" [class.rotate-180]="currencyService.isDrawerOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span class="tracking-widest">{{ currencyService.selectedCurrency().code }}</span>
                </button>

                <!-- Small Dropdown Drawer (Positioned BELOW as requested) -->
                @if (currencyService.isDrawerOpen()) {
                  <div class="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-40 bg-white text-black rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-slide-down z-50 border border-gray-100">
                    <div class="p-1.5 space-y-0.5">
                      @for (curr of currencyService.currencies; track curr.code) {
                        <button 
                          (click)="selectCurrency(curr.code)"
                          class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-xl transition-all group/item"
                          [class.bg-gray-50]="currencyService.selectedCurrency().code === curr.code"
                        >
                          <span class="text-xs font-black tracking-widest text-gray-400 group-hover/item:text-black transition-colors">{{ curr.code }}</span>
                          <span class="text-base grayscale opacity-30 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all">{{ curr.flag }}</span>
                        </button>
                      }
                    </div>
                  </div>
                }
              </div>
           </div>
        </div>
        
        <!-- Bottom Bar -->
        <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="text-center md:text-start opacity-30">
            <p class="text-xs font-black tracking-[0.4em] uppercase">
              {{ langService.currentLang() === 'ar' 
                ? '© 2026 نوريڤا لتكنولوجيا التجميل. جميع الحقوق محفوظة.' 
                : '© 2026 NOREVA COSMETICS TECHNOLOGY. ALL RIGHTS RESERVED.' 
              }}
            </p>
          </div>

          <div class="flex gap-8 grayscale opacity-20 hover:opacity-50 transition-opacity">
             <span class="text-[10px] font-black uppercase tracking-[0.3em]">VISA</span>
             <span class="text-[10px] font-black uppercase tracking-[0.3em]">MASTERCARD</span>
             <span class="text-[10px] font-black uppercase tracking-[0.3em]">APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  langService = inject(LanguageService);
  currencyService = inject(CurrencyService);

  selectCurrency(code: string) {
    this.currencyService.setCurrency(code);
    setTimeout(() => this.currencyService.closeDrawer(), 150);
  }
}
// Force Rebuild

