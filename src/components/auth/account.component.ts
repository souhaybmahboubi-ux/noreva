
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ShopifyService } from '../../services/shopify.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="min-h-screen bg-gray-50 pt-32 pb-20 font-sans" dir="rtl">
      <div class="container mx-auto px-4 max-w-5xl">
        
        <!-- Welcome Header -->
        <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-6">
            <div class="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
              <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div>
              <h1 class="text-2xl font-black text-gray-900 mb-1">مرحباً، {{ authService.currentUser()?.firstName }}</h1>
              <p class="text-gray-500">{{ authService.currentUser()?.email }}</p>
            </div>
          </div>
          <button (click)="logout()" class="inline-flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            تسجيل الخروج
          </button>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          
          <!-- Profile Quick Info -->
          <div class="lg:col-span-1 space-y-6">
            <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                عنوان الشحن الافتراضي
              </h3>
              @if (authService.currentUser()?.address) {
                <div class="space-y-2 text-gray-600 text-sm">
                  <p class="font-bold text-gray-900">{{ authService.currentUser()?.firstName }} {{ authService.currentUser()?.lastName }}</p>
                  <p>{{ authService.currentUser()?.address }}</p>
                  <p>{{ authService.currentUser()?.city }}, {{ authService.currentUser()?.country }}</p>
                  <p>{{ authService.currentUser()?.phone }}</p>
                </div>
              } @else {
                <p class="text-gray-400 text-sm italic">لم يتم تعيين عنوان افتراضي بعد.</p>
              }
            </div>

            <div class="bg-primary-900 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden group">
               <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
               <h3 class="text-lg font-black mb-2 relative z-10">خدمة العملاء</h3>
               <p class="text-white/70 text-sm mb-4 relative z-10">هل لديك استفسار عن طلبك؟ نحن هنا للمساعدة.</p>
               <a routerLink="/contact" class="inline-flex items-center gap-2 text-sm font-bold bg-white text-primary-900 px-4 py-2 rounded-lg relative z-10">
                 تواصل معنا
               </a>
            </div>
          </div>

          <!-- Order History -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
               <div class="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 class="text-xl font-black text-gray-900">طلباتك السابقة</h3>
                  <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">{{ orders().length }} طلبات</span>
               </div>

               @if (loadingOrders()) {
                 <div class="p-20 text-center">
                   <div class="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                   <p class="text-gray-500 mt-4 font-bold">جاري تحميل طلباتك...</p>
                 </div>
               } @else if (orders().length === 0) {
                 <div class="p-20 text-center">
                    <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                      <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">لا توجد طلبات بعد</h4>
                    <p class="text-gray-500 mb-6 text-sm">ابدأ التسوق الآن واكتشف منتجاتنا المميزة.</p>
                    <a routerLink="/products" class="inline-flex items-center justify-center bg-gray-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-600 transition-all">تسوق الآن</a>
                 </div>
               } @else {
                  <div class="divide-y divide-gray-100">
                    @for (order of orders(); track order.id) {
                      <div class="p-6 hover:bg-gray-50/50 transition-colors">
                        <div class="flex flex-col md:flex-row justify-between gap-4 mb-4">
                          <div class="flex items-center gap-4">
                            <div class="bg-gray-100 px-4 py-2 rounded-xl text-center">
                              <span class="block text-[10px] text-gray-500 font-bold uppercase">رقم الطلب</span>
                              <span class="text-gray-900 font-black">#{{ order.orderNumber }}</span>
                            </div>
                            <div>
                               <p class="text-xs text-gray-500 font-bold mb-1">{{ formatDate(order.processedAt) }}</p>
                               <div class="flex gap-2">
                                  <span [class]="getStatusClass(order.financialStatus)" class="px-2 py-0.5 rounded-full text-[10px] font-bold">
                                    {{ getFinancialStatus(order.financialStatus) }}
                                  </span>
                                  <span [class]="getStatusClass(order.fulfillmentStatus)" class="px-2 py-0.5 rounded-full text-[10px] font-bold">
                                    {{ getFulfillmentStatus(order.fulfillmentStatus) }}
                                  </span>
                               </div>
                            </div>
                          </div>
                          <div class="text-left">
                             <p class="text-xs text-gray-500 font-bold mb-1">الإجمالي</p>
                             <p class="text-xl font-black text-primary-600">{{ currencyService.formatPrice(order.totalPrice.amount) }}</p>
                          </div>
                        </div>

                        <!-- Mini Line Items -->
                        <div class="flex flex-wrap gap-3">
                           @for (item of order.lineItems.edges; track item.node.title) {
                             <div class="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                <img [src]="item.node.variant?.image?.url || 'https://placehold.co/50'" class="w-8 h-8 object-cover rounded shadow-sm">
                                <div class="text-[10px]">
                                   <p class="text-gray-900 font-bold line-clamp-1 max-w-[150px]">{{ item.node.title }}</p>
                                   <p class="text-gray-500">الكمية: {{ item.node.quantity }}</p>
                                </div>
                             </div>
                           }
                        </div>
                      </div>
                    }
                  </div>
               }
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AccountComponent implements OnInit {
    authService = inject(AuthService);
    shopifyService = inject(ShopifyService);
    currencyService = inject(CurrencyService);
    router = inject(Router);

    orders = signal<any[]>([]);
    loadingOrders = signal(true);

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }
        this.loadOrders();
    }

    loadOrders() {
        const token = localStorage.getItem('customer_token');
        if (token) {
            this.shopifyService.getCustomerOrders(token).subscribe({
                next: (orders) => {
                    this.orders.set(orders);
                    this.loadingOrders.set(false);
                },
                error: (err) => {
                    console.error('Error loading orders', err);
                    this.loadingOrders.set(false);
                }
            });
        } else {
            this.loadingOrders.set(false);
        }
    }

    logout() {
        this.authService.logout();
        localStorage.removeItem('customer_token');
        this.router.navigate(['/login']);
    }

    formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getFinancialStatus(status: string) {
        const map: any = {
            'PAID': 'تم الدفع',
            'PENDING': 'بانتظار الدفع',
            'REFUNDED': 'مسترجع',
            'PARTIALLY_REFUNDED': 'مسترجع جزئياً'
        };
        return map[status] || status;
    }

    getFulfillmentStatus(status: string) {
        const map: any = {
            'FULFILLED': 'تم الشحن',
            'UNFULFILLED': 'قيد التجهيز',
            'PARTIALLY_FULFILLED': 'تم شحن جزء',
            'ON_HOLD': 'معلق'
        };
        return map[status] || 'قيد المعالجة';
    }

    getStatusClass(status: string) {
        if (['PAID', 'FULFILLED'].includes(status)) return 'bg-green-50 text-green-600';
        if (['PENDING', 'UNFULFILLED'].includes(status)) return 'bg-yellow-50 text-yellow-600';
        if (['REFUNDED', 'ON_HOLD'].includes(status)) return 'bg-red-50 text-red-600';
        return 'bg-gray-50 text-gray-600';
    }
}
