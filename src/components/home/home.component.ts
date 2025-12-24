
import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, CommonModule],
  template: `
    <!-- Hero Section -->
    <section class="relative bg-white overflow-hidden min-h-[85vh] flex items-center pt-32 pb-12">
      <!-- Background Blobs -->
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <div class="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="relative z-10 order-2 lg:order-1 text-center lg:text-right">
          
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full mb-6 shadow-lg transform rotate-1 hover:rotate-0 transition-transform cursor-default">
            <span class="text-xs font-bold">🔥 الهبة رقم #1 في المدارس</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
            التفتيش <span class="text-red-500 underline decoration-4 decoration-yellow-400">مفاجئ؟</span><br/>
            جوالك <span class="text-primary-600">بأمان!</span> 😎
          </h1>
          
          <p class="text-lg md:text-xl text-gray-600 mb-8 leading-loose max-w-lg mx-auto lg:mx-0 font-medium">
            مطارة نوريڤا الذكية.. شكلها يروي عطشك، وداخلها مخبا سري يشيل جوالك (حتى البرو ماكس)، سماعاتك، وفلوسك.
            <br/><span class="text-gray-900 font-bold">خلك ذيب، وريح بالك من قروشة الإدارة.</span>
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a [routerLink]="['/product', 'stealth-hydrate-1']" class="inline-flex items-center justify-center px-8 py-4 text-xl font-black text-white bg-primary-600 rounded-2xl hover:bg-primary-700 transition-all shadow-xl hover:shadow-primary-500/40 transform hover:-translate-y-1 active:scale-95 w-full sm:w-auto">
              اطلبها قبل التفتيش 🏃‍♂️
            </a>
          </div>

          <!-- Social Proof -->
          <div class="mt-10 flex items-center justify-center lg:justify-start gap-4">
             <div class="flex -space-x-4 -space-x-reverse">
                <img src="https://api.dicebear.com/9.x/micah/svg?seed=Ahmed" class="w-12 h-12 rounded-full border-4 border-white bg-gray-100" alt="Avatar">
                <img src="https://api.dicebear.com/9.x/micah/svg?seed=Sara" class="w-12 h-12 rounded-full border-4 border-white bg-gray-100" alt="Avatar">
                <img src="https://api.dicebear.com/9.x/micah/svg?seed=Fahad" class="w-12 h-12 rounded-full border-4 border-white bg-gray-100" alt="Avatar">
                <div class="w-12 h-12 rounded-full border-4 border-white bg-black text-white flex items-center justify-center text-xs font-bold">+5k</div>
             </div>
             <div class="text-right">
               <div class="flex text-yellow-500 text-sm">★★★★★</div>
               <p class="text-xs font-bold text-gray-500">طالب وطالبة يعتمدون عليها</p>
             </div>
          </div>
        </div>
        
        <!-- Hero Image -->
        <div class="relative order-1 lg:order-2 flex justify-center h-full items-center">
           <div class="absolute inset-0 bg-gradient-to-tr from-primary-200/40 to-transparent rounded-full blur-[80px]"></div>
           
           <!-- Animated Circle Text -->
           <div class="absolute top-0 right-0 md:right-10 animate-spin-slow hidden md:block z-20">
              <svg viewBox="0 0 100 100" width="140" height="140">
                <defs>
                  <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text font-size="11" font-weight="bold" fill="#0d9488">
                  <textPath xlink:href="#circle">
                    • مخبا سري • آمنة 100% • ضد التفتيش • 
                  </textPath>
                </text>
              </svg>
           </div>

           <div class="relative z-10 w-full max-w-md aspect-square flex items-center justify-center animate-float">
             <img 
               [ngSrc]="product.images[0]" 
               width="600" 
               height="600" 
               priority
               alt="Stealth Hydrate Bottle" 
               class="drop-shadow-2xl object-contain max-h-[500px] lg:max-h-[600px] hover:scale-105 transition-transform duration-500 cursor-pointer"
               [routerLink]="['/product', 'stealth-hydrate-1']"
             >
             
             <!-- Floating Badge 1 -->
             <div class="absolute bottom-20 -left-4 md:-left-10 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/50 animate-bounce-slow flex items-center gap-3">
                <div class="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                   <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <div class="text-right">
                   <p class="text-[10px] text-gray-500 font-bold">تشيل لغاية</p>
                   <p class="text-sm font-black text-gray-900">iPhone 17 Pro Max</p>
                </div>
             </div>

              <!-- Floating Badge 2 -->
             <div class="absolute top-10 -right-4 md:right-0 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/50 animate-bounce-delayed flex items-center gap-3">
                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                   <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div class="text-right">
                   <p class="text-[10px] text-gray-500 font-bold">النتيجة</p>
                   <p class="text-sm font-black text-gray-900">نجحت بالتفتيش ✅</p>
                </div>
             </div>

           </div>
        </div>
      </div>
    </section>

    <!-- Optimized Ticker Tape -->
    <div class="bg-gradient-to-r from-primary-800 to-primary-900 text-white overflow-hidden py-4 relative z-20 shadow-xl">
       <!-- Duplicate the content multiple times to ensure no gaps on wide screens -->
       <div class="flex items-center gap-12 animate-marquee whitespace-nowrap">
          @for (item of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]; track item) {
             <span class="text-xl font-bold mx-8 flex items-center gap-6 opacity-90">
               <span>تصميم ذكي</span>
               <span class="w-2 h-2 rounded-full bg-white/30"></span>
               <span>ألوان عصرية</span>
               <span class="w-2 h-2 rounded-full bg-white/30"></span>
               <span>جودة عالية</span>
               <span class="w-2 h-2 rounded-full bg-white/30"></span>
               <span>خصوصية تامة</span>
               <span class="w-2 h-2 rounded-full bg-white/30"></span>
             </span>
          }
       </div>
    </div>

    <!-- Scenarios / Pain Points -->
    <section class="py-24 bg-gray-50 relative">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6">وين تقدر تستخدمها؟ 🤔</h2>
          <p class="text-xl text-gray-600">نوريڤا مب بس مطارة، هي خزنتك الخاصة وين ما تروح.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
           <!-- Card 1 -->
           <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div class="text-6xl mb-6">🏫</div>
              <h3 class="text-2xl font-black text-gray-900 mb-3">في المدرسة</h3>
              <p class="text-gray-600 font-medium leading-relaxed">
                جوالك، ايربودزك، وفلوس الفسحة. كلها داخل المطارة.
                <span class="block mt-2 text-green-600 font-bold">النتيجة: تمشي من عند الوكيل واثق!</span>
              </p>
           </div>

           <!-- Card 2 -->
           <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div class="text-6xl mb-6">🏋️‍♂️</div>
              <h3 class="text-2xl font-black text-gray-900 mb-3">في النادي (GYM)</h3>
              <p class="text-gray-600 font-medium leading-relaxed">
                ما يحتاج تشيل هم مفاتيحك وجوالك وين تحطهم وأنت تتمرن.
                <span class="block mt-2 text-primary-600 font-bold">خلهم جنبك وأنت ترفع أوزان.</span>
              </p>
           </div>

           <!-- Card 3 -->
           <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div class="text-6xl mb-6">✈️</div>
              <h3 class="text-2xl font-black text-gray-900 mb-3">في السفر والطلعات</h3>
              <p class="text-gray-600 font-medium leading-relaxed">
                رايح البحر؟ طالع مخيم؟ خبي فلوسك وأغراضك المهمة في مكان محد يتوقعه.
                <span class="block mt-2 text-blue-600 font-bold">أمان وحفظ للخصوصية.</span>
              </p>
           </div>
        </div>
      </div>
    </section>

    <!-- FOMO / CTA Section -->
    <section class="py-20 bg-primary-600 relative overflow-hidden">
       <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
       <div class="container mx-auto px-4 text-center relative z-10">
          <span class="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-6 backdrop-blur-sm border border-white/30">
             ⚠️ تنبيه: الكمية تخلص بسرعة
          </span>
          <h2 class="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
             لا تضيع الفرصة..<br/>
             خلك كشخة وآمن!
          </h2>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <a [routerLink]="['/product', 'stealth-hydrate-1']" class="w-full sm:w-auto bg-gray-900 text-white text-xl font-bold px-12 py-5 rounded-2xl shadow-2xl hover:scale-105 hover:bg-black transition-all duration-300 flex items-center justify-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                اطلب نسختك الحين
             </a>
             <div class="flex items-center gap-2 text-white/90 font-medium text-sm">
                <svg class="w-5 h-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                ضمان ذهبي لاسترجاع الأموال
             </div>
          </div>
       </div>
    </section>
  `,
  styles: [`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      /* Increased speed to 15s */
      animation: marquee 15s linear infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-spin-slow {
      animation: spin 15s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-bounce-slow {
      animation: bounce 3s infinite;
    }
    .animate-bounce-delayed {
      animation: bounce 3s infinite 1.5s;
    }
  `]
})
export class HomeComponent {
  productService = inject(ProductService);
  product = this.productService.getProduct('stealth-hydrate-1')!;
}
