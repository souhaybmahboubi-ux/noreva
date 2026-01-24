
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
    <div class="bg-gray-50 min-h-screen pt-32 md:pt-44 pb-20" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-black font-serif text-gray-900 mb-4 tracking-tight uppercase">
            {{ langService.currentLang() === 'ar' ? 'مجموعة نوريڤا' : 'THE NOREVA COLLECTION' }}
          </h1>
          <p class="text-gray-500 max-w-2xl mx-auto font-medium">
            {{ langService.currentLang() === 'ar' 
              ? 'اكتشفي سر العيون الجذابة مع تقنيتنا المغناطيسية المتطورة. رموش صُممت لتمنحكِ الكثافة والراحة في ثوانٍ.' 
              : 'Discover the secret to captivating eyes with our advanced magnetic technology. Lashes designed to give you volume and comfort in seconds.' }}
          </p>
        </div>

        @if (isLoading()) {
          <div class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        } @else {
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            @for (product of products(); track product.id) {
              <a [routerLink]="['/product', product.handle]" class="group block bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div class="aspect-[4/5] md:aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  <img 
                    [src]="product.imageUrl" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    [alt]="product.title"
                  >
                </div>
                <div class="p-3 md:p-6 text-start">
                  <h2 class="text-sm md:text-xl font-bold text-gray-900 group-hover:text-black transition-colors mb-1 md:mb-2 line-clamp-2 min-h-[2.5em]">{{ product.title }}</h2>
                  <p class="hidden md:block text-gray-500 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
                  <div class="flex items-center justify-between mt-2 md:mt-0">
                    <div class="flex flex-col">
                      <span class="text-base md:text-2xl font-black text-black">{{ product.price }} {{ product.currency }}</span>
                    </div>
                    <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            }
          </div>
        }
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
      this.products.set(fetchedProducts);
    } catch (error) {
      console.error('Failed to load products', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
