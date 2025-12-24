
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CurrencyService } from '../../services/currency.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-gray-50 min-h-screen pt-40 pb-20">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          سلة المشتريات
        </h1>
        
        @if (cartService.items().length > 0) {
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Cart Items -->
            <div class="lg:col-span-2 space-y-4">
              @for (item of cartService.items(); track item.product.id + (item.variant?.name || '') + (item.priceOverride || '')) {
                <div class="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow">
                  <!-- Image -->
                  <div class="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 relative">
                    <img [src]="item.variant?.image || item.product.images[0]" class="w-full h-full object-cover">
                  </div>
                  
                  <!-- Details -->
                  <div class="flex-grow">
                    <div class="flex justify-between items-start mb-2">
                      <div>
                        <h3 class="font-bold text-gray-900 text-lg">{{ item.product.title }}</h3>
                        @if (item.variant) {
                          <p class="text-sm text-gray-500">اللون: <span class="text-primary-600 font-bold">{{ item.variant.name }}</span></p>
                        }
                      </div>
                      <button (click)="cartService.removeFromCart(item)" class="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    <div class="flex justify-between items-end mt-4">
                       <div class="flex items-center border border-gray-200 rounded-lg h-10 bg-gray-50">
                          <button (click)="cartService.updateQuantity(item, item.quantity - 1)" class="px-3 h-full text-gray-600 hover:text-primary-600 hover:bg-white rounded-r-lg transition-colors font-bold text-lg">-</button>
                          <span class="w-10 text-center text-sm font-bold text-gray-900">{{ item.quantity }}</span>
                          <button (click)="cartService.updateQuantity(item, item.quantity + 1)" class="px-3 h-full text-gray-600 hover:text-primary-600 hover:bg-white rounded-l-lg transition-colors font-bold text-lg">+</button>
                       </div>
                       <div class="flex flex-col text-left">
                           <div class="font-black text-xl text-primary-600">{{ currencyService.formatPrice((item.priceOverride || item.product.price) * item.quantity) }}</div>
                           @if (item.priceOverride) {
                               <span class="text-xs text-green-600 font-bold">السعر مخفض</span>
                           }
                       </div>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Summary -->
            <div class="lg:col-span-1">
              <div class="bg-white p-6 rounded-2xl border border-gray-100 sticky top-24 shadow-sm">
                <h2 class="font-bold text-xl mb-6 text-gray-900">ملخص الطلب</h2>
                <div class="space-y-4 mb-6">
                  <div class="flex justify-between text-gray-600">
                    <span>المجموع الفرعي</span>
                    <span class="font-bold">{{ currencyService.formatPrice(cartService.totalPrice() - (cartService.shippingProtection() ? cartService.shippingProtectionCost : 0)) }}</span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span>الشحن</span>
                    <span class="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md text-sm">مجاني</span>
                  </div>
                  @if (cartService.shippingProtection()) {
                    <div class="flex justify-between text-blue-600 animate-in fade-in slide-in-from-top-2">
                       <span class="flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                          حماية الشحنة
                       </span>
                       <span class="font-bold">{{ currencyService.formatPrice(cartService.shippingProtectionCost) }}</span>
                    </div>
                  }
                </div>
                <div class="border-t border-gray-100 pt-6 mb-8">
                  <div class="flex justify-between items-end mb-1">
                    <span class="font-bold text-gray-900 text-lg">الإجمالي</span>
                    <span class="font-black text-3xl text-primary-600">{{ currencyService.formatPrice(cartService.totalPrice()) }}</span>
                  </div>
                  <p class="text-xs text-gray-400 mt-2">شامل ضريبة القيمة المضافة</p>
                </div>
                <a routerLink="/checkout" class="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-500/30 active:scale-95 flex items-center justify-center gap-2">
                  <span>إتمام الطلب</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        } @else {
          <!-- Empty State -->
          <div class="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
            <div class="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 class="text-3xl font-black mb-4 text-gray-900">سلتك فارغة</h2>
            <p class="text-gray-500 mb-10 text-lg">يبدو أنك لم تقم بإضافة أي منتجات للسلة بعد.<br>تصفح منتجاتنا واختر ما يناسبك.</p>
            <a routerLink="/products" class="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-500/30">
              تصفح المنتجات
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
}
