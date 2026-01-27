
import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CurrencyService } from '../../services/currency.service';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { ShopifyService } from '../../services/shopify.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- Trust Bar (Global) -->
    <div class="bg-black text-white px-4 fixed top-0 left-0 right-0 z-[110] text-center border-b border-white/10 py-2 md:py-3">
      <p class="font-black uppercase tracking-[0.2em] flex items-center justify-center flex-wrap gap-2 md:gap-4 text-[10px] md:text-[13px]">
        <span class="opacity-90">{{ langService.currentLang() === 'ar' ? 'توصيل مجاني اليوم بس' : 'FREE DELIVERY FOR TODAY ONLY' }}</span>
        <span class="hidden md:inline mx-2 opacity-20">|</span> 
        <span class="flex items-center gap-2">
          <span class="opacity-60 text-[8px] md:text-[10px]">{{ langService.currentLang() === 'ar' ? ':باقي' : 'ENDS IN:' }}</span>
          <span class="font-mono font-black bg-white/15 px-3 py-1 rounded-lg shadow-inner text-sm md:text-base">{{ timeLeft() }}</span>
        </span>
      </p>
    </div>

    <header class="fixed left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 top-[44px] md:top-[60px]">
      <div class="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between relative">
        
        <!-- Left Actions -->
        <div class="flex items-center gap-1">
          <!-- Menu Toggle -->
          <button (click)="toggleMenu()" type="button" class="p-2 text-black active:scale-90 transition-transform cursor-pointer focus:outline-none" aria-label="Menu">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <button (click)="langService.toggleLanguage()" class="flex p-2 text-xs md:text-sm font-[900] uppercase tracking-wider text-[#4a4945]/80 hover:text-black transition-colors" aria-label="Toggle Language">
            {{ langService.currentLang() === 'ar' ? 'EN' : 'AR' }}
          </button>
        </div>

        <!-- Logo (NOREVA - Dark Taupe for Visibility) -->
        <a routerLink="/" class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center h-full">
           <img src="/assets/noreva-logo.webp" alt="NOREVA" class="h-6 md:h-8 w-auto object-contain">
        </a>

        <!-- Right Actions -->
        <div class="flex items-center gap-1 md:gap-4">
          <!-- Account Icon (Refined) -->
          @if (authService.isLoggedIn()) {
             <a routerLink="/login" class="p-2 text-black active:scale-90 transition-transform cursor-pointer focus:outline-none relative group" aria-label="Account">
               <div class="w-6 h-6 bg-black text-white text-[11px] font-black rounded-full flex items-center justify-center border border-black">
                 {{ authService.currentUser()?.firstName?.charAt(0) }}
               </div>
             </a>
          } @else {
             <a routerLink="/login" class="p-2 text-black active:scale-90 transition-transform cursor-pointer focus:outline-none relative group" aria-label="Account">

               <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
               </svg>
             </a>
          }
          
          <!-- Cart Icon (Refined) -->
          <button (click)="toggleCart()" type="button" class="relative p-2 text-black active:scale-90 transition-transform cursor-pointer focus:outline-none" aria-label="Cart">
             <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
             </svg>
             @if (cartService.totalItems() > 0) {
               <span class="absolute top-0 right-0 w-3.5 h-3.5 bg-[#4a4945] text-white text-[9px] font-black rounded-full flex items-center justify-center ring-1 ring-white">
                 {{ cartService.totalItems() }}
               </span>
             }
          </button>

        </div>
      </div>

      <!-- Menu Drawer -->
      @if (isMenuOpen()) {
        <div class="fixed inset-0 z-[200] bg-white flex flex-col animate-slide-down overflow-hidden h-screen w-screen">
           <div class="h-16 md:h-20 px-6 flex items-center justify-between border-b border-gray-100">
              <span class="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
                {{ langService.currentLang() === 'ar' ? 'القائمة' : 'MENU' }}
              </span>
              <button (click)="closeMenu()" type="button" class="p-3 -ml-3">
                 <svg class="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
              </button>
           </div>
           
           <nav class="flex-1 flex flex-col p-8 md:p-12 overflow-y-auto no-scrollbar">
              <div class="space-y-1 mb-6">
                 <a (click)="closeMenu()" routerLink="/" class="block py-5 border-b border-gray-50 text-base font-black text-black uppercase tracking-widest">
                   {{ langService.currentLang() === 'ar' ? 'الرئيسية' : 'HOME' }}
                 </a>
                 <a (click)="closeMenu()" routerLink="/products" class="block py-5 border-b border-gray-50 text-base font-black text-black uppercase tracking-widest">
                   {{ langService.currentLang() === 'ar' ? 'المتجر' : 'SHOP' }}
                 </a>
                 <a (click)="closeMenu()" routerLink="/cart" class="block py-5 border-b border-gray-50 text-base font-black text-black uppercase tracking-widest">
                   {{ langService.currentLang() === 'ar' ? 'السلة' : 'CART' }}
                 </a>
                 <a (click)="closeMenu()" routerLink="/tracking" class="block py-5 border-b border-gray-50 text-base font-black text-black uppercase tracking-widest">
                   {{ langService.currentLang() === 'ar' ? 'تتبع الطلب' : 'TRACK ORDER' }}
                 </a>
                 @if (authService.isLoggedIn()) {
                    <button (click)="logout()" class="w-full text-start block py-5 border-b border-gray-50 text-base font-black text-red-500 uppercase tracking-widest">
                      {{ langService.currentLang() === 'ar' ? 'تسجيل الخروج' : 'LOGOUT' }}
                    </button>
                 } @else {
                    <a (click)="closeMenu()" routerLink="/login" class="block py-5 border-b border-gray-50 text-base font-black text-black uppercase tracking-widest">
                      {{ langService.currentLang() === 'ar' ? 'دخول و عضوية جديدة' : 'LOGIN & REGISTER' }}
                    </a>
                 }
              </div>
           </nav>
        </div>
      }
    </header>

    <!-- Cart Drawer -->
    @if (cartService.isCartOpen()) {
       <div class="fixed inset-0 z-[250] flex justify-start ltr:justify-end rtl:justify-start">
         <div class="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" (click)="closeCart()"></div>
         <div class="relative w-full max-w-sm bg-white h-full flex flex-col shadow-2xl animate-slide-down">
           <div class="p-6 border-b border-gray-100 flex items-center justify-between h-16 md:h-20 bg-black">
              <h2 class="text-xl font-black italic tracking-tighter uppercase text-noreva-bone">{{ langService.currentLang() === 'ar' ? 'سلتكِ' : 'YOUR CART' }}</h2>
              <button (click)="closeCart()" type="button" class="p-3">
                <svg class="w-6 h-6 text-noreva-bone" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
           </div>
           <div class="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar bg-white">
              @for (item of cartService.items(); track item) {
                <div class="flex gap-4 items-center group">
                   <div class="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                      <img [src]="item.product.images[0]" class="w-full h-full object-cover">
                   </div>
                   <div class="flex-1 text-start">
                      <div class="flex justify-between items-start">
                        <h4 class="font-black text-sm mb-1 line-clamp-1">{{ item.product.title }}</h4>
                        <button (click)="cartService.removeFromCart(item)" class="p-1 text-gray-300 hover:text-red-500 transition-colors" aria-label="Remove item">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div class="flex items-center justify-between mt-2">
                        <div class="flex items-center gap-2 bg-gray-50 rounded-full px-2 py-1">
                          <button (click)="cartService.updateQuantity(item, item.quantity - 1)" class="w-4 h-4 flex items-center justify-center text-black font-black text-xs hover:scale-125 transition-transform">-</button>
                          <span class="text-xs font-black min-w-[1rem] text-center">{{ item.quantity }}</span>
                          <button (click)="cartService.updateQuantity(item, item.quantity + 1)" class="w-4 h-4 flex items-center justify-center text-black font-black text-xs hover:scale-125 transition-transform">+</button>
                        </div>
                        <span class="font-black text-sm">
                          @if ((item.priceOverride !== undefined ? item.priceOverride : item.product.price) * item.quantity === 0) {
                            <span class="text-green-600 uppercase tracking-wider text-xs">{{ langService.currentLang() === 'ar' ? 'مجاناً' : 'FREE' }}</span>
                          } @else {
                            {{ currencyService.formatPrice((item.priceOverride !== undefined ? item.priceOverride : item.product.price) * item.quantity) }}
                          }
                        </span>
                      </div>
                   </div>
                </div>
              }
              @if (cartService.items().length === 0) {
                 <div class="text-center py-20 opacity-30 font-black uppercase tracking-[0.3em] text-[10px]">
                   {{ langService.currentLang() === 'ar' ? 'خالية تماماً' : 'CART IS EMPTY' }}
                 </div>
              }
           </div>
            @if (cartService.items().length > 0) {
              <div class="p-6 border-t border-gray-100 bg-gray-50/50">
                <!-- Shipping Protection Toggle -->
                <div class="p-4 bg-white rounded-2xl border border-gray-100 mb-6 flex items-center justify-between group cursor-pointer active:scale-95 transition-all" (click)="cartService.toggleShippingProtection()">
                  <div class="flex items-center gap-3">
                     <div class="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                     </div>
                     <div class="text-start">
                        <h4 class="text-xs font-black uppercase tracking-wider mb-0.5">
                          {{ langService.currentLang() === 'ar' ? 'حماية الشحن' : 'Shipping Protection' }}
                        </h4>
                        <p class="text-xs text-gray-400 font-medium leading-tight">
                          {{ langService.currentLang() === 'ar' ? 'ضد السرقة والضياع' : 'Against theft and loss' }}
                        </p>
                     </div>
                  </div>
                  <div class="flex items-center gap-3">
                     <span class="text-xs font-black">{{ currencyService.formatPrice(cartService.shippingProtectionCost) }}</span>
                     <div class="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300" 
                          [class.bg-black]="cartService.shippingProtection()" 
                          [class.border-black]="cartService.shippingProtection()" 
                          [class.border-gray-200]="!cartService.shippingProtection()">
                        @if (cartService.shippingProtection()) {
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                     </div>
                  </div>
                </div>

                <div class="flex justify-between items-center mb-6">
                   <span class="text-[10px] font-black uppercase tracking-widest opacity-40">{{ langService.currentLang() === 'ar' ? 'المجموع' : 'TOTAL' }}</span>
                   <span class="font-black text-2xl tracking-tighter text-black">{{ currencyService.formatPrice(cartService.totalPrice()) }}</span>
                </div>
                <div class="flex flex-col gap-3">
                  <button (click)="handleCheckout()" 
                          [disabled]="isCheckingOut()"
                          class="block w-full py-5 bg-black text-white text-center rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3">
                    @if (isCheckingOut()) {
                      <div class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    }
                    {{ langService.currentLang() === 'ar' ? 'إتمام الطلب' : 'CHECKOUT' }}
                  </button>
                  <a routerLink="/cart" (click)="closeCart()" class="block w-full py-3 text-center text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
                    {{ langService.currentLang() === 'ar' ? 'عرض السلة' : 'VIEW CART' }}
                  </a>
                </div>
              </div>
           }
         </div>
       </div>
    }

   `
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartService = inject(CartService);
  currencyService = inject(CurrencyService);
  authService = inject(AuthService);
  langService = inject(LanguageService);
  shopifyService = inject(ShopifyService);
  isMenuOpen = signal(false);
  isCheckingOut = signal(false);

  timeLeft = signal('00:00:00');
  private interval: any;

  ngOnInit() { this.startCountdown(); }
  ngOnDestroy() { if (this.interval) clearInterval(this.interval); }

  private startCountdown() {
    this.interval = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diffInMs = midnight.getTime() - now.getTime();
      const seconds = Math.floor(diffInMs / 1000);
      if (seconds <= 0) { this.timeLeft.set('00:00:00'); return; }
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      this.timeLeft.set(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);
  }

  toggleMenu() { this.isMenuOpen.update(v => !v); if (this.isMenuOpen()) this.cartService.isCartOpen.set(false); }
  closeMenu() { this.isMenuOpen.set(false); }
  toggleCart() { this.cartService.isCartOpen.update(v => !v); if (this.cartService.isCartOpen()) this.isMenuOpen.set(false); }
  closeCart() { this.cartService.isCartOpen.set(false); }
  logout() { this.authService.logout(); this.closeMenu(); }

  async handleCheckout() {
    if (this.isCheckingOut()) return;

    try {
      this.isCheckingOut.set(true);

      const lineItems = this.cartService.items().map(item => ({
        variantId: item.variant?.id || item.product.variants[0]?.id,
        quantity: item.quantity
      }));

      // Add shipping protection if enabled
      if (this.cartService.shippingProtection()) {
        const protectionId = await this.shopifyService.getShippingProtectionVariantId();
        if (protectionId) {
          lineItems.push({
            variantId: protectionId,
            quantity: 1
          });
        }
      }

      if (lineItems.length === 0) {
        alert(this.langService.currentLang() === 'ar' ? 'السلة فارغة' : 'Cart is empty');
        this.isCheckingOut.set(false);
        return;
      }

      const result = await this.shopifyService.createCart(lineItems);

      if (result && result.cart && result.cart.checkoutUrl) {
        window.location.href = result.cart.checkoutUrl;
      } else {
        throw new Error('Could not create checkout URL');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      const msg = error?.message || (this.langService.currentLang() === 'ar' ? 'حدث خطأ أثناء الانتقال للدفع' : 'Error proceeding to checkout');
      alert(msg);
    } finally {
      this.isCheckingOut.set(false);
    }
  }
}
