
import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CurrencyService } from '../../services/currency.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- Main Header Container -->
    <div class="fixed top-4 left-0 right-0 z-50 flex flex-col items-center px-4 transition-all duration-300" [class.-translate-y-2]="scrolled()">
      
      <!-- Navbar -->
      <header class="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl transition-all duration-300 hover:bg-white/85 hover:shadow-2xl relative z-20">
        <div class="px-6 h-16 flex items-center justify-between">
          
          <!-- Mobile Menu Button -->
          <button (click)="toggleMenu()" class="md:hidden p-2 text-gray-700 hover:text-primary-600 focus:outline-none transition-transform active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              @if (isMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>

          <!-- Logo -->
          <a routerLink="/" class="text-2xl font-black text-primary-700 tracking-tight flex items-center gap-2 drop-shadow-sm hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <span class="hidden xs:inline">نوريفا</span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-1 bg-white/30 p-1 rounded-full border border-white/20">
            <a routerLink="/" routerLinkActive="bg-white text-primary-700 shadow-sm" [routerLinkActiveOptions]="{exact: true}" class="px-5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-primary-700 transition-all">الرئيسية</a>
            <a routerLink="/products" routerLinkActive="bg-white text-primary-700 shadow-sm" class="px-5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-primary-700 transition-all">المنتجات</a>
            <a routerLink="/about" routerLinkActive="bg-white text-primary-700 shadow-sm" class="px-5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-primary-700 transition-all">عن نوريفا</a>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-2 sm:gap-3">
             <a routerLink="/contact" class="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
              تواصل معنا
            </a>

            <!-- Login / Profile -->
            <a routerLink="/login" class="p-2 hover:bg-white/50 rounded-full transition-colors relative group text-gray-700 hover:text-primary-600" [title]="authService.isLoggedIn() ? 'حسابي' : 'تسجيل الدخول'">
               @if (authService.isLoggedIn()) {
                 <div class="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold border border-primary-200">
                    {{ authService.currentUser()?.firstName?.charAt(0) }}
                 </div>
               } @else {
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
               }
            </a>
            
            <button (click)="toggleCart()" class="p-2 hover:bg-white/50 rounded-full transition-colors relative group" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              @if (cartService.totalItems() > 0) {
                <span class="absolute -top-1 -right-1 h-5 w-5 bg-primary-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                  {{ cartService.totalItems() }}
                </span>
              }
            </button>
          </div>
        </div>

        <!-- Mobile Menu Overlay -->
        @if (isMenuOpen()) {
          <div class="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl rounded-b-2xl overflow-hidden animate-in slide-in-from-top-4 duration-200 shadow-xl">
            <nav class="flex flex-col p-4 gap-2">
              <a (click)="closeMenu()" routerLink="/" routerLinkActive="bg-primary-50 text-primary-700" [routerLinkActiveOptions]="{exact: true}" class="px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-3">
                <svg class="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                الرئيسية
              </a>
              <a (click)="closeMenu()" routerLink="/products" routerLinkActive="bg-primary-50 text-primary-700" class="px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-3">
                 <svg class="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                المنتجات
              </a>
              <a (click)="closeMenu()" routerLink="/login" routerLinkActive="bg-primary-50 text-primary-700" class="px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-3">
                 <svg class="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                {{ authService.isLoggedIn() ? 'حسابي' : 'تسجيل الدخول' }}
              </a>
              <a (click)="closeMenu()" routerLink="/tracking" routerLinkActive="bg-primary-50 text-primary-700" class="px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-3">
                <svg class="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                تتبع الطلب
              </a>
              <button (click)="closeMenu(); toggleCart()" class="w-full text-right px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-3">
                <div class="relative">
                   <svg class="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                   @if (cartService.totalItems() > 0) {
                    <span class="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center border-2 border-white">
                      {{ cartService.totalItems() }}
                    </span>
                   }
                </div>
                سلة المشتريات
              </button>
            </nav>
          </div>
        }
      </header>

      <!-- Liquid Glass Bubble Slider (Horizontal) -->
      <div class="mt-1 relative z-10 animate-in slide-in-from-top-2 fade-in duration-700 max-w-full">
         <div class="bg-gradient-to-r from-primary-50/90 to-white/90 backdrop-blur-lg border border-primary-100/50 rounded-full py-2 px-6 shadow-lg shadow-primary-900/5 flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse flex-shrink-0"></span>
            
            <div class="h-6 overflow-hidden w-64 md:w-80 relative">
               <div class="flex transition-transform duration-700 ease-out h-full items-center" 
                    [style.transform]="'translateX(' + (activeSlide() * 100) + '%)'">
                  @for (msg of messages; track msg; let i = $index) {
                     <div class="min-w-full text-center flex items-center justify-center">
                        <span class="text-primary-900 text-xs md:text-sm font-bold whitespace-nowrap">{{ msg }}</span>
                     </div>
                  }
               </div>
            </div>
         </div>
      </div>

    </div>
    
    <!-- Cart Slider / Bottom Sheet -->
    @if (isCartOpen()) {
      <div class="fixed inset-0 z-[100] flex flex-col justify-end md:flex-row md:justify-end" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm fade-in" (click)="closeCart()"></div>
        
        <!-- Panel -->
        <div class="relative w-full md:max-w-md bg-white shadow-2xl flex flex-col slide-in-panel z-10 
                    h-[85vh] rounded-t-3xl md:h-full md:rounded-none md:rounded-l-2xl">
          
          <!-- Mobile Handle -->
          <div class="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-3 mb-1 md:hidden"></div>

          <!-- Drawer Header -->
          <div class="flex items-center justify-between px-6 py-4 md:py-5 border-b border-gray-100">
            <h2 class="text-xl font-black text-gray-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              سلة المشتريات
              <span class="text-sm font-normal text-gray-500 mr-2">({{cartService.totalItems()}} منتج)</span>
            </h2>
            <button (click)="closeCart()" class="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Drawer Body -->
          <div class="flex-1 overflow-y-auto p-6">
            @if (cartService.items().length > 0) {
              <ul class="space-y-6">
                @for (item of cartService.items(); track item.product.id + (item.variant?.name || '') + (item.priceOverride || '')) {
                  <li class="flex gap-4">
                    <!-- Image -->
                    <div class="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                      <img [src]="item.variant?.image || item.product.images[0]" class="w-full h-full object-cover">
                    </div>
                    
                    <!-- Info -->
                    <div class="flex-1">
                      <div class="flex justify-between items-start mb-1">
                        <h3 class="font-bold text-gray-900 text-sm line-clamp-2">{{ item.product.title }}</h3>
                        <button (click)="cartService.removeFromCart(item)" class="text-gray-300 hover:text-red-500 transition-colors">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      
                      @if (item.variant) {
                        <p class="text-xs text-gray-500 mb-2">اللون: <span class="text-gray-700 font-medium">{{ item.variant.name }}</span></p>
                      }

                      <div class="flex justify-between items-end mt-2">
                        <div class="flex items-center border border-gray-200 rounded-md h-7 bg-white">
                          <button (click)="cartService.updateQuantity(item, item.quantity - 1)" class="px-2 h-full text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-r-md transition-colors font-bold text-sm">-</button>
                          <span class="w-6 text-center text-xs font-bold text-gray-900">{{ item.quantity }}</span>
                          <button (click)="cartService.updateQuantity(item, item.quantity + 1)" class="px-2 h-full text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-l-md transition-colors font-bold text-sm">+</button>
                        </div>
                        <div class="flex flex-col text-left">
                           <span class="font-bold text-primary-600 text-sm">{{ currencyService.formatPrice((item.priceOverride || item.product.price) * item.quantity) }}</span>
                           @if(item.priceOverride) {
                               <span class="text-[10px] text-green-600 font-bold bg-green-50 px-1 rounded">عرض خاص</span>
                           }
                        </div>
                      </div>
                    </div>
                  </li>
                }
              </ul>
            } @else {
              <div class="h-full flex flex-col items-center justify-center text-center text-gray-500">
                <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p class="font-bold text-gray-900 mb-1">السلة فارغة</p>
                <p class="text-sm mb-6">لم تقم بإضافة أي منتجات بعد</p>
                <a routerLink="/products" (click)="closeCart()" class="text-primary-600 font-bold text-sm hover:underline cursor-pointer">تسوق الآن</a>
              </div>
            }
          </div>

          <!-- Drawer Footer -->
          @if (cartService.items().length > 0) {
            <div class="border-t border-gray-100 p-6 bg-gray-50">
              
              <!-- Shipping Protection Toggle -->
              <div class="flex items-center justify-between mb-6 bg-white p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-primary-400 transition-colors" (click)="cartService.toggleShippingProtection()">
                <div class="flex items-center gap-3">
                   <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                   </div>
                   <div>
                      <div class="font-bold text-gray-900 text-sm">حماية الشحنة</div>
                      <div class="text-xs text-gray-500">ضمان ضد السرقة والضياع</div>
                   </div>
                </div>
                <div class="flex items-center gap-2">
                   <span class="font-bold text-gray-900 text-sm">{{ currencyService.formatPrice(cartService.shippingProtectionCost) }}</span>
                   <div class="w-10 h-6 bg-gray-200 rounded-full relative transition-colors duration-300" [class.bg-primary-600]="cartService.shippingProtection()">
                      <div class="w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-300" 
                           [class.left-1]="!cartService.shippingProtection()"
                           [class.left-5]="cartService.shippingProtection()"></div>
                   </div>
                </div>
              </div>

              <div class="flex justify-between items-center mb-4">
                <span class="text-gray-600 font-medium">المجموع الفرعي</span>
                <span class="font-black text-xl text-gray-900">{{ currencyService.formatPrice(cartService.totalPrice()) }}</span>
              </div>
              <p class="text-xs text-gray-400 mb-6 text-center">شامل الضريبة والشحن سيحسب عند الدفع</p>
              
              <div class="grid grid-cols-2 gap-3">
                 <a routerLink="/cart" (click)="closeCart()" class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-bold hover:bg-white hover:border-gray-400 transition-all text-sm">
                  عرض السلة
                 </a>
                 <a routerLink="/checkout" (click)="closeCart()" class="flex items-center justify-center px-4 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-500/20 text-sm">
                  إتمام الطلب
                 </a>
              </div>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }
    .fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    .slide-in-panel {
      animation: slideInBottom 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @media (min-width: 768px) {
      .slide-in-panel {
        animation: slideInSide 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideInBottom {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    @keyframes slideInSide {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartService = inject(CartService);
  currencyService = inject(CurrencyService);
  authService = inject(AuthService);
  
  isMenuOpen = signal(false);
  isCartOpen = signal(false);
  
  // Announcements
  messages = [
    'شحن مجاني لجميع دول الخليج ✈️',
    'خصومات حصرية بمناسبة السنة الجديدة 🎉'
  ];
  activeSlide = signal(0);
  intervalId: any;
  scrolled = signal(false);

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.activeSlide.update(v => (v + 1) % this.messages.length);
    }, 4000);

    window.addEventListener('scroll', this.onWindowScroll);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  onWindowScroll = () => {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  toggleCart() {
    this.isCartOpen.update(v => !v);
  }

  closeCart() {
    this.isCartOpen.set(false);
  }
}
