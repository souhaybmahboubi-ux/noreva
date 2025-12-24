
import { Component, inject, signal, computed, effect, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService, Product, ProductVariant, ProductBundle } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CurrencyService } from '../../services/currency.service';
import { ReviewsComponent } from '../reviews/reviews.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReviewsComponent, RouterLink],
  template: `
    <div class="bg-white min-h-screen pb-20">
      <div class="container mx-auto px-4 pt-40 pb-8">
        
        <!-- Breadcrumbs -->
        <nav class="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 space-x-reverse md:space-x-3">
            <li><a routerLink="/" class="hover:text-primary-600 transition-colors">الرئيسية</a></li>
            <li>/</li>
            <li><a routerLink="/products" class="hover:text-primary-600 transition-colors">المنتجات</a></li>
            <li>/</li>
            <li class="text-primary-600 font-medium" aria-current="page">{{ product()?.title }}</li>
          </ol>
        </nav>

        @if (product(); as currentProduct) {
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            <!-- Image Gallery -->
            <div class="space-y-6 top-36 lg:sticky">
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
                        [ngSrc]="img" 
                        width="800"
                        height="800"
                        [priority]="i === 0"
                        class="object-contain w-full h-full p-8"
                        [alt]="currentProduct.title"
                      >
                    </div>
                  }
                </div>
                
                <span class="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                  وفر {{ getDiscountPercentage() }}%
                </span>
                
                <!-- Navigation Arrows (Main Gallery) -->
                <!-- Next Button (Left side in RTL) -->
                <button (click)="scrollNext()" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-3 shadow-lg transition-all z-20 active:scale-95 flex items-center justify-center text-gray-800 backdrop-blur-sm" aria-label="Next Image">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <!-- Prev Button (Right side in RTL) -->
                <button (click)="scrollPrev()" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-3 shadow-lg transition-all z-20 active:scale-95 flex items-center justify-center text-gray-800 backdrop-blur-sm" aria-label="Previous Image">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Product Info -->
            <div class="lg:py-4">
              <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{{ currentProduct.title }}</h1>
              
              <!-- Rating -->
              <div class="flex items-center gap-4 mb-6">
                <div class="flex text-gold-500 text-lg">★★★★★</div>
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
                    <span class="text-4xl font-black text-primary-600">{{ currencyService.formatPrice(currentProduct.price) }}</span>
                </div>
                <div class="flex flex-col mb-1.5 mr-4">
                     <span class="text-xs text-gray-400 line-through">{{ currencyService.formatPrice(currentProduct.compareAtPrice) }}</span>
                     <span class="text-xs text-red-500 font-bold">شامل الضريبة</span>
                </div>
              </div>

              <!-- Variants (Color) - SHOW ONLY IF NO BUNDLES -->
              @if (!currentProduct.bundles || currentProduct.bundles.length === 0) {
                <div class="mb-8">
                  <h3 class="text-sm font-bold text-gray-900 mb-4">اللون المختار: <span class="text-primary-600 text-lg">{{ selectedVariant()?.name }}</span></h3>
                  <div class="flex gap-4">
                    @for (variant of currentProduct.variants; track variant.name) {
                      <button 
                        (click)="selectVariant(variant)"
                        class="w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none transform hover:scale-105"
                        [class.border-primary-500]="selectedVariant() === variant"
                        [class.border-gray-200]="selectedVariant() !== variant"
                        [class.ring-4]="selectedVariant() === variant"
                        [class.ring-primary-50]="selectedVariant() === variant"
                      >
                        <span 
                          class="w-10 h-10 rounded-full shadow-sm border border-gray-100"
                          [style.background-color]="variant.colorCode"
                        ></span>
                      </button>
                    }
                  </div>
                </div>
              }
              
              <!-- Bundles -->
              @if (currentProduct.bundles && currentProduct.bundles.length > 0) {
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
                                  <span class="absolute -top-3 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">الأكثر طلباً 🔥</span>
                               }
                               @if (bundle.savings > 0) {
                                  <span class="absolute -top-3 left-4 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">وفر {{ currencyService.formatPrice(bundle.savings) }}</span>
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
                                  
                                  <!-- Loop for each item in bundle -->
                                  @for (idx of getSequence(bundle.quantity); track idx) {
                                     <div class="mb-4 last:mb-0 p-3 bg-white/60 rounded-lg border border-gray-100">
                                       <p class="text-xs font-bold text-gray-500 mb-2 flex items-center justify-between">
                                          <span>القطعة #{{ idx + 1 }} - اختر اللون:</span>
                                          <span class="text-primary-600">{{ selectedBundleVariants()[idx]?.name }}</span>
                                       </p>
                                       <div class="flex gap-2 flex-wrap">
                                          @for (variant of currentProduct.variants; track variant.name) {
                                            <button 
                                              (click)="updateBundleVariant(idx, variant)"
                                              class="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none transform hover:scale-105 bg-white"
                                              [class.border-primary-500]="selectedBundleVariants()[idx] === variant"
                                              [class.border-gray-200]="selectedBundleVariants()[idx] !== variant"
                                              [class.ring-2]="selectedBundleVariants()[idx] === variant"
                                              [class.ring-primary-100]="selectedBundleVariants()[idx] === variant"
                                              [title]="variant.name"
                                            >
                                              <span 
                                                class="w-6 h-6 rounded-full shadow-sm border border-gray-100"
                                                [style.background-color]="variant.colorCode"
                                              ></span>
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
              }

              <!-- Add to Cart Button -->
              <div class="flex flex-col gap-6 mb-6">
                @if (!currentProduct.bundles || currentProduct.bundles.length === 0) {
                  <div class="flex gap-4">
                    <div class="flex items-center border-2 border-gray-200 rounded-xl h-16 w-32 sm:w-40 bg-white">
                      <button (click)="decrementQty()" class="w-10 sm:w-12 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-r-xl text-xl sm:text-2xl transition-colors font-bold">-</button>
                      <input type="text" [value]="quantity()" readonly class="w-full h-full text-center font-black text-gray-900 border-none focus:ring-0 p-0 text-lg sm:text-xl">
                      <button (click)="incrementQty()" class="w-10 sm:w-12 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-l-xl text-xl sm:text-2xl transition-colors font-bold">+</button>
                    </div>
                    
                    <button 
                      (click)="addToCart()"
                      class="flex-1 font-bold rounded-xl h-16 flex items-center justify-center gap-3 shadow-xl transition-all text-xl overflow-hidden relative active:scale-95"
                      [class.bg-green-600]="addedToCart()"
                      [class.hover:bg-green-700]="addedToCart()"
                      [class.bg-gray-900]="!addedToCart()"
                      [class.hover:bg-primary-600]="!addedToCart()"
                      [class.text-white]="true"
                    >
                       @if (addedToCart()) {
                         <div class="flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                             </svg>
                             <span>تمت الإضافة!</span>
                          </div>
                       } @else {
                         <span class="flex items-center gap-2">أضف للسلة</span>
                       }
                    </button>
                  </div>
                } @else {
                   <button 
                    (click)="addToCart()"
                    class="w-full font-bold rounded-xl h-16 flex items-center justify-center gap-3 shadow-xl transition-all text-xl overflow-hidden relative active:scale-95"
                    [class.bg-green-600]="addedToCart()"
                    [class.hover:bg-green-700]="addedToCart()"
                    [class.bg-gray-900]="!addedToCart()"
                    [class.hover:bg-primary-600]="!addedToCart()"
                    [class.text-white]="true"
                  >
                    @if (addedToCart()) {
                      <div class="flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                         </svg>
                         <span>تمت الإضافة بنجاح!</span>
                      </div>
                    } @else {
                      <div class="flex items-center gap-3">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                         </svg>
                         <span>أضف للسلة - {{ currencyService.formatPrice(selectedBundle()?.price || currentProduct.price) }}</span>
                      </div>
                    }
                  </button>
                }
              </div>

                <!-- Trust Badges -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-gray-100">
                    <div class="flex flex-col items-center text-center gap-2">
                        <svg class="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span class="text-xs font-bold text-gray-700">جودة مضمونة</span>
                    </div>
                    <div class="flex flex-col items-center text-center gap-2">
                        <svg class="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        <span class="text-xs font-bold text-gray-700">شحن سريع</span>
                    </div>
                    <div class="flex flex-col items-center text-center gap-2">
                        <svg class="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        <span class="text-xs font-bold text-gray-700">دفع آمن</span>
                    </div>
                    <div class="flex flex-col items-center text-center gap-2">
                         <svg class="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        <span class="text-xs font-bold text-gray-700">استرجاع سهل</span>
                    </div>
                </div>

              <!-- Description & Accordion -->
              <div class="space-y-4 mt-8">
                <div class="border rounded-2xl p-8 bg-gray-50 hover:bg-white transition-colors border-gray-100 shadow-sm">
                  <h3 class="font-bold text-xl mb-6 flex items-center gap-3 text-gray-900">
                    <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    الوصف والمميزات
                  </h3>
                  <p class="text-gray-600 leading-loose mb-8 text-lg whitespace-pre-line">
                    {{ currentProduct.description }}
                  </p>
                  <ul class="space-y-4">
                    @for (feature of currentProduct.features; track feature) {
                      <li class="flex items-start gap-4 text-gray-700">
                        <div class="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <svg class="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span class="font-medium">{{ feature }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <!-- Reviews Section -->
          <div class="mt-24 border-t pt-20">
            <app-reviews></app-reviews>
          </div>
        }
      </div>
    </div>
  `
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  currencyService = inject(CurrencyService);
  private route = inject(ActivatedRoute);

  @ViewChild('mainImageContainer') mainImageContainer!: ElementRef<HTMLElement>;

  // Get ID from route params signal
  private productId = toSignal(this.route.paramMap);
  
  // Computed product based on route ID
  product = computed(() => {
    const id = this.productId()?.get('id');
    return id ? this.productService.getProduct(id) : null;
  });

  selectedVariant = signal<ProductVariant | undefined>(undefined);
  selectedImage = signal<string>('');
  
  // For standard non-bundle products
  quantity = signal(1);
  
  // For bundle products
  selectedBundle = signal<ProductBundle | undefined>(undefined);
  selectedBundleVariants = signal<ProductVariant[]>([]);

  addedToCart = signal(false);

  constructor() {
    // Reset state when product changes
    effect(() => {
      const p = this.product();
      if (p) {
        this.selectedVariant.set(p.variants[0]);
        this.selectedImage.set(p.images[0]);
        this.quantity.set(1);
        this.addedToCart.set(false);
        
        // Select best value bundle by default if exists
        if (p.bundles && p.bundles.length > 0) {
            const bestValue = p.bundles.find(b => b.isBestValue) || p.bundles[0];
            this.selectBundle(bestValue);
        } else {
            this.selectedBundle.set(undefined);
            this.selectedBundleVariants.set([]);
        }

        window.scrollTo(0,0);
        // Reset scroll position of main image container
        if (this.mainImageContainer?.nativeElement) {
          this.mainImageContainer.nativeElement.scrollTo({ left: 0 });
        }
      }
    });
  }

  selectVariant(variant: ProductVariant) {
    this.selectedVariant.set(variant);
    if (variant.image) {
      this.scrollToImage(variant.image);
    }
  }

  selectBundle(bundle: ProductBundle) {
    this.selectedBundle.set(bundle);
    const defaultVariant = this.product()?.variants[0];
    if (defaultVariant) {
        // Initialize an array with `quantity` elements, all set to default variant
        this.selectedBundleVariants.set(Array(bundle.quantity).fill(defaultVariant));
    }
  }

  updateBundleVariant(index: number, variant: ProductVariant) {
    this.selectedBundleVariants.update(variants => {
        const newVariants = [...variants];
        newVariants[index] = variant;
        return newVariants;
    });
    // Optional: Scroll to the image of the variant the user just clicked
    if (variant.image) {
        this.scrollToImage(variant.image);
    }
  }

  getSequence(n: number): number[] {
    return Array(n).fill(0).map((x, i) => i);
  }

  incrementQty() {
    this.quantity.update(q => q + 1);
  }

  decrementQty() {
    this.quantity.update(q => (q > 1 ? q - 1 : 1));
  }

  addToCart() {
    const p = this.product();
    if (p) {
        if (p.bundles && p.bundles.length > 0 && this.selectedBundle()) {
             // Add Bundle Items Separately
             const bundle = this.selectedBundle()!;
             const unitPrice = bundle.price / bundle.quantity;
             const variants = this.selectedBundleVariants();
             
             // Add each variant as a separate item with the discounted unit price
             variants.forEach(variant => {
                this.cartService.addToCart(p, 1, variant, unitPrice);
             });

        } else {
             // Add Single Item (Normal Flow)
             this.cartService.addToCart(p, this.quantity(), this.selectedVariant());
        }
      
      // Visual feedback
      this.addedToCart.set(true);
      setTimeout(() => {
        this.addedToCart.set(false);
      }, 2000);
    }
  }

  getDiscountPercentage() {
    const p = this.product();
    if (!p) return 0;
    return Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
  }

  scrollToImage(img: string) {
    const index = this.product()?.images.indexOf(img);
    if (index !== undefined && index > -1) {
       this.scrollToIndex(index);
    }
  }

  scrollToIndex(index: number) {
    if (this.mainImageContainer?.nativeElement) {
      const container = this.mainImageContainer.nativeElement;
      const child = container.children[index] as HTMLElement;
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }

  scrollNext() {
    this.scrollDirection('next');
  }

  scrollPrev() {
    this.scrollDirection('prev');
  }

  private scrollDirection(direction: 'next' | 'prev') {
    if (!this.mainImageContainer?.nativeElement) return;
    const container = this.mainImageContainer.nativeElement;
    const currentIndex = Math.round(Math.abs(container.scrollLeft) / container.offsetWidth);
    const total = this.product()?.images.length || 0;
    
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (nextIndex >= 0 && nextIndex < total) {
      this.scrollToIndex(nextIndex);
    }
  }

  onMainScroll() {
     if (!this.mainImageContainer?.nativeElement) return;
     const container = this.mainImageContainer.nativeElement;
     
     // Simple index calculation based on scroll width
     const index = Math.round(Math.abs(container.scrollLeft) / container.offsetWidth);
     
     const images = this.product()?.images;
     if (images && images[index]) {
       this.selectedImage.set(images[index]);
     }
  }
}
