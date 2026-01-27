
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
    <div class="bg-white min-h-screen selection:bg-noreva-bone selection:text-black overflow-x-hidden">
      

      <!-- Hero Section (Zoom Out Effect) -->
      <section class="relative h-screen w-full overflow-hidden">
        <!-- Background Image with Zoom Effect -->
        <div class="absolute inset-0 w-full h-full"
             [style.transform]="'scale(' + zoomScale() + ')'"
             style="transform-origin: center center; transition: transform 0.1s linear; will-change: transform;">
           <img src="/assets/hero-zoom.png" class="w-full h-full object-cover">
        </div>
        
        <!-- Overlay Content -->
        <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div class="container mx-auto max-w-4xl text-center px-6 pt-20">
               <h1 class="text-5xl md:text-8xl font-black font-serif text-white mb-10 leading-[1] tracking-tight animate-fade-up drop-shadow-xl">
                  {{ langService.currentLang() === 'ar' ? 'رموش أحلامك..' : 'Dream Lashes..' }} <br/>
                  {{ langService.currentLang() === 'ar' ? 'بدون صمغ، بدون فوضى!' : 'No Glue, No Mess!' }}
               </h1>
               
               <p class="text-xl md:text-2xl text-white/90 font-medium leading-relaxed mb-16 max-w-2xl mx-auto animate-fade-up drop-shadow-md" style="animation-delay: 0.1s">
                  {{ langService.currentLang() === 'ar' 
                    ? 'وداعاً للصمغ اللي يدبق ويخرب المكياج. نوريڤا تقدم لكِ التقنية المغناطيسية لرموش تركب بثواني وتثبت طول اليوم.' 
                    : 'Say goodbye to sticky glue ruining your makeup. Noreva brings you magnetic tech for lashes that apply in seconds and stay all day.' }}
               </p>

               <div class="flex flex-col items-center gap-8 animate-fade-up" style="animation-delay: 0.2s">
                  <a [routerLink]="['/products']" class="bg-white text-black px-16 py-7 text-xl font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl">
                     {{ langService.currentLang() === 'ar' ? 'احصلي عليها الآن' : 'GET YOURS NOW' }}
                  </a>
               </div>
            </div>
        </div>
      </section>

      <!-- Featured Collection -->
      <section class="py-24 px-6 border-t border-gray-50">
        <div class="container mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-black font-serif text-black mb-4">
              {{ langService.currentLang() === 'ar' ? 'المجموعة المختارة' : 'Featured Collection' }}
            </h2>
            <p class="text-gray-400 uppercase tracking-widest text-[10px] font-black">
              {{ langService.currentLang() === 'ar' ? 'أكثر من مجرد رموش.. ثورة في عالم الجمال' : 'More than just lashes.. a beauty revolution' }}
            </p>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            @for (product of featuredProducts(); track product.id) {
              <a [routerLink]="['/product', product.handle]" class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div class="aspect-[4/5] bg-gray-50 relative overflow-hidden">
                  <img [src]="product.imageUrl" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                  <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div class="p-4 text-start">
                  <h4 class="text-xs md:text-sm font-black uppercase tracking-tight mb-1 line-clamp-1">{{ product.title }}</h4>
                  <p class="text-lg font-black italic">{{ product.price }} {{ product.currency }}</p>
                </div>
              </a>
            }
          </div>

          <div class="mt-16 text-center">
            <a [routerLink]="['/products']" class="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-2 hover:opacity-50 transition-opacity">
              {{ langService.currentLang() === 'ar' ? 'تسوقي المجموعة كاملة' : 'SHOP THE FULL COLLECTION' }}
            </a>
          </div>
        </div>
      </section>

      <!-- Expert Section -->
      <section class="py-32 px-6 bg-gray-50/50">
        <div class="container mx-auto max-w-3xl">
           <div class="flex flex-col md:flex-row items-center gap-12 mb-20 grayscale">
              <div class="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-black p-1 shrink-0">
                 <img src="https://api.dicebear.com/9.x/micah/svg?seed=Expert" class="w-full h-full rounded-full bg-noreva-bone">
              </div>
              <div class="flex-1 text-center md:text-start">
                 <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                   {{ langService.currentLang() === 'ar' ? 'نصيحة خبيرة تجميل' : 'EXPERT BEAUTY ADVICE' }}
                 </p>
                 <p class="text-lg md:text-xl font-bold leading-relaxed italic">
                   "{{ langService.currentLang() === 'ar' 
                     ? 'أكثر شي يضر رموشك الطبيعية هو الصمغ وطريقة إزالته. الرموش المغناطيسية هي الحل الأمثل للحصول على كثافة درامية بدون التضحية بصحة رموشك.' 
                     : 'The worst thing for natural lashes is glue and removal. Magnetic lashes are the perfect solution for dramatic volume without sacrificing lash health.' }}"
                 </p>
              </div>
           </div>

           <div class="space-y-16 text-xl md:text-2xl text-gray-800 leading-[1.7] font-medium text-start">
              <h2 class="text-4xl font-black font-serif text-black">
                {{ langService.currentLang() === 'ar' ? 'ليش المغناطيس؟' : 'Why Magnetic?' }}
              </h2>
              <p>
                {{ langService.currentLang() === 'ar' 
                  ? 'ببساطة لأن وقتك ثمين. بدلاً من قضاء 15 دقيقة في محاولة ضبط الصمغ وانتظاره ليجف، المغناطيس يلتصق فوراً. والأهم؟ ما يسبب حساسية أو دموع تخرب مكياجك.' 
                  : 'Simply because your time is precious. Instead of 15 minutes struggling with glue, magnets snap on instantly. And the best part? No irritation or tears ruining your makeup.' }}
              </p>

              <div class="bg-black text-noreva-bone p-10 md:p-14 rounded-[3rem] shadow-2xl my-24 relative overflow-hidden">
                 <div class="absolute -top-10 -right-10 w-40 h-40 bg-noreva-bone/10 rounded-full blur-3xl"></div>
                 <h3 class="text-2xl font-black font-serif mb-6">
                   {{ langService.currentLang() === 'ar' ? 'تقنية نوريڤا™ الدقيقة ✨' : 'Noreva™ Precision Tech ✨' }}
                 </h3>
                 <p class="opacity-80 leading-loose text-base md:text-lg text-start">
                   {{ langService.currentLang() === 'ar' 
                     ? 'مغناطيساتنا مايكرو يعني صغيرة جداً وغير مرئية للعين المجردة، لكنها قوية بما يكفي للصمود في أجواءنا الحارة والرطبة. خفيفة كالريشة، ستنسين أنك ترتدينها.' 
                     : 'Our Micro magnets are tiny and invisible to the naked eye, yet strong enough to withstand hot and humid weather. Light as a feather, you will forget you are wearing them.' }}
                 </p>
              </div>
           </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    @keyframes fade-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-up { animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  langService = inject(LanguageService);
  productService = inject(ProductService);
  shopifyService = inject(ShopifyService);

  featuredProducts = signal<any[]>([]);
  zoomScale = signal(1.5); // Start zoomed out? No, start zoomed IN (high scale) and go to 1?
  // User asked: "first only the product appears and then u zoom out"
  // This implies starting with a high scale (zoomed in on product) and decreasing scale to 1 (seeing full image) as we scroll?
  // Or simpler: Parallax zoom out. Let's implement standard scroll-based zoom.

  // Logic: Start at scale 2 (zoomed in). As user scrolls down, scale decreases to 1.

  constructor() {
    // Add scroll listener
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        // Calculate scale: 
        // When scrollY = 0, scale = 1.3
        // When scrollY = windowHeight, scale = 1

        // Let's invert relative to request: "first only product appears (zoomed in) -> zoom out"
        // So at scroll 0 => Scale = 1.5; At scroll = 500 => Scale = 1.0

        const maxScroll = windowHeight;
        const progress = Math.min(scrollY / maxScroll, 1);
        const newScale = 1.5 - (0.5 * progress); // 1.5 -> 1.0

        this.zoomScale.set(Math.max(1, newScale));
      });
    }
  }

  async ngOnInit() {
    window.scrollTo(0, 0);
    try {
      const all = await this.shopifyService.getProducts(8);
      // Filter out utility products
      this.featuredProducts.set(all.filter(p =>
        !p.handle.includes('eyelash-curler') &&
        !p.handle.includes('shipping-protection')
      ).slice(0, 4));
    } catch (e) {
      console.error('Home: Failed to load featured products', e);
    }
  }
  ngOnDestroy() { }
}
