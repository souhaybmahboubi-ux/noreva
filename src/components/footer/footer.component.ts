import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="relative bg-noreva-black text-white pb-24 font-sans z-10 mt-32">
      <!-- Elegant Separator -->
      <div class="absolute bottom-full left-0 w-full h-px bg-gradient-to-r from-transparent via-noreva-champagne/50 to-transparent"></div>

      <div class="container mx-auto px-6 max-w-6xl">
        
        <!-- Main Footer Content -->
        <div class="py-16 md:py-20">
          
          <!-- Brand Section -->
          <div class="text-center mb-16">
            <h3 class="text-3xl md:text-4xl font-serif text-white mb-4">
              {{ langService.currentLang() === 'ar' ? 'نوريڤا' : 'Noreva' }}
            </h3>
            <p class="text-noreva-champagne/60 text-sm max-w-md mx-auto leading-relaxed">
              {{ langService.currentLang() === 'ar' 
                ? 'رموش مغناطيسية فاخرة صُممت للمرأة العصرية. أناقة في ثوانٍ.'
                : 'Luxury magnetic lashes designed for the modern woman. Elegance in seconds.' }}
            </p>
          </div>

          <!-- Links Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
            <!-- Column 1 -->
            <div class="text-center md:text-start">
              <h4 class="text-[10px] font-medium tracking-[0.2em] text-noreva-gold uppercase mb-5">
                {{ langService.currentLang() === 'ar' ? 'المتجر' : 'SHOP' }}
              </h4>
              <ul class="space-y-3">
                <li>
                  <a routerLink="/products" class="text-sm text-white/60 hover:text-white transition-colors">
                    {{ langService.currentLang() === 'ar' ? 'جميع المنتجات' : 'All Products' }}
                  </a>
                </li>
                <li>
                  <a routerLink="/" class="text-sm text-white/60 hover:text-white transition-colors">
                    {{ langService.currentLang() === 'ar' ? 'العروض' : 'Offers' }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Column 2 -->
            <div class="text-center md:text-start">
              <h4 class="text-[10px] font-medium tracking-[0.2em] text-noreva-gold uppercase mb-5">
                {{ langService.currentLang() === 'ar' ? 'المساعدة' : 'SUPPORT' }}
              </h4>
              <ul class="space-y-3">
                <li>
                  <a routerLink="/tracking" class="text-sm text-white/60 hover:text-white transition-colors">
                    {{ langService.currentLang() === 'ar' ? 'تتبع الطلب' : 'Track Order' }}
                  </a>
                </li>
                <li>
                  <a routerLink="/shipping" class="text-sm text-white/60 hover:text-white transition-colors">
                    {{ langService.currentLang() === 'ar' ? 'الشحن والتوصيل' : 'Shipping' }}
                  </a>
                </li>
                <li>
                  <a routerLink="/help" class="text-sm text-white/60 hover:text-white transition-colors">
                    {{ langService.currentLang() === 'ar' ? 'المساعدة' : 'Help Center' }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Column 3 -->
            <div class="text-center md:text-start">
              <h4 class="text-[10px] font-medium tracking-[0.2em] text-noreva-gold uppercase mb-5">
                {{ langService.currentLang() === 'ar' ? 'الشركة' : 'COMPANY' }}
              </h4>
              <ul class="space-y-3">
                <li>
                  <a routerLink="/about" class="text-sm text-white/60 hover:text-white transition-colors">
                    {{ langService.currentLang() === 'ar' ? 'من نحن' : 'About Us' }}
                  </a>
                </li>
                <li>
                  <a routerLink="/why-us" class="text-sm text-white/60 hover:text-white transition-colors">
                    {{ langService.currentLang() === 'ar' ? 'لماذا نوريڤا' : 'Why Noreva' }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Column 4 -->
            <div class="text-center md:text-start">
              <h4 class="text-[10px] font-medium tracking-[0.2em] text-noreva-gold uppercase mb-5">
                {{ langService.currentLang() === 'ar' ? 'القانونية' : 'LEGAL' }}
              </h4>
              <ul class="space-y-3">
                <li>
                  <a routerLink="/privacy" class="text-sm text-white/60 hover:text-white transition-colors">
                    {{ langService.currentLang() === 'ar' ? 'الخصوصية' : 'Privacy Policy' }}
                  </a>
                </li>
                <li>
                  <a routerLink="/terms" class="text-sm text-white/60 hover:text-white transition-colors">
                    {{ langService.currentLang() === 'ar' ? 'الشروط' : 'Terms of Service' }}
                  </a>
                </li>
                <li>
                  <a routerLink="/refund-policy" class="text-sm text-white/60 hover:text-white transition-colors">
                    {{ langService.currentLang() === 'ar' ? 'سياسة الاسترجاع' : 'Refund Policy' }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Language & Currency Selectors -->
          <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 py-8 border-t border-white/10">
             <button (click)="langService.toggleLanguage()" class="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
               <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
               </svg>
               {{ langService.currentLang() === 'ar' ? 'English' : 'عربي' }}
             </button>
             
             <div class="relative group">
               <button (click)="currencyService.toggleDrawer()" class="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                 <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 <span>{{ currencyService.selectedCurrency().code }}</span>
                 <svg class="w-3 h-3 transition-transform" [class.rotate-180]="currencyService.isDrawerOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                 </svg>
               </button>

               @if (currencyService.isDrawerOpen()) {
                 <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 bg-white text-noreva-black rounded-xl shadow-luxury-xl overflow-hidden animate-fade-in z-50">
                   <div class="p-1.5 space-y-0.5">
                     @for (curr of currencyService.currencies; track curr.code) {
                       <button 
                         (click)="selectCurrency(curr.code)"
                         class="w-full px-4 py-2.5 flex items-center justify-between hover:bg-noreva-ivory rounded-lg transition-all group/item"
                         [class.bg-noreva-ivory]="currencyService.selectedCurrency().code === curr.code"
                       >
                         <span class="text-xs font-medium text-noreva-taupe group-hover/item:text-noreva-black transition-colors">{{ curr.code }}</span>
                         <span class="text-base grayscale opacity-50 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all">{{ curr.flag }}</span>
                       </button>
                     }
                   </div>
                 </div>
               }
             </div>
          </div>
        </div>
        
        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p class="text-[11px] text-white/40 tracking-wide">
            {{ langService.currentLang() === 'ar' 
              ? '© 2026 نوريڤا. جميع الحقوق محفوظة.' 
              : '© 2026 Noreva. All rights reserved.' 
            }}
          </p>

          <!-- Payment Icons -->
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-4 text-white/30">
              <svg class="h-6 w-auto" viewBox="0 0 50 30" fill="currentColor">
                <text x="0" y="20" font-size="10" font-weight="500" font-family="sans-serif">VISA</text>
              </svg>
              <svg class="h-6 w-auto" viewBox="0 0 80 30" fill="currentColor">
                <text x="0" y="20" font-size="10" font-weight="500" font-family="sans-serif">MASTERCARD</text>
              </svg>
              <svg class="h-6 w-auto" viewBox="0 0 70 30" fill="currentColor">
                <text x="0" y="20" font-size="10" font-weight="500" font-family="sans-serif">APPLE PAY</text>
              </svg>
            </div>
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
