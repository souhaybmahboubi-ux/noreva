
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UserProfile } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CurrencyService } from '../../services/currency.service';
import { LanguageService } from '../../services/language.service';


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
                <div class="absolute -bottom-2 -right-2 bg-[#e3e1dc] text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border-2 border-white">
                  {{ langService.currentLang() === 'ar' ? 'عضوية ملكية' : 'NOREVA ELITE' }}
                </div>
              </div>
              <div>
                <h1 class="text-4xl font-black text-black italic tracking-tighter mb-2">
                  {{ langService.currentLang() === 'ar' ? 'أهلاً بكِ،' : 'Welcome back,' }} {{ authService.currentUser()?.firstName }}
                </h1>
                <p class="text-gray-400 font-medium text-sm">{{ authService.currentUser()?.email }}</p>
                <div class="flex items-center gap-4 mt-4 justify-center md:justify-start">
                  <span class="text-xs font-black bg-gray-50 px-4 py-1.5 rounded-full uppercase tracking-widest text-gray-400 border border-gray-100">
                    {{ langService.currentLang() === 'ar' ? '12 نقطة نوريڤا' : '12 NOREVA POINTS' }}
                  </span>
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
                      <a routerLink="/checkout" class="block w-full py-5 bg-black text-white text-center rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all">إتمام الطلب الآن</a>
                    </div>
                  } @else {
                    <div class="text-center py-10">
                      <p class="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">الحقيبة خالية</p>
                      <a routerLink="/products" class="text-xs font-black uppercase tracking-widest underline underline-offset-8">ابدئي التسوق</a>
                    </div>
                  }
                </div>

                <div class="mt-8 p-6 bg-black text-white rounded-[2rem] flex items-center gap-6 group overflow-hidden relative">
                   <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                   <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-lg">🎁</span>
                   </div>
                   <div class="relative z-10">
                      <h4 class="font-black text-xs uppercase tracking-widest mb-1">{{ langService.currentLang() === 'ar' ? 'هدية حصرية' : 'EXCLUSIVE GIFT' }}</h4>
                      <p class="text-xs opacity-60 leading-tight">{{ langService.currentLang() === 'ar' ? 'طلبك القادم يحصل على خصم إضافي 5% تلقائياً' : 'Your next order automatically gets 5% extra discount' }}</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <!-- Auth Mode -->
        <div class="container mx-auto px-4 flex items-center justify-center">
          <div class="w-full max-w-md">
            
            <!-- Header -->
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-black text-black italic tracking-tighter uppercase mb-4">
                  {{ isLoginMode() ? (langService.currentLang() === 'ar' ? 'أهلاً بعودتكِ' : 'WELCOME BACK') : (langService.currentLang() === 'ar' ? 'عضوية نوريڤا' : 'NOREVA MEMBERSHIP') }}
                </h1>
                <p class="text-gray-400 font-medium text-sm">
                  {{ isLoginMode() ? (langService.currentLang() === 'ar' ? 'سجلي دخولكِ لتجربة جمالية فريدة' : 'Log in for a unique beauty experience') : (langService.currentLang() === 'ar' ? 'انضمي للنخبة واحفظي بياناتكِ لطلب أسرع' : 'Join the elite and save your details for faster ordering') }}
                </p>
            </div>

            @if (errorMessage()) {
              <div class="mb-6 p-5 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-xs md:text-sm font-bold text-center animate-in fade-in zoom-in-95 duration-300">
                {{ errorMessage() }}
              </div>
            }

            <!-- Form Container -->
            <div class="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-2xl">
              <form [formGroup]="authForm" (ngSubmit)="onSubmit()" class="space-y-6">
                
                @if (!isLoginMode()) {
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-black uppercase tracking-widest text-gray-300 mb-2 px-2">{{ langService.currentLang() === 'ar' ? 'الاسم الأول' : 'FIRST NAME' }}</label>
                      <input type="text" formControlName="firstName" class="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black focus:bg-white outline-none transition-all font-bold">
                    </div>
                    <div>
                      <label class="block text-xs font-black uppercase tracking-widest text-gray-300 mb-2 px-2">{{ langService.currentLang() === 'ar' ? 'العائلة' : 'LAST NAME' }}</label>
                      <input type="text" formControlName="lastName" class="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black focus:bg-white outline-none transition-all font-bold">
                    </div>
                  </div>
                }

                <div>
                  <label class="block text-xs font-black uppercase tracking-widest text-gray-300 mb-2 px-2">{{ langService.currentLang() === 'ar' ? 'البريد الإلكتروني' : 'EMAIL ADDRESS' }}</label>
                  <input type="email" formControlName="email" class="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black focus:bg-white outline-none transition-all font-bold">
                </div>

                <div>
                  <label class="block text-xs font-black uppercase tracking-widest text-gray-300 mb-2 px-2">{{ langService.currentLang() === 'ar' ? 'كلمة المرور' : 'PASSWORD' }}</label>
                  <div class="relative">
                    <input 
                      [type]="showPassword() ? 'text' : 'password'" 
                      formControlName="password" 
                      class="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black focus:bg-white outline-none transition-all font-bold ltr:pr-14 rtl:pl-14"
                    >
                    <button 
                      type="button" 
                      (click)="showPassword.set(!showPassword())"
                      class="absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors p-2 ltr:right-4 rtl:left-4"
                    >
                      @if (showPassword()) {
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.888 9.888L4.222 4.222m15.556 15.556l-5.666-5.666m5.666-5.666c.111.313.208.634.288.963C19.268 13.057 15.478 16 11 16c-.536 0-1.058-.046-1.562-.133M15.556 5.556a10.05 10.05 0 013.987 5.444M11 5a10.05 10.05 0 014.556 1.056M11 5c-4.478 0-8.268-2.943-9.543 7a9.97 9.97 0 001.563 3.029l5.858-5.858a3 3 0 014.243-4.243" /></svg>
                      } @else {
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      }
                    </button>
                  </div>
                  @if (!isLoginMode()) {
                    <p class="text-xs text-gray-400 mt-2 px-2">{{ langService.currentLang() === 'ar' ? 'أدخلي 6 أحرف أو أرقام على الأقل' : 'At least 6 characters' }}</p>
                  }
                </div>

                <button type="submit" [disabled]="authForm.invalid || isLoading()" class="w-full py-6 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 disabled:opacity-30 transition-all mt-6 flex items-center justify-center gap-3">
                  @if (isLoading()) {
                    <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{{ langService.currentLang() === 'ar' ? 'جاري التحقق...' : 'VERIFYING...' }}</span>
                  } @else {
                    {{ isLoginMode() ? (langService.currentLang() === 'ar' ? 'دخول للغرفة' : 'LOGIN TO ROOM') : (langService.currentLang() === 'ar' ? 'إنشاء العضوية' : 'CREATE ACCOUNT') }}
                  }
                </button>
              </form>

              <div class="mt-10 text-center">
                <button (click)="toggleMode()" class="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
                  {{ isLoginMode() ? (langService.currentLang() === 'ar' ? 'ليس لديكِ حساب؟ انضمي لنا' : 'NO ACCOUNT? JOIN US') : (langService.currentLang() === 'ar' ? 'لديكِ عضوية؟ سجلي دخولكِ' : 'HAVE ACCOUNT? LOG IN') }}
                </button>
              </div>
            </div>

            <div class="mt-12 text-center opacity-20">
               <span class="text-[9px] font-black uppercase tracking-[0.5em]">{{ langService.currentLang() === 'ar' ? 'دخول نوريڤا الخاص' : 'NOREVA ELITE ACCESS' }}</span>
            </div>
          </div>
        </div>
      }
    </div>
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
  router: Router = inject(Router);

  isLoginMode = signal(true);
  showPassword = signal(false);
  isLoading = signal(false);
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
          }
        } else {
          // Changed to Call Register (Real Implementation)
          const result = await this.authService.register(email, password, firstName, lastName);
          if (!result.success) {
            this.errorMessage.set(this.langService.currentLang() === 'ar' ? 'فشل التسجيل: ' + result.message : 'Registration failed: ' + result.message);
          }
        }
      } catch (error) {
        this.errorMessage.set(this.langService.currentLang() === 'ar' ? 'حدث خطأ ما، يرجى المحاولة لاحقاً' : 'An error occurred, please try again');
      } finally {
        this.isLoading.set(false);
      }
    }
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
}
