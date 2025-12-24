
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white pt-40 pb-20">
      <div class="container mx-auto px-4 max-w-2xl text-center">
        
        <div class="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
           </svg>
        </div>

        <h1 class="text-4xl font-black text-gray-900 mb-2">تتبع طلبك</h1>
        <p class="text-xl text-primary-600 font-bold mb-8">تابع رحلة طلبك إليك</p>
        
        <div class="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
           <p class="text-lg text-gray-600 mb-8 leading-relaxed">
             شكراً لتسوقكم من نوريڤا. نحن نعلم أنكم متحمسون لاستلام طلبيتك، ولتسهيل الأمر عليكم، خصصنا قناة مباشرة لمتابعة حالة الشحنات.
           </p>

           <div class="bg-white p-6 rounded-2xl border border-gray-200 mb-8 text-right">
              <h3 class="text-lg font-bold text-gray-900 mb-4 border-b pb-2">كيف تتبع شحنتك؟</h3>
              <p class="mb-4 text-gray-700">الأمر بسيط جداً! لمعرفة مكان طلبك الحالي، يرجى اتباع الخطوة التالية:</p>
              <p class="mb-4 text-gray-700">قم بإرسال رسالة تحتوي على <span class="font-bold text-primary-700">رقم الطلب</span> و <span class="font-bold text-primary-700">تفاصيلك</span> إلى بريدنا الإلكتروني:</p>
              
              <a href="mailto:contact@trynoreva.store" class="block text-center text-2xl font-black text-primary-600 hover:text-primary-700 transition-colors dir-ltr font-mono bg-primary-50 py-3 rounded-xl border border-primary-100 hover:bg-primary-100">
                contact@trynoreva.store
              </a>
           </div>

           <p class="text-sm text-gray-500">
              سيقوم فريق الدعم بمراجعة حالة الشحنة والرد عليك فوراً بتفاصيل الموقع وموعد الوصول المتوقع.
              <br>
              إذا تأخر الطلب عن الموعد المتوقع، لا تتردد في مراسلتنا على نفس البريد الإلكتروني.
           </p>
        </div>

        <div class="mt-12">
          <a routerLink="/" class="text-gray-500 font-bold hover:text-primary-600 transition-colors">العودة للرئيسية</a>
        </div>

      </div>
    </div>
  `
})
export class TrackingComponent {}
