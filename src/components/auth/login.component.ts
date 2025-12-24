
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UserProfile } from '../../services/auth.service';
import { ShopifyService } from '../../services/shopify.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 pt-32 pb-20 flex items-center justify-center px-4 font-sans" dir="rtl">
      <div class="w-full max-w-md relative z-10">
        <!-- Card -->
        <div class="bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
          
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 mb-6">
               <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                 <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
               </svg>
            </div>
            <h1 class="text-2xl font-black text-gray-900 mb-2">
              {{ isRegisterMode() ? 'إنشاء حساب جديد' : 'مرحباً بك مجدداً' }}
            </h1>
            <p class="text-gray-500 text-sm font-medium">
              {{ isRegisterMode() ? 'انضم إلى عائلة نوريفا واستمتع بمزايا حصرية' : 'سجل دخولك للوصول إلى حسابك في نوريفا' }}
            </p>
          </div>

          <!-- Error Alert -->
          @if (errorMessage()) {
            <div class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p class="text-red-600 text-sm font-bold">{{ errorMessage() }}</p>
            </div>
          }

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-5">
            @if (isRegisterMode()) {
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2 text-right">
                  <label class="text-xs font-bold text-gray-700">الاسم الأول</label>
                  <input 
                    type="text" 
                    formControlName="firstName" 
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-sans"
                    placeholder="الاسم الأول"
                  >
                </div>
                <div class="space-y-2 text-right">
                  <label class="text-xs font-bold text-gray-700">اسم العائلة</label>
                  <input 
                    type="text" 
                    formControlName="lastName" 
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-sans"
                    placeholder="اسم العائلة"
                  >
                </div>
              </div>
            }

            <div class="space-y-2 text-right">
              <label class="text-xs font-bold text-gray-700">البريد الإلكتروني</label>
              <input 
                type="email" 
                formControlName="email" 
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-sans"
                placeholder="name@example.com"
              >
            </div>

            <div class="space-y-2 text-right">
              <div class="flex items-center justify-between px-1">
                 @if (!isRegisterMode()) {
                    <a href="#" class="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors">نسيت كلمة المرور؟</a>
                 }
                 <label class="text-xs font-bold text-gray-700">كلمة المرور</label>
              </div>
              <input 
                type="password" 
                formControlName="password" 
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-sans"
                placeholder="••••••••"
              >
              @if (isRegisterMode()) {
                <p class="text-[10px] text-gray-400">يجب أن تكون كلمة المرور 6 أحرف على الأقل</p>
              }
            </div>

            <button 
              type="submit" 
              [disabled]="loginForm.invalid || loading()" 
              class="w-full h-14 bg-gray-900 text-white font-bold text-lg rounded-xl mt-4 hover:bg-primary-600 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
               @if (loading()) {
                 <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
               }
               <span>{{ isRegisterMode() ? 'إنشاء الحساب' : 'تسجيل الدخول' }}</span>
            </button>
          </form>

          <!-- Footer -->
          <div class="mt-8 pt-8 border-t border-gray-100 text-center">
             <p class="text-gray-500 text-sm font-medium">
                {{ isRegisterMode() ? 'لديك حساب بالفعل؟' : 'ليس لديك حساب؟' }}
                <button type="button" (click)="toggleMode()" class="text-primary-600 font-bold hover:text-primary-700 transition-colors ml-1">
                  {{ isRegisterMode() ? 'سجل دخولك' : 'انضم إلينا الآن' }}
                </button>
             </p>
          </div>
        </div>

        <div class="text-center mt-8">
           <a routerLink="/" class="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-bold">
             <svg class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
             العودة للرئيسية
           </a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  fb = inject(FormBuilder);
  shopifyService = inject(ShopifyService);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm: FormGroup;
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  isRegisterMode = signal(false);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: [''],
      lastName: ['']
    });
  }

  toggleMode() {
    this.isRegisterMode.update(val => !val);
    this.errorMessage.set(null);
    if (this.isRegisterMode()) {
      this.loginForm.get('firstName')?.setValidators([Validators.required]);
      this.loginForm.get('lastName')?.setValidators([Validators.required]);
    } else {
      this.loginForm.get('firstName')?.clearValidators();
      this.loginForm.get('lastName')?.clearValidators();
    }
    this.loginForm.get('firstName')?.updateValueAndValidity();
    this.loginForm.get('lastName')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.errorMessage.set(null);
      const { email, password, firstName, lastName } = this.loginForm.value;

      if (this.isRegisterMode()) {
        // Register flow
        this.shopifyService.registerUser(firstName, lastName, email, password).pipe(
          switchMap(() => this.shopifyService.loginUser(email, password)),
          switchMap(token => {
            localStorage.setItem('customer_token', token);
            return this.shopifyService.getCustomerInfo(token);
          })
        ).subscribe({
          next: (customer: any) => this.handleSuccess(customer),
          error: (err) => this.handleError(err)
        });
      } else {
        // Login flow
        this.shopifyService.loginUser(email, password).pipe(
          switchMap(token => {
            localStorage.setItem('customer_token', token);
            return this.shopifyService.getCustomerInfo(token);
          })
        ).subscribe({
          next: (customer: any) => this.handleSuccess(customer),
          error: (err) => this.handleError(err)
        });
      }
    }
  }

  private handleSuccess(customer: any) {
    if (customer) {
      this.authService.login({
        email: customer.email,
        firstName: customer.firstName || 'عميل',
        lastName: customer.lastName || 'نوريفا',
        phone: customer.phone || '',
        city: customer.defaultAddress?.city || '',
        country: customer.defaultAddress?.country || 'SA',
        address: customer.defaultAddress?.address1 || ''
      });
      this.router.navigate(['/']);
    } else {
      this.errorMessage.set('فشل في استرداد بيانات العميل');
    }
    this.loading.set(false);
  }

  private handleError(err: any) {
    this.loading.set(false);
    this.errorMessage.set(err.message || 'حدث خطأ غير متوقع');
  }
}
