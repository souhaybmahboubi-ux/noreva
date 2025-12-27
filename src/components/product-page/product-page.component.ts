import { Component, inject, signal, computed, effect, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ShopifyService } from '../../services/shopify.service';
import { CurrencyService } from '../../services/currency.service';
import { ReviewsComponent } from '../reviews/reviews.component';

// Interfaces adapted to match the template's expectations but driven by Shopify Data
// Interfaces
interface UIProductVariant {
  id: string;
  name: string;
  colorCode: string;
  image?: string;
  price: number;
}

interface UIProductBundle {
  id: string;
  title: string;
  quantity: number;
  price: number;
  savings: number;
  isBestValue?: boolean;
}

interface UIProduct {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number;
  description: string;
  descriptionHtml?: string;
  features: string[];
  images: string[];
  variants: UIProductVariant[];
  bundles: UIProductBundle[]; // Re-enabled
}

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, ReviewsComponent],
  template: `
    <div class="bg-white min-h-screen pb-20">
      
      <!-- Loading State -->
      @if (loading()) {
        <div class="min-h-screen flex items-center justify-center pt-20">
           <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      }

      <!-- Error State -->
      @if (error()) {
        <div class="min-h-screen flex flex-col items-center justify-center pt-20 text-center px-4">
           <h2 class="text-2xl font-bold text-red-600 mb-2">Error Loading Product</h2>
           <p class="text-gray-600 mb-6">{{ error() }}</p>
           <button routerLink="/products" class="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition">Go Back to Catalog</button>
        </div>
      }

      <!-- Product Content -->
      @if (!loading() && !error() && product(); as currentProduct) {
          <div class="container mx-auto px-4 pt-40 pb-8">
            
            <!-- Breadcrumbs -->
            <nav class="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 space-x-reverse md:space-x-3">
                <li><a routerLink="/" class="hover:text-primary-600 transition-colors">الرئيسية</a></li>
                <li>/</li>
                <li><a routerLink="/products" class="hover:text-primary-600 transition-colors">المنتجات</a></li>
                <li>/</li>
                <li class="text-primary-600 font-medium" aria-current="page">{{ currentProduct.title }}</li>
              </ol>
            </nav>

            <!-- Main Grid with Reversed Order for RTL on Desktop -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                
                <!-- Product Info (Visual Right in RTL) -->
                <div class="order-2 lg:order-last">
                  <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{{ currentProduct.title }}</h1>
                  
                  <!-- Rating -->
                  <div class="flex items-center gap-4 mb-6">
                    <div class="flex text-yellow-500 text-lg">★★★★★</div>
                    <span class="text-gray-500 font-medium text-sm border-r pr-4 border-gray-200">83 تقييم</span>
                  </div>

                  <!-- Shipping Notice -->
                  <div class="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-4 animate-pulse duration-[3000ms]">
                    <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                       <h4 class="font-black text-amber-900 text-base mb-0.5">شحن سريع لدول الخليج! ✈️</h4>
                       <p class="text-amber-800 text-sm font-medium">يصلك طلبك خلال <span class="font-black underline">7 أيام عمل</span> إلى السعودية، الإمارات، الكويت، قطر، البحرين، وسلطنة عمان.</p>
                    </div>
                  </div>

                  <!-- Price -->
                  <div class="flex items-end gap-4 mb-10 bg-gray-50 p-5 rounded-2xl border border-gray-100 inline-flex w-full">
                    <div class="flex flex-col">
                        <span class="text-sm text-gray-500 mb-1">السعر الحالي</span>
                        <span class="text-4xl font-black text-primary-600">
                             {{ currencyService.formatPrice(selectedBundle()?.price || currentProduct.price) }}
                        </span>
                    </div>
                    @if (currentProduct.compareAtPrice > currentProduct.price || selectedBundle()?.savings) {
                        <div class="flex flex-col mb-1.5 mr-4">
                             <span class="text-xs text-gray-400 line-through">
                                {{ currencyService.formatPrice(
                                    selectedBundle() ? (currentProduct.price * selectedBundle()!.quantity) : currentProduct.compareAtPrice
                                 ) }}
                             </span>
                             <span class="text-xs text-red-500 font-bold">شامل الضريبة</span>
                        </div>
                    }
                  </div>

                  <!-- BUNDLES SECTION -->
                  <div class="mb-8">
                     <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        اختر العرض اللي يناسبك
                     </h3>
                     <div class="space-y-3">
                        @for (bundle of currentProduct.bundles; track bundle.id) {
                           <div 
                              (click)="selectBundle(bundle)"
                              class="relative p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col group"
                              [class.border-primary-600]="selectedBundle()?.id === bundle.id"
                              [class.bg-primary-50]="selectedBundle()?.id === bundle.id"
                              [class.border-gray-200]="selectedBundle()?.id !== bundle.id"
                              [class.hover:border-primary-300]="selectedBundle()?.id !== bundle.id"
                           >
                              <!-- Bundle Header Info -->
                              <div class="flex items-center justify-between w-full">
                                @if (bundle.isBestValue) {
                                   <span class="absolute -top-3 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] md:text-xs font-black px-3 py-1 rounded-full shadow-md z-10">الأكثر طلباً 🔥</span>
                                }
                                @if (bundle.savings > 0) {
                                   <span class="absolute -top-3 left-4 bg-green-500 text-white text-[10px] md:text-xs font-black px-3 py-1 rounded-full shadow-md z-10">وفر {{ currencyService.formatPrice(bundle.savings) }}</span>
                                }

                                <div class="flex items-center gap-3">
                                   <div class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center bg-white" 
                                        [class.border-primary-600]="selectedBundle()?.id === bundle.id">
                                        @if (selectedBundle()?.id === bundle.id) {
                                           <div class="w-3 h-3 bg-primary-600 rounded-full"></div>
                                        }
                                   </div>
                                   <div>
                                      <div class="font-bold text-gray-900">{{ bundle.title }}</div>
                                      <div class="text-xs text-gray-500">{{ bundle.quantity }} حبات</div>
                                   </div>
                                </div>

                                <div class="text-left">
                                   <div class="font-black text-xl text-primary-700">{{ currencyService.formatPrice(bundle.price) }}</div>
                                   @if (bundle.savings > 0) {
                                     <div class="text-xs text-gray-400 line-through">{{ currencyService.formatPrice(currentProduct.price * bundle.quantity) }}</div>
                                   }
                                </div>
                              </div>

                              <!-- Embedded Variant Selectors (Multi-Piece) -->
                              @if (selectedBundle()?.id === bundle.id) {
                                 <div class="mt-4 pt-4 border-t border-gray-200/50 w-full animate-in slide-in-from-top-2 duration-300" (click)="$event.stopPropagation()">
                                   @for (idx of getSequence(bundle.quantity); track idx) {
                                      <div class="mb-4 last:mb-0 p-3 bg-white/60 rounded-lg border border-gray-100">
                                        <p class="text-xs font-bold text-gray-500 mb-2 flex items-center justify-between">
                                           <span>القطعة #{{ idx + 1 }} - اختر اللون:</span>
                                           <span class="text-primary-600">{{ selectedBundleVariants()[idx]?.name }}</span>
                                        </p>
                                        <div class="flex gap-2 flex-wrap">
                                           @for (variant of currentProduct.variants; track variant.id) {
                                             <button 
                                               (click)="updateBundleVariant(idx, variant)"
                                               class="px-3 py-1 text-sm rounded-lg border transition-all focus:outline-none bg-white font-medium"
                                               [class.border-primary-500]="selectedBundleVariants()[idx]?.id === variant.id"
                                               [class.bg-primary-50]="selectedBundleVariants()[idx]?.id === variant.id"
                                               [class.text-primary-700]="selectedBundleVariants()[idx]?.id === variant.id"
                                               [class.border-gray-200]="selectedBundleVariants()[idx]?.id !== variant.id"
                                             >
                                                {{ variant.name }}
                                             </button>
                                           }
                                        </div>
                                      </div>
                                   }
                                 </div>
                              }
                           </div>
                        }
                     </div>
                  </div>

                  <!-- Add to Cart Button -->
                  <div class="flex flex-col gap-6 mb-6">
                      <button 
                        (click)="addToCart()"
                        [disabled]="adding()"
                        class="w-full font-bold rounded-xl h-16 flex items-center justify-center gap-3 shadow-xl transition-all text-xl overflow-hidden relative active:scale-95 bg-gray-900 hover:bg-primary-600 text-white"
                        [class.opacity-75]="adding()"
                      >
                         @if (adding()) {
                             <div class="animate-spin rounded-full h-6 w-6 border-2 border-white"></div>
                             <span>جاري الإضافة...</span>
                         } @else if (addedToCart()) {
                           <div class="flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>تمت الإضافة!</span>
                           </div>
                         } @else {
                           <div class="flex items-center gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                              <span>
                                أضف للسلة - {{ currencyService.formatPrice(selectedBundle()?.price || currentProduct.price) }}
                              </span>
                           </div>
                         }
                      </button>
                  </div>
                  
                  <!-- Trust Badges & Description... (Retained) -->
                   <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-gray-100">
                        <div class="flex flex-col items-center text-center gap-2">
                            <span class="text-xs font-bold text-gray-700">جودة مضمونة</span>
                        </div>
                        <div class="flex flex-col items-center text-center gap-2">
                            <span class="text-xs font-bold text-gray-700">شحن سريع</span>
                        </div>
                        <div class="flex flex-col items-center text-center gap-2">
                            <span class="text-xs font-bold text-gray-700">دفع آمن</span>
                        </div>
                        <div class="flex flex-col items-center text-center gap-2">
                            <span class="text-xs font-bold text-gray-700">استرجاع سهل</span>
                        </div>
                  </div>

                  <!-- Description & Features -->
                  <div class="space-y-6 mt-8">
                    <div class="border rounded-2xl p-6 bg-gray-50/50 border-gray-100 shadow-sm hover:bg-white transition-all duration-300">
                      <h3 class="font-bold text-xl mb-6 flex items-center justify-between text-gray-900">
                        <span>الوصف والمميزات</span>
                        <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                      </h3>
                      
                      <div class="space-y-4 text-gray-600 leading-relaxed text-base font-medium mb-8">
                        <p>تبي الفكة من قروشة التفتيش؟ وتبي أغراضك تكون معك طول الوقت؟</p>
                        <p>مطارة نوريفا™ هي الحل اللي تدوره. شكلها مطارة ماي كشخة وعادية، بس داخلها "علوم ثانية"! 😉</p>
                        <p>فيها مخبأ سري تحت، وسيع وراهي! يشيل جوالك بالراحة (حتى لو معك آيفون 17 برو ماكس)، ويشيل سماعاتك، والفيب (Vape)، وحتى فلوسك.</p>
                        <p>والأهم من هذا كله؟ ما تخر ماي أبداً! نظام العزل فيها بطل، يعني تطمن أغراضك ناشفة وأمان 100%.</p>
                        <p>شكلها بريء ما يلفت النظر، يعني تمشي أمورك فالمدرسة والطلعات وأنت مرتاح. خلك ذيب واضمن أغراضك معك!</p>
                      </div>

                      <ul class="space-y-3 pt-6 border-t border-gray-200/50">
                        <li class="flex items-start gap-3 text-gray-800">
                          <div class="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <svg class="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                              </svg>
                          </div>
                          <span class="font-bold text-sm">مخبأ راهي: <span class="font-medium text-gray-600">يشيل آيفون 17 برو ماكس، إيربودز، والفيب بالراحة.</span></span>
                        </li>
                        <li class="flex items-start gap-3 text-gray-800">
                          <div class="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <svg class="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                              </svg>
                          </div>
                          <span class="font-bold text-sm">ما تخر أبد: <span class="font-medium text-gray-600">عزل 100% بين الماي والأغراض، يعني أجهزتك بأمان.</span></span>
                        </li>
                        <li class="flex items-start gap-3 text-gray-800">
                          <div class="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <svg class="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                              </svg>
                          </div>
                          <span class="font-bold text-sm">تمويه ولا غلطة: <span class="font-medium text-gray-600">شكلها مطارة عادية، محد بيشك فيك.</span></span>
                        </li>
                        <li class="flex items-start gap-3 text-gray-800">
                          <div class="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <svg class="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                              </svg>
                          </div>
                          <span class="font-bold text-sm">جودة توب: <span class="font-medium text-gray-600">تتحمل الكرف والطيحات، تعيش معك.</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>

                <!-- Image Gallery -->
                <div class="space-y-6 order-1 lg:order-first lg:sticky lg:top-32 h-fit">
                  <!-- Main Image Carousel -->
                  <div class="relative group bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden">
                    <div 
                      #mainImageContainer
                      class="flex overflow-x-auto snap-x snap-mandatory no-scrollbar aspect-square scroll-smooth"
                      (scroll)="onMainScroll()"
                    >
                      @for (img of currentProduct.images; track img; let i = $index) {
                        <div class="min-w-full h-full snap-center flex items-center justify-center relative bg-white">
                          <img 
                            [src]="img" 
                            class="object-cover w-full h-full rounded-2xl shadow-sm"
                            [alt]="currentProduct.title"
                          >
                        </div>
                      }
                    </div>
                    
                    @if (getDiscountPercentage() > 0) {
                        <span class="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                        وفر {{ getDiscountPercentage() }}%
                        </span>
                    }
                    
                    <!-- Navigation Arrows -->
                    <button (click)="scrollNext()" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-3 shadow-lg transition-all z-20 active:scale-95 flex items-center justify-center text-gray-800 backdrop-blur-sm">
                      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button (click)="scrollPrev()" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-3 shadow-lg transition-all z-20 active:scale-95 flex items-center justify-center text-gray-800 backdrop-blur-sm">
                      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

            </div>

            <!-- Reviews Section -->
            <div class="mt-24 border-t pt-20">
              <app-reviews></app-reviews>
            </div>
      </div>
      }
    </div>
  `
})
export class ProductPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private shopifyService = inject(ShopifyService);
  currencyService = inject(CurrencyService);

  @ViewChild('mainImageContainer') mainImageContainer!: ElementRef<HTMLElement>;

  loading = signal(true);
  error = signal<string | null>(null);
  product = signal<UIProduct | null>(null);

  // Bundle Logic
  selectedBundle = signal<UIProductBundle | null>(null);
  selectedBundleVariants = signal<UIProductVariant[]>([]);

  adding = signal(false);
  addedToCart = signal(false);

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const handle = params.get('handle');
        this.loading.set(true);
        this.error.set(null);
        // Reset product to avoid using old data
        this.product.set(null);

        if (handle) {
          return this.shopifyService.fetchProduct(handle).pipe(
            catchError(err => {
              console.error('API Error', err);
              this.error.set('Could not load product. Please check the URL.');
              return of(null);
            })
          );
        }
        return of(null);
      })
    ).subscribe(data => {
      this.loading.set(false);
      if (data) {
        this.mapShopifyProduct(data);
      }
    });
  }

  private mapShopifyProduct(data: any) {
    const variants: UIProductVariant[] = data.variants.map((v: any) => ({
      id: v.id,
      name: v.title,
      colorCode: '#000000',
      image: v.image?.src,
      price: parseFloat(v.price.amount)
    }));

    // GENERATE DYNAMIC BUNDLES
    const basePrice = variants[0]?.price || 0;
    const bundles: UIProductBundle[] = [
      {
        id: 'b1',
        title: 'حبة وحدة',
        quantity: 1,
        price: basePrice,
        savings: 0
      },
      {
        id: 'b2',
        title: 'عرض الربع (حبتين)',
        quantity: 2,
        price: Math.round(basePrice * 2 * 0.90), // 10% Discount
        savings: Math.round(basePrice * 2 * 0.10),
        isBestValue: true
      },
      {
        id: 'b3',
        title: 'عرض الشلة (4 حبات)',
        quantity: 4,
        price: Math.round(basePrice * 4 * 0.85), // 15% Discount
        savings: Math.round(basePrice * 4 * 0.15)
      }
    ];

    const product: UIProduct = {
      id: data.id,
      title: data.title,
      description: data.description,
      descriptionHtml: data.descriptionHtml,
      images: data.images.map((img: any) => img.src),
      variants: variants,
      price: basePrice,
      compareAtPrice: 0,
      features: [],
      bundles: bundles
    };

    if (data.variants[0]?.compareAtPrice) {
      product.compareAtPrice = parseFloat(data.variants[0].compareAtPrice.amount);
    }

    this.product.set(product);
    // Select Best Value Bundle by default
    this.selectBundle(bundles[1]); // b2 is Best Value
  }

  selectBundle(bundle: UIProductBundle) {
    this.selectedBundle.set(bundle);
    const p = this.product();
    const variants = p?.variants || [];
    if (variants.length > 0) {
      // Initialize all slots with first variant
      this.selectedBundleVariants.set(Array(bundle.quantity).fill(variants[0]));
    }
  }

  updateBundleVariant(index: number, variant: UIProductVariant) {
    this.selectedBundleVariants.update(curr => {
      const next = [...curr];
      next[index] = variant;
      return next;
    });

    // Auto-scroll to specific images based on variant selection
    const product = this.product();
    if (product && product.images.length > 0) {
      if (variant.name.includes('أبيض') || variant.name.toLowerCase().includes('white')) {
        // Scroll to the LAST image
        this.scrollToIndex(product.images.length - 1);
      } else if (variant.name.includes('أحمر') || variant.name.toLowerCase().includes('red')) {
        // Scroll to the image BEFORE the last one
        if (product.images.length >= 2) {
          this.scrollToIndex(product.images.length - 2);
        }
      }
    }
  }

  getSequence(n: number): number[] {
    return Array(n).fill(0).map((x, i) => i);
  }

  addToCart() {
    const bundle = this.selectedBundle();
    const chosenVariants = this.selectedBundleVariants();

    if (!bundle || chosenVariants.length === 0) return;

    this.adding.set(true);

    // In a real production app with Bundles, checking out with a price different 
    // from the variance price often requires a Discount Code or a Draft Order.
    // Standard Storefront API adds items at their Defined Price unless we have a specific script.
    // FOR NOW: We will add the items. The "Discount" shown in UI might not reflect in Checkout
    // unless you have an automatic discount set up in Shopify for 2 items.

    // We add them sequentially
    chosenVariants.forEach(v => {
      this.shopifyService.addItemToCheckout(v.id, 1);
    });

    setTimeout(() => {
      this.adding.set(false);
      this.addedToCart.set(true);
      this.shopifyService.openCart(); // Auto-open cart for better UX
      setTimeout(() => this.addedToCart.set(false), 2000);
    }, 1000);
  }

  getDiscountPercentage() {
    const p = this.product();
    if (!p || !p.compareAtPrice || p.compareAtPrice <= p.price) return 0;
    return Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
  }

  // --- Scroll Logic ---
  scrollToIndex(index: number) {
    if (this.mainImageContainer?.nativeElement) {
      const container = this.mainImageContainer.nativeElement;
      const child = container.children[index] as HTMLElement;
      if (child) {
        // Calculate scroll position manually to avoid 'jumpy' page behavior caused by scrollIntoView
        const scrollAmount = child.offsetLeft - container.offsetLeft;
        container.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  }

  scrollNext() { this.scrollDirection('next'); }
  scrollPrev() { this.scrollDirection('prev'); }

  private scrollDirection(direction: 'next' | 'prev') {
    if (!this.mainImageContainer?.nativeElement) return;
    const container = this.mainImageContainer.nativeElement;
    // Calculate current index based on scroll amount
    const currentIndex = Math.round(Math.abs(container.scrollLeft) / container.offsetWidth);
    const total = this.product()?.images.length || 0;

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    // In RTL, "Next" moves to the left (negative scroll in some browsers), 
    // but we use the index to keep logic simple.
    if (nextIndex >= 0 && nextIndex < total) {
      this.scrollToIndex(nextIndex);
    }
  }

  onMainScroll() { }
}
