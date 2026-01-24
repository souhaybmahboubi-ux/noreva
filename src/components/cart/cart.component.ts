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
    <div class="bg-white min-h-screen pt-40 md:pt-56 pb-20 selection:bg-black selection:text-white" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
      <div class="container mx-auto px-6 max-w-6xl">
        
        <div class="text-center mb-16">
          <h1 class="text-5xl md:text-7xl font-black font-serif text-black mb-4 uppercase tracking-tight">
            {{ langService.currentLang() === 'ar' ? 'سلتكِ' : 'YOUR CART' }}
          </h1>
          <p class="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
            {{ cartService.totalItems() }} {{ langService.currentLang() === 'ar' ? 'منتجات مختارة بعناية' : 'CAREFULLY SELECTED ITEMS' }}
          </p>
        </div>

        @if (cartService.items().length > 0) {
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <!-- Items List -->
            <div class="lg:col-span-7 space-y-10">
              @for (item of cartService.items(); track item) {
                <div class="flex gap-6 md:gap-10 items-start border-b border-gray-100 pb-10 group">
                  <div class="w-32 h-40 md:w-44 md:h-56 bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 flex-shrink-0 relative">
                    <img [src]="item.product.images[0]" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                  </div>
                  
                  <div class="flex-grow flex flex-col h-full py-2">
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <h3 class="font-black text-lg md:text-xl text-black mb-1 uppercase tracking-tight">{{ item.product.title }}</h3>
                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">{{ langService.currentLang() === 'ar' ? 'الكمية' : 'QUANTITY' }}: {{ item.quantity }}</p>
                      </div>
                      <button type="button" (click)="cartService.removeFromCart(item)" class="text-gray-300 hover:text-red-500 transition-all p-2 -m-2" aria-label="Remove item">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div class="mt-auto flex justify-between items-center">
                       <div class="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2">
                          <button (click)="cartService.updateQuantity(item, item.quantity - 1)" class="w-6 h-6 flex items-center justify-center text-black font-black hover:scale-125 transition-transform">-</button>
                          <span class="text-xs font-black min-w-[1.5rem] text-center">{{ item.quantity }}</span>
                          <button (click)="cartService.updateQuantity(item, item.quantity + 1)" class="w-6 h-6 flex items-center justify-center text-black font-black hover:scale-125 transition-transform">+</button>
                       </div>
                       <span class="font-black text-xl text-black">{{ currencyService.formatPrice((item.priceOverride || item.product.price) * item.quantity) }}</span>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Summary Table -->
            <div class="lg:col-span-5 h-fit lg:sticky lg:top-32">
              <div class="bg-gray-50 p-8 md:p-12 rounded-[3rem] border border-gray-100">
                <h2 class="font-black font-serif text-2xl mb-8 uppercase tracking-tight text-black">{{ langService.currentLang() === 'ar' ? 'ملخص الفاتورة' : 'ORDER SUMMARY' }}</h2>
                
                <div class="space-y-6 mb-10 pb-10 border-b border-gray-200">
                  <div class="flex justify-between items-center">
                    <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">{{ langService.currentLang() === 'ar' ? 'المجموع الفرعي' : 'SUBTOTAL' }}</span>
                    <span class="font-black text-lg text-black">{{ currencyService.formatPrice(cartService.totalPrice() - (cartService.shippingProtection() ? cartService.shippingProtectionCost : 0)) }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">{{ langService.currentLang() === 'ar' ? 'الشحن السريع' : 'EXPRESS SHIPPING' }}</span>
                    <span class="text-green-600 font-black text-xs uppercase tracking-widest">{{ langService.currentLang() === 'ar' ? 'مجاناً' : 'FREE' }}</span>
                  </div>

                  <!-- Shipping Protection -->
                  <div class="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group cursor-pointer active:scale-95 transition-all" (click)="cartService.toggleShippingProtection()">
                    <div class="flex items-center gap-4">
                       <div class="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                       </div>
                       <div>
                          <h4 class="text-[10px] font-black uppercase tracking-wider mb-0.5 text-black">
                            {{ langService.currentLang() === 'ar' ? 'حماية الشحن' : 'Shipping Protection' }}
                          </h4>
                          <p class="text-[9px] text-gray-400 font-medium leading-tight">
                            {{ langService.currentLang() === 'ar' ? 'ضد السرقة والضياع' : 'Against theft and loss' }}
                          </p>
                       </div>
                    </div>
                    <div class="flex items-center gap-3">
                       <span class="text-[10px] font-black text-black">{{ currencyService.formatPrice(cartService.shippingProtectionCost) }}</span>
                       <div class="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300" 
                            [class.bg-black]="cartService.shippingProtection()" 
                            [class.border-black]="cartService.shippingProtection()" 
                            [class.border-gray-200]="!cartService.shippingProtection()">
                          @if (cartService.shippingProtection()) {
                            <svg class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          }
                       </div>
                    </div>
                  </div>
                </div>

                <div class="mb-10">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-[10px] font-black uppercase tracking-widest text-black">{{ langService.currentLang() === 'ar' ? 'الإجمالي' : 'TOTAL AMOUNT' }}</span>
                    <span class="font-black text-4xl text-black tracking-tighter">{{ currencyService.formatPrice(cartService.totalPrice()) }}</span>
                  </div>
                  <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{{ langService.currentLang() === 'ar' ? 'شامل ضريبة القيمة المضافة والشحن' : 'INCLUDES VAT & FREE SHIPPING' }}</p>
                </div>

                <button (click)="handleCheckout()" 
                        [disabled]="isCheckingOut()"
                        class="w-full bg-black text-white font-black py-6 rounded-2xl hover:scale-[1.02] transition-all shadow-2xl uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed">
                  @if (isCheckingOut()) {
                    <div class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  }
                  {{ langService.currentLang() === 'ar' ? 'إتمام الطلب' : 'COMPLETE CHECKOUT' }}
                </button>
              </div>
            </div>
          </div>
        } @else {
          <!-- Empty State -->
          <div class="text-center py-32 max-w-xl mx-auto">
            <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-black/10">
              <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            
            <h2 class="text-3xl font-black font-serif mb-4 text-black uppercase tracking-tight">
              {{ langService.currentLang() === 'ar' ? 'سلتكِ فارغة' : 'YOUR CART IS EMPTY' }}
            </h2>
            
            <p class="text-gray-400 font-medium mb-12 text-sm max-w-sm mx-auto">
              {{ langService.currentLang() === 'ar' ? 'يبدو أنكِ لم تختاري أي منتجات لنحت جمالكِ بعد.' : "It seems you haven't selected any items for your beauty routine yet." }}
            </p>
            
            <a routerLink="/products" class="inline-block bg-black text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl">
              {{ langService.currentLang() === 'ar' ? 'تصفحي المجموعة' : 'EXPLORE COLLECTION' }}
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
