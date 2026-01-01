import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopifyService } from '../../services/shopify.service';
import { CurrencyService } from '../../services/currency.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="cartOpen$ | async" class="relative z-[100]">
      <!-- Overlay -->
      <div 
        class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        (click)="closeCart()"
        aria-hidden="true"
      ></div>

      <!-- Drawer -->
      <div class="fixed top-0 left-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col z-10">
        
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <h2 class="text-xl font-black text-gray-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            سلة المشتريات
          </h2>
          <button 
            (click)="closeCart()"
            class="p-2 text-gray-400 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <ng-container *ngIf="(cart$ | async) as cart">
            <div *ngIf="!cart.lineItems?.length; else hasItems" class="flex flex-col items-center justify-center h-full text-gray-400 space-y-6">
               <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
               </div>
              <p class="text-xl font-bold text-gray-900">سلتك فارغة حالياً</p>
              <button 
                (click)="closeCart()"
                class="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-all text-sm font-bold shadow-lg shadow-primary-500/20"
              >
                اكتشف منتجاتنا
              </button>
            </div>

            <ng-template #hasItems>
              <div class="space-y-6">
                @for (item of getFilteredItems(cart); track (item.variant?.id || item.id)) {

                  <div class="flex gap-4 group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                  <!-- Image -->
                  <div class="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                    <img 
                      *ngIf="item.variant?.image?.src"
                      [src]="item.variant.image.src" 
                      [alt]="item.variant.image.altText || item.title" 
                      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <!-- Details -->
                  <div class="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div class="flex justify-between items-start">
                        <h3 class="text-gray-900 font-bold text-sm leading-tight line-clamp-2 ml-2">
                          {{ item.title }}
                        </h3>
                        <button (click)="removeItem(item)" class="text-gray-300 hover:text-red-500 transition-colors">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>

                      </div>
                      <p class="text-gray-500 text-xs mt-1 font-medium">
                        {{ item.variant?.title !== 'Default Title' ? item.variant?.title : '' }}
                      </p>
                    </div>
                    
                    <div class="flex items-center justify-between mt-3">
                      <div class="flex items-center border border-gray-200 rounded-lg h-8 bg-white overflow-hidden shadow-sm">
                        <button (click)="updateQuantity(item, item.quantity - 1)" class="w-8 h-full flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-gray-50 transition-colors font-bold border-r border-gray-100">-</button>
                        <span class="w-10 text-center text-xs font-black text-gray-900">{{ item.quantity }}</span>
                        <button (click)="updateQuantity(item, item.quantity + 1)" class="w-8 h-full flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-gray-50 transition-colors font-bold border-l border-gray-100">+</button>
                      </div>

                      <p class="text-primary-600 font-black text-base whitespace-nowrap">
                        {{ currencyService.formatPrice(getItemDisplayPrice(item)) }}
                      </p>

                    </div>
                  </div>
                </div>
                }
              </div>

              <!-- Shipping Protection Toggle -->
              <div 
                (click)="toggleProtection()"
                class="mt-8 p-4 bg-white rounded-2xl border transition-all shadow-sm group cursor-pointer"
                [class.border-primary-500]="shopifyService.shippingProtection()"
                [class.bg-primary-50/30]="shopifyService.shippingProtection()"
                [class.border-gray-100]="!shopifyService.shippingProtection()"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                         [class.bg-primary-100]="shopifyService.shippingProtection()"
                         [class.text-primary-600]="shopifyService.shippingProtection()"
                         [class.bg-gray-100]="!shopifyService.shippingProtection()"
                         [class.text-gray-400]="!shopifyService.shippingProtection()">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div class="font-bold text-gray-900 text-sm">حماية الشحنة</div>
                      <div class="text-[10px] text-gray-500 font-medium">حماية ضد السرقة أو الضياع</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="font-black text-gray-900 text-sm">{{ currencyService.formatPrice(shopifyService.shippingProtectionCost) }}</span>
                    <!-- Toggle Switch UI -->
                    <div class="w-11 h-6 rounded-full relative transition-colors duration-300 shadow-inner"
                         [class.bg-primary-500]="shopifyService.shippingProtection()"
                         [class.bg-gray-200]="!shopifyService.shippingProtection()">
                      <div class="w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-md" 
                           [class.left-1]="!shopifyService.shippingProtection()"
                           [class.left-6]="shopifyService.shippingProtection()"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Trust Message -->
              <div class="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p class="text-[11px] text-blue-800 font-bold leading-relaxed">جميع مدفوعاتك مشفرة وآمنة تماماً. نشحن لك مباشرة من مستودعاتنا في السعودية.</p>
              </div>
            </ng-template>

             <!-- Footer -->
            <div *ngIf="cart.lineItems?.length" class="mt-auto pt-6 border-t border-gray-100 space-y-4 bg-white p-6 -mx-6 mb-[-1.5rem] shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                <div class="flex items-center justify-between text-gray-900 px-1">
                  <span class="text-gray-500 font-bold">المجموع الفرعي</span>
                  <span class="text-2xl font-black tracking-tight text-primary-600">
                     {{ currencyService.formatPrice(calculateDisplayTotal(cart)) }}
                  </span>
                </div>
                
                <p class="text-[10px] text-gray-400 text-center">شامل الضريبة والشحن سيحسب عند الدفع</p>

                <button 
                (click)="redirectToCheckout()"
                class="w-full flex items-center justify-center gap-3 py-5 bg-gray-900 text-white font-black text-lg tracking-wide rounded-full hover:bg-primary-600 transition-all shadow-xl shadow-gray-200 active:scale-[0.98] transform duration-200"
                >
                  <span>إتمام الطلب بأمان</span>
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
            </div>
          </ng-container>

        </div>
      </div>
    </div>
  `
})
export class CartDrawerComponent implements OnInit {
  cart$: Observable<any>;
  cartOpen$: Observable<boolean>;

  currencyService = inject(CurrencyService);
  shopifyService = inject(ShopifyService);

  constructor() {
    this.cart$ = this.shopifyService.cart$;
    this.cartOpen$ = this.shopifyService.cartOpen$;
  }

  ngOnInit() { }

  closeCart() {
    this.shopifyService.closeCart();
  }

  toggleProtection() {
    this.shopifyService.toggleShippingProtection();
  }

  getItemDisplayPrice(item: any): number {
    const basePrice = this.parseFloat(item.variant?.price?.amount || item.variant?.price || 0);
    return basePrice * item.quantity;
  }


  calculateDisplayTotal(cart: any): number {
    const items = this.getFilteredItems(cart);
    const itemsTotal = items.reduce((acc, item) => acc + this.getItemDisplayPrice(item), 0);

    // Subtotal in Shopify already includes protection as a line item if added, 
    // but here we are filtering protection out in getFilteredItems.
    // So we add it back manually if active to show correct total.
    const protectionCost = this.shopifyService.shippingProtection() ? this.shopifyService.shippingProtectionCost : 0;

    return itemsTotal + protectionCost;
  }


  updateQuantity(item: any, quantity: number) {
    if (quantity < 1) {
      this.removeItem(item);
      return;
    }

    const allIds = item.allIds || [item.id];
    const primaryId = allIds[0];
    const otherIds = allIds.slice(1);

    const updates = [{ id: primaryId, quantity }];
    otherIds.forEach((id: string) => updates.push({ id, quantity: 0 }));

    this.shopifyService.updateLineItems(updates);
  }

  removeItem(item: any) {
    const allIds = item.allIds || [item.id];
    this.shopifyService.removeItems(allIds);
  }

  getFilteredItems(cart: any) {
    const rawItems = cart?.lineItems?.filter((item: any) => item.variant?.id !== this.shopifyService.getProtectionVariantId()) || [];

    // Group items by variant ID
    const groupedMap = new Map<string, any>();

    rawItems.forEach((item: any) => {
      const variantId = item.variant?.id || item.id;
      if (groupedMap.has(variantId)) {
        const existing = groupedMap.get(variantId);
        existing.quantity += item.quantity;
        if (!existing.allIds) existing.allIds = [existing.id];
        existing.allIds.push(item.id);
      } else {
        groupedMap.set(variantId, { ...item, allIds: [item.id] });
      }
    });

    return Array.from(groupedMap.values());
  }


  parseFloat(val: any): number {
    return parseFloat(val || 0);
  }

  redirectToCheckout() {
    this.shopifyService.redirectToCheckout();
  }
}
