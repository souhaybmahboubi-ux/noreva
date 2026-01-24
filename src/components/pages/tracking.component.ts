import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white pt-32 md:pt-44 pb-20" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
      <div class="container mx-auto px-4 max-w-2xl text-center">
        
        <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
           </svg>
        </div>

        <h1 class="text-4xl font-black text-gray-900 mb-2 italic">
          {{ langService.currentLang() === 'ar' ? 'تتبع طلبكِ' : 'TRACK YOUR ORDER' }}
        </h1>
        <p class="text-xl text-black font-bold mb-8 uppercase tracking-tighter">NOREVA ORDER TRACKING</p>
        
        <div class="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
           <p class="text-lg text-gray-600 mb-8 leading-relaxed">
             {{ langService.currentLang() === 'ar' 
               ? 'شكراً لتسوقكِ من نوريڤا. نحن نعلم أنكِ متحمسة لاستلام طلبيتك، ولتسهيل الأمر عليكِ، خصصنا قناة مباشرة لمتابعة حالة الشحنات.' 
               : 'Thank you for shopping with Noreva. We know you are excited to receive your order, and to make it easier for you, we have dedicated a direct channel to track shipment status.' }}
           </p>

           <div class="bg-white p-6 rounded-2xl border border-gray-200 mb-8" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
              <h3 class="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                {{ langService.currentLang() === 'ar' ? 'كيف تتبعين شحنتك؟' : 'HOW TO TRACK YOUR SHIPMENT?' }}
              </h3>
              <p class="mb-4 text-gray-700">
                {{ langService.currentLang() === 'ar' ? 'الأمر بسيط جداً! لمعرفة مكان طلبك الحالي، يرجى اتباع الخطوة التالية:' : 'It’s very simple! To know the current location of your order, please follow this step:' }}
              </p>
              <p class="mb-4 text-gray-700">
                {{ langService.currentLang() === 'ar' ? 'قومي بإرسال رسالة تحتوي على' : 'Send a message containing your' }} 
                <span class="font-bold text-black">{{ langService.currentLang() === 'ar' ? 'رقم الطلب' : 'ORDER NUMBER' }}</span> 
                {{ langService.currentLang() === 'ar' ? 'و' : 'and' }} 
                <span class="font-bold text-black">{{ langService.currentLang() === 'ar' ? 'تفاصيلك' : 'DETAILS' }}</span> 
                {{ langService.currentLang() === 'ar' ? 'إلى بريدنا الإلكتروني:' : 'to our email:' }}
              </p>
              
              <a href="mailto:contact@trynoreva.store" class="block text-center text-2xl font-black text-black hover:text-gray-600 transition-colors dir-ltr font-mono bg-gray-50 py-3 rounded-xl border border-gray-100">
                contact@trynoreva.store
              </a>
           </div>

           <p class="text-sm text-gray-500">
              {{ langService.currentLang() === 'ar' 
                ? 'سيقوم فريق الدعم بمراجعة حالة الشحنة والرد عليكِ فوراً بتفاصيل الموقع وموعد الوصول المتوقع.' 
                : 'Our support team will review the shipment status and reply to you immediately with location details and expected arrival time.' }}
              <br>
              {{ langService.currentLang() === 'ar'
                ? 'إذا تأخر الطلب عن الموعد المتوقع، لا تترددي في مراسلتنا على نفس البريد الإلكتروني.'
                : 'If the order is delayed beyond the expected date, please do not hesitate to contact us at the same email.' }}
           </p>
        </div>

        <div class="mt-12">
          <a routerLink="/" class="text-gray-500 font-bold hover:text-black transition-colors uppercase tracking-widest text-xs">
            {{ langService.currentLang() === 'ar' ? 'العودة للرئيسية' : 'BACK TO HOME' }}
          </a>
        </div>

      </div>
    </div>
  `
})
export class TrackingComponent {
  langService = inject(LanguageService);
}
