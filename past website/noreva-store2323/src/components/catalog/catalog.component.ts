
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <div class="bg-gray-50 min-h-screen pt-40 pb-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h1 class="text-4xl font-black text-gray-900 mb-4">المنتجات</h1>
          <p class="text-gray-600 max-w-2xl mx-auto">
            تصفح مجموعتنا المختارة بعناية من المنتجات الذكية المصممة لتسهيل حياتك اليومية.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (product of products; track product.id) {
            <a [routerLink]="['/product', product.id]" class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div class="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img 
                  [ngSrc]="product.images[0]" 
                  fill 
                  class="object-cover group-hover:scale-105 transition-transform duration-700" 
                  [alt]="product.title"
                >
                @if (product.compareAtPrice > product.price) {
                  <span class="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    عرض خاص
                  </span>
                }
              </div>
              <div class="p-6">
                <h2 class="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">{{ product.title }}</h2>
                <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex flex-col">
                    <span class="text-xs text-gray-400 line-through">{{ currencyService.formatPrice(product.compareAtPrice) }}</span>
                    <span class="text-2xl font-black text-primary-600">{{ currencyService.formatPrice(product.price) }}</span>
                  </div>
                  <div class="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          }
        </div>
      </div>
    </div>
  `
})
export class CatalogComponent {
  productService = inject(ProductService);
  currencyService = inject(CurrencyService);
  products = this.productService.getProducts();
}
