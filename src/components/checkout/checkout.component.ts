
import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ShopifyService } from '../../services/shopify.service';
import { CurrencyService } from '../../services/currency.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="bg-gray-50 min-h-screen pt-40 pb-20 relative font-sans text-right" dir="rtl">
      
      <div class="container mx-auto px-4 max-w-6xl relative z-10">
        
        @if (orderComplete()) {
          <!-- Success State -->
          <div class="max-w-2xl mx-auto bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xl animate-in zoom-in duration-500">
            <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 class="text-4xl font-black text-gray-900 mb-4">تم الطلب بنجاح!</h1>
            <p class="text-gray-600 text-lg mb-8">
              شكراً لثقتك بنا. رقم طلبك هو <span class="font-bold text-gray-900">#NOR-{{ orderNumber() }}</span>.
              <br>سنرسل تفاصيل الشحن إلى بريدك الإلكتروني قريباً.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
               <a routerLink="/" class="inline-flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-10 rounded-xl hover:bg-gray-800 transition-all shadow-lg">العودة للرئيسية</a>
               <a routerLink="/tracking" class="inline-flex items-center justify-center bg-gray-100 text-gray-900 font-bold py-4 px-10 rounded-xl hover:bg-gray-200 transition-all">تتبع الطلب</a>
            </div>
          </div>
        } @else {
          <!-- Checkout Flow -->
          <div class="flex flex-col lg:flex-row gap-8 lg:items-start" *ngIf="shopifyService.cart$ | async; as cart">
            
            <!-- Right Column: Shipping Details Form -->
            <div class="lg:w-2/3 space-y-6">
              
              <!-- Profile Notice -->
              @if(!authService.isLoggedIn()) {
                <div class="bg-primary-50 border border-primary-100 p-4 rounded-xl flex items-center justify-between">
                   <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                         <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <div>
                        <h4 class="font-bold text-gray-900 text-sm">لديك حساب؟</h4>
                        <p class="text-gray-500 text-xs">سجل دخولك لحفظ بياناتك</p>
                      </div>
                   </div>
                   <a routerLink="/login" class="text-primary-600 font-bold text-sm hover:underline">تسجيل الدخول</a>
                </div>
              }

              <div class="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                
                  <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">1</span>
                    بيانات الشحن
                  </h2>
                  
                  <form [formGroup]="checkoutForm" class="space-y-6">
                    
                    <!-- Contact Section -->
                    <div class="grid md:grid-cols-2 gap-4">
                      <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-700">البريد الإلكتروني</label>
                        <input type="email" formControlName="email" 
                               class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                               [class.border-red-500]="isFieldInvalid('email')">
                      </div>
                      <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-700">رقم الجوال</label>
                        <input type="tel" formControlName="phone" placeholder="05xxxxxxxx"
                               class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                               [class.border-red-500]="isFieldInvalid('phone')">
                      </div>
                    </div>

                    <!-- Address Section -->
                    <div class="space-y-4">
                       <div class="grid md:grid-cols-2 gap-4">
                        <div class="space-y-1">
                          <label class="text-xs font-bold text-gray-700">الاسم الأول</label>
                          <input type="text" formControlName="firstName" 
                                 class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all">
                        </div>
                        <div class="space-y-1">
                          <label class="text-xs font-bold text-gray-700">اسم العائلة</label>
                          <input type="text" formControlName="lastName" 
                                 class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all">
                        </div>
                      </div>

                      <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-700">الدولة</label>
                        <div class="relative">
                          <select formControlName="country" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer">
                            <option value="SA">المملكة العربية السعودية</option>
                            <option value="AE">الإمارات العربية المتحدة</option>
                            <option value="KW">الكويت</option>
                            <option value="QA">قطر</option>
                            <option value="BH">البحرين</option>
                            <option value="OM">عمان</option>
                            <option value="LY">ليبيا</option>
                            <option value="EG">مصر</option>
                            <option value="IQ">العراق</option>
                            <option value="JO">الأردن</option>
                          </select>
                          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>

                      <div class="grid md:grid-cols-2 gap-4">
                        <div class="space-y-1">
                          <label class="text-xs font-bold text-gray-700">المدينة</label>
                          <input type="text" formControlName="city" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all">
                        </div>
                        <div class="space-y-1">
                          <label class="text-xs font-bold text-gray-700">العنوان / الحي</label>
                          <input type="text" formControlName="address" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all">
                        </div>
                      </div>
                    </div>

                    <div class="pt-6 border-t border-gray-100 mt-6">
                      <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">2</span>
                        طريقة الدفع
                      </h2>
                      
                      <div class="space-y-3">
                        <label class="group relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all"
                               [class.border-primary-500]="checkoutForm.get('paymentMethod')?.value === 'card'"
                               [class.bg-primary-50]="checkoutForm.get('paymentMethod')?.value === 'card'"
                               [class.border-gray-200]="checkoutForm.get('paymentMethod')?.value !== 'card'">
                          <div class="flex items-center gap-3">
                            <input type="radio" formControlName="paymentMethod" value="card" class="text-primary-600 focus:ring-primary-500 w-5 h-5">
                            <div class="flex flex-col">
                              <span class="font-bold text-gray-900">بطاقة ائتمان / مدى</span>
                            </div>
                          </div>
                          <div class="flex gap-2 opacity-80">
                             <img src="https://cdn.shopify.com/s/files/1/0649/3421/5739/files/visa.png?v=1733660500" alt="Visa" class="h-6">
                             <img src="https://cdn.shopify.com/s/files/1/0649/3421/5739/files/mada.png?v=1733660500" alt="Mada" class="h-6">
                          </div>
                        </label>

                        <label class="group relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all"
                               [class.border-primary-500]="checkoutForm.get('paymentMethod')?.value === 'cod'"
                               [class.bg-primary-50]="checkoutForm.get('paymentMethod')?.value === 'cod'"
                               [class.border-gray-200]="checkoutForm.get('paymentMethod')?.value !== 'cod'">
                          <div class="flex items-center gap-3">
                            <input type="radio" formControlName="paymentMethod" value="cod" class="text-primary-600 focus:ring-primary-500 w-5 h-5">
                            <div class="flex flex-col">
                              <span class="font-bold text-gray-900">الدفع عند الاستلام</span>
                              <span class="text-xs text-gray-500">+ {{ currencyService.formatPrice(15) }} رسوم إضافية</span>
                            </div>
                          </div>
                          <svg class="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </label>
                      </div>
                    </div>
                  </form>
              </div>
            </div>

            <!-- Left Column: Order Summary (Sticky) -->
            <div class="lg:w-1/3 sticky top-32">
               <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 class="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">ملخص الطلب</h3>
                  
                  <!-- Cart Items -->
                  <div class="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar rtl">
                    @for (item of getFilteredItems(cart); track item.id) {
                      <div class="flex gap-4 items-center">
                        <div class="relative w-16 h-16 bg-gray-50 rounded-lg border border-gray-200 flex-shrink-0">
                           <img [src]="item.variant?.image?.src || item.variant?.image" class="w-full h-full object-contain rounded-lg">
                           <span class="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{{ item.quantity }}</span>
                        </div>
                        <div class="flex-grow">
                          <h4 class="font-bold text-gray-900 text-sm line-clamp-1 leading-tight">{{ item.title }}</h4>
                          <p class="text-xs text-gray-500 mt-1">{{ item.variant?.title }}</p>
                        </div>
                        <div class="text-left">
                           <span class="font-bold text-gray-900 text-sm">{{ currencyService.formatPrice(getItemDisplayPrice(item)) }}</span>
                        </div>

                      </div>
                    }
                  </div>

                  <!-- Calculations -->
                  <div class="space-y-3 pt-4 border-t border-gray-100">
                    <div class="flex justify-between items-center text-gray-600 text-sm">
                      <span>المجموع الفرعي</span>
                      <span class="font-bold tabular-nums">{{ currencyService.formatPrice(getSubtotalExcludingProtection(cart)) }}</span>
                    </div>
                    <div class="flex justify-between items-center text-gray-600 text-sm">
                      <span>الشحن</span>
                      <span class="text-green-600 font-bold text-xs">مجاني</span>
                    </div>
                    @if (shopifyService.shippingProtection()) {
                      <div class="flex justify-between items-center text-blue-600 text-sm bg-blue-50 p-2 rounded-lg">
                        <span class="flex items-center gap-1 font-bold">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                          حماية الشحن
                        </span>
                        <span class="font-bold tabular-nums">{{ currencyService.formatPrice(shopifyService.shippingProtectionCost) }}</span>
                      </div>
                    }
                    @if (checkoutForm.get('paymentMethod')?.value === 'cod') {
                      <div class="flex justify-between items-center text-gray-600 text-sm">
                        <span>رسوم الدفع عند الاستلام</span>
                        <span class="font-bold tabular-nums">{{ currencyService.formatPrice(15) }}</span>
                      </div>
                    }
                  </div>

                  <!-- Final Total -->
                  <div class="pt-6 border-t border-gray-100 mt-4">
                    <div class="flex justify-between items-end mb-6">
                       <span class="font-black text-xl text-gray-900">الإجمالي</span>
                       <span class="text-3xl font-black text-primary-600 tabular-nums">{{ currencyService.formatPrice(calculateFinalTotal(cart)) }}</span>
                    </div>
                    <p class="text-xs text-gray-400 mb-6 -mt-4 text-left">شامل ضريبة القيمة المضافة</p>

                    <button 
                      (click)="onSubmit()"
                      [disabled]="isProcessing()"
                      class="w-full h-14 bg-gray-900 text-white rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      @if (isProcessing()) {
                         <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                         <span>جاري المعالجة...</span>
                      } @else {
                         <span>تأكيد الطلب</span>
                         <svg class="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      }
                    </button>
                    
                    <div class="flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs">
                       <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                       <span>تسوق آمن ومحمي 100%</span>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
    .custom-scrollbar.rtl { direction: rtl; }
  `]
})
export class CheckoutComponent implements OnInit {
  shopifyService = inject(ShopifyService);
  currencyService = inject(CurrencyService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);

  checkoutForm: FormGroup;
  isProcessing = signal(false);
  orderComplete = signal(false);
  orderNumber = signal(0);

  constructor() {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(9)]],
      country: ['SA', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['card', Validators.required]
    });

    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.checkoutForm.patchValue({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone || '',
          city: user.city || '',
          country: user.country || 'SA',
          address: user.address || ''
        });
      }
    });

    window.scrollTo(0, 0);
  }

  ngOnInit() { }

  isFieldInvalid(field: string): boolean {
    const control = this.checkoutForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getItemDisplayPrice(item: any): number {
    const basePrice = this.parseFloat(item.variant?.price?.amount || item.variant?.price || 0);
    return basePrice * item.quantity;
  }


  calculateFinalTotal(cart: any): number {
    const items = this.getFilteredItems(cart);
    const itemsTotal = items.reduce((acc, item) => acc + this.getItemDisplayPrice(item), 0);

    let total = itemsTotal;

    // Add protection
    if (this.shopifyService.shippingProtection()) {
      total += this.shopifyService.shippingProtectionCost;
    }

    // Add COD fee
    if (this.checkoutForm.get('paymentMethod')?.value === 'cod') {
      total += 15;
    }

    return total;
  }


  getSubtotalExcludingProtection(cart: any): number {
    const items = this.getFilteredItems(cart);
    return items.reduce((acc, item) => acc + this.getItemDisplayPrice(item), 0);
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
      } else {
        groupedMap.set(variantId, { ...item });
      }
    });

    return Array.from(groupedMap.values());
  }


  parseFloat(val: any): number {
    return parseFloat(val || 0);
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.isProcessing.set(true);
      setTimeout(() => {
        this.isProcessing.set(false);
        this.orderNumber.set(Math.floor(10000 + Math.random() * 90000));
        this.orderComplete.set(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2500);
    } else {
      this.checkoutForm.markAllAsTouched();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
