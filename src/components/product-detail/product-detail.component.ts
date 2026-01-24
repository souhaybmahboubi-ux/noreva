
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
                   <div class="flex items-start justify-between gap-4 mb-3">
                       <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                         {{ currentProduct.title }}
                       </h1>
                       <!-- Share/Wishlist placeholders could go here -->
                   </div>
                   
                   <div class="flex items-center gap-3">
                      <div class="flex items-baseline gap-2 text-black">
                        <span class="text-2xl font-bold">{{ currencyService.formatPrice(selectedBundle() ? selectedBundle()!.price : currentProduct.price) }}</span>
                        @if (selectedBundle() && selectedBundle()!.compareAtPrice > selectedBundle()!.price) {
                          <span class="text-gray-400 line-through text-sm">{{ currencyService.formatPrice(selectedBundle()!.compareAtPrice) }}</span>
                          <span class="bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                              {{ langService.currentLang() === 'ar' ? 'خصم' : 'Save' }} {{ ((selectedBundle()!.compareAtPrice - selectedBundle()!.price) / selectedBundle()!.compareAtPrice) | percent:'1.0-0' }}
                          </span>
                        }
                      </div>
                      
                      <!-- Rating Placeholder -->
                      <div class="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                          <svg class="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                          <span class="text-xs font-bold text-gray-700">4.9</span>
                          <span class="text-[10px] text-gray-400">(1.2k)</span>
                      </div>
                   </div>
               </div>

               <!-- Short Description -->
               <div class="mb-8">
                 <p class="text-gray-600 leading-relaxed text-sm lg:text-base animate-in fade-in duration-500 whitespace-pre-line">
                   {{ isDescriptionExpanded() ? currentLocalizedDescription : truncatedLocalizedDescription }}
                 </p>
                 @if (currentLocalizedDescription.length > 150) {
                   <button (click)="toggleDescription()" class="text-black font-bold text-xs uppercase tracking-widest mt-2 hover:underline">
                     {{ isDescriptionExpanded() ? (langService.currentLang() === 'ar' ? 'اقرأ أقل' : 'Read Less') : (langService.currentLang() === 'ar' ? 'اقرأ المزيد' : 'Read More') }}
                   </button>
                 }
               </div>

               <!-- Style/Color Selector -->
               @if (currentProduct.variants && currentProduct.variants.length > 0) {
                 <div class="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-xs font-bold uppercase tracking-widest text-gray-900">{{ langService.currentLang() === 'ar' ? 'النمط' : 'Style' }}</span>
                    </div>
                     <div class="flex flex-wrap gap-2">
                         @for (v of currentProduct.variants; track v.id) {
                             <button (click)="selectVariant(v)" class="px-4 py-2 rounded-lg border-2 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                                     [class.border-black]="selectedVariant()?.id === v.id" 
                                     [class.bg-black]="selectedVariant()?.id === v.id"
                                     [class.text-white]="selectedVariant()?.id === v.id"
                                      [class.border-gray-200]="selectedVariant()?.id !== v.id"
                                      [class.text-gray-900]="selectedVariant()?.id !== v.id">
                                 {{ langService.currentLang() === 'ar' ? (v.name === 'Black' ? 'أسود' : v.name === 'Dark Brown' ? 'بني داكن' : v.name === 'Light Brown' ? 'بني فاتح' : v.name) : v.name }}
                             </button>
                         }
                     </div>
                 </div>
               }

               <!-- Bundle Selector (Cards) -->
               @if (currentProduct.bundles && currentProduct.bundles.length > 0) {
                 <div class="space-y-4 mb-8">
                   <span class="text-xs font-bold uppercase tracking-widest text-gray-900 block mb-3">{{ langService.currentLang() === 'ar' ? 'اختر العرض' : 'Choose Bundle' }}</span>
                   <div class="grid gap-3">
                     @for (bundle of currentProduct.bundles; track bundle.id) {
                       <div (click)="selectBundle(bundle)" 
                            class="relative p-4 rounded-xl cursor-pointer transition-all duration-200 border-2"
                            [class.border-black]="selectedBundle()?.id === bundle.id"
                            [class.bg-black]="selectedBundle()?.id === bundle.id"
                            [class.text-white]="selectedBundle()?.id === bundle.id"
                            [class.border-gray-100]="selectedBundle()?.id !== bundle.id"
                            [class.hover:border-gray-300]="selectedBundle()?.id !== bundle.id">
                         
                         <!-- Most Popular Badge -->
                         @if (bundle.isMostPopular) {
                             <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-200 to-amber-400 text-black text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">
                                 {{ langService.currentLang() === 'ar' ? 'الأكثر مبيعاً' : 'Best Seller' }}
                             </div>
                         }

                         <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                                     [class.border-white]="selectedBundle()?.id === bundle.id"
                                     [class.border-gray-300]="selectedBundle()?.id !== bundle.id">
                                     @if (selectedBundle()?.id === bundle.id) { <div class="w-2.5 h-2.5 bg-white rounded-full"></div> }
                                </div>
                                 <div>
                                     <h3 class="font-bold text-sm" [class.text-white]="selectedBundle()?.id === bundle.id" [class.text-gray-900]="selectedBundle()?.id !== bundle.id">
                                         {{ langService.currentLang() === 'ar' 
                                            ? (bundle.title.includes('Pair') || bundle.title.includes('زوج') 
                                                ? (bundle.quantity === 1 ? 'زوج واحد' : bundle.quantity === 2 ? 'عرض الـ ٢ زوج (١+١ مجاناً)' : 'باقة الصديقات (٣ أزواج + ٢ مجاناً)')
                                                : bundle.title)
                                            : (bundle.title.includes('Pair') || bundle.title.includes('زوج')
                                                ? (bundle.quantity === 1 ? '1 Pair' : bundle.quantity === 2 ? '2 Pairs Bundle (1+1 Free)' : 'Friends Pack (3 Pairs + 2 Free)')
                                                : bundle.title)
                                         }}
                                     </h3>
                                     @if (bundle.subtitle) {
                                         <p class="text-xs mt-0.5 opacity-80">
                                            {{ langService.currentLang() === 'ar'
                                                ? (bundle.subtitle.includes('Magic') || bundle.subtitle.includes('السحر') ? 'تجربة السحر المغناطيسي' : bundle.subtitle.includes('Daily') || bundle.subtitle.includes('يومي') ? 'لوك يومي ولوك سهرة ✈️ شحن مجاني' : bundle.subtitle.includes('Saving') || bundle.subtitle.includes('توفير') ? 'توفير خيالي لكِ ولصديقاتكِ ✈️' : bundle.subtitle)
                                                : (bundle.subtitle.includes('Magic') || bundle.subtitle.includes('السحر') ? 'Experience Magnetic Magic' : bundle.subtitle.includes('Daily') || bundle.subtitle.includes('يومي') ? 'Daily & Evening Look ✈️ Free Shipping' : bundle.subtitle.includes('Saving') || bundle.subtitle.includes('توفير') ? 'Unreal Savings For You & Friends ✈️' : bundle.subtitle)
                                            }}
                                         </p>
                                     }
                                 </div>
                            </div>
                            <div class="text-right">
                                <div class="font-bold text-sm">{{ currencyService.formatPrice(bundle.price) }}</div>
                                @if (bundle.savings > 0) {
                                    <div class="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded inline-block mt-1">
                                        {{ langService.currentLang() === 'ar' ? 'وفرت' : 'Save' }} {{ currencyService.formatPrice(bundle.savings) }}
                                    </div>
                                }
                            </div>
                         </div>
                       </div>
                     }
                   </div>
                 </div>
               }

               <!-- Desktop Add To Cart -->
               <div class="hidden lg:flex flex-col gap-4 mt-auto">
                  <button (click)="addToCart()" class="w-full py-5 bg-black text-white rounded-xl font-bold text-base uppercase tracking-widest hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-3">
                    <span>{{ langService.currentLang() === 'ar' ? 'أضيفي للحقيبة' : 'Add to bag' }}</span>
                    <span class="w-1.5 h-1.5 bg-white rounded-full opacity-30"></span>
                    <span>{{ currencyService.formatPrice(selectedBundle() ? selectedBundle()!.price : currentProduct.price) }}</span>
                  </button>
                  
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

                <!-- Brand Value Pillars -->
               <div class="grid grid-cols-1 gap-6 mt-12 bg-gray-50 p-6 md:p-8 rounded-[2.5rem] border border-gray-100">
                  <div class="flex items-start gap-4">
                     <div class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-black flex-shrink-0">1</div>
                     <div>
                        <h4 class="font-black text-sm uppercase tracking-widest mb-1">{{ langService.currentLang() === 'ar' ? 'خفيفة كالريشة' : 'FEATHER LIGHT' }}</h4>
                        <p class="text-xs text-gray-500 leading-relaxed">{{ langService.currentLang() === 'ar' ? 'بطانة شفافة رفيعة جداً تمنحكِ شعوراً بالحرية طوال اليوم.' : 'Ultra-thin clear bands for a zero-gravity feel all day long.' }}</p>
                     </div>
                  </div>
                  <div class="flex items-start gap-4">
                     <div class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-black flex-shrink-0">2</div>
                     <div>
                        <h4 class="font-black text-sm uppercase tracking-widest mb-1">{{ langService.currentLang() === 'ar' ? 'ثبات مغناطيسي' : 'MAGNETIC GRIP' }}</h4>
                        <p class="text-xs text-gray-500 leading-relaxed">{{ langService.currentLang() === 'ar' ? 'تقنية مغناطيسية متطورة تضمن بقاء الرموش في مكانها.' : 'Advanced magnetic tech ensures lashes stay securely in place.' }}</p>
                     </div>
                  </div>
                  <div class="flex items-start gap-4">
                     <div class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-black flex-shrink-0">3</div>
                     <div>
                        <h4 class="font-black text-sm uppercase tracking-widest mb-1">{{ langService.currentLang() === 'ar' ? 'صلاحية طويلة' : 'SHELF LIFE' }}</h4>
                        <p class="text-xs text-gray-500 leading-relaxed">{{ langService.currentLang() === 'ar' ? 'مدة صلاحية تصل إلى 3 سنوات بفضل المواد عالية الجودة.' : 'Shelf life of up to 3 years thanks to premium materials.' }}</p>
                     </div>
                  </div>
               </div>

               <!-- Accordions (Clean Style) -->
               <div class="border-t border-gray-100 mt-10">
                  @for (faq of (langService.currentLang() === 'ar' ? faqsAr : faqsEn); track faq.q) {
                    <div class="border-b border-gray-100">
                       <button (click)="faq.open = !faq.open" class="w-full py-4 text-start flex justify-between items-center group hover:bg-gray-50 px-2 -mx-2 rounded-lg transition-colors">
                          <span class="font-bold text-sm text-gray-900">{{ faq.q }}</span>
                          <span class="text-xl font-light text-gray-400 transition-transform duration-300" [class.rotate-45]="faq.open">+</span>
                       </button>
                       <div class="overflow-hidden transition-all duration-300 px-2" [style.max-height]="faq.open ? '200px' : '0px'">
                         <p class="pb-6 text-gray-500 leading-relaxed text-sm whitespace-pre-line">{{ faq.a }}</p>
                       </div>
                    </div>
                  }
               </div>

            </div>
          </div>
          
          <!-- Sticky Mobile Cart Bar -->
          <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 lg:hidden z-50 safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
               <button (click)="addToCart()" class="w-full py-4 bg-black text-white rounded-xl font-bold text-base uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center gap-3">
                    <span>{{ langService.currentLang() === 'ar' ? 'أضيفي للحقيبة' : 'Add to bag' }}</span>
                    <span class="w-1.5 h-1.5 bg-white rounded-full opacity-30"></span>
                    <span>{{ currencyService.formatPrice(selectedBundle() ? selectedBundle()!.price : currentProduct.price) }}</span>
               </button>
          </div>

          <!-- Reviews Integration -->
          <div class="mt-24 pt-20 border-t border-gray-100">
             <app-reviews></app-reviews>
          </div>
        }
      </div>

      <!-- Newsletter Popup (Luxury Editorial Design) -->
      @if (showNewsletter()) {
        <div class="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-500">
           <div class="absolute inset-0 bg-black/60 backdrop-blur-md" (click)="closeNewsletter()"></div>
           
           <div class="relative w-full max-w-lg bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-700">
              <!-- Close Button -->
              <button (click)="closeNewsletter()" class="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-all group">
                 <svg class="w-4 h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
              </button>

              <!-- Content Side -->
              <div class="w-full p-10 md:p-14 flex flex-col items-center justify-center text-center" [dir]="langService.isRtl() ? 'rtl' : 'ltr'">
                 <div class="space-y-10 md:space-y-12 w-full">
                    <div>
                       <span class="inline-block px-5 py-2 rounded-full bg-black text-white text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] mb-6 md:mb-8">
                         {{ langService.currentLang() === 'ar' ? 'عرض حصري' : 'EXCLUSIVE OFFER' }}
                       </span>
                       <h2 class="text-4xl md:text-5xl font-black font-serif text-black uppercase leading-tight tracking-tighter mb-6">
                         {{ langService.currentLang() === 'ar' ? 'وفري 10%' : 'SAVE 10%' }}
                         <br>
                         <span class="text-gray-300">{{ langService.currentLang() === 'ar' ? 'على طلبك الأول' : 'ON FIRST ORDER' }}</span>
                       </h2>
                       <p class="text-gray-600 text-sm md:text-lg font-bold leading-relaxed max-w-sm mx-auto">
                         {{ langService.currentLang() === 'ar' ? 'سجلي دخولك الآن للحصول على كود الخصم الفوري وتجربة تسوق فريدة.' : 'Sign in now to receive your instant 10% discount code and a unique shopping experience.' }}
                       </p>
                    </div>

                    <div class="flex flex-col gap-4 w-full">
                       <a routerLink="/login" (click)="closeNewsletter()" 
                          class="w-full bg-black text-white py-6 rounded-2xl font-black text-sm md:text-base uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center cursor-pointer">
                          {{ langService.currentLang() === 'ar' ? 'تسجيل الدخول / عضوية جديدة' : 'SIGN IN / REGISTER' }}
                       </a>
                       
                       <button (click)="closeNewsletter()" 
                               class="w-full bg-gray-50 text-gray-400 py-6 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-gray-100 hover:text-black transition-all">
                         {{ langService.currentLang() === 'ar' ? 'شكراً، سأدفع السعر الكامل' : 'THANKS, I WILL PAY FULL PRICE' }}
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
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
  private newsletterShown = false;

  faqsAr = [
    { q: 'هل هي آمنة على الرموش؟', a: 'نعم، تقنية المغناطيس لدينا آمنة تماماً ولا تتطلب أي صمغ، مما يحافظ على رموشك الطبيعية من التكسر.', open: false },
    { q: 'كم مرة أقدر أستخدمها؟', a: 'مع العناية الجيدة، يمكنك إعادة استخدام رموش نوريڤا حتى 50 مرة.', open: false },
    { q: 'كيف أركبها؟', a: 'بسيطة! ضعي الرمش العلوي فوق رموشك والسفلي تحتها، والمغناطيس سيلتصق تلقائياً في ثواني.', open: false }
  ];

  faqsEn = [
    { q: 'Is it safe for lashes?', a: 'Yes, our magnetic tech is 100% glue-free, protecting your natural lashes from breakage.', open: false },
    { q: 'How many times can I reuse?', a: 'With proper care, Noreva lashes can be reused up to 50 times.', open: false },
    { q: 'How to apply?', a: 'Simple! Place the top lash above yours and the bottom lash below, the magnets will snap together instantly.', open: false }
  ];

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
        const productData = await this.shopifyService.getProductByHandle(id);
        if (productData) {
          this.product.set(productData);

          // Pre-select logic
          if (productData.bundles?.length > 0) {
            this.selectedBundle.set(productData.bundles[0]);
          }
          if (productData.variants?.length > 0) {
            this.selectedVariant.set(productData.variants[0]);
          }

          // If bundles don't exist but variants do, we might want to handle that price display logic better in template
          // But for now, existing logic is fine.
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

  selectBundle(bundle: any) { this.selectedBundle.set(bundle); }

  selectVariant(variant: any) { this.selectedVariant.set(variant); }

  addToCart() {
    const p = this.product();
    if (!p) return;
    const bundle = this.selectedBundle();
    const variant = this.selectedVariant();
    this.cartService.addToCart(p, 1, variant, bundle?.price);
    this.cartService.isCartOpen.set(true);
  }

  // Newsletter Methods
  closeNewsletter() {
    this.showNewsletter.set(false);
  }

}
