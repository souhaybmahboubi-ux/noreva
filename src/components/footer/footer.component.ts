import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="relative bg-noreva-black text-white pb-24 font-sans z-10 monogram-bg monogram-gold">
      <!-- Elegant Gold Line -->
      <div class="w-full h-px bg-gradient-to-r from-transparent via-noreva-gold/30 to-transparent"></div>

      <div class="container mx-auto px-6 max-w-6xl">
        
        <!-- Main Footer Content -->
        <div class="py-16 md:py-20">
          
          <!-- Brand Section -->
          <div class="text-center mb-16">
            <img src="/assets/luciana.png" alt="NOREVA" class="h-5 md:h-6 w-auto object-contain mx-auto mb-6 brightness-0 invert opacity-80">
            <p class="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
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
                  <a routerLink="/products" class="text-sm text-white/40 hover:text-white transition-colors duration-300">
                    {{ langService.currentLang() === 'ar' ? 'جميع المنتجات' : 'All Products' }}
                  </a>
                </li>
                <li>
                  <a routerLink="/" class="text-sm text-white/40 hover:text-white transition-colors duration-300">
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
                  <a routerLink="/tracking" class="text-sm text-white/40 hover:text-white transition-colors duration-300">
                    {{ langService.currentLang() === 'ar' ? 'تتبع الطلب' : 'Track Order' }}
                  </a>
                </li>
                <li>
                  <a routerLink="/shipping" class="text-sm text-white/40 hover:text-white transition-colors duration-300">
                    {{ langService.currentLang() === 'ar' ? 'الشحن والتوصيل' : 'Shipping' }}
                  </a>
                </li>
                <li>
                  <a routerLink="/help" class="text-sm text-white/40 hover:text-white transition-colors duration-300">
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
                  <a routerLink="/about" class="text-sm text-white/40 hover:text-white transition-colors duration-300">
                    {{ langService.currentLang() === 'ar' ? 'من نحن' : 'About Us' }}
                  </a>
                </li>
                <li>
                  <a routerLink="/why-us" class="text-sm text-white/40 hover:text-white transition-colors duration-300">
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
                  <a routerLink="/privacy" class="text-sm text-white/40 hover:text-white transition-colors duration-300">
                    {{ langService.currentLang() === 'ar' ? 'الخصوصية' : 'Privacy Policy' }}
                  </a>
                </li>
                <li>
                  <a routerLink="/terms" class="text-sm text-white/40 hover:text-white transition-colors duration-300">
                    {{ langService.currentLang() === 'ar' ? 'الشروط' : 'Terms of Service' }}
                  </a>
                </li>
                <li>
                  <a routerLink="/refund-policy" class="text-sm text-white/40 hover:text-white transition-colors duration-300">
                    {{ langService.currentLang() === 'ar' ? 'سياسة الاسترجاع' : 'Refund Policy' }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Language & Currency Selectors -->
          <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 py-8 border-t border-white/8">
             <button (click)="langService.toggleLanguage()" class="text-sm text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2">
               <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
               </svg>
               {{ langService.currentLang() === 'ar' ? 'English' : 'عربي' }}
             </button>
             
             <div class="relative group">
               <button (click)="currencyService.toggleDrawer()" class="text-sm text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2">
                 <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 <span>{{ currencyService.selectedCurrency().code }}</span>
                 <svg class="w-3 h-3 transition-transform duration-300" [class.rotate-180]="currencyService.isDrawerOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div class="pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p class="text-[11px] text-white/25 tracking-wide">
            {{ langService.currentLang() === 'ar' 
              ? '© 2026 نوريڤا. جميع الحقوق محفوظة.' 
              : '© 2026 Noreva. All rights reserved.' 
            }}
          </p>

          <!-- Payment Icons - Inline SVG Logos -->
          <div class="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2">
            <!-- Visa -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 500" class="h-4 w-auto opacity-70" fill="white">
              <path d="M293.2 348.7l33.4-195.7h53.4l-33.4 195.7h-53.4zm246.7-191.3c-10.6-3.9-27.2-8.2-47.9-8.2-52.8 0-90 26.5-90.3 64.4-.3 28.1 26.6 43.7 46.9 53 20.8 9.5 27.8 15.6 27.7 24.1-.1 13-16.6 19-32 19-21.4 0-32.8-3-50.4-10.4l-6.9-3.1-7.5 43.7c12.5 5.5 35.5 10.2 59.5 10.4 56.1 0 92.6-26.2 93-66.8.2-22.2-14-39.1-44.8-53.1-18.7-9-30.1-15.1-30-24.3 0-8.1 9.7-16.8 30.6-16.8 17.5-.3 30.1 3.5 40 7.5l4.8 2.2 7.3-42.6zM661.2 153h-41.3c-12.8 0-22.4 3.5-28 16.2l-79.4 179.5h56.1s9.2-24.1 11.2-29.4c6.1 0 60.6.1 68.4.1 1.6 6.9 6.5 29.3 6.5 29.3h49.6L661.2 153zm-65.7 126.7c4.4-11.3 21.3-54.9 21.3-54.9s4.4-11.3 7.1-18.7l3.6 16.9s10.2 46.7 12.4 56.7h-44.4zM230 153l-52.4 133.5-5.6-27.2c-9.7-31.3-40-65.4-73.8-82.4l47.9 171.7 56.6-.1 84.3-195.5H230z"/>
              <path d="M131.3 153H44.5l-.7 4c67.4 16.2 112 55.4 130.5 102.4l-18.8-89.9c-3.2-12.5-12.6-16.2-24.2-16.5z" fill="white" opacity=".7"/>
            </svg>

            <!-- Divider -->
            <span class="w-px h-4 bg-white/15"></span>

            <!-- Mastercard -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.4 108" class="h-4 w-auto opacity-70">
              <circle cx="55.9" cy="54" r="45.9" fill="#ffffff" opacity="0.5"/>
              <circle cx="96.5" cy="54" r="45.9" fill="#ffffff" opacity="0.5"/>
              <path d="M76.2 20.1a45.8 45.8 0 0 1 20.3 33.9 45.8 45.8 0 0 1-20.3 33.9A45.8 45.8 0 0 1 55.9 54a45.8 45.8 0 0 1 20.3-33.9z" fill="#ffffff" opacity="0.8"/>
            </svg>

            <!-- Divider -->
            <span class="w-px h-4 bg-white/15"></span>

            <!-- Apple Pay -->
            <span class="flex items-center gap-1 opacity-70 text-white" style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: -0.01em; line-height: 1;">
              <!-- Apple logo silhouette SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" height="14" width="auto" fill="white">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.4 0 663.6 0 540.8c0-207.7 131.4-317.9 260.8-317.9 70.2 0 128.4 45.8 172.2 45.8 41.5 0 106.7-48.3 185.7-48.3 29.4 0 133.7 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
              </svg>
              Pay
            </span>
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
