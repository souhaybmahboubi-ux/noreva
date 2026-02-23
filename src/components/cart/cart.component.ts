import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CurrencyService } from '../../services/currency.service';
import { ShopifyService } from '../../services/shopify.service';
import { LanguageService } from '../../services/language.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-noreva-cream min-h-screen pt-40 md:pt-56 pb-20 selection:bg-noreva-champagne selection:text-noreva-black" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
      <div class="container mx-auto px-6 max-w-6xl">
        
        <div class="text-center mb-16">
          <span class="inline-block text-[10px] md:text-xs font-medium tracking-[0.3em] text-noreva-gold uppercase mb-4">
            {{ cartService.totalItems() }} {{ langService.currentLang() === 'ar' ? 'منتجات مختارة' : 'SELECTED ITEMS' }}
          </span>
          <h1 class="text-4xl md:text-6xl font-serif text-noreva-black">
            {{ langService.currentLang() === 'ar' ? 'سلتكِ' : 'Your Cart' }}
          </h1>
        </div>

        @if (cartService.items().length > 0) {
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <!-- Items List -->
            <div class="lg:col-span-7 space-y-8">
              @for (item of cartService.items(); track item) {
                <div class="flex gap-5 md:gap-8 items-start border-b border-noreva-champagne/30 pb-8 group">
                  <div class="w-28 h-36 md:w-40 md:h-52 bg-noreva-ivory rounded-2xl md:rounded-3xl overflow-hidden border border-noreva-champagne/30 flex-shrink-0 relative img-reveal">
                    <img [src]="item.product.images[0]" class="w-full h-full object-cover">
                  </div>
                  
                  <div class="flex-grow flex flex-col h-full py-2">
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <h3 class="font-medium text-base md:text-lg text-noreva-black mb-1">{{ item.product.title }}</h3>
                        <p class="text-[10px] font-medium text-noreva-taupe uppercase tracking-[0.2em]">{{ langService.currentLang() === 'ar' ? 'الكمية' : 'QUANTITY' }}: {{ item.quantity }}</p>
                      </div>
                      <button type="button" (click)="cartService.removeFromCart(item)" class="text-noreva-taupe hover:text-noreva-black transition-all p-2 -m-2" aria-label="Remove item">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div class="mt-auto flex justify-between items-center">
                       <div class="flex items-center gap-3 bg-noreva-ivory rounded-full px-4 py-2 border border-noreva-champagne/30">
                          <button (click)="cartService.updateQuantity(item, item.quantity - 1)" class="w-5 h-5 flex items-center justify-center text-noreva-black font-medium hover:text-noreva-gold transition-colors">−</button>
                          <span class="text-xs font-medium min-w-[1.2rem] text-center text-noreva-black">{{ item.quantity }}</span>
                          <button (click)="cartService.updateQuantity(item, item.quantity + 1)" class="w-5 h-5 flex items-center justify-center text-noreva-black font-medium hover:text-noreva-gold transition-colors">+</button>
                       </div>
                       <span class="font-serif text-xl text-noreva-black">{{ currencyService.formatPrice((item.priceOverride || item.product.price) * item.quantity) }}</span>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Summary Table -->
            <div class="lg:col-span-5 h-fit lg:sticky lg:top-32">
              <div class="bg-white p-8 md:p-12 rounded-3xl border border-noreva-champagne/30 shadow-luxury">
                <h2 class="font-serif text-2xl mb-8 text-noreva-black">{{ langService.currentLang() === 'ar' ? 'ملخص الطلب' : 'Order Summary' }}</h2>
                
                <div class="space-y-5 mb-8 pb-8 border-b border-noreva-champagne/30">
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-medium text-noreva-taupe tracking-wide">{{ langService.currentLang() === 'ar' ? 'المجموع الفرعي' : 'Subtotal' }}</span>
                    <span class="font-medium text-noreva-black">{{ currencyService.formatPrice(cartService.totalPrice() - (cartService.shippingProtection() ? cartService.shippingProtectionCost : 0)) }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-medium text-noreva-taupe tracking-wide">{{ langService.currentLang() === 'ar' ? 'الشحن السريع' : 'Express Shipping' }}</span>
                    <span class="text-noreva-gold font-medium text-xs uppercase tracking-wider">{{ langService.currentLang() === 'ar' ? 'مجاناً' : 'FREE' }}</span>
                  </div>

                  <!-- Shipping Protection -->
                  <div class="p-4 bg-noreva-ivory rounded-2xl border border-noreva-champagne/30 flex items-center justify-between group cursor-pointer hover:bg-noreva-champagne/20 transition-all" (click)="cartService.toggleShippingProtection()">
                    <div class="flex items-center gap-3">
                       <div class="w-9 h-9 rounded-full bg-white flex items-center justify-center text-noreva-black border border-noreva-champagne/30">
                          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                       </div>
                       <div>
                          <h4 class="text-xs font-medium text-noreva-black mb-0.5">
                            {{ langService.currentLang() === 'ar' ? 'حماية الشحن' : 'Shipping Protection' }}
                          </h4>
                          <p class="text-[9px] text-noreva-taupe font-medium leading-tight">
                            {{ langService.currentLang() === 'ar' ? 'ضد السرقة والضياع' : 'Against theft and loss' }}
                          </p>
                       </div>
                    </div>
                    <div class="flex items-center gap-3">
                       <span class="text-xs font-medium text-noreva-black">{{ currencyService.formatPrice(cartService.shippingProtectionCost) }}</span>
                       <div class="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300" 
                            [class.bg-noreva-black]="cartService.shippingProtection()" 
                            [class.border-noreva-black]="cartService.shippingProtection()" 
                            [class.border-noreva-champagne]="!cartService.shippingProtection()">
                          @if (cartService.shippingProtection()) {
                            <svg class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          }
                       </div>
                    </div>
                  </div>
                </div>

                <div class="mb-8">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-xs font-medium text-noreva-black uppercase tracking-wider">{{ langService.currentLang() === 'ar' ? 'الإجمالي' : 'Total' }}</span>
                    <span class="font-serif text-3xl text-noreva-black">{{ currencyService.formatPrice(cartService.totalPrice()) }}</span>
                  </div>
                  <p class="text-[10px] text-noreva-taupe font-medium tracking-wide text-end">{{ langService.currentLang() === 'ar' ? 'شامل ضريبة القيمة المضافة والشحن' : 'Includes VAT & Free Shipping' }}</p>
                </div>

                <button (click)="handleCheckout()" 
                        [disabled]="isCheckingOut()"
                        class="btn-luxury w-full text-white py-5 rounded-xl font-medium text-sm tracking-wide flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  @if (isCheckingOut()) {
                    <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  }
                  {{ langService.currentLang() === 'ar' ? 'إتمام الطلب' : 'Complete Checkout' }}
                </button>
              </div>
            </div>
          </div>
        } @else {
          <!-- Empty State -->
          <div class="text-center py-32 max-w-xl mx-auto">
            <div class="w-20 h-20 bg-noreva-ivory rounded-full flex items-center justify-center mx-auto mb-8">
              <svg class="w-10 h-10 text-noreva-taupe" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            
            <h2 class="text-3xl font-serif mb-4 text-noreva-black">
              {{ langService.currentLang() === 'ar' ? 'سلتكِ فارغة' : 'Your Cart is Empty' }}
            </h2>
            
            <p class="text-noreva-taupe font-medium mb-12 text-sm max-w-sm mx-auto leading-relaxed">
              {{ langService.currentLang() === 'ar' ? 'يبدو أنكِ لم تختاري أي منتجات لنحت جمالكِ بعد.' : "It seems you haven't selected any items for your beauty routine yet." }}
            </p>
            
            <a routerLink="/products" class="btn-luxury inline-block text-white px-12 py-4 rounded-full font-medium text-sm tracking-wide">
              {{ langService.currentLang() === 'ar' ? 'تصفحي المجموعة' : 'Explore Collection' }}
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export class CartComponent {
  cartService = inject(CartService);
  currencyService = inject(CurrencyService);
  shopifyService = inject(ShopifyService);
  langService = inject(LanguageService);
  isCheckingOut = signal(false);

  async handleCheckout() {
    if (this.isCheckingOut() || this.cartService.items().length === 0) return;

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
