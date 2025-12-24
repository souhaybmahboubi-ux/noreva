
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UserProfile } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 pt-40 pb-20 flex items-center justify-center px-4">
      <div class="bg-white w-full max-w-md rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        <!-- Header -->
        <div class="bg-primary-600 p-8 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <h1 class="text-3xl font-black text-white mb-2">
              {{ isLoginMode() ? 'تسجيل الدخول' : 'إنشاء حساب جديد' }}
            </h1>
            <p class="text-primary-100 text-sm">
              {{ isLoginMode() ? 'مرحباً بعودتك إلى نوريفا' : 'انضم إلينا واحفظ بياناتك لطلب أسرع' }}
            </p>
          </div>
        </div>

        <!-- Form -->
        <div class="p-8">
          @if (authService.isLoggedIn()) {
             <div class="text-center py-8">
                <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  {{ authService.currentUser()?.firstName?.charAt(0) }}
                </div>
                <h2 class="text-xl font-bold text-gray-900 mb-2">مرحباً، {{ authService.currentUser()?.firstName }}!</h2>
                <p class="text-gray-500 mb-8">أنت مسجل دخول حالياً.</p>
                <div class="flex flex-col gap-3">
                   <a routerLink="/products" class="w-full py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors">تصفح المنتجات</a>
                   <button (click)="authService.logout()" class="w-full py-3 border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors">تسجيل الخروج</button>
                </div>
             </div>
          } @else {
            <form [formGroup]="authForm" (ngSubmit)="onSubmit()" class="space-y-4">
              
              @if (!isLoginMode()) {
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">الاسم الأول</label>
                    <input type="text" formControlName="firstName" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">العائلة</label>
                    <input type="text" formControlName="lastName" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all">
                  </div>
                </div>
              }

              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
                <input type="email" formControlName="email" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">كلمة المرور</label>
                <input type="password" formControlName="password" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all">
              </div>

              @if (!isLoginMode()) {
                 <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">رقم الجوال</label>
                    <input type="tel" formControlName="phone" placeholder="05xxxxxxxx" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all">
                 </div>
                 
                 <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">المدينة</label>
                    <input type="text" formControlName="city" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all">
                 </div>
              }

              <button type="submit" [disabled]="authForm.invalid" class="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4">
                {{ isLoginMode() ? 'دخول' : 'تسجيل حساب' }}
              </button>
            </form>

            <div class="mt-6 text-center">
              <button (click)="toggleMode()" class="text-sm text-gray-500 hover:text-primary-600 font-bold transition-colors">
                {{ isLoginMode() ? 'ليس لديك حساب؟ سجل الآن' : 'لديك حساب بالفعل؟ سجل دخولك' }}
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  isLoginMode = signal(true);

  authForm: FormGroup;

  constructor() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Fields below are technically optional for login, but used for signup simulation
      firstName: [''],
      lastName: [''],
      phone: [''],
      city: ['']
    });
  }

  toggleMode() {
    this.isLoginMode.update(v => !v);
    this.authForm.reset();
  }

  onSubmit() {
    if (this.authForm.valid) {
      const formVal = this.authForm.value;
      
      // Simulation of user data based on form
      // In a real app, this would come from the backend
      const userProfile: UserProfile = {
        email: formVal.email,
        firstName: formVal.firstName || 'عميل',
        lastName: formVal.lastName || 'نوريفا',
        phone: formVal.phone || '',
        city: formVal.city || '',
        country: 'SA',
        address: ''
      };

      if (this.isLoginMode()) {
         // Simulate Login - In real app verify credentials
         // Here we just pretend they logged in and updated their local profile if needed
         // We'll just create a dummy profile if fields are missing for login mode simulation
         const mockLoginProfile: UserProfile = {
             email: formVal.email,
             firstName: 'عميل',
             lastName: 'مميز',
             phone: '0500000000',
             city: 'الرياض',
             country: 'SA',
             address: 'شارع العليا'
         };
         this.authService.login(mockLoginProfile);
      } else {
         // Register
         this.authService.login(userProfile);
      }
      
      this.router.navigate(['/']);
    }
  }
}
