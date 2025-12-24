
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-gray-900 text-gray-300 py-12">
      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Brand -->
        <div class="col-span-1">
          <h3 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            نوريفا
          </h3>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-white font-bold mb-4">روابط سريعة</h4>
          <ul class="space-y-2 text-sm">
            <li><a routerLink="/about" class="hover:text-primary-400 transition-colors">من نحن</a></li>
            <li><a routerLink="/tracking" class="hover:text-primary-400 transition-colors">تتبع الطلب</a></li>
            <li><a routerLink="/shipping" class="hover:text-primary-400 transition-colors">سياسة الشحن والتوصيل</a></li>
            <li><a routerLink="/privacy" class="hover:text-primary-400 transition-colors">سياسة الخصوصية</a></li>
            <li><a routerLink="/terms" class="hover:text-primary-400 transition-colors">شروط الاستخدام</a></li>
            <li><a routerLink="/contact" class="hover:text-primary-400 transition-colors">اتصل بنا</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
        &copy; 2024 متجر نوريفا. جميع الحقوق محفوظة.
      </div>
    </footer>
  `
})
export class FooterComponent {}
