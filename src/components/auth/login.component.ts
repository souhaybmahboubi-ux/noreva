import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UserProfile } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CurrencyService } from '../../services/currency.service';
import { LanguageService } from '../../services/language.service';
import { ShopifyService } from '../../services/shopify.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white pt-32 md:pt-44 pb-20 selection:bg-black selection:text-white" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
      @if (authService.isLoggedIn()) {
        <!-- Dashboard Mode -->
        <div class="container mx-auto px-6 max-w-5xl">
          
          <!-- User Profile Header -->
          <div class="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-b border-gray-100 pb-16">
            <div class="flex flex-col md:flex-row items-center gap-8" [class.text-center]="true" [class.md:text-start]="!langService.isRtl()" [class.md:text-end]="langService.isRtl()">
              <div class="relative">
                <div class="w-32 h-32 bg-black text-white rounded-full flex items-center justify-center text-5xl font-black italic shadow-2xl">
                  {{ authService.currentUser()?.firstName?.charAt(0) }}
                </div>

              </div>
              <div>
                <h1 class="text-4xl font-black text-black italic tracking-tighter mb-2">
                  {{ langService.currentLang() === 'ar' ? 'أهلاً بكِ،' : 'Welcome back,' }} {{ authService.currentUser()?.firstName }}
                </h1>
                <p class="text-gray-400 font-medium text-sm">{{ authService.currentUser()?.email }}</p>
                <div class="flex items-center gap-4 mt-4 justify-center md:justify-start">

                  <button (click)="authService.logout()" class="text-xs font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">
                    {{ langService.currentLang() === 'ar' ? 'تسجيل الخروج' : 'LOGOUT' }}
                  </button>
                </div>
              </div>
            </div>
            
            <div class="hidden lg:flex gap-4">
              <div class="bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100 text-center min-w-[140px]">
                <span class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{{ langService.currentLang() === 'ar' ? 'إجمالي الطلبات' : 'TOTAL ORDERS' }}</span>
                <span class="text-3xl font-black italic">03</span>
              </div>
              <div class="bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100 text-center min-w-[140px]">
                <span class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{{ langService.currentLang() === 'ar' ? 'توفير العضوية' : 'MEMBERSHIP SAVE' }}</span>
                <span class="text-3xl font-black italic">15%</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <!-- Left Side: Order History -->
            <div class="lg:col-span-7 space-y-10">
              <div>
                <h3 class="text-xs font-black uppercase tracking-[0.4em] text-gray-300 mb-8 mr-2">{{ langService.currentLang() === 'ar' ? 'تاريخ الطلبات' : 'ORDER HISTORY' }}</h3>
                
                <div class="space-y-6">
                  @for (order of authService.currentUser()?.orders; track order.id) {
                    <div class="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group">
                      <div class="flex justify-between items-start mb-6">
                        <div>
                          <span class="block text-xs font-black text-gray-300 uppercase tracking-widest mb-1">{{ langService.currentLang() === 'ar' ? 'رقم الطلب' : 'ORDER NUMBER' }}</span>
                          <h4 class="font-black text-lg tracking-tight">#{{ order.id }}</h4>
                        </div>
                        <div [class]="getStatusClass(order.status)">
                          {{ getStatusLabel(order.status) }}
                        </div>
                      </div>

                      <div class="flex gap-3 overflow-x-auto no-scrollbar pb-4 mb-6">
                        @for (item of order.items; track item.title) {
                          <div class="w-16 h-16 bg-gray-50 rounded-2xl flex-shrink-0 border border-gray-50 overflow-hidden">
                            @if (item.img) {
                              <img [src]="item.img" class="w-full h-full object-cover">
                            } @else {
                              <div class="w-full h-full bg-gray-100 flex items-center justify-center text-[8px] text-gray-400">NO IMG</div>
                            }
                          </div>
                        }
                      </div>

                      <div class="flex justify-between items-center pt-6 border-t border-gray-50">
                        <span class="text-xs text-gray-400 font-bold uppercase tracking-widest">{{ order.date }}</span>
                        <span class="text-xl font-black">{{ currencyService.formatPrice(order.total) }}</span>
                      </div>
                    </div>
                  } @empty {
                    <div class="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
                      <p class="text-xs font-black uppercase tracking-widest text-gray-300">{{ langService.currentLang() === 'ar' ? 'لا توجد طلبات سابقة بعد' : 'NO PREVIOUS ORDERS YET' }}</p>
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Right Side: Saved Cart Items -->
            <div class="lg:col-span-5">
              <div class="sticky top-28">
                <h3 class="text-xs font-black uppercase tracking-[0.4em] text-gray-300 mb-8 mr-2">{{ langService.currentLang() === 'ar' ? 'حقيبتك الحالية' : 'YOUR CURRENT BAG' }}</h3>
                
                <div class="bg-gray-50 rounded-[3rem] p-8 border border-gray-100">
                  @if (cartService.items().length > 0) {
                    <div class="space-y-6 mb-10">
                      @for (item of cartService.items(); track item) {
                        <div class="flex gap-4 items-center">
                          <div class="w-16 h-16 rounded-2xl overflow-hidden border border-white shadow-sm flex-shrink-0 bg-white">
                             <img [src]="item.product.images[0]" class="w-full h-full object-cover">
                          </div>
                          <div class="flex-1 min-w-0">
                            <h4 class="font-black text-xs truncate mb-1">{{ item.product.title }}</h4>
                            <p class="text-xs font-black text-gray-400 uppercase tracking-widest">{{ langService.currentLang() === 'ar' ? 'الكمية:' : 'QTY:' }} {{ item.quantity }}</p>
                          </div>
                          <div class="text-left">
                            <span class="font-black text-sm">{{ currencyService.formatPrice(item.product.price * item.quantity) }}</span>
                          </div>
                        </div>
                      }
                    </div>

                    <div class="space-y-4 pt-6 border-t border-gray-200">
                      <div class="flex justify-between items-center">
                        <span class="text-xs font-black text-gray-400 uppercase tracking-widest">{{ langService.currentLang() === 'ar' ? 'الإجمالي' : 'TOTAL' }}</span>
                        <span class="text-2xl font-black italic">{{ currencyService.formatPrice(cartService.totalPrice()) }}</span>
                      </div>
                      <button (click)="handleCheckout()" [disabled]="isCheckingOut()" class="block w-full py-5 bg-black text-white text-center rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                        @if (isCheckingOut()) { <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> }
                        {{ langService.currentLang() === 'ar' ? 'إتمام الطلب الآن' : 'COMPLETE ORDER NOW' }}
                      </button>
                    </div>
                  } @else {
                    <div class="text-center py-10">
                      <p class="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">الحقيبة خالية</p>
                      <a routerLink="/products" class="text-xs font-black uppercase tracking-widest underline underline-offset-8">ابدئي التسوق</a>
                    </div>
                  }
                </div>

                <div class="mt-8 p-6 bg-black text-white rounded-[2rem] flex items-center gap-6 group overflow-hidden relative" (click)="copyCode('noreva26')">
                   <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                   <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-white/20 transition-colors">
                      <span class="text-lg">🏷️</span>
                   </div>
                   <div class="relative z-10 flex-1">
                      <h4 class="font-black text-xs uppercase tracking-widest mb-1">{{ langService.currentLang() === 'ar' ? 'كود خصم حصري' : 'MEMBER EXCLUSIVE' }}</h4>
                      <p class="text-xs opacity-60 leading-tight mb-2">{{ langService.currentLang() === 'ar' ? 'استخدمي الكود التالي لخصم 10%:' : 'Use this code for 10% OFF:' }}</p>
                      <div class="bg-white/10 px-3 py-1.5 rounded-lg inline-flex items-center gap-3 cursor-pointer hover:bg-white/20 transition-colors">
                         <span class="font-mono font-bold tracking-widest text-[#c19b6e]">noreva26</span>
                         <span class="text-[9px] opacity-50 uppercase tracking-widest">{{ langService.currentLang() === 'ar' ? 'نسخ' : 'COPY' }}</span>
                      </div>
                      <p class="text-[9px] opacity-40 mt-2 uppercase tracking-wider">{{ langService.currentLang() === 'ar' ? 'استخدمي هذا الكود لطلبك الأول فقط' : 'Use this code for your first order only' }}</p>
                   </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
      } @else {
        <div class="container mx-auto px-4 flex items-center justify-center">
            <div class="w-full max-w-lg">
                    <!-- Header -->
                    <div class="text-center mb-12">
                       <h3 class="text-sm md:text-base font-serif italic text-gray-900 mb-3 tracking-wide">
                         {{ isLoginMode() ? (langService.currentLang() === 'ar' ? 'مرحباً بعودتك' : 'Welcome Back') : (langService.currentLang() === 'ar' ? 'انضمي إلينا' : 'Join the Club') }}
                       </h3>
                       <h1 class="text-4xl md:text-6xl font-serif text-black leading-none uppercase mb-4">
                         {{ isLoginMode() ? (langService.currentLang() === 'ar' ? 'تسجيل الدخول' : 'MEMBER LOGIN') : (langService.currentLang() === 'ar' ? 'عضوية جديدة' : 'REGISTER') }}
                       </h1>
                       <p class="text-[10px] font-sans tracking-widest text-gray-400 uppercase">
                         {{ isLoginMode() ? (langService.currentLang() === 'ar' ? 'للوصول إلى ملفك الشخصي' : 'ACCESS YOUR DASHBOARD') : (langService.currentLang() === 'ar' ? 'لتجربة تسوق فريدة' : 'FOR A UNIQUE EXPERIENCE') }}
                       </p>
                    </div>

                    <!-- Error Message -->
                    @if (errorMessage()) {
                      <div class="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                        {{ errorMessage() }}
                      </div>
                    }

                    <!-- Form -->
                    <form [formGroup]="authForm" (ngSubmit)="onSubmit()" class="space-y-5">
                       
                       @if (!isLoginMode()) {
                         <!-- Name Fields -->
                         <div class="flex gap-4">
                           <div class="w-1/2">
                             <input type="text" formControlName="firstName" 
                                    [placeholder]="langService.currentLang() === 'ar' ? 'الاسم الأول' : 'FIRST NAME'"
                                    class="w-full h-12 md:h-14 px-4 border border-black/20 focus:border-black focus:outline-none text-xs md:text-sm font-bold bg-transparent placeholder:text-gray-400">
                           </div>
                           <div class="w-1/2">
                             <input type="text" formControlName="lastName" 
                                    [placeholder]="langService.currentLang() === 'ar' ? 'العائلة' : 'LAST NAME'"
                                    class="w-full h-12 md:h-14 px-4 border border-black/20 focus:border-black focus:outline-none text-xs md:text-sm font-bold bg-transparent placeholder:text-gray-400">
                           </div>
                         </div>
                       }

                       <!-- Email -->
                       <input type="email" formControlName="email" 
                              [placeholder]="langService.currentLang() === 'ar' ? 'البريد الإلكتروني' : 'EMAIL ADDRESS'"
                              class="w-full h-12 md:h-14 px-4 border border-black/20 focus:border-black focus:outline-none text-xs md:text-sm font-bold bg-transparent placeholder:text-gray-400">

                       <!-- Password -->
                       <div class="relative">
                          <input [type]="showPassword() ? 'text' : 'password'" formControlName="password" 
                                 [placeholder]="langService.currentLang() === 'ar' ? 'كلمة المرور' : 'PASSWORD'"
                                 class="w-full h-12 md:h-14 px-4 border border-black/20 focus:border-black focus:outline-none text-xs md:text-sm font-bold bg-transparent placeholder:text-gray-400">
                          <button type="button" (click)="showPassword.set(!showPassword())" class="absolute top-0 bottom-0 px-4 text-gray-400 hover:text-black transition-colors ltr:right-0 rtl:left-0 flex items-center">
                             <span class="text-[10px] font-black uppercase tracking-widest">{{ showPassword() ? 'HIDE' : 'SHOW' }}</span>
                          </button>
                       </div>

                       <!-- Submit Button (Beige) -->
                       <button type="submit" [disabled]="authForm.invalid || isLoading()" 
                               class="w-full h-12 md:h-16 bg-[#ebeae6] hover:bg-[#dedcd6] text-black font-serif font-bold tracking-[0.2em] uppercase transition-colors text-xs md:text-xl shadow-sm disabled:opacity-50 mt-6 md:mt-8">
                          @if (isLoading()) {
                            {{ langService.currentLang() === 'ar' ? 'جاري التحقق...' : 'VERIFYING...' }}
                          } @else {
                            {{ isLoginMode() ? (langService.currentLang() === 'ar' ? 'دخول' : 'SIGN IN') : (langService.currentLang() === 'ar' ? 'تسجيل' : 'CREATE ACCOUNT') }}
                          }
                       </button>

                    </form>

                    <!-- Toggle Mode Link -->
                    <div class="mt-8 md:mt-12 text-center">
                       <button (click)="toggleMode()" class="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black border-b border-transparent hover:border-black transition-all pb-1">
                         {{ isLoginMode() ? (langService.currentLang() === 'ar' ? 'ليس لديكِ حساب؟ انضمي لنا' : 'NO ACCOUNT? CREATE ONE') : (langService.currentLang() === 'ar' ? 'لديكِ عضوية؟ سجلي دخولكِ' : 'ALREADY A MEMBER? LOGIN') }}
                       </button>
                    </div>

                 </div>
           </div>
      }
    </div>

    <!-- Welcome Popup (Global) -->
    @if (showWelcomePopup()) {
      <div class="fixed inset-0 z-[200] flex items-center justify-center px-4 animate-in fade-in duration-300">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" (click)="closePopup()"></div>
        <div class="bg-white rounded-[2rem] p-8 md:p-12 w-full max-w-lg relative shadow-2xl animate-in zoom-in-95 duration-300 text-center">
            <button (click)="closePopup()" class="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            
            <div class="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl shadow-xl">
              🎉
            </div>

            <h2 class="text-3xl md:text-5xl font-serif text-black mb-4 italic tracking-tight">
              {{ langService.currentLang() === 'ar' ? 'أهلاً بكِ في العائلة!' : 'Welcome to the Club!' }}
            </h2>
            
            <p class="text-gray-500 font-medium mb-8 leading-relaxed">
              {{ langService.currentLang() === 'ar' ? 'كعربون محبة، تفضلي هذا الخصم الحصري لطلبك القادم.' : 'As a thank you for joining, here is an exclusive discount for your next order.' }}
            </p>

            <div class="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 mb-8 relative group cursor-pointer hover:border-black transition-colors" (click)="copyCode('noreva26')">
               <span class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{{ langService.currentLang() === 'ar' ? 'كود الخصم الخاص بك' : 'YOUR DISCOUNT CODE' }}</span>
               <div class="flex items-center justify-center gap-4">
                  <span class="text-3xl md:text-4xl font-black text-[#c19b6e] tracking-wider font-mono">noreva26</span>
                  <span class="bg-black text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    {{ langService.currentLang() === 'ar' ? 'نسخ' : 'COPY' }}
                  </span>
               </div>
            </div>

            <button (click)="closePopup()" class="w-full py-4 bg-black text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-gray-900 transition-all shadow-lg">
              {{ langService.currentLang() === 'ar' ? 'تسوقي الآن' : 'START SHOPPING' }}
            </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class LoginComponent {
  fb: FormBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  cartService = inject(CartService);
  currencyService = inject(CurrencyService);
  langService = inject(LanguageService);
  shopifyService = inject(ShopifyService);
  router: Router = inject(Router);

  isLoginMode = signal(true);
  showPassword = signal(false);
  isLoading = signal(false);
  isCheckingOut = signal(false);
  errorMessage = signal<string | null>(null);
  authForm: FormGroup;


  constructor() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: [''],
      lastName: ['']
    });
  }

  showWelcomePopup = signal(false);

  toggleMode() {
    this.isLoginMode.update(v => !v);
    this.showPassword.set(false);
    this.authForm.reset();
  }

  async onSubmit() {
    if (this.authForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      const { email, password, firstName, lastName } = this.authForm.value;

      try {
        if (this.isLoginMode()) {
          const result = await this.authService.login(email, password);
          if (!result.success) {
            this.errorMessage.set(this.langService.currentLang() === 'ar' ? 'لا يوجد حساب بهذه المعلومات' : 'No account found with this information');
          } else {
            this.showWelcomePopup.set(true);
          }
        } else {
          // Changed to Call Register (Real Implementation)
          const result = await this.authService.register(email, password, firstName, lastName);
          if (!result.success) {
            this.errorMessage.set(this.langService.currentLang() === 'ar' ? 'فشل التسجيل: ' + result.message : 'Registration failed: ' + result.message);
          } else {
            this.showWelcomePopup.set(true);
          }
        }
      } catch (error) {
        this.errorMessage.set(this.langService.currentLang() === 'ar' ? 'حدث خطأ ما، يرجى المحاولة لاحقاً' : 'An error occurred, please try again');
      } finally {
        this.isLoading.set(false);
      }
    }
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
    alert(this.langService.currentLang() === 'ar' ? 'تم نسخ الكود!' : 'Code copied!');
  }

  closePopup() {
    this.showWelcomePopup.set(false);
  }

  getStatusLabel(status: string): string {
    const isAr = this.langService.currentLang() === 'ar';
    const labels: Record<string, string> = {
      'delivered': isAr ? 'تم التوصيل' : 'DELIVERED',
      'processing': isAr ? 'جاري التجهيز' : 'PROCESSING',
      'shipped': isAr ? 'في الطريق إليكِ' : 'SHIPPED'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const base = "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ";
    const types: Record<string, string> = {
      'delivered': base + 'bg-green-50 text-green-500 border border-green-100',
      'processing': base + 'bg-blue-50 text-blue-500 border border-blue-100',
      'shipped': base + 'bg-orange-50 text-orange-500 border border-orange-100'
    };
    return types[status] || base;
  }

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
