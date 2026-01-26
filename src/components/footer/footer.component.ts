import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .waves {
      position: relative;
      width: 100%;
      height: 40px;
      margin-bottom: -1px; /* Ensure no gap with footer background */
      min-height: 40px;
      max-height: 60px;
    }

    .parallax > use {
      animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
    }
    .parallax > use:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
    }
    .parallax > use:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
    }
    .parallax > use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }
    .parallax > use:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
    }
    @keyframes move-forever {
      0% {
        transform: translate3d(-90px,0,0);
      }
      100% { 
        transform: translate3d(85px,0,0);
      }
    }
  `],
  template: `
    <footer class="relative bg-[#e3e1dc] text-black pb-24 font-sans z-10 mt-32">
      <!-- Wave SVG Container - Positioned to sit perfectly on top of footer -->
      <div class="absolute bottom-full left-0 w-full overflow-hidden leading-[0]">
        <svg class="waves w-full" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(227,225,220,0.7)" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(227,225,220,0.5)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(227,225,220,0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="#e3e1dc" />
          </g>
        </svg>
      </div>

      <div class="container mx-auto px-6">
        
        <div class="mb-10 pt-10">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8 text-center max-w-3xl mx-auto mb-10">
            <a routerLink="/about" class="text-xs font-black hover:text-black/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'من نحن' : 'ABOUT' }}</a>
            <a routerLink="/why-us" class="text-xs font-black hover:text-black/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'لماذا نوريڤا؟' : 'WHY US' }}</a>
            <a routerLink="/tracking" class="text-xs font-black hover:text-black/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'تتبع الطلب' : 'TRACKING' }}</a>
            <a routerLink="/shipping" class="text-xs font-black hover:text-black/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'الشحن' : 'SHIPPING' }}</a>
            <a routerLink="/privacy" class="text-xs font-black hover:text-black/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'الخصوصية' : 'PRIVACY' }}</a>
            <a routerLink="/terms" class="text-xs font-black hover:text-black/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'الشروط' : 'TERMS' }}</a>
            <a routerLink="/help" class="text-xs font-black hover:text-black/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'المساعدة' : 'HELP' }}</a>
            <a routerLink="/refund-policy" class="text-xs font-black hover:text-black/50 transition-all uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'سياسة الاسترجاع' : 'REFUND & RETURN POLICY' }}</a>
          </div>
        </div>

        <!-- Stable Centered Selectors -->
        <div class="flex flex-col items-center justify-center gap-8 mb-16 border-t border-black/5 pt-10">
           <div class="flex items-center gap-12 text-sm font-black uppercase tracking-[0.2em]">
              <button (click)="langService.toggleLanguage()" class="text-black hover:text-black/60 transition-colors min-w-[80px]">
                {{ langService.currentLang() === 'ar' ? 'English' : 'عربي' }}
              </button>
              
              <div class="relative group">
                <button (click)="currencyService.toggleDrawer()" class="text-black hover:text-black/60 transition-colors flex items-center gap-2">
                  <svg class="w-3 h-3 transition-transform" [class.rotate-180]="currencyService.isDrawerOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span class="tracking-widest">{{ currencyService.selectedCurrency().code }}</span>
                </button>

                <!-- Small Dropdown Drawer -->
                @if (currencyService.isDrawerOpen()) {
                  <div class="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-40 bg-white text-black rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden animate-slide-down z-50 border border-gray-100">
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
        <div class="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="text-center md:text-start opacity-40 hover:opacity-100 transition-opacity">
            <p class="text-xs font-black tracking-[0.4em] uppercase text-black">
              {{ langService.currentLang() === 'ar' 
                ? '© 2026 نوريڤا. جميع الحقوق محفوظة.' 
                : '© 2026 NOREVA. ALL RIGHTS RESERVED.' 
              }}
            </p>
          </div>

          <div class="flex gap-8 grayscale opacity-20 hover:opacity-50 transition-opacity text-black">
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
