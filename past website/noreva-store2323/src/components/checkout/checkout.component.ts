
import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CurrencyService } from '../../services/currency.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="bg-gray-50 min-h-screen pt-40 pb-20">
      <div class="container mx-auto px-4 max-w-6xl">
        
        @if (orderComplete()) {
          <!-- Success State -->
          <div class="max-w-2xl mx-auto bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100 animate-in zoom-in duration-500">
            <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 class="text-4xl font-black text-gray-900 mb-4">شكراً لطلبك!</h1>
            <p class="text-gray-600 text-lg mb-8">تم استلام طلبك بنجاح رقم <span class="font-bold text-gray-900">#NOR-{{ orderNumber() }}</span>. سنقوم بإرسال تفاصيل الشحن إلى بريدك الإلكتروني قريباً.</p>
            <a routerLink="/" class="inline-block bg-primary-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-500/30">
              العودة للرئيسية
            </a>
          </div>
        } @else {
          <!-- Checkout Form -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            <!-- Right Column: Form -->
            <div class="lg:col-span-7">
              <div class="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                
                @if(!authService.isLoggedIn()) {
                  <div class="mb-6 p-4 bg-primary-50 rounded-xl border border-primary-100 flex items-center justify-between">
                     <span class="text-sm font-bold text-primary-800">لديك حساب بالفعل؟</span>
                     <a routerLink="/login" class="text-sm font-black text-primary-600 underline">سجل دخولك لحفظ بياناتك</a>
                  </div>
                }

                <h2 class="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">1</span>
                  بيانات الشحن
                </h2>
                
                <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" class="space-y-6">
                  
                  <!-- Contact -->
                  <div class="space-y-4">
                    <h3 class="text-sm font-bold text-gray-900">معلومات التواصل</h3>
                    <div>
                      <input type="email" formControlName="email" placeholder="البريد الإلكتروني" 
                             class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                             [class.border-red-500]="isFieldInvalid('email')">
                      @if (isFieldInvalid('email')) { <span class="text-red-500 text-xs mt-1 block">البريد الإلكتروني مطلوب</span> }
                    </div>
                    <div>
                      <input type="tel" formControlName="phone" placeholder="رقم الجوال (05xxxxxxxx)" 
                             class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                             [class.border-red-500]="isFieldInvalid('phone')">
                      @if (isFieldInvalid('phone')) { <span class="text-red-500 text-xs mt-1 block">رقم الجوال مطلوب</span> }
                    </div>
                  </div>

                  <hr class="border-gray-100 my-6">

                  <!-- Address -->
                  <div class="space-y-4">
                    <h3 class="text-sm font-bold text-gray-900">عنوان التوصيل</h3>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <input type="text" formControlName="firstName" placeholder="الاسم الأول" 
                               class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                               [class.border-red-500]="isFieldInvalid('firstName')">
                      </div>
                      <div>
                        <input type="text" formControlName="lastName" placeholder="اسم العائلة" 
                               class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                               [class.border-red-500]="isFieldInvalid('lastName')">
                      </div>
                    </div>
                    
                    <div>
                      <select formControlName="country" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all appearance-none">
                        <option value="SA">المملكة العربية السعودية</option>
                        <option value="AE">الإمارات العربية المتحدة</option>
                        <option value="KW">الكويت</option>
                        <option value="QA">قطر</option>
                        <option value="BH">البحرين</option>
                        <option value="OM">عمان</option>
                      </select>
                    </div>

                    <div class="grid grid-cols-3 gap-4">
                      <div class="col-span-1">
                         <input type="text" formControlName="city" placeholder="المدينة" 
                               class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                               [class.border-red-500]="isFieldInvalid('city')">
                      </div>
                      <div class="col-span-2">
                        <input type="text" formControlName="address" placeholder="اسم الشارع / الحي" 
                               class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                               [class.border-red-500]="isFieldInvalid('address')">
                      </div>
                    </div>
                  </div>

                  <hr class="border-gray-100 my-6">

                  <!-- Payment -->
                  <div class="space-y-4">
                    <h2 class="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                      <span class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">2</span>
                      طريقة الدفع
                    </h2>
                    
                    <div class="space-y-3">
                      <label class="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all"
                             [class.border-primary-500]="checkoutForm.get('paymentMethod')?.value === 'card'"
                             [class.bg-primary-50]="checkoutForm.get('paymentMethod')?.value === 'card'"
                             [class.border-gray-200]="checkoutForm.get('paymentMethod')?.value !== 'card'">
                        <div class="flex items-center gap-3">
                          <input type="radio" formControlName="paymentMethod" value="card" class="text-primary-600 focus:ring-primary-500 w-5 h-5">
                          <span class="font-bold text-gray-700">بطاقة ائتمان / مدى</span>
                        </div>
                        <div class="flex gap-2">
                           <div class="h-6 w-10 bg-white rounded border border-gray-200 flex items-center justify-center text-[8px]">VISA</div>
                           <div class="h-6 w-10 bg-white rounded border border-gray-200 flex items-center justify-center text-[8px]">MADA</div>
                        </div>
                      </label>

                       <label class="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all"
                             [class.border-primary-500]="checkoutForm.get('paymentMethod')?.value === 'apple'"
                             [class.bg-primary-50]="checkoutForm.get('paymentMethod')?.value === 'apple'"
                             [class.border-gray-200]="checkoutForm.get('paymentMethod')?.value !== 'apple'">
                        <div class="flex items-center gap-3">
                          <input type="radio" formControlName="paymentMethod" value="apple" class="text-primary-600 focus:ring-primary-500 w-5 h-5">
                          <span class="font-bold text-gray-700">Apple Pay</span>
                        </div>
                        <div class="h-6 w-10 bg-white rounded border border-gray-200 flex items-center justify-center text-[8px]">APPLE</div>
                      </label>

                      <label class="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all"
                             [class.border-primary-500]="checkoutForm.get('paymentMethod')?.value === 'cod'"
                             [class.bg-primary-50]="checkoutForm.get('paymentMethod')?.value === 'cod'"
                             [class.border-gray-200]="checkoutForm.get('paymentMethod')?.value !== 'cod'">
                        <div class="flex items-center gap-3">
                          <input type="radio" formControlName="paymentMethod" value="cod" class="text-primary-600 focus:ring-primary-500 w-5 h-5">
                          <span class="font-bold text-gray-700">الدفع عند الاستلام</span>
                        </div>
                        <span class="text-xs text-gray-500 font-medium">رسوم إضافية 15 ر.س</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <!-- Left Column: Summary -->
            <div class="lg:col-span-5">
              <div class="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-36">
                <h3 class="text-xl font-bold text-gray-900 mb-6">ملخص الطلب</h3>
                
                <div class="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  @for (item of cartService.items(); track item.product.id) {
                    <div class="flex gap-4 items-center">
                      <div class="relative w-16 h-16 bg-gray-50 rounded-lg border border-gray-200 flex-shrink-0">
                         <img [src]="item.variant?.image || item.product.images[0]" class="w-full h-full object-cover rounded-lg">
                         <span class="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{{ item.quantity }}</span>
                      </div>
                      <div class="flex-grow">
                        <h4 class="font-bold text-gray-900 text-sm line-clamp-2">{{ item.product.title }}</h4>
                        @if(item.variant) { <p class="text-xs text-gray-500">{{ item.variant.name }}</p> }
                      </div>
                      <div class="flex flex-col text-left">
                        <span class="font-bold text-gray-900 text-sm">{{ currencyService.formatPrice((item.priceOverride || item.product.price) * item.quantity) }}</span>
                         @if(item.priceOverride) {
                            <span class="text-[10px] text-green-600 font-bold">عرض خاص</span>
                         }
                      </div>
                    </div>
                  }
                </div>

                <div class="border-t border-gray-100 pt-4 space-y-3">
                  <div class="flex justify-between text-gray-600">
                    <span>المجموع الفرعي</span>
                    <span class="font-medium">{{ currencyService.formatPrice(cartService.totalPrice() - (cartService.shippingProtection() ? cartService.shippingProtectionCost : 0)) }}</span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span>الشحن</span>
                    <span class="text-green-600 font-bold text-sm">مجاني</span>
                  </div>
                   @if (cartService.shippingProtection()) {
                     <div class="flex justify-between text-blue-600 animate-in fade-in slide-in-from-top-1">
                        <span class="flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                          حماية الشحنة
                        </span>
                        <span class="font-medium">{{ currencyService.formatPrice(cartService.shippingProtectionCost) }}</span>
                     </div>
                   }
                   @if (checkoutForm.get('paymentMethod')?.value === 'cod') {
                    <div class="flex justify-between text-gray-600 animate-in fade-in slide-in-from-top-1">
                      <span>رسوم الدفع عند الاستلام</span>
                      <span class="font-medium">15 ر.س</span>
                    </div>
                   }
                </div>

                <div class="border-t border-gray-100 pt-6 mt-6">
                  <div class="flex justify-between items-end mb-1">
                    <span class="font-bold text-gray-900 text-lg">الإجمالي</span>
                    <span class="font-black text-3xl text-primary-600">
                      {{ currencyService.formatPrice(getTotal()) }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-400 mt-2">شامل ضريبة القيمة المضافة</p>
                </div>

                <button 
                  (click)="onSubmit()"
                  [disabled]="isProcessing()"
                  class="w-full mt-8 bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-500/30 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  @if (isProcessing()) {
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري المعالجة...
                  } @else {
                    <span>تأكيد الطلب</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  }
                </button>
                
                <p class="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  معاملة آمنة ومحمية 100%
                </p>
              </div>
            </div>

          </div>
        }
      </div>
    </div>
  `
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
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

    // Auto-fill form effect
    effect(() => {
        const user = this.authService.currentUser();
        if (user) {
            this.checkoutForm.patchValue({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                city: user.city,
                country: user.country,
                address: user.address
            });
        }
    });
  }

  ngOnInit() {
    // If cart is empty, redirect to products
    if (this.cartService.items().length === 0 && !this.orderComplete()) {
      this.router.navigate(['/products']);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.checkoutForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getTotal() {
    let total = this.cartService.totalPrice();
    if (this.checkoutForm.get('paymentMethod')?.value === 'cod') {
      total += 15;
    }
    return total;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.isProcessing.set(true);
      
      // Simulate API call
      setTimeout(() => {
        this.isProcessing.set(false);
        this.orderNumber.set(Math.floor(10000 + Math.random() * 90000));
        this.orderComplete.set(true);
        this.cartService.clearCart();
        window.scrollTo(0,0);
      }, 2000);
    } else {
      // Mark all fields as touched to trigger validation errors
      this.checkoutForm.markAllAsTouched();
      // Scroll to top to see errors if any
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
