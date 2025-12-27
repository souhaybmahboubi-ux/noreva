
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-gray-900 text-gray-300 py-12 pb-32 md:pb-12 border-t border-white/5">
      <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="col-span-1 lg:col-span-2">
          <h3 class="text-3xl font-black text-white mb-6 flex items-center gap-3">
            <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
               </svg>
            </div>
            نوريفا
          </h3>
          <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
            نوريفا هو وجهتك الأولى للمنتجات المبتكرة التي تجمع بين الذكاء في التصميم والعملية في الاستخدام. نحن نسعى دائماً لتقديم حلول تجعل حياتك أسهل وأكثر أماناً.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-white font-black text-lg mb-6 flex items-center gap-2">
             <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
             روابط سريعة
          </h4>
          <ul class="space-y-4 text-sm font-bold">
            <li><a routerLink="/about" class="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">من نحن</a></li>
            <li><a routerLink="/tracking" class="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">تتبع الطلب</a></li>
            <li><a routerLink="/shipping" class="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">سياسة الشحن والتوصيل</a></li>
          </ul>
        </div>

        <div>
           <h4 class="text-white font-black text-lg mb-6 flex items-center gap-2">
             <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
             الدعم والخصوصية
          </h4>
          <ul class="space-y-4 text-sm font-bold">
            <li><a routerLink="/privacy" class="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">سياسة الخصوصية</a></li>
            <li><a routerLink="/terms" class="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">شروط الاستخدام</a></li>
            <li><a routerLink="/contact" class="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">اتصل بنا</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/5 mt-16 pt-8 text-center px-4">
        <p class="text-xs text-gray-500 font-bold">
          &copy; 2024 متجر نوريفا. جميع الحقوق محفوظة. صنع بكل ❤️ لعملائنا في الخليج.
        </p>
      </div>
    </footer>
  `
})
export class FooterComponent { }
