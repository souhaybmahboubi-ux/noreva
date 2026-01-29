
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
    <!-- Minimal Luxury Announcement Bar -->
    <div class="bg-noreva-black text-white px-4 fixed top-0 left-0 right-0 z-[110] text-center py-2.5 md:py-3">
      <p class="font-medium tracking-wide flex items-center justify-center gap-3 text-[11px] md:text-[12px]">
        <span class="opacity-80">{{ langService.currentLang() === 'ar' ? 'شحن مجاني على جميع الطلبات' : 'COMPLIMENTARY SHIPPING ON ALL ORDERS' }}</span>
        <span class="hidden md:inline opacity-30">|</span> 
        <span class="hidden md:flex items-center gap-2 opacity-60">
          <span class="text-noreva-gold">{{ langService.currentLang() === 'ar' ? 'ينتهي:' : 'Ends:' }}</span>
          <span class="font-mono font-semibold text-noreva-gold">{{ timeLeft() }}</span>
        </span>
      </p>
    </div>

    <header class="fixed left-0 right-0 z-[100] bg-noreva-cream/98 backdrop-blur-xl border-b border-noreva-champagne/50 transition-all duration-500 top-[36px] md:top-[44px]">
      <div class="container mx-auto px-6 h-14 md:h-16 flex items-center justify-between relative">
        
        <!-- Left Actions -->
        <div class="flex items-center gap-2">
          <!-- Menu Toggle -->
          <button (click)="toggleMenu()" type="button" class="p-2 text-noreva-black hover:text-noreva-taupe active:scale-90 transition-all duration-300 cursor-pointer focus:outline-none" aria-label="Menu">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h8.25" />
            </svg>
          </button>

          <button (click)="langService.toggleLanguage()" class="flex p-2 text-[10px] md:text-xs font-medium tracking-widest text-noreva-taupe hover:text-noreva-black transition-colors" aria-label="Toggle Language">
            {{ langService.currentLang() === 'ar' ? 'EN' : 'عربي' }}
          </button>
        </div>

        <!-- Logo (Centered - Elegant Typography) -->
        <a routerLink="/" class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center h-full">
           <img src="/assets/noreva-logo.webp" alt="NOREVA" class="h-5 md:h-6 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity">
        </a>

        <!-- Right Actions -->
        <div class="flex items-center gap-1 md:gap-3">
          <!-- Account Icon -->
          @if (authService.isLoggedIn()) {
             <a routerLink="/login" class="p-2 text-noreva-black hover:text-noreva-taupe active:scale-90 transition-all duration-300 cursor-pointer focus:outline-none" aria-label="Account">
               <div class="w-6 h-6 bg-noreva-black text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                 {{ authService.currentUser()?.firstName?.charAt(0) }}
               </div>
             </a>
          } @else {
             <a routerLink="/login" class="p-2 text-noreva-black hover:text-noreva-taupe active:scale-90 transition-all duration-300 cursor-pointer focus:outline-none" aria-label="Account">
               <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
               </svg>
             </a>
          }
          
          <!-- Cart Icon -->
          <button (click)="toggleCart()" type="button" class="relative p-2 text-noreva-black hover:text-noreva-taupe active:scale-90 transition-all duration-300 cursor-pointer focus:outline-none" aria-label="Cart">
             <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
             </svg>
             @if (cartService.totalItems() > 0) {
               <span class="absolute top-0.5 right-0.5 w-4 h-4 bg-noreva-gold text-noreva-black text-[9px] font-bold rounded-full flex items-center justify-center">
                 {{ cartService.totalItems() }}
               </span>
             }
          </button>
        </div>
      </div>

      <!-- Menu Drawer - Luxurious Redesign -->
      @if (isMenuOpen()) {
        <div class="fixed inset-0 z-[200] bg-noreva-cream flex flex-col animate-slide-down overflow-hidden h-screen w-screen">
           <div class="h-14 md:h-16 px-6 flex items-center justify-between border-b border-noreva-champagne/50">
              <span class="text-[10px] font-medium tracking-[0.3em] text-noreva-taupe uppercase">
                {{ langService.currentLang() === 'ar' ? 'القائمة' : 'MENU' }}
              </span>
              <button (click)="closeMenu()" type="button" class="p-3 -ml-3 hover:opacity-60 transition-opacity">
                 <svg class="w-5 h-5 text-noreva-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
              </button>
           </div>
           
           <nav class="flex-1 flex flex-col p-8 md:p-16 overflow-y-auto no-scrollbar">
              <div class="space-y-0 mb-8">
                 <a (click)="closeMenu()" routerLink="/" class="block py-6 border-b border-noreva-champagne/30 text-2xl md:text-3xl font-serif text-noreva-black hover:text-noreva-gold transition-colors">
                   {{ langService.currentLang() === 'ar' ? 'الرئيسية' : 'Home' }}
                 </a>
                 <a (click)="closeMenu()" routerLink="/products" class="block py-6 border-b border-noreva-champagne/30 text-2xl md:text-3xl font-serif text-noreva-black hover:text-noreva-gold transition-colors">
                   {{ langService.currentLang() === 'ar' ? 'المتجر' : 'Shop' }}
                 </a>
                 <a (click)="closeMenu()" routerLink="/cart" class="block py-6 border-b border-noreva-champagne/30 text-2xl md:text-3xl font-serif text-noreva-black hover:text-noreva-gold transition-colors">
                   {{ langService.currentLang() === 'ar' ? 'السلة' : 'Cart' }}
                 </a>
                 <a (click)="closeMenu()" routerLink="/tracking" class="block py-6 border-b border-noreva-champagne/30 text-2xl md:text-3xl font-serif text-noreva-black hover:text-noreva-gold transition-colors">
                   {{ langService.currentLang() === 'ar' ? 'تتبع الطلب' : 'Track Order' }}
                 </a>
                 @if (authService.isLoggedIn()) {
                    <button (click)="logout()" class="w-full text-start block py-6 border-b border-noreva-champagne/30 text-2xl md:text-3xl font-serif text-noreva-taupe hover:text-noreva-black transition-colors">
                      {{ langService.currentLang() === 'ar' ? 'تسجيل الخروج' : 'Sign Out' }}
                    </button>
                 } @else {
                    <a (click)="closeMenu()" routerLink="/login" class="block py-6 border-b border-noreva-champagne/30 text-2xl md:text-3xl font-serif text-noreva-black hover:text-noreva-gold transition-colors">
                      {{ langService.currentLang() === 'ar' ? 'تسجيل الدخول' : 'Sign In' }}
                    </a>
                 }
              </div>

              <!-- Footer within menu -->
              <div class="mt-auto pt-8 border-t border-noreva-champagne/30">
                <p class="text-[10px] tracking-widest text-noreva-taupe uppercase">
                  {{ langService.currentLang() === 'ar' ? '© 2026 نوريڤا' : '© 2026 NOREVA' }}
                </p>
              </div>
           </nav>
        </div>
      }
    </header>

    <!-- Cart Drawer - Premium Redesign -->
    @if (cartService.isCartOpen()) {
       <div class="fixed inset-0 z-[250] flex justify-start ltr:justify-end rtl:justify-start">
         <div class="absolute inset-0 bg-noreva-black/40 backdrop-blur-sm animate-fade-in" (click)="closeCart()"></div>
         <div class="relative w-full max-w-md bg-noreva-cream h-full flex flex-col shadow-luxury-xl animate-slide-down">
           <div class="p-6 border-b border-noreva-champagne/50 flex items-center justify-between h-16 md:h-20 bg-noreva-cream">
              <h2 class="text-xl font-serif text-noreva-black">{{ langService.currentLang() === 'ar' ? 'حقيبتكِ' : 'Your Bag' }}</h2>
              <button (click)="closeCart()" type="button" class="p-2 hover:opacity-60 transition-opacity">
                <svg class="w-5 h-5 text-noreva-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
           </div>
           <div class="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-noreva-cream">
              @for (item of cartService.items(); track item) {
                <div class="flex gap-4 items-start group p-4 bg-white rounded-2xl border border-noreva-champagne/30 shadow-luxury">
                   <div class="w-20 h-20 bg-noreva-ivory rounded-xl overflow-hidden border border-noreva-champagne/30 flex-shrink-0 img-reveal">
                      <img [src]="item.product.images[0]" class="w-full h-full object-cover">
                   </div>
                   <div class="flex-1 text-start">
                      <div class="flex justify-between items-start mb-2">
                        <h4 class="font-medium text-sm text-noreva-black line-clamp-2">{{ item.product.title }}</h4>
                        <button (click)="cartService.removeFromCart(item)" class="p-1 text-noreva-taupe hover:text-noreva-black transition-colors" aria-label="Remove item">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div class="flex items-center justify-between mt-3">
                        <div class="flex items-center gap-3 bg-noreva-ivory rounded-full px-3 py-1.5 border border-noreva-champagne/30">
                          <button (click)="cartService.updateQuantity(item, item.quantity - 1)" class="w-5 h-5 flex items-center justify-center text-noreva-black font-medium text-sm hover:text-noreva-gold transition-colors">−</button>
                          <span class="text-xs font-medium min-w-[1rem] text-center text-noreva-black">{{ item.quantity }}</span>
                          <button (click)="cartService.updateQuantity(item, item.quantity + 1)" class="w-5 h-5 flex items-center justify-center text-noreva-black font-medium text-sm hover:text-noreva-gold transition-colors">+</button>
                        </div>
                        <span class="font-medium text-sm text-noreva-black">
                          @if ((item.priceOverride !== undefined ? item.priceOverride : item.product.price) * item.quantity === 0) {
                            <span class="text-noreva-gold text-xs tracking-wider">{{ langService.currentLang() === 'ar' ? 'مجاناً' : 'GIFT' }}</span>
                          } @else {
                            {{ currencyService.formatPrice((item.priceOverride !== undefined ? item.priceOverride : item.product.price) * item.quantity) }}
                          }
                        </span>
                      </div>
                   </div>
                </div>
              }
              @if (cartService.items().length === 0) {
                 <div class="text-center py-24">
                   <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-noreva-champagne/30 flex items-center justify-center">
                     <svg class="w-8 h-8 text-noreva-taupe" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                     </svg>
                   </div>
                   <p class="text-sm text-noreva-taupe font-medium">
                     {{ langService.currentLang() === 'ar' ? 'حقيبتكِ فارغة' : 'Your bag is empty' }}
                   </p>
                   <a routerLink="/products" (click)="closeCart()" class="inline-block mt-4 text-xs text-noreva-black underline underline-offset-4 hover:text-noreva-gold transition-colors">
                     {{ langService.currentLang() === 'ar' ? 'تسوقي الآن' : 'Start Shopping' }}
                   </a>
                 </div>
              }
           </div>
            @if (cartService.items().length > 0) {
              <div class="p-6 border-t border-noreva-champagne/50 bg-white">
                <!-- Shipping Protection -->
                <div class="p-4 bg-noreva-ivory rounded-xl border border-noreva-champagne/30 mb-6 flex items-center justify-between group cursor-pointer hover:bg-noreva-champagne/20 transition-all" (click)="cartService.toggleShippingProtection()">
                  <div class="flex items-center gap-3">
                     <div class="w-9 h-9 rounded-full bg-white flex items-center justify-center text-noreva-black border border-noreva-champagne/30">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                     </div>
                     <div class="text-start">
                        <h4 class="text-xs font-medium text-noreva-black mb-0.5">
                          {{ langService.currentLang() === 'ar' ? 'حماية الشحن' : 'Shipping Protection' }}
                        </h4>
                        <p class="text-[10px] text-noreva-taupe">
                          {{ langService.currentLang() === 'ar' ? 'حماية ضد الفقدان أو التلف' : 'Protection against loss or damage' }}
                        </p>
                     </div>
                  </div>
                  <div class="flex items-center gap-3">
                     <span class="text-xs font-medium text-noreva-black">{{ currencyService.formatPrice(cartService.shippingProtectionCost) }}</span>
                     <div class="w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300" 
                          [class.bg-noreva-black]="cartService.shippingProtection()" 
                          [class.border-noreva-black]="cartService.shippingProtection()" 
                          [class.border-noreva-champagne]="!cartService.shippingProtection()">
                        @if (cartService.shippingProtection()) {
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                     </div>
                  </div>
                </div>

                <div class="flex justify-between items-center mb-6">
                   <span class="text-sm text-noreva-taupe">{{ langService.currentLang() === 'ar' ? 'المجموع' : 'Total' }}</span>
                   <span class="font-serif text-2xl text-noreva-black">{{ currencyService.formatPrice(cartService.totalPrice()) }}</span>
                </div>
                <div class="flex flex-col gap-3">
                  <button (click)="handleCheckout()" 
                          [disabled]="isCheckingOut()"
                          class="btn-luxury block w-full py-4 text-white text-center rounded-xl font-medium text-sm tracking-wide active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3">
                    @if (isCheckingOut()) {
                      <div class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    }
                    {{ langService.currentLang() === 'ar' ? 'إتمام الطلب' : 'Proceed to Checkout' }}
                  </button>
                  <a routerLink="/cart" (click)="closeCart()" class="block w-full py-3 text-center text-xs font-medium text-noreva-taupe hover:text-noreva-black transition-colors underline underline-offset-4">
                    {{ langService.currentLang() === 'ar' ? 'عرض السلة' : 'View Bag' }}
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
