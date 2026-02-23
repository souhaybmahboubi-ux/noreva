
import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { ShopifyService } from '../../services/shopify.service';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, CommonModule],
  template: `
    <div class="bg-noreva-cream min-h-screen selection:bg-noreva-champagne selection:text-noreva-black overflow-x-hidden">
      
      <!-- Hero Section (Zoom Out Effect) -->
      <section class="relative h-screen w-full overflow-hidden">
        <!-- Background Image with Zoom Effect -->
        <div class="absolute inset-0 w-full h-full"
             [style.transform]="'scale(' + zoomScale() + ')'"
             style="transform-origin: center center; transition: transform 0.1s linear; will-change: transform;">
           <img src="/assets/hero-zoom.png" class="w-full h-full object-cover">
        </div>
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-noreva-black/40 via-noreva-black/20 to-noreva-black/50 flex items-center justify-center">
            <div class="container mx-auto max-w-4xl text-center px-6 pt-20">
               <span class="inline-block text-[10px] md:text-xs font-medium tracking-[0.3em] text-noreva-gold uppercase mb-6 animate-fade-up opacity-90">
                 NOREVA™ BEAUTY
               </span>
               
               <h1 class="text-4xl md:text-7xl font-serif text-white mb-8 leading-[1.05] tracking-tight animate-fade-up" style="animation-delay: 0.1s">
                  {{ langService.currentLang() === 'ar' ? 'رموش أحلامكِ' : 'Dream Lashes.' }} <br/>
                  {{ langService.currentLang() === 'ar' ? 'بدون صمغ، بدون فوضى' : 'No Glue, No Mess.' }}
               </h1>
               
               <p class="text-base md:text-xl text-white/80 font-normal leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-up" style="animation-delay: 0.2s">
                  {{ langService.currentLang() === 'ar' 
                    ? 'وداعاً للصمغ والفوضى. نوريڤا تقدم لكِ التقنية المغناطيسية لرموش تركب بثوانٍ وتثبت طول اليوم.' 
                    : 'Say goodbye to sticky glue. Noreva brings you magnetic technology for lashes that apply in seconds and stay all day.' }}
               </p>

               <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style="animation-delay: 0.3s">
                  <a [routerLink]="['/products']" class="btn-luxury px-12 py-4 text-white rounded-full font-medium tracking-wide text-sm">
                     {{ langService.currentLang() === 'ar' ? 'تسوقي الآن' : 'Shop Now' }}
                  </a>
                  <a [routerLink]="['/why-us']" 
                     class="px-12 py-4 text-white/90 rounded-full font-medium tracking-wide text-sm border border-white/30 hover:bg-white/10 transition-all duration-400">
                     {{ langService.currentLang() === 'ar' ? 'لماذا نوريڤا' : 'Why Noreva' }}
                  </a>
               </div>
            </div>
        </div>

      </section>

      <!-- Features Strip -->
      <section class="bg-noreva-black py-6 overflow-hidden" dir="ltr">
        <div class="flex whitespace-nowrap animate-marquee items-center text-white">
          <!-- First Half -->
          <div class="flex items-center gap-12 pr-12">
            @for(i of [1,2,3,4,5,6,7,8]; track i) {
              <div class="flex items-center gap-6">
                <span class="text-xs font-medium tracking-[0.3em] uppercase opacity-70">{{ langService.currentLang() === 'ar' ? 'تركيب في ٣ ثواني' : '3 Second Application' }}</span>
                <span class="w-1.5 h-1.5 bg-noreva-gold rounded-full shrink-0"></span>
                <span class="text-xs font-medium tracking-[0.3em] uppercase opacity-70">{{ langService.currentLang() === 'ar' ? 'بدون صمغ' : 'Glue Free' }}</span>
                <span class="w-1.5 h-1.5 bg-noreva-gold rounded-full shrink-0"></span>
                <span class="text-xs font-medium tracking-[0.3em] uppercase opacity-70">{{ langService.currentLang() === 'ar' ? '+١٠٠ استخدام' : '100+ Uses' }}</span>
                <span class="w-1.5 h-1.5 bg-noreva-gold rounded-full shrink-0"></span>
              </div>
            }
          </div>
          <!-- Second Half (Identical) -->
          <div class="flex items-center gap-12 pr-12">
            @for(i of [1,2,3,4,5,6,7,8]; track i) {
              <div class="flex items-center gap-6">
                <span class="text-xs font-medium tracking-[0.3em] uppercase opacity-70">{{ langService.currentLang() === 'ar' ? 'تركيب في ٣ ثواني' : '3 Second Application' }}</span>
                <span class="w-1.5 h-1.5 bg-noreva-gold rounded-full shrink-0"></span>
                <span class="text-xs font-medium tracking-[0.3em] uppercase opacity-70">{{ langService.currentLang() === 'ar' ? 'بدون صمغ' : 'Glue Free' }}</span>
                <span class="w-1.5 h-1.5 bg-noreva-gold rounded-full shrink-0"></span>
                <span class="text-xs font-medium tracking-[0.3em] uppercase opacity-70">{{ langService.currentLang() === 'ar' ? '+١٠٠ استخدام' : '100+ Uses' }}</span>
                <span class="w-1.5 h-1.5 bg-noreva-gold rounded-full shrink-0"></span>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Featured Collection -->
      <section class="py-24 md:py-32 px-6">
        <div class="container mx-auto max-w-7xl">
          <div class="text-center mb-16 md:mb-20">
            <span class="inline-block text-[10px] md:text-xs font-medium tracking-[0.3em] text-noreva-gold uppercase mb-4">
              {{ langService.currentLang() === 'ar' ? 'مجموعة مختارة' : 'CURATED COLLECTION' }}
            </span>
            <h2 class="text-3xl md:text-5xl font-serif text-noreva-black mb-6">
              {{ langService.currentLang() === 'ar' ? 'الأكثر مبيعاً' : 'Featured Collection' }}
            </h2>
            <p class="text-noreva-taupe max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              {{ langService.currentLang() === 'ar' ? 'اكتشفي أسرار العيون الجذابة. رموش صُممت لتمنحكِ الأناقة في ثوانٍ.' : 'Discover the secret to captivating eyes. Lashes designed for effortless elegance.' }}
            </p>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            @for (product of featuredProducts(); track product.id) {
              <a [routerLink]="['/product', product.handle]" class="group block luxury-card bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-luxury border border-noreva-champagne/30">
                <div class="aspect-[4/5] bg-noreva-ivory relative overflow-hidden img-reveal">
                  <img [src]="product.imageUrl" class="w-full h-full object-cover">
                  <div class="absolute inset-0 bg-noreva-black/0 group-hover:bg-noreva-black/5 transition-all duration-500"></div>
                  
                  <!-- Quick View (Desktop) -->
                  <div class="hidden md:flex absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <div class="w-full py-3 bg-white/95 backdrop-blur-sm rounded-xl text-center text-xs font-medium text-noreva-black tracking-wide">
                      {{ langService.currentLang() === 'ar' ? 'عرض التفاصيل' : 'View Details' }}
                    </div>
                  </div>
                </div>
                <div class="p-4 md:p-6 text-start">
                  <h4 class="text-sm md:text-base font-medium text-noreva-black group-hover:text-noreva-gold transition-colors duration-300 mb-2 line-clamp-1">{{ product.title }}</h4>
                  <span class="text-base md:text-lg font-serif text-noreva-black">{{ product.price }} {{ product.currency }}</span>
                </div>
              </a>
            }
          </div>

          <div class="mt-16 text-center">
            <a [routerLink]="['/products']" class="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-noreva-black border-b border-noreva-black pb-1 hover:text-noreva-gold hover:border-noreva-gold transition-colors">
              {{ langService.currentLang() === 'ar' ? 'تسوقي المجموعة كاملة' : 'SHOP THE FULL COLLECTION' }}
              <svg class="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      <!-- Expert / Story Section -->
      <section class="py-24 md:py-32 px-6 bg-noreva-ivory">
        <div class="container mx-auto max-w-3xl">
           <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16">
              <div class="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-noreva-champagne/50 p-0.5 shrink-0">
                 <img src="https://api.dicebear.com/9.x/micah/svg?seed=Expert" class="w-full h-full rounded-full bg-noreva-champagne/20">
              </div>
              <div class="flex-1 text-center md:text-start">
                 <span class="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-noreva-gold mb-3">
                   {{ langService.currentLang() === 'ar' ? 'نصيحة خبيرة تجميل' : 'EXPERT BEAUTY ADVICE' }}
                 </span>
                 <p class="text-lg md:text-xl font-serif text-noreva-black leading-relaxed italic">
                   "{{ langService.currentLang() === 'ar' 
                     ? 'أكثر شيء يضر رموشك الطبيعية هو الصمغ وطريقة إزالته. الرموش المغناطيسية هي الحل الأمثل للحصول على كثافة درامية بدون التضحية بصحة رموشك.' 
                     : 'The worst thing for natural lashes is glue and removal. Magnetic lashes are the perfect solution for dramatic volume without sacrificing lash health.' }}"
                 </p>
              </div>
           </div>

           <div class="space-y-12 text-start">
              <div>
                <span class="inline-block text-[10px] md:text-xs font-medium tracking-[0.3em] text-noreva-gold uppercase mb-4">
                  {{ langService.currentLang() === 'ar' ? 'التقنية' : 'THE TECHNOLOGY' }}
                </span>
                <h2 class="text-3xl md:text-5xl font-serif text-noreva-black mb-6">
                  {{ langService.currentLang() === 'ar' ? 'ليش المغناطيس؟' : 'Why Magnetic?' }}
                </h2>
              </div>
              <p class="text-noreva-taupe text-base md:text-lg leading-relaxed">
                {{ langService.currentLang() === 'ar' 
                  ? 'ببساطة لأن وقتكِ ثمين. بدلاً من قضاء 15 دقيقة في محاولة ضبط الصمغ وانتظاره ليجف، المغناطيس يلتصق فوراً. والأهم؟ ما يسبب حساسية أو دموع تخرب مكياجكِ.' 
                  : 'Simply because your time is precious. Instead of 15 minutes struggling with glue, magnets snap on instantly. And the best part? No irritation or tears ruining your makeup.' }}
              </p>

              <div class="bg-noreva-black text-white p-10 md:p-14 rounded-3xl shadow-luxury-xl relative overflow-hidden">
                 <div class="absolute -top-10 -right-10 w-40 h-40 bg-noreva-gold/5 rounded-full blur-3xl"></div>
                 <span class="inline-block text-[10px] font-medium tracking-[0.3em] text-noreva-gold uppercase mb-4">
                   {{ langService.currentLang() === 'ar' ? 'ابتكارنا' : 'OUR INNOVATION' }}
                 </span>
                 <h3 class="text-2xl md:text-3xl font-serif mb-6 text-white">
                   {{ langService.currentLang() === 'ar' ? 'تقنية نوريڤا™ الدقيقة' : 'Noreva™ Precision Tech' }}
                 </h3>
                 <p class="text-white/60 leading-relaxed text-base md:text-lg text-start">
                   {{ langService.currentLang() === 'ar' 
                     ? 'مغناطيساتنا مايكرو يعني صغيرة جداً وغير مرئية للعين المجردة، لكنها قوية بما يكفي للصمود في أجواءنا الحارة والرطبة. خفيفة كالريشة، ستنسين أنكِ ترتدينها.' 
                     : 'Our micro-magnets are tiny and invisible to the naked eye, yet strong enough to withstand hot and humid weather. Light as a feather — you will forget you are wearing them.' }}
                 </p>
              </div>
           </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-marquee { display: inline-flex; animation: marquee 60s linear infinite; }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  langService = inject(LanguageService);
  productService = inject(ProductService);
  shopifyService = inject(ShopifyService);

  featuredProducts = signal<any[]>([]);
  zoomScale = signal(1.5);

  private scrollHandler: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.scrollHandler = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const progress = Math.min(scrollY / windowHeight, 1);
        const newScale = 1.5 - (0.5 * progress);
        this.zoomScale.set(Math.max(1, newScale));
      };
      window.addEventListener('scroll', this.scrollHandler);
    }
  }

  async ngOnInit() {
    window.scrollTo(0, 0);
    try {
      const all = await this.shopifyService.getProducts(8);
      this.featuredProducts.set(all.filter(p =>
        !p.handle.includes('eyelash-curler') &&
        !p.handle.includes('shipping-protection')
      ).slice(0, 4));
    } catch (e) {
      console.error('Home: Failed to load featured products', e);
    }
  }

  ngOnDestroy() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }
}
