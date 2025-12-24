
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
    <div class="fixed top-4 left-0 right-0 z-50 flex flex-col items-center px-4 transition-all duration-300" [class.-translate-y-2]="scrolled()">
      
      <!-- Navbar -->
      <header class="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl transition-all duration-300 hover:bg-white/85 hover:shadow-2xl relative z-20">
        <div class="px-6 h-16 flex items-center justify-between">
          
          <!-- Mobile Menu Button -->
          <button (click)="toggleMenu()" class="md:hidden p-2 text-gray-700 hover:text-primary-600 focus:outline-none transition-transform active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              @if (isMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>

          <!-- Logo -->
          <a routerLink="/" class="text-2xl font-black text-primary-700 tracking-tight flex items-center gap-2 drop-shadow-sm hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <span class="hidden xs:inline">نوريفا</span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-1 bg-white/30 p-1 rounded-full border border-white/20">
            <a routerLink="/" routerLinkActive="bg-white text-primary-700 shadow-sm" [routerLinkActiveOptions]="{exact: true}" class="px-5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-primary-700 transition-all">الرئيسية</a>
            <a routerLink="/products" routerLinkActive="bg-white text-primary-700 shadow-sm" class="px-5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-primary-700 transition-all">المنتجات</a>
            <a routerLink="/about" routerLinkActive="bg-white text-primary-700 shadow-sm" class="px-5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-primary-700 transition-all">عن نوريفا</a>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-2 sm:gap-3">
             <a routerLink="/contact" class="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
              تواصل معنا
            </a>

            <!-- Login / Profile -->
            <a [routerLink]="authService.isLoggedIn() ? '/account' : '/login'" class="p-2 hover:bg-white/50 rounded-full transition-colors relative group text-gray-700 hover:text-primary-600" [title]="authService.isLoggedIn() ? 'حسابي' : 'تسجيل الدخول'">
               @if (authService.isLoggedIn()) {
                 <div class="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold border border-primary-200">
                    {{ authService.currentUser()?.firstName?.charAt(0) }}
                 </div>
               } @else {
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
               }
            </a>
            
            <button (click)="shopifyService.toggleCart()" class="p-2 hover:bg-white/50 rounded-full transition-colors relative group" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              @if (totalShopifyItems(); as total) {
                @if (total > 0) {
                  <span class="absolute -top-1 -right-1 h-5 w-5 bg-primary-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                    {{ total }}
                  </span>
                }
              }
            </button>
          </div>
        </div>

        <!-- Mobile Menu Overlay -->
        @if (isMenuOpen()) {
          <div class="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl rounded-b-2xl overflow-hidden animate-in slide-in-from-top-4 duration-200 shadow-xl">
            <nav class="flex flex-col p-4 gap-2">
              <a (click)="closeMenu()" routerLink="/" routerLinkActive="bg-primary-50 text-primary-700" [routerLinkActiveOptions]="{exact: true}" class="px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-3">
                <svg class="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                الرئيسية
              </a>
              <a (click)="closeMenu()" routerLink="/products" routerLinkActive="bg-primary-50 text-primary-700" class="px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-3">
                 <svg class="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                المنتجات
              </a>
              <a (click)="closeMenu()" [routerLink]="authService.isLoggedIn() ? '/account' : '/login'" routerLinkActive="bg-primary-50 text-primary-700" class="px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-3">
                 <svg class="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                 {{ authService.isLoggedIn() ? 'حسابي' : 'تسجيل الدخول' }}
              </a>
              <button (click)="closeMenu(); shopifyService.toggleCart()" class="w-full text-right px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-3">
                <div class="relative">
                   <svg class="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                   @if (totalShopifyItems(); as total) {
                      @if (total > 0) {
                        <span class="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center border-2 border-white">
                          {{ total }}
                        </span>
                      }
                   }
                </div>
                سلة المشتريات
              </button>
            </nav>
          </div>
        }
      </header>

      <!-- Liquid Glass Bubble Slider (Announcement) -->
      <div class="mt-1 relative z-10 animate-in slide-in-from-top-2 fade-in duration-700 max-w-full">
         <div class="bg-gradient-to-r from-primary-50/90 to-white/90 backdrop-blur-lg border border-primary-100/50 rounded-full py-2 px-6 shadow-lg shadow-primary-900/5 flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse flex-shrink-0"></span>
            
            <div class="h-6 overflow-hidden w-64 md:w-80 relative">
               <div class="flex transition-transform duration-700 ease-out h-full items-center" 
                    [style.transform]="'translateX(' + (activeSlide() * 100) + '%)'">
                  @for (msg of messages; track msg; let i = $index) {
                     <div class="min-w-full text-center flex items-center justify-center">
                        <span class="text-primary-900 text-xs md:text-sm font-bold whitespace-nowrap">{{ msg }}</span>
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
