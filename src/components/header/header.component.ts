
import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShopifyService } from '../../services/shopify.service';
import { CurrencyService } from '../../services/currency.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- Main Header Container -->
    <div class="fixed top-4 left-0 right-0 z-50 flex flex-col items-center px-4 transition-all duration-300" 
         [class.-translate-y-2]="scrolled()"
         [class.top-2]="scrolled()">
      
      <!-- Navbar -->
      <header class="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl transition-all duration-300 hover:bg-white/85 hover:shadow-2xl relative z-20">
        <div class="px-4 md:px-6 h-16 flex items-center justify-between">
          
          <!-- Mobile Menu Button -->
          <button (click)="toggleMenu()" class="md:hidden p-2 text-gray-700 hover:text-primary-600 focus:outline-none transition-transform active:scale-90 bg-gray-50/50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              @if (isMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>

          <!-- Logo -->
          <a routerLink="" class="text-xl md:text-2xl font-black text-primary-700 tracking-tight flex items-center gap-2 drop-shadow-sm hover:opacity-80 transition-opacity">
            <div class="w-8 h-8 md:w-9 md:h-9 bg-primary-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/30 transform -rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
            </div>
            <span class="hidden sm:inline-block">نوريفا</span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
            <a routerLink="" routerLinkActive="bg-white text-primary-700 shadow-sm" [routerLinkActiveOptions]="{exact: true}" class="px-5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-primary-700 transition-all">الرئيسية</a>
            <a routerLink="/products" routerLinkActive="bg-white text-primary-700 shadow-sm" class="px-5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-primary-700 transition-all">المنتجات</a>
            <a routerLink="/about" routerLinkActive="bg-white text-primary-700 shadow-sm" class="px-5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-primary-700 transition-all">عن نوريفا</a>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-1.5 sm:gap-3">
             <a routerLink="/contact" class="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-xs font-black text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all shadow-md shadow-primary-500/20 active:scale-95">
              تواصل معنا
            </a>

            <!-- Login / Profile -->
            <a [routerLink]="authService.isLoggedIn() ? '/account' : '/login'" class="p-2 hover:bg-primary-50 rounded-xl transition-all relative group text-gray-700 hover:text-primary-600" [title]="authService.isLoggedIn() ? 'حسابي' : 'تسجيل الدخول'">
               @if (authService.isLoggedIn()) {
                 <div class="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-sm">
                    {{ authService.currentUser()?.firstName?.charAt(0) }}
                 </div>
               } @else {
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
               }
            </a>
            
            <button (click)="shopifyService.toggleCart()" 
                    class="h-10 px-3 sm:px-4 bg-gray-900 text-white rounded-xl flex items-center gap-2 hover:bg-primary-600 transition-all shadow-lg active:scale-95 group relative" 
                    aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              @if (totalShopifyItems(); as total) {
                @if (total > 0) {
                  <span class="font-black text-xs min-w-[12px]">{{ total }}</span>
                  <span class="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-ping"></span>
                }
              }
            </button>
          </div>
        </div>

        <!-- Mobile Menu Overlay -->
        @if (isMenuOpen()) {
          <div class="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-2xl rounded-b-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300 shadow-2xl p-2">
            <nav class="flex flex-col gap-1">
              <a (click)="closeMenu()" routerLink="" routerLinkActive="bg-primary-50 text-primary-700 shadow-inner" [routerLinkActiveOptions]="{exact: true}" class="px-4 py-3.5 rounded-xl font-black text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  </div>
                  الرئيسية
                </div>
                <svg class="w-4 h-4 text-gray-300 transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a (click)="closeMenu()" routerLink="/products" routerLinkActive="bg-primary-50 text-primary-700 shadow-inner" class="px-4 py-3.5 rounded-xl font-black text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                 <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </div>
                  المنتجات
                </div>
                <svg class="w-4 h-4 text-gray-300 transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a (click)="closeMenu()" [routerLink]="authService.isLoggedIn() ? '/account' : '/login'" routerLinkActive="bg-primary-50 text-primary-700 shadow-inner" class="px-4 py-3.5 rounded-xl font-black text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                 <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  {{ authService.isLoggedIn() ? 'حسابي' : 'تسجيل الدخول' }}
                </div>
                <svg class="w-4 h-4 text-gray-300 transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </a>
              <button (click)="closeMenu(); shopifyService.toggleCart()" class="w-full text-right px-4 py-3.5 rounded-xl font-black text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                <div class="flex items-center gap-3">
                   <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors relative">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    @if (totalShopifyItems(); as total) {
                       @if (total > 0) {
                        <span class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                          {{ total }}
                        </span>
                       }
                    }
                  </div>
                  سلة المشتريات
                </div>
                <svg class="w-4 h-4 text-gray-300 transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </nav>
          </div>
        }
      </header>

      <!-- Liquid Glass Bubble Slider (Announcement) -->
      <div class="mt-2 relative z-10 animate-in slide-in-from-top-2 fade-in duration-700 max-w-full px-2">
         <div class="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-full py-1.5 px-5 shadow-xl shadow-black/5 flex items-center gap-2.5">
            <div class="w-2 h-2 rounded-full bg-primary-500 animate-pulse flex-shrink-0 shadow-[0_0_8px_rgba(13,148,136,0.5)]"></div>
            
            <div class="h-6 md:h-7 overflow-hidden w-full max-w-[280px] sm:max-w-md relative">
               <div class="flex transition-transform duration-700 ease-out h-full items-center" 
                    [style.transform]="'translateX(' + (activeSlide() * 100) + '%)'">
                  @for (msg of messages; track msg; let i = $index) {
                     <div class="min-w-full text-center flex items-center justify-center">
                        <span class="text-gray-900 text-xs md:text-sm font-black whitespace-nowrap uppercase tracking-wide">{{ msg }}</span>
                     </div>
                  }
               </div>
            </div>
         </div>
      </div>

    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  shopifyService = inject(ShopifyService);
  currencyService = inject(CurrencyService);
  authService = inject(AuthService);

  isMenuOpen = signal(false);

  totalShopifyItems = toSignal(
    this.shopifyService.cart$.pipe(
      map(cart => {
        if (!cart?.lineItems) return 0;
        return cart.lineItems
          .filter((item: any) => item.variant?.id !== this.shopifyService.getProtectionVariantId())
          .reduce((acc: number, item: any) => acc + item.quantity, 0);
      })
    ),
    { initialValue: 0 }
  );

  // Announcements
  messages = [
    'شحن مجاني لجميع دول الخليج ✈️',
    'خصومات حصرية بمناسبة السنة الجديدة 🎉'
  ];
  activeSlide = signal(0);
  intervalId: any;
  scrolled = signal(false);

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.activeSlide.update(v => (v + 1) % this.messages.length);
    }, 4000);

    window.addEventListener('scroll', this.onWindowScroll);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  onWindowScroll = () => {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
