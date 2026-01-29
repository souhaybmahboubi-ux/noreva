
import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CurrencyService } from '../../services/currency.service';
import { ShopifyService } from '../../services/shopify.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, CommonModule],
  template: `
    <div class="bg-noreva-cream min-h-screen pt-28 md:pt-36 pb-24" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
      <div class="container mx-auto px-6 max-w-7xl">
        
        <!-- Elegant Header Section -->
        <div class="text-center mb-16 md:mb-24">
          <span class="inline-block text-[10px] md:text-xs font-medium tracking-[0.3em] text-noreva-gold uppercase mb-4">
            {{ langService.currentLang() === 'ar' ? 'مجموعة حصرية' : 'EXCLUSIVE COLLECTION' }}
          </span>
          <h1 class="text-4xl md:text-6xl font-serif text-noreva-black mb-6">
            {{ langService.currentLang() === 'ar' ? 'رموش نوريڤا' : 'The Collection' }}
          </h1>
          <p class="text-noreva-taupe max-w-xl mx-auto font-normal text-base md:text-lg leading-relaxed">
            {{ langService.currentLang() === 'ar' 
              ? 'اكتشفي سر العيون الجذابة مع تقنيتنا المغناطيسية. رموش صُممت لتمنحكِ الأناقة في ثوانٍ.' 
              : 'Discover the secret to captivating eyes. Lashes designed to give you effortless elegance in seconds.' }}
          </p>
        </div>

        @if (isLoading()) {
          <div class="flex justify-center items-center py-24">
            <div class="w-12 h-12 relative">
              <div class="absolute inset-0 rounded-full border-2 border-noreva-champagne"></div>
              <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-noreva-gold animate-spin"></div>
            </div>
          </div>
        } @else {
          <!-- Products Grid - Minimal & Luxurious -->
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            @for (product of products(); track product.id) {
              <a [routerLink]="['/product', product.handle]" class="group block luxury-card bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-luxury border border-noreva-champagne/30">
                
                <!-- Image Container -->
                <div class="aspect-[4/5] bg-noreva-ivory relative overflow-hidden img-reveal">
                  <img 
                    [src]="product.imageUrl" 
                    class="w-full h-full object-cover" 
                    [alt]="product.title"
                  >
                  
                  <!-- Subtle Overlay on Hover -->
                  <div class="absolute inset-0 bg-noreva-black/0 group-hover:bg-noreva-black/5 transition-all duration-500"></div>
                  
                  <!-- Quick View Button (Desktop) -->
                  <div class="hidden md:flex absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <div class="w-full py-3 bg-white/95 backdrop-blur-sm rounded-xl text-center text-xs font-medium text-noreva-black tracking-wide">
                      {{ langService.currentLang() === 'ar' ? 'عرض التفاصيل' : 'View Details' }}
                    </div>
                  </div>
                </div>
                
                <!-- Product Info -->
                <div class="p-4 md:p-6 text-start">
                  <h2 class="text-sm md:text-lg font-medium text-noreva-black group-hover:text-noreva-gold transition-colors duration-300 mb-2 line-clamp-2">
                    {{ product.title }}
                  </h2>
                  <p class="hidden md:block text-noreva-taupe text-sm mb-4 line-clamp-2 leading-relaxed">
                    {{ product.description }}
                  </p>
                  <div class="flex items-center justify-between">
                    <span class="text-base md:text-xl font-serif text-noreva-black">
                      {{ product.price }} {{ product.currency }}
                    </span>
                    <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-noreva-ivory text-noreva-black flex items-center justify-center group-hover:bg-noreva-gold group-hover:text-white transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            }
          </div>

          <!-- Empty State -->
          @if (products().length === 0) {
            <div class="text-center py-24">
              <div class="w-20 h-20 mx-auto mb-8 rounded-full bg-noreva-champagne/30 flex items-center justify-center">
                <svg class="w-10 h-10 text-noreva-taupe" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 class="text-xl font-serif text-noreva-black mb-3">
                {{ langService.currentLang() === 'ar' ? 'لا توجد منتجات' : 'No Products Found' }}
              </h3>
              <p class="text-noreva-taupe text-sm">
                {{ langService.currentLang() === 'ar' ? 'يرجى المحاولة لاحقاً' : 'Please check back later' }}
              </p>
            </div>
          }
        }

        <!-- Brand Promise Section -->
        <div class="mt-24 pt-16 border-t border-noreva-champagne/50">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div class="p-4">
              <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-noreva-ivory flex items-center justify-center">
                <svg class="w-5 h-5 text-noreva-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 class="text-xs font-medium text-noreva-black mb-1">
                {{ langService.currentLang() === 'ar' ? '3 ثوانٍ' : '3 Seconds' }}
              </h4>
              <p class="text-[10px] text-noreva-taupe">
                {{ langService.currentLang() === 'ar' ? 'تركيب سريع' : 'Quick Application' }}
              </p>
            </div>
            <div class="p-4">
              <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-noreva-ivory flex items-center justify-center">
                <svg class="w-5 h-5 text-noreva-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 class="text-xs font-medium text-noreva-black mb-1">
                {{ langService.currentLang() === 'ar' ? 'بدون صمغ' : 'Glue-Free' }}
              </h4>
              <p class="text-[10px] text-noreva-taupe">
                {{ langService.currentLang() === 'ar' ? 'مغناطيسي 100%' : '100% Magnetic' }}
              </p>
            </div>
            <div class="p-4">
              <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-noreva-ivory flex items-center justify-center">
                <svg class="w-5 h-5 text-noreva-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h4 class="text-xs font-medium text-noreva-black mb-1">
                {{ langService.currentLang() === 'ar' ? '+100 استخدام' : '100+ Uses' }}
              </h4>
              <p class="text-[10px] text-noreva-taupe">
                {{ langService.currentLang() === 'ar' ? 'قابلة لإعادة الاستخدام' : 'Reusable' }}
              </p>
            </div>
            <div class="p-4">
              <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-noreva-ivory flex items-center justify-center">
                <svg class="w-5 h-5 text-noreva-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <h4 class="text-xs font-medium text-noreva-black mb-1">
                {{ langService.currentLang() === 'ar' ? 'شحن مجاني' : 'Free Shipping' }}
              </h4>
              <p class="text-[10px] text-noreva-taupe">
                {{ langService.currentLang() === 'ar' ? 'لجميع الخليج' : 'GCC Wide' }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class CatalogComponent implements OnInit {
  shopifyService = inject(ShopifyService);
  currencyService = inject(CurrencyService);
  langService = inject(LanguageService);

  products = signal<any[]>([]);
  isLoading = signal(true);

  async ngOnInit() {
    try {
      const fetchedProducts = await this.shopifyService.getProducts(12);
      // Filter out unwanted products (gift items, hidden items)
      this.products.set(fetchedProducts.filter(p => !p.handle.includes('eyelash-curler') && !p.handle.includes('shipping-protection')));
    } catch (error) {
      console.error('Failed to load products', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
