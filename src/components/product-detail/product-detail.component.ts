
import { Component, inject, signal, computed, effect, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService, Product, ProductBundle } from '../../services/product.service';
import { ShopifyService } from '../../services/shopify.service'; // Added
import { CartService } from '../../services/cart.service';
import { CurrencyService } from '../../services/currency.service';
import { AuthService, UserProfile } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { ActivatedRoute, RouterLink, ParamMap } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ReviewsComponent } from '../reviews/reviews.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage, RouterLink, FormsModule, ReviewsComponent],
  template: `
    <div class="bg-white min-h-screen pt-32 md:pt-44 pb-32 lg:pb-20 selection:bg-noreva-bone selection:text-black font-sans">
      <!-- Marquee Bar - Refined -->
      <div class="bg-black py-3 overflow-hidden border-y border-white/5 mb-8">
        <div class="flex whitespace-nowrap gap-16 animate-marquee items-center text-white">
           @for(i of [1,2,3,4,5]; track i) {
             <div class="flex items-center gap-4">
                <span class="text-sm font-bold uppercase tracking-[0.25em]">{{ langService.currentLang() === 'ar' ? 'تركيب في 3 ثواني' : 'APPLY IN 3 SECONDS' }}</span>
                <span class="w-1 h-1 bg-white/20 rounded-full"></span>
                <span class="text-sm font-bold uppercase tracking-[0.25em]">{{ langService.currentLang() === 'ar' ? 'بدون صمغ ولا فوضى' : 'NO GLUE, NO MESS' }}</span>
                <span class="w-1 h-1 bg-white/20 rounded-full"></span>
             </div>
           }
        </div>
      </div>

      <div class="container mx-auto max-w-7xl px-4 lg:px-8">
        @if (product(); as currentProduct) {
          
          <div class="grid lg:grid-cols-12 gap-8 lg:gap-16">
              
            <!-- Gallery (Sticky on Desktop) -->
            <div class="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                <div class="grid gap-4">
                    <!-- Main Image -->
                    <div class="relative aspect-square rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm group">
                       <div #mainImageContainer class="flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-full scroll-smooth" (scroll)="onMainScroll()">
                          @for (img of currentProduct.images; track img; let i = $index) {
                            <div class="min-w-full h-full snap-center flex items-center justify-center relative bg-[#f8f8f8]">
                              <img [ngSrc]="img" width="1000" height="1000" [priority]="i === 0" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" alt="{{ currentProduct.title }}">
                            </div>
                          }
                        </div>
                        
                        <!-- Image Navigation Arrows (Desktop) -->
                        <div class="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden lg:flex">
                           <button (click)="scrollToIndex(selectedImageIndex() - 1)" [class.invisible]="selectedImageIndex() === 0" class="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-black flex items-center justify-center pointer-events-auto shadow-sm hover:scale-110 transition-all">
                              <svg class="w-5 h-5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 19l-7-7 7-7"/></svg>
                           </button>
                           <button (click)="scrollToIndex(selectedImageIndex() + 1)" [class.invisible]="selectedImageIndex() === currentProduct.images.length - 1" class="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-black flex items-center justify-center pointer-events-auto shadow-sm hover:scale-110 transition-all">
                              <svg class="w-5 h-5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5l7 7-7 7"/></svg>
                           </button>
                        </div>

                        <!-- Dots (Mobile) -->
                        <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 lg:hidden">
                           @for (img of currentProduct.images; track img; let i = $index) {
                             <div class="h-1.5 rounded-full transition-all duration-300 backdrop-blur-md" 
                                  [class.w-6]="selectedImageIndex() === i" [class.bg-black]="selectedImageIndex() === i"
                                  [class.w-1.5]="selectedImageIndex() !== i" [class.bg-black/20]="selectedImageIndex() !== i"></div>
                           }
                        </div>
                    </div>

                    <!-- Thumbnails (Desktop) -->
                    <div class="hidden lg:grid grid-cols-5 gap-3 max-w-md mx-auto">
                        @for (img of currentProduct.images; track img; let i = $index) {
                           <button (click)="scrollToIndex(i)" 
                                   class="relative aspect-square rounded-2xl overflow-hidden border transition-all duration-300"
                                   [class.border-black]="selectedImageIndex() === i"
                                   [class.border-transparent]="selectedImageIndex() !== i"
                                   [class.opacity-50]="selectedImageIndex() !== i"
                                   [class.opacity-100]="selectedImageIndex() === i">
                               <img [ngSrc]="img" width="200" height="200" class="object-cover w-full h-full">
                           </button>
                        }
                    </div>
                </div>
            </div>

            <!-- Product Info -->
            <div class="lg:col-span-7 text-start flex flex-col pt-2">
               <!-- Header -->
               <div class="mb-6 border-b border-gray-100 pb-6">
                   <!-- Review Widget -->
                   <div class="flex items-center gap-2 mb-4">
                       <div class="flex items-center gap-0.5">
                           @for (star of [1,2,3,4,5]; track star) {
                               <svg class="w-4 h-4 text-[#c19b6e] fill-current" viewBox="0 0 20 20">
                                   <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                               </svg>
                           }
                       </div>
                       <span class="text-sm font-bold text-gray-700">
                           {{ langService.currentLang() === 'ar' ? 'تقييم 4.9/5 (328 تقييم)' : 'Rated 4.9/5 (328 Reviews)' }}
                       </span>
                   </div>

                   <!-- Mobile Shipping Info (Between Rating and Title) -->
                   <div class="lg:hidden mb-4 flex items-center gap-3 p-3 bg-[#f0f9ff] rounded-xl border border-[#e0f2fe] text-[#0c4a6e]">
                       <div class="bg-white p-2 rounded-full shadow-sm text-[#0284c7]">
                           <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                       </div>
                       <div class="flex-1">
                           <p class="text-[10px] font-black uppercase tracking-widest mb-0.5">
                               {{ langService.currentLang() === 'ar' ? 'شحن سريع لدول الخليج' : 'FAST GCC SHIPPING' }} ✈️
                           </p>
                           <p class="text-[9px] font-medium leading-tight opacity-80">
                               {{ langService.currentLang() === 'ar' ? 'السعودية، الإمارات، قطر، البحرين، الكويت، عمان (4-12 يوم)' : 'Saudi Arabia, UAE, Qatar, Bahrain, Kuwait, Oman (4-12 Days)' }}
                           </p>
                       </div>
                   </div>

                   <div class="flex items-start justify-between gap-4 mb-3">
                       <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                         {{ langService.currentLang() === 'ar' && currentProduct.title === 'Magic Lashes' ? 'رموش نوريڤا السحرية' : currentProduct.title }}
                       </h1>
                       <!-- Share/Wishlist placeholders could go here -->
                   </div>
                   
                   <div class="flex items-center gap-3">
                      <div class="flex items-baseline gap-2 text-black">
                         <span class="text-2xl font-bold">{{ currencyService.formatPrice((selectedBundle() ? selectedBundle()!.price : currentProduct.price) / (selectedBundle() ? selectedBundle()!.quantity : 1)) }}</span>
                         <span class="text-sm font-bold text-gray-400 mx-1 uppercase">{{ langService.currentLang() === 'ar' ? '/ للزوج' : '/ pair' }}</span>
                         @if (selectedBundle() && selectedBundle()!.compareAtPrice > selectedBundle()!.price) {
                           <span class="text-gray-400 line-through text-sm">{{ currencyService.formatPrice(selectedBundle()!.compareAtPrice / selectedBundle()!.quantity) }}</span>
                           <span class="bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                               {{ langService.currentLang() === 'ar' ? 'خصم' : 'Save' }} {{ selectedBundle()!.id === 'trio' ? '15%' : (((selectedBundle()!.compareAtPrice - selectedBundle()!.price) / selectedBundle()!.compareAtPrice) | percent:'1.0-0') }}
                           </span>
                        }
                      </div>
                   </div>
               </div>







               <!-- Bundle Selection (Noreva Premium Design with individual variant pickers) -->
               @if (product(); as currentProduct) {
                 @if (currentProduct.bundles && currentProduct.bundles.length > 0) {
                   <div class="space-y-4 mb-10">
                     <div class="flex items-center justify-between mb-3 px-1">
                       <span class="text-xs font-black uppercase tracking-[0.2em] text-black block">{{ langService.currentLang() === 'ar' ? 'اختاري عرضكِ المثالي' : 'SELECT YOUR BUNDLE' }}</span>
                       <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ langService.currentLang() === 'ar' ? 'تخصيص الألوان متاح' : 'COLOR CUSTOMIZATION' }}</span>
                     </div>
                     
                      <div class="grid gap-4">
                        @for (bundle of currentProduct.bundles; track bundle.id) {
                          <!-- Ultimate Pack Special Design -->
                          @if (bundle.id === 'trio') {
                            <div (click)="selectBundle(bundle)" 
                               class="relative p-5 rounded-[1.8rem] cursor-pointer transition-all duration-300 border-2 overflow-hidden group shadow-lg"
                               [class.border-[#c19b6e]]="selectedBundle()?.id === bundle.id"
                               [class.bg-[#fffbf5]]="selectedBundle()?.id === bundle.id"
                               [class.ring-2]="selectedBundle()?.id === bundle.id"
                               [class.ring-[#c19b6e]]="selectedBundle()?.id === bundle.id"
                               [class.ring-offset-2]="selectedBundle()?.id === bundle.id"
                               [class.border-gray-200]="selectedBundle()?.id !== bundle.id">
                               
                               <!-- Badge -->
                               <div class="absolute top-0 left-1/2 -translate-x-1/2 bg-[#c19b6e] text-white text-[10px] font-black px-4 py-1 rounded-b-lg uppercase tracking-widest shadow-md z-10">
                                  {{ langService.currentLang() === 'ar' ? 'الأكثر مبيعاً' : 'MOST POPULAR' }}
                               </div>

                               <div class="flex items-start justify-between mb-3 mt-2">

                              <div class="flex items-start gap-3">
                                  <!-- Radio Button -->
                                  <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300"
                                       [class.border-[#c19b6e]]="selectedBundle()?.id === bundle.id"
                                       [class.border-gray-200]="selectedBundle()?.id !== bundle.id">
                                       @if (selectedBundle()?.id === bundle.id) { 
                                         <div class="w-2.5 h-2.5 bg-[#c19b6e] rounded-full shadow-sm animate-in zoom-in-50 duration-300"></div> 
                                       }
                                  </div>
                                   <div>
                                       <h3 class="font-black text-base uppercase tracking-tight flex items-center gap-2" [class.text-[#c19b6e]]="true">
                                           {{ bundle.title }}
                                           @if (bundle.id === 'trio') {
                                             <span class="text-[18px]">👑</span>
                                           }
                                       </h3>
                                       <p class="text-[10px] font-bold text-gray-500 mt-0.5 flex flex-wrap gap-2 items-center">
                                         <span class="bg-black text-white px-1.5 py-0.5 rounded text-[9px]">{{ bundle.subtitle }}</span>
                                         @if (bundle.id === 'trio') {
                                           <span class="text-[#c19b6e] flex items-center gap-1">
                                             <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                             {{ langService.currentLang() === 'ar' ? 'شحن سريع مجاني' : 'FREE EXPRESS SHIPPING' }}
                                           </span>
                                         }
                                       </p>
                                      
                                      <!-- Variant Selectors (Duo/Trio) -->
                                      @if (bundle.quantity > 1) {
                                        <div class="flex gap-2 mt-3">
                                          @for (item of [].constructor(bundle.quantity); track $index; let i = $index) {
                                            <div class="relative">
                                              <select (change)="updateBundleItemVariant(bundle.id, i, $any($event.target).value)" 
                                                      (click)="$event.stopPropagation()"
                                                      class="bg-white border rounded-md px-2 py-1.5 text-[10px] font-bold min-w-[70px] appearance-none cursor-pointer focus:outline-none transition-all"
                                                      [class.border-[#c19b6e]]="selectedBundle()?.id === bundle.id"
                                                      [class.border-gray-200]="selectedBundle()?.id !== bundle.id">
                                                @for (v of currentProduct.variants; track v.id) {
                                                  <option [value]="v.id" [selected]="bundleItemsVariants()[bundle.id]?.[i]?.id === v.id">
                                                    {{ getVariantTranslation(v) }}
                                                  </option>
                                                }
                                              </select>
                                              <div class="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"/></svg>
                                              </div>
                                            </div>
                                          }
                                        </div>
                                      }
                                  </div>
                              </div>
                              <div class="text-right flex flex-col items-end">
                                  <span class="text-[11px] font-bold text-[#c19b6e] uppercase leading-none mb-1">{{ currencyService.selectedCurrency().symbol }}</span>
                                  <div class="font-bold text-lg text-[#c19b6e] tracking-tighter leading-none">{{ bundle.price }}</div>
                                  @if (bundle.compareAtPrice > bundle.price) {
                                    <div class="text-[10px] text-gray-900 line-through font-medium mt-1 opacity-80">{{ currencyService.selectedCurrency().symbol }} {{ bundle.compareAtPrice }}</div>
                                  }
                              </div>
                           </div>

                           <!-- Gift Section -->
                            @if (bundle.hasGift) {
                              <div class="mt-4 -mx-6 -mb-6 bg-[#fdf2e9] border-t border-[#f7e8da] px-4 py-2 flex items-center justify-between">
                                 <div class="flex items-center gap-2">
                                    <div class="w-7 h-7 rounded border border-[#f7e8da] bg-white overflow-hidden">
                                       <img [src]="giftImage()" class="w-full h-full object-cover" alt="Free Gift">
                                    </div>
                                    <span class="text-[10px] font-bold text-gray-900">+ {{ langService.currentLang() === 'ar' ? 'هدية مجانية: مكبس رموش' : 'FREE gift: Eyelash Curler' }}</span>
                                 </div>
                                 <div class="text-[10px] font-bold text-gray-900 line-through opacity-80">
                                    {{ currencyService.selectedCurrency().symbol }} {{ bundle.giftValue }}
                                 </div>
                              </div>
                            }
                         </div>
                       } @else {
                         <div (click)="selectBundle(bundle)" 
                              class="relative p-4 md:p-5 rounded-[1.5rem] cursor-pointer transition-all duration-300 border-2 overflow-hidden group shadow-sm bg-white"
                              [class.border-[#c19b6e]]="selectedBundle()?.id === bundle.id"
                              [class.border-gray-100]="selectedBundle()?.id !== bundle.id"
                              [class.shadow-lg]="selectedBundle()?.id === bundle.id">
                           
                           <div class="flex items-start justify-between mb-3">
                              <div class="flex items-start gap-3">
                                  <!-- Radio Button -->
                                  <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300"
                                       [class.border-[#c19b6e]]="selectedBundle()?.id === bundle.id"
                                       [class.border-gray-200]="selectedBundle()?.id !== bundle.id">
                                       @if (selectedBundle()?.id === bundle.id) { 
                                         <div class="w-2.5 h-2.5 bg-[#c19b6e] rounded-full shadow-sm animate-in zoom-in-50 duration-300"></div> 
                                       }
                                  </div>
                                  <div>
                                      <h3 class="font-bold text-sm uppercase tracking-tight" [class.text-[#c19b6e]]="true">
                                          {{ bundle.title }}
                                      </h3>
                                      <p class="text-[10px] font-medium text-gray-500 mt-0.5">{{ bundle.subtitle }}</p>
                                      
                                      <!-- Variant Selectors (Duo/Trio) -->
                                      @if (bundle.quantity > 1) {
                                        <div class="flex gap-2 mt-3">
                                          @for (item of [].constructor(bundle.quantity); track $index; let i = $index) {
                                            <div class="relative">
                                              <select (change)="updateBundleItemVariant(bundle.id, i, $any($event.target).value)" 
                                                      (click)="$event.stopPropagation()"
                                                      class="bg-white border rounded-md px-2 py-1.5 text-[10px] font-bold min-w-[70px] appearance-none cursor-pointer focus:outline-none transition-all"
                                                      [class.border-[#c19b6e]]="selectedBundle()?.id === bundle.id"
                                                      [class.border-gray-200]="selectedBundle()?.id !== bundle.id">
                                                @for (v of currentProduct.variants; track v.id) {
                                                  <option [value]="v.id" [selected]="bundleItemsVariants()[bundle.id]?.[i]?.id === v.id">
                                                    {{ getVariantTranslation(v) }}
                                                  </option>
                                                }
                                              </select>
                                              <div class="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"/></svg>
                                              </div>
                                            </div>
                                          }
                                        </div>
                                      }
                                  </div>
                              </div>
                              <div class="text-right flex flex-col items-end">
                                  <span class="text-[11px] font-bold text-[#c19b6e] uppercase leading-none mb-1">{{ currencyService.selectedCurrency().symbol }}</span>
                                  <div class="font-bold text-lg text-[#c19b6e] tracking-tighter leading-none">{{ bundle.price }}</div>
                                  @if (bundle.compareAtPrice > bundle.price) {
                                    <div class="text-[10px] text-gray-900 line-through font-medium mt-1 opacity-80">{{ currencyService.selectedCurrency().symbol }} {{ bundle.compareAtPrice }}</div>
                                  }
                              </div>
                           </div>

                           <!-- Gift Section -->
                            @if (bundle.hasGift) {
                              <div class="mt-4 -mx-6 -mb-6 bg-[#fdf2e9] border-t border-[#f7e8da] px-4 py-2 flex items-center justify-between">
                                 <div class="flex items-center gap-2">
                                    <div class="w-7 h-7 rounded border border-[#f7e8da] bg-white overflow-hidden">
                                       <img [src]="giftImage()" class="w-full h-full object-cover" alt="Free Gift">
                                    </div>
                                    <span class="text-[10px] font-bold text-gray-900">+ {{ langService.currentLang() === 'ar' ? 'هدية مجانية: مكبس رموش' : 'FREE gift: Eyelash Curler' }}</span>
                                 </div>
                                 <div class="text-[10px] font-bold text-gray-900 line-through opacity-80">
                                    {{ currencyService.selectedCurrency().symbol }} {{ bundle.giftValue }}
                                 </div>
                              </div>
                            }
                         </div>
                       }
                     }
                   </div>
                   </div>
                 }
               }





               <!-- Desktop Add To Cart -->
               <div class="hidden lg:flex flex-col gap-4 mt-auto">
                  <div class="flex gap-3">
                     <button (click)="addToCart()" class="flex-1 py-5 bg-black text-white rounded-xl font-bold text-base uppercase tracking-widest hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-3">
                       <span>{{ langService.currentLang() === 'ar' ? 'أضيفي للحقيبة' : 'Add to bag' }}</span>
                       <span class="w-1.5 h-1.5 bg-white rounded-full opacity-30"></span>
                       <span>{{ currencyService.formatPrice(selectedBundle() ? selectedBundle()!.price : currentProduct.price) }}</span>
                     </button>
                     <button (click)="buyNow()" [disabled]="isCheckingOut()" class="flex-1 py-5 bg-[#c19b6e] text-white rounded-xl font-bold text-base uppercase tracking-widest hover:bg-[#b08d62] transition-all shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                       @if (isCheckingOut()) { <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> }
                       {{ langService.currentLang() === 'ar' ? 'شراء الآن' : 'Buy Now' }}
                     </button>
                  </div>
                  
                  <!-- Shipping Info (GCC Focused) -->
                  <div class="mt-3 flex items-center gap-3 p-3 bg-[#f0f9ff] rounded-xl border border-[#e0f2fe] text-[#0c4a6e]">
                      <div class="bg-white p-2 rounded-full shadow-sm text-[#0284c7]">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                      </div>
                      <div class="flex-1">
                          <p class="text-[10px] font-black uppercase tracking-widest mb-0.5">
                              {{ langService.currentLang() === 'ar' ? 'شحن سريع لدول الخليج' : 'FAST GCC SHIPPING' }} ✈️
                          </p>
                          <p class="text-[9px] font-medium leading-tight opacity-80">
                              {{ langService.currentLang() === 'ar' ? 'السعودية، الإمارات، قطر، البحرين، الكويت، عمان (4-12 يوم)' : 'Saudi Arabia, UAE, Qatar, Bahrain, Kuwait, Oman (4-12 Days)' }}
                          </p>
                      </div>
                  </div>

                  <!-- Trust Badges (Noreva Specific) -->
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3 text-center mt-6">
                       <div class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 border border-gray-100/50 hover:bg-gray-100 transition-colors">
                           <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                              <svg class="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20m10-10H2"/></svg>
                           </div>
                           <span class="text-[9px] uppercase font-black text-gray-900 tracking-widest">{{ langService.currentLang() === 'ar' ? 'تركيب في 3 ثوانٍ' : '3s Application' }}</span>
                       </div>
                       <div class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 border border-gray-100/50 hover:bg-gray-100 transition-colors">
                           <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                              <svg class="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16v16H4z"/></svg>
                           </div>
                           <span class="text-[9px] uppercase font-black text-gray-900 tracking-widest">{{ langService.currentLang() === 'ar' ? 'بدون صمغ' : 'Glue Free' }}</span>
                       </div>
                       <div class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 border border-gray-100/50 hover:bg-gray-100 transition-colors">
                           <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                              <svg class="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/></svg>
                           </div>
                           <span class="text-[9px] uppercase font-black text-gray-900 tracking-widest">{{ langService.currentLang() === 'ar' ? '100+ استخدام' : '100+ Uses' }}</span>
                       </div>
                  </div>
               </div>



            </div>
          </div>
          
          <!-- Sticky Mobile Cart Bar -->
          <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 lg:hidden z-50 safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
               <div class="grid grid-cols-2 gap-3">
                   <button (click)="addToCart()" class="w-full py-4 bg-white text-black border-2 border-black rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center">
                        {{ langService.currentLang() === 'ar' ? 'أضيفي للحقيبة' : 'Add to bag' }}
                   </button>
                   <button (click)="buyNow()" [disabled]="isCheckingOut()" class="w-full py-4 bg-black text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                        @if (isCheckingOut()) { <div class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> }
                        <span>{{ langService.currentLang() === 'ar' ? 'شراء الآن' : 'Buy Now' }}</span>
                        <span class="w-1 h-1 bg-white rounded-full opacity-30"></span>
                        <span>{{ currencyService.formatPrice(selectedBundle() ? selectedBundle()!.price : currentProduct.price) }}</span>
                   </button>
               </div>
          </div>

          <!-- Comparison VS Section -->
          <div class="mt-8 pt-8 border-t border-gray-100 max-w-6xl mx-auto px-6 relative">
            <div class="text-center mb-16">
              <h3 class="text-3xl md:text-5xl font-serif text-black mb-4">
                {{ langService.currentLang() === 'ar' ? 'اختراع يوفر عليكِ الآلاف' : 'One Box, Infinite Glow' }}
              </h3>
              <p class="text-gray-500 uppercase tracking-widest text-[10px] font-black">
                {{ langService.currentLang() === 'ar' ? 'وداعاً للتبذير.. استثمار في جمالك وراحتك' : 'Stop the waste cycle. The smarter way to lash.' }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 relative items-center">
              <!-- VS Text (Redesigned: Tighter & Tilted) -->
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none">
                 <div class="relative font-serif font-black italic text-black leading-none flex flex-col items-center justify-center transform -rotate-12 mix-blend-multiply opacity-90">
                    <span class="text-7xl md:text-[10rem] relative top-6 md:top-10 right-2 md:right-4">V</span>
                    <span class="text-7xl md:text-[10rem] relative bottom-6 md:bottom-10 left-2 md:left-4">S</span>
                 </div>
              </div>
              
              <!-- Expensive Side -->
              <div class="bg-[#F8F9FA] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center shadow-lg border border-gray-100">
                <div class="relative aspect-square w-full">
                    <img src="/assets/exp lash.png" class="absolute inset-0 w-full h-full object-cover">
                  
                  <!-- Value Bubble -->
                  <div class="absolute top-6 left-6 md:top-8 md:left-8 w-24 h-24 md:w-32 md:h-32 bg-black text-white rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white z-10">
                    <span class="text-lg md:text-2xl font-serif font-black tracking-tighter">2,100</span>
                    <span class="text-[8px] md:text-[10px] font-black opacity-60 leading-none mt-1 uppercase">AED VALUE</span>
                  </div>
                </div>
                <!-- Text Below Image -->
                <div class="p-6 md:p-8 text-center bg-white w-full border-t border-gray-50 flex-1 flex items-center justify-center">
                    <p class="text-gray-900 font-bold text-lg md:text-2xl tracking-tight">
                        {{ langService.currentLang() === 'ar' ? 'جبل من المصاريف' : 'Mountain of Expenses' }}
                    </p>
                </div>
              </div>

              <!-- Noreva Side -->
              <div class="bg-[#F8F9FA] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center shadow-lg border border-gray-100">
                <div class="relative aspect-square w-full">
                    <img src="/assets/magic lasher.png" class="absolute inset-0 w-full h-full object-cover">
                </div>
                <!-- Text Below Image -->
                <div class="p-6 md:p-8 text-center bg-white w-full border-t border-gray-50 flex-1 flex items-center justify-center">
                    <p class="text-gray-900 font-bold text-lg md:text-2xl tracking-tight">
                        {{ langService.currentLang() === 'ar' ? 'قابلة للاستخدام أكثر من 100 مرة' : 'Reusable Over 100+ Times' }}
                    </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-gray-100 max-w-4xl mx-auto px-6">
            <div class="text-center mb-12">
              <h3 class="text-3xl md:text-5xl font-serif text-black mb-4">
                {{ langService.currentLang() === 'ar' ? 'التحول المذهل مع نوريڤا' : 'The Noreva Transformation' }}
              </h3>
              <p class="text-gray-500 uppercase tracking-widest text-[10px] font-black">
                {{ langService.currentLang() === 'ar' ? 'نتائج فورية وطبيعية 100٪' : 'Instant & 100% natural results' }}
              </p>
            </div>

            <!-- Slider Container (Forced LTR to prevent inversion in RTL mode) -->
            <div class="relative aspect-[4/3] md:aspect-video rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-[4px] md:border-[12px] border-white select-none bg-gray-100" dir="ltr">
              <!-- After Image (Background Layer) -->
              <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" 
                   [style.clip-path]="'inset(0px 0px 0px ' + sliderPosition() + '%)'">
                <img src="/assets/after.png" class="absolute inset-0 w-full h-full object-cover">
                <!-- Label After (Styled same as Before) -->
                <div class="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[8px] md:text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest font-black">
                  {{ langService.currentLang() === 'ar' ? 'بعد' : 'After' }}
                </div>
              </div>
              
              <!-- Before Image (Top Layer) -->
              <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" 
                   [style.clip-path]="'inset(0px ' + (100 - sliderPosition()) + '% 0px 0px)'">
                <img src="/assets/before.png" class="absolute inset-0 w-full h-full object-cover">
                <!-- Label Before -->
                 <div class="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[8px] md:text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest font-black">
                  {{ langService.currentLang() === 'ar' ? 'قبل' : 'Before' }}
                </div>
              </div>

              <!-- Slider Handle -->
              <div class="absolute inset-y-0 pointer-events-none z-20" [style.left.%]="sliderPosition()">
                <div class="absolute inset-y-0 w-0.5 bg-white shadow-lg"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-gray-100">
                   <svg class="w-4 h-4 md:w-6 md:h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M18 12L13 7M18 12L13 17M6 12L11 7M6 12L11 17M18 12H6" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                </div>
              </div>

              <!-- Range Input (Touch Area) -->
              <input type="range" min="0" max="100" [value]="sliderPosition()" (input)="onSliderInput($event)" 
                     class="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0">
            </div>

          </div>

          <!-- Speed Section (Why Us) -->
          <div class="mt-8 pt-8 border-t border-gray-100 max-w-4xl mx-auto px-6">
             <div class="text-center mb-12">
                <h3 class="text-3xl md:text-5xl font-serif text-black mb-4">
                  {{ langService.currentLang() === 'ar' ? 'جاهزة في ثوانٍ' : 'Ready in Seconds' }}
                </h3>
                <p class="text-gray-500 uppercase tracking-widest text-[10px] font-black">
                  {{ langService.currentLang() === 'ar' ? 'توفير وقتك هو أولويتنا' : 'Saving your time is our priority' }}
                </p>
             </div>
             
             <div class="rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-black">
                <div class="relative w-full aspect-[3/4]">
                   <video src="/assets/noreva-why-us.mp4" autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover"></video>
                </div>
             </div>
          </div>

          <!-- Explanation Section (How to Apply) -->
          <div class="mt-8 pt-8 border-t border-gray-100 max-w-4xl mx-auto px-6">
             <div class="text-center mb-12">
                <h3 class="text-3xl md:text-5xl font-serif text-black mb-4">
                  {{ langService.currentLang() === 'ar' ? 'طريقة التركيب' : 'How It Works' }}
                </h3>
                <p class="text-gray-500 uppercase tracking-widest text-[10px] font-black">
                  {{ langService.currentLang() === 'ar' ? 'سهولة في ٣ خطوات بسيطة' : 'Simple 3-Step Application' }}
                </p>
             </div>
             
             <div class="rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-black">
                <!-- "Cut the top" achieved by object positioning or wrapper -->
                <div class="relative w-full aspect-[3/4]">
                   <img src="/assets/explanation vid.gif" class="absolute w-full h-[115%] -top-[15%] left-0 object-cover" alt="Explanation">
                </div>
             </div>
          </div>




          <!-- FAQ Section -->
          <div class="mt-16 pt-16 border-t border-gray-100 max-w-4xl mx-auto px-6">
             <div class="text-center mb-12">
                <h3 class="text-3xl md:text-5xl font-serif text-black mb-4">
                  {{ langService.currentLang() === 'ar' ? 'الأسئلة الشائعة' : 'Questions & Answers' }}
                </h3>
                <p class="text-gray-500 uppercase tracking-widest text-[10px] font-black">
                  {{ langService.currentLang() === 'ar' ? 'كل ما تودين معرفته عن نوريڤا' : 'Everything you need to know about Noreva' }}
                </p>
             </div>

             <div class="space-y-4">
                @for (faq of (langService.currentLang() === 'ar' ? faqsAr : faqsEn); track faq.q) {
                  <div class="border border-gray-100 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                    <button (click)="faq.open = !faq.open" 
                            class="w-full p-6 text-start flex items-center justify-between gap-4 focus:outline-none">
                      <span class="text-sm md:text-base font-bold text-gray-900">{{ faq.q }}</span>
                      <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 transition-transform duration-300"
                           [class.rotate-180]="faq.open">
                        <svg class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
                      </div>
                    </button>
                    @if (faq.open) {
                      <div class="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div class="h-px bg-gray-50 mb-6"></div>
                        <p class="text-sm text-gray-500 leading-relaxed">{{ faq.a }}</p>
                      </div>
                    }
                  </div>
                }
             </div>
          </div>

          <!-- Reviews Integration -->
          <div class="mt-16 pt-16 border-t border-gray-100">
             <app-reviews></app-reviews>
          </div>
        }
      </div>

      @if (showNewsletter()) {
        @if (!isNewsletterMinimized()) {
          <div class="fixed inset-0 z-[1000] flex items-center justify-center p-2 md:p-4 animate-in fade-in duration-500">
             <!-- Backdrop -->
             <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" (click)="closeNewsletter()"></div>
             
             <!-- Content Card -->
             <div class="relative w-full max-w-6xl md:h-[650px] bg-white shadow-2xl flex flex-row overflow-hidden animate-in zoom-in-95 duration-500 rounded-sm">
                
                <!-- Close Button (Minimize) -->
                <button (click)="closeNewsletter()" class="absolute top-3 right-3 md:top-6 md:right-6 z-20 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-white text-black hover:bg-gray-100 rounded-full transition-all shadow-lg group">
                   <svg class="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
  
                <!-- Image Side (Left - 35% on Mobile) -->
                <div class="w-[35%] md:w-1/2 bg-[#f5f5f5] relative shrink-0">
                   <img src="/assets/models.png" alt="Models" class="absolute inset-0 w-full h-full object-cover">
                </div>
  
                <!-- Content Side (Right - 65% on Mobile) -->
                <div class="w-[65%] md:w-1/2 p-4 md:p-20 flex flex-col items-center justify-center text-center bg-white" [dir]="langService.isRtl() ? 'rtl' : 'ltr'">
                   
                   <h3 class="text-sm md:text-2xl font-serif italic text-gray-900 mb-2 md:mb-8 tracking-wide whitespace-nowrap">
                     {{ langService.currentLang() === 'ar' ? 'أهلاً بك في نوريڤا!' : 'Welcome to Noreva !' }}
                   </h3>
                   
                   <h2 class="text-3xl md:text-8xl font-serif text-black leading-[0.9] mb-4 md:mb-12">
                     {{ langService.currentLang() === 'ar' ? 'خصم ١٠٪' : 'Enjoy 10% Off' }}
                     <span class="text-sm md:text-3xl block mt-2 md:mt-4 font-sans font-normal text-gray-600 uppercase tracking-widest leading-normal">{{ langService.currentLang() === 'ar' ? 'على طلبك الأول' : 'YOUR FIRST ORDER' }}</span>
                   </h2>
  
                   <div class="w-full max-w-[90%] md:max-w-md space-y-4 md:space-y-8">
                      <a routerLink="/login" (click)="closeNewsletter()" 
                         class="flex items-center justify-center w-full h-12 md:h-16 bg-[#ebeae6] hover:bg-[#dedcd6] text-black font-serif font-bold tracking-[0.2em] uppercase transition-colors text-sm md:text-2xl whitespace-nowrap cursor-pointer shadow-sm">
                        {{ langService.currentLang() === 'ar' ? 'تسجيل الدخول' : 'SIGN IN / REGISTER' }}
                      </a>
                   </div>
  
                   <button (click)="closeNewsletter()" class="mt-4 md:mt-12 text-gray-400 hover:text-black transition-colors font-medium text-[10px] md:text-base border-b border-gray-200 hover:border-black pb-0.5 leading-tight">
                     {{ langService.currentLang() === 'ar' ? 'شكراً، سأدفع السعر الكامل' : 'No thanks, I will pay the full price' }}
                   </button>
  
                </div>
             </div>
          </div>
        } @else {
          <!-- Minimized Floating Button -->
          <button (click)="openNewsletter()" class="fixed bottom-24 left-4 md:bottom-10 md:left-10 z-[1000] bg-white text-black pl-2 pr-6 py-2 rounded-full shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom duration-500 hover:scale-105 active:scale-95 transition-all border border-gray-100 group cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            <div class="w-10 h-10 bg-black rounded-full flex items-center justify-center text-lg animate-pulse shadow-lg text-white">🎁</div>
            <div class="flex flex-col text-start">
               <span class="text-[10px] font-black uppercase tracking-widest text-black leading-tight">{{ langService.currentLang() === 'ar' ? 'خصم ١٠٪' : '10% OFF' }}</span>
               <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">{{ langService.currentLang() === 'ar' ? 'حصرياً لك' : 'JUST FOR YOU' }}</span>
            </div>
          </button>
        }
      }
    </div>
  `,
  styles: [`
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(50%); } }
    .animate-marquee { display: inline-flex; animation: marquee 20s linear infinite; }
    :host { display: block; overflow-x: hidden; }
    
    @keyframes zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    @keyframes slide-in-bottom { from { transform: translateY(20px); } to { transform: translateY(0); } }
    .zoom-in-95 { animation: zoom-in 0.5s ease-out forwards; }
    .slide-in-from-bottom-10 { animation: slide-in-bottom 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  `]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  langService = inject(LanguageService);
  private shopifyService = inject(ShopifyService); // Inject ShopifyService
  private cartService = inject(CartService);
  currencyService = inject(CurrencyService);
  authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  @ViewChild('mainImageContainer') mainImageContainer!: ElementRef<HTMLElement>;

  // Use signal for product state
  product = signal<any | null>(null);

  selectedBundle = signal<any | undefined>(undefined);
  selectedVariant = signal<any | undefined>(undefined);
  selectedImageIndex = signal(0);

  // Newsletter Signals
  showNewsletter = signal(false);
  isNewsletterMinimized = signal(false);
  isCheckingOut = signal(false); // Checkout loading state
  private newsletterShown = false;
  giftImage = signal("");

  faqsAr = [
    { q: 'أول مرة أجرب رموش مغناطيس؟', a: 'نوريڤا مصممة للمبتدئات! أول مرة يمكن تاخذ معك دقايق، بس من ثالث مرة بتصيرين محترفة وتركبينها في أقل من 30 ثانية. شوفي فيديو التعليمات وبتضبطينها فوراً.', open: false },
    { q: 'هل هي آمنة للعيون الحساسة؟', a: 'أكيد. نوريڤا خالية تماماً من الصمغ والمواد الكيميائية والفورمالديهايد. نستخدم مغناطيس طبي آمن، مما يجعله مثالياً للعيون الحساسة أو لمن تعاني من حساسية الصمغ.', open: false },
    { q: 'هل تضر رموشي الطبيعية؟', a: 'لا أبداً! عكس الرموش اللي تستخدم صمغ وممكن تخلع رموشك، مغناطيس نوريڤا يمسك بلطف على رموشك بدون أي ضرر. كثير عميلات لاحظوا إن رموشهم الطبيعية صارت صحية أكثر بعد ما وقفوا استخدام الصمغ.', open: false },
    { q: 'كم تدوم معي؟', a: 'كل طقم قابل للاستخدام أكثر من 100 مرة مع العناية. بس فكيه بلطف، أمسحيه ورجعيه العلبة. أغلب عميلاتنا يستخدمون الطقم الواحد يومياً لمدة 2-3 أشهر.', open: false },
    { q: 'هل يكفي "الزوج الواحد" للعينين؟', a: 'طبعاً! الزوج الواحد يحتوي على طقم كامل لعينيكِ اليمنى واليسرى (٤ قطع بالمجمل: ٢ فوق و ٢ تحت).', open: false }
  ];

  faqsEn = [
    { q: 'What if I never used magnetic lashes before?', a: 'Noreva is designed for beginners! The first try might take a few minutes, but by your third application, you’ll be doing it in under 30 seconds. Watch our tutorial video and you’ll be a pro in no time.', open: false },
    { q: 'Are they safe for sensitive eyes?', a: 'Absolutely. Noreva contains zero glue, zero cyanoacrylate, and zero formaldehyde. Just medical-grade magnets. Perfect for women with sensitive eyes, glue allergies, or aging skin.', open: false },
    { q: 'Do they damage my natural lashes?', a: 'No! Unlike glue-based lashes that can pull out your natural lashes, Noreva magnets gently sandwich your lashes without any damage. Many customers report their natural lashes look healthier after switching from glue.', open: false },
    { q: 'How long do these last?', a: 'Each set is reusable 100+ times with proper care. Simply remove gently after wear, wipe clean, and store in the case. Most customers get 2-3 months of daily wear from one set.', open: false },
    { q: 'Is a "Single Pair" for both eyes?', a: 'Yes! One pair includes a complete set for both your left and right eyes (4 pieces total: 2 top + 2 bottom magnets).', open: false }
  ];

  sliderPosition = signal(50);

  // Variant choices for each item in each bundle
  bundleItemsVariants = signal<Record<string, any[]>>({});

  updateBundleItemVariant(bundleId: string, itemItemIndex: number, variantId: string) {
    const p = this.product();
    if (!p) return;
    const variant = p.variants.find((v: any) => v.id === variantId);
    if (!variant) return;

    this.bundleItemsVariants.set({
      ...this.bundleItemsVariants(),
      [bundleId]: (this.bundleItemsVariants()[bundleId] || []).map((v, i) => i === itemItemIndex ? variant : v)
    });

    // If this is the active bundle, update main variant for gallery
    if (this.selectedBundle()?.id === bundleId) {
      this.selectVariant(variant);
    }
  }

  getVariantTranslation(variant: any) {
    if (!variant) return '';
    const name = variant.name || variant.title;
    if (this.langService.currentLang() === 'ar') {
      return name === 'Black' ? 'أسود' : name === 'Dark Brown' ? 'بني داكن' : name === 'Light Brown' ? 'بني فاتح' : name;
    }
    return name;
  }

  onSliderInput(event: any) {
    this.sliderPosition.set(event.target.value);
  }

  constructor() { }

  isDescriptionExpanded = signal(false);

  toggleDescription() {
    this.isDescriptionExpanded.update(v => !v);
  }

  // Localized Descriptions
  private descriptions = {
    en: `1. INNOVATIVE MAGNETIC DESIGN: Easy to wear without glue, the one-piece structure is simple and convenient, saving your time.\n\n2. PREMIUM MATERIALS: Made of high-quality flexible magnets and simulated hair material, light and comfortable, suitable for all eye shapes.\n\n3. SMART PACKAGING: Unique magnetic integrated box packaging, easy to store and carry.\n\n4. SUSTAINABLE BEAUTY: Repeated use without damage, environmentally friendly and economical.\n\n5. PERFECT FIT: Fits the eye contour perfectly to match your makeup style.\n\n⚠️ HEALTH ALERT: Traditional lash glues often contain harsh chemicals that can lead to eye infections, irritation, and permanent lash loss if left on during sleep. Our 100% glue-free technology eliminates these risks, ensuring your eye health is never compromised.\n\n* Shelf Life: 3 Years\n* Manual measurement tolerance: 2-5g\n* Note: Colors may vary slightly due to display settings.`,
    ar: `1. تصميم مغناطيسي مبتكر: سهل الارتداء بدون صمغ، هيكل متكامل بسيط ومريح يوفر وقتكِ وجهدكِ.\n\n2. مواد فاخرة: مصنوعة من مغناطيسات مرنة عالية الجودة وشعر محاكي للطبيعي، خفيفة ومريحة، تناسب جميع أشكال العيون.\n\n3. تغليف ذكي: عبوة مدمجة مغناطيسية فريدة، سهلة التخزين والحمل.\n\n4. جمال مستدام: قابلة للاستخدام المتكرر دون تلف، صديقة للبيئة واقتصادية.\n\n5. تطابق مثالي: تتناسب مع محيط العين تماماً لتتناغم مع أسلوب مكياجكِ.\n\n⚠️ تنبيه صحي: صمغ الرموش التقليدي غالباً ما يحتوي على مواد كيميائية قاسية قد تؤدي إلى التهابات العين، التهيج، وفقدان الرموش الدائم خاصة عند النوم به. تقنيتنا الخالية من الصمغ بنسبة 100% تقضي على هذه المخاطر تماماً، مما يضمن الحفاظ على صحة عينيكِ.\n\n* مدة الصلاحية: 3 سنوات\n* ملاحظة: تفاوت القياس اليدوي 2-5 جرام.\n* تنبيه: قد تختلف الألوان الفعلية قليلاً حسب إعدادات الشاشة.`
  };

  get currentLocalizedDescription() {
    const lang = this.langService.currentLang();
    return this.descriptions[lang] || this.product()?.description || '';
  }

  get truncatedLocalizedDescription() {
    const desc = this.currentLocalizedDescription;
    if (desc.length <= 150) return desc;
    return desc.substring(0, 150) + '...';
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    // Show to all non-logged in users
    if (!this.authService.isLoggedIn()) {
      setTimeout(() => {
        if (!this.newsletterShown) {
          this.showNewsletter.set(true);
          this.newsletterShown = true;
        }
      }, 5000);
    }

    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        const productData = (await this.shopifyService.getProductByHandle(id)) as any;
        if (productData) {
          // Inject bundles for any product loaded on this page
          if (productData.variants?.length > 0) {
            this.shopifyService.getProductByHandle('eyelash-curler').then(giftP => {
              if (giftP) this.giftImage.set(giftP.imageUrl || giftP.images?.[0] || '');
            });

            productData.features = [];
            productData.bundles = [
              {
                id: 'trio',
                title: this.langService.currentLang() === 'ar' ? 'الباقة المتكاملة' : 'Ultimate Pack',
                subtitle: this.langService.currentLang() === 'ar' ? 'وفر 15٪' : 'Save 15%',
                quantity: 3,
                price: 131.37,
                compareAtPrice: 176.37,
                savings: 45.00,
                hasGift: true,
                giftValue: 32.99
              },
              {
                id: 'duo',
                title: this.langService.currentLang() === 'ar' ? 'طقم زوجين' : 'Duo',
                subtitle: this.langService.currentLang() === 'ar' ? 'وفر 10٪' : 'Save 10%',
                quantity: 2,
                price: 105.83,
                compareAtPrice: 117.58,
                savings: 11.75,
                hasGift: true,
                giftValue: 32.99
              },
              {
                id: 'single',
                title: this.langService.currentLang() === 'ar' ? 'زوج واحد' : 'Single',
                subtitle: this.langService.currentLang() === 'ar' ? 'السعر الأساسي' : 'Standard price',
                quantity: 1,
                price: 58.79,
                compareAtPrice: 58.79,
                savings: 0
              }
            ];
          }

          this.product.set(productData);

          // Initialize bundle variants mapping
          if (productData.bundles && productData.variants) {
            const initial: Record<string, any[]> = {};
            productData.bundles.forEach((b: any) => {
              initial[b.id] = Array(b.quantity || 1).fill(productData.variants[0]);
            });
            this.bundleItemsVariants.set(initial);
          }

          // Pre-select logic
          // Pre-select logic
          if (productData.bundles?.length > 0) {
            this.selectedBundle.set(productData.bundles[0]); // Default to Ultimate
          }
          if (productData.variants?.length > 0) {
            this.selectedVariant.set(productData.variants[0]);
          }
        }
      }
    });
  }

  ngOnDestroy() { }

  onMainScroll() {
    if (!this.mainImageContainer?.nativeElement) return;
    const container = this.mainImageContainer.nativeElement;
    const index = Math.round(container.scrollLeft / container.offsetWidth);
    this.selectedImageIndex.set(index);
  }

  scrollToIndex(index: number) {
    if (this.mainImageContainer?.nativeElement) {
      const container = this.mainImageContainer.nativeElement;
      const child = container.children[index] as HTMLElement;
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        this.selectedImageIndex.set(index);
      }
    }
  }

  selectBundle(bundle: any) {
    this.selectedBundle.set(bundle);
    // Update main variant based on first item in bundle
    const variants = this.bundleItemsVariants()[bundle.id];
    if (variants && variants.length > 0) {
      this.selectVariant(variants[0]);
    }
  }

  selectVariant(variant: any) {
    this.selectedVariant.set(variant);
    const p = this.product();
    if (p && p.images && p.images.length >= 3) {
      const name = variant.name || variant.title;
      let index = -1;

      if (name === 'Black') {
        index = p.images.length - 3;
      } else if (name === 'Dark Brown') {
        index = p.images.length - 2;
      } else if (name === 'Light Brown') {
        index = p.images.length - 1;
      }

      if (index >= 0) {
        this.scrollToIndex(index);
      }
    }
  }

  async addToCart(openCart = true) {
    const p = this.product();
    if (!p) return;
    const bundle = this.selectedBundle();
    // Add individual items for the bundle
    const quantity = bundle ? bundle.quantity : 1;
    const variants = bundle && this.bundleItemsVariants()[bundle.id] ? this.bundleItemsVariants()[bundle.id] : [this.selectedVariant()];

    // Calculate unit price for bundle items to match total bundle price
    const bundlePrice = bundle ? bundle.price : p.price;
    const unitPrice = bundlePrice / quantity;

    for (let i = 0; i < quantity; i++) {
      const v = variants[i] || variants[0];
      this.cartService.addToCart(p, 1, v, unitPrice);
    }

    // Add free gift if applicable
    if (bundle?.hasGift) {
      const giftProduct = await this.shopifyService.getProductByHandle('eyelash-curler');
      if (giftProduct && giftProduct.variants?.length > 0) {
        this.cartService.addToCart(giftProduct as any, 1, giftProduct.variants[0], 0);
      }
    }

    if (openCart) {
      this.cartService.isCartOpen.set(true);
    }
  }

  async buyNow() {
    if (this.isCheckingOut()) return;

    // 1. Add item to cart (without opening drawer)
    await this.addToCart(false);

    // 2. Proceed to checkout
    try {
      this.isCheckingOut.set(true);

      const lineItems = this.cartService.items().map(item => ({
        variantId: item.variant?.id || item.product.variants[0]?.id,
        quantity: item.quantity
      }));

      // Add shipping protection if enabled
      if (this.cartService.shippingProtection()) {
        const protectionId = await this.shopifyService.getShippingProtectionVariantId();
        if (protectionId) {
          lineItems.push({
            variantId: protectionId,
            quantity: 1
          });
        }
      }

      if (lineItems.length === 0) {
        this.isCheckingOut.set(false);
        return;
      }

      const result = await this.shopifyService.createCart(lineItems);

      if (result && result.cart && result.cart.checkoutUrl) {
        window.location.href = result.cart.checkoutUrl;
      } else {
        throw new Error('Could not create checkout URL');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error?.message || 'Error proceeding to checkout');
      this.isCheckingOut.set(false);
    }
  }

  // Newsletter Methods
  closeNewsletter() {
    this.isNewsletterMinimized.set(true);
  }

  openNewsletter() {
    this.isNewsletterMinimized.set(false);
  }

}
