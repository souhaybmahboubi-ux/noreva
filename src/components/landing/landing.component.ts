
import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  template: `
    <div class="bg-noreva-cream min-h-screen pt-14 md:pt-16">
      
      <!-- Hero Section - Minimal & Elegant -->
      <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 bg-noreva-ivory">
          <img src="https://ae01.alicdn.com/kf/Ab4481cf4142b47daa7b3f81fb10fdac7f.jpg" 
               class="w-full h-full object-cover opacity-90">
          <div class="absolute inset-0 bg-gradient-to-b from-noreva-cream/80 via-noreva-cream/40 to-noreva-cream"></div>
        </div>

        <!-- Hero Content -->
        <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span class="inline-block text-[10px] md:text-xs font-medium tracking-[0.3em] text-noreva-gold uppercase mb-6 animate-fade-up">
            NOREVA BEAUTY
          </span>
          
          <h1 class="text-4xl md:text-7xl font-serif text-noreva-black leading-[1.1] mb-8 animate-fade-up" style="animation-delay: 0.1s">
            {{ langService.currentLang() === 'ar' 
              ? 'أناقة عيونكِ في ثوانٍ'
              : 'Effortless Elegance' }}
          </h1>
          
          <p class="text-noreva-taupe text-base md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up" style="animation-delay: 0.2s">
            {{ langService.currentLang() === 'ar'
              ? 'رموش مغناطيسية فاخرة. بدون صمغ، بدون فوضى. جمال طبيعي في لحظات.'
              : 'Luxury magnetic lashes. No glue, no mess. Natural beauty in moments.' }}
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style="animation-delay: 0.3s">
            <a [routerLink]="['/products']" 
               class="btn-luxury px-10 py-4 text-white rounded-full font-medium tracking-wide text-sm">
              {{ langService.currentLang() === 'ar' ? 'تسوقي الآن' : 'Shop Now' }}
            </a>
            <a [routerLink]="['/product', 'effortless-magnetic-lashes-set']" 
               class="btn-luxury-outline px-10 py-4 text-noreva-black rounded-full font-medium tracking-wide text-sm">
              {{ langService.currentLang() === 'ar' ? 'اكتشفي المزيد' : 'Discover More' }}
            </a>
          </div>
        </div>

      </section>

      <!-- Features Strip -->
      <section class="bg-noreva-black py-6 overflow-hidden" dir="ltr">
        <div class="flex whitespace-nowrap animate-marquee items-center text-white">
          <!-- First Half -->
          <div class="flex items-center gap-12 pr-12">
            @for(i of [1,2,3,4,5,6]; track i) {
              <div class="flex items-center gap-6">
                <span class="text-xs font-medium tracking-[0.2em] uppercase opacity-80">{{ langService.currentLang() === 'ar' ? 'تركيب في ٣ ثواني' : '3 Second Application' }}</span>
                <span class="w-1.5 h-1.5 bg-noreva-gold rounded-full"></span>
                <span class="text-xs font-medium tracking-[0.2em] uppercase opacity-80">{{ langService.currentLang() === 'ar' ? 'بدون صمغ' : 'Glue Free' }}</span>
                <span class="w-1.5 h-1.5 bg-noreva-gold rounded-full"></span>
                <span class="text-xs font-medium tracking-[0.2em] uppercase opacity-80">{{ langService.currentLang() === 'ar' ? '+١٠٠ استخدام' : '100+ Uses' }}</span>
                <span class="w-1.5 h-1.5 bg-noreva-gold rounded-full"></span>
              </div>
            }
          </div>
          <!-- Second Half -->
          <div class="flex items-center gap-12 pr-12">
            @for(i of [1,2,3,4,5,6]; track i) {
              <div class="flex items-center gap-6">
                <span class="text-xs font-medium tracking-[0.2em] uppercase opacity-80">{{ langService.currentLang() === 'ar' ? 'تركيب في ٣ ثواني' : '3 Second Application' }}</span>
                <span class="w-1.5 h-1.5 bg-noreva-gold rounded-full"></span>
                <span class="text-xs font-medium tracking-[0.2em] uppercase opacity-80">{{ langService.currentLang() === 'ar' ? 'بدون صمغ' : 'Glue Free' }}</span>
                <span class="w-1.5 h-1.5 bg-noreva-gold rounded-full"></span>
                <span class="text-xs font-medium tracking-[0.2em] uppercase opacity-80">{{ langService.currentLang() === 'ar' ? '+١٠٠ استخدام' : '100+ Uses' }}</span>
                <span class="w-1.5 h-1.5 bg-noreva-gold rounded-full"></span>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Why Noreva Section -->
      <section class="py-24 md:py-32 px-6">
        <div class="container mx-auto max-w-6xl">
          <div class="text-center mb-16">
            <span class="inline-block text-[10px] md:text-xs font-medium tracking-[0.3em] text-noreva-gold uppercase mb-4">
              {{ langService.currentLang() === 'ar' ? 'لماذا نوريڤا' : 'WHY NOREVA' }}
            </span>
            <h2 class="text-3xl md:text-5xl font-serif text-noreva-black mb-6">
              {{ langService.currentLang() === 'ar' 
                ? 'صُممت لحياتكِ'
                : 'Designed For Your Life' }}
            </h2>
            <p class="text-noreva-taupe text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {{ langService.currentLang() === 'ar'
                ? 'رموش تناسب إيقاع حياتكِ السريع. من الدوام للمناسبات في ثوانٍ معدودة.'
                : 'Lashes that match your fast-paced life. From work to events in seconds.' }}
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6 md:gap-8">
            <!-- Feature 1 -->
            <div class="luxury-card bg-white rounded-3xl p-8 text-center shadow-luxury border border-noreva-champagne/30">
              <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-noreva-ivory flex items-center justify-center">
                <svg class="w-7 h-7 text-noreva-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-serif text-noreva-black mb-3">
                {{ langService.currentLang() === 'ar' ? 'سريعة' : 'Quick' }}
              </h3>
              <p class="text-noreva-taupe text-sm leading-relaxed">
                {{ langService.currentLang() === 'ar'
                  ? 'تركيب في ٣ ثوانٍ فقط. مثالية للصباحات المزدحمة.'
                  : 'Apply in just 3 seconds. Perfect for busy mornings.' }}
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="luxury-card bg-white rounded-3xl p-8 text-center shadow-luxury border border-noreva-champagne/30">
              <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-noreva-ivory flex items-center justify-center">
                <svg class="w-7 h-7 text-noreva-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-serif text-noreva-black mb-3">
                {{ langService.currentLang() === 'ar' ? 'آمنة' : 'Safe' }}
              </h3>
              <p class="text-noreva-taupe text-sm leading-relaxed">
                {{ langService.currentLang() === 'ar'
                  ? 'بدون صمغ أو مواد كيميائية. لطيفة على العيون الحساسة.'
                  : 'No glue or chemicals. Gentle on sensitive eyes.' }}
              </p>
            </div>

            <!-- Feature 3 -->
            <div class="luxury-card bg-white rounded-3xl p-8 text-center shadow-luxury border border-noreva-champagne/30">
              <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-noreva-ivory flex items-center justify-center">
                <svg class="w-7 h-7 text-noreva-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 class="text-xl font-serif text-noreva-black mb-3">
                {{ langService.currentLang() === 'ar' ? 'اقتصادية' : 'Economical' }}
              </h3>
              <p class="text-noreva-taupe text-sm leading-relaxed">
                {{ langService.currentLang() === 'ar'
                  ? 'قابلة للاستخدام أكثر من ١٠٠ مرة. استثمار ذكي.'
                  : 'Reusable over 100 times. A smart investment.' }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Product Section -->
      <section class="py-16 md:py-24 bg-white">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Image Side -->
            <div class="relative">
              <div class="aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury-xl img-reveal">
                <img src="https://ae01.alicdn.com/kf/A39b78ba5557d48188d1c1cc6ef6feba4Y.jpg" 
                     class="w-full h-full object-cover">
              </div>
              <!-- Floating Badge -->
              <div class="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-noreva-gold text-white px-6 py-4 rounded-2xl shadow-glow">
                <span class="text-2xl font-serif">100+</span>
                <span class="text-xs block opacity-90">{{ langService.currentLang() === 'ar' ? 'استخدام' : 'Uses' }}</span>
              </div>
            </div>

            <!-- Content Side -->
            <div class="text-start">
              <span class="inline-block text-[10px] md:text-xs font-medium tracking-[0.3em] text-noreva-gold uppercase mb-4">
                {{ langService.currentLang() === 'ar' ? 'الأكثر مبيعاً' : 'BESTSELLER' }}
              </span>
              <h2 class="text-3xl md:text-4xl font-serif text-noreva-black mb-6 leading-tight">
                {{ langService.currentLang() === 'ar' 
                  ? 'رموش نوريڤا المغناطيسية'
                  : 'Noreva Magnetic Lashes' }}
              </h2>
              <p class="text-noreva-taupe text-base leading-relaxed mb-8">
                {{ langService.currentLang() === 'ar'
                  ? 'تقنية مغناطيسية متطورة تمنحكِ عيوناً جذابة في ثوانٍ. مصممة للاستخدام المتكرر مع الحفاظ على جودتها الفاخرة.'
                  : 'Advanced magnetic technology gives you captivating eyes in seconds. Designed for repeated use while maintaining premium quality.' }}
              </p>

              <ul class="space-y-4 mb-10">
                <li class="flex items-center gap-3">
                  <div class="w-5 h-5 rounded-full bg-noreva-gold/20 flex items-center justify-center">
                    <svg class="w-3 h-3 text-noreva-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-noreva-black text-sm">{{ langService.currentLang() === 'ar' ? 'تركيب وإزالة في ثوانٍ' : 'Apply & remove in seconds' }}</span>
                </li>
                <li class="flex items-center gap-3">
                  <div class="w-5 h-5 rounded-full bg-noreva-gold/20 flex items-center justify-center">
                    <svg class="w-3 h-3 text-noreva-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-noreva-black text-sm">{{ langService.currentLang() === 'ar' ? 'آمنة للعيون الحساسة' : 'Safe for sensitive eyes' }}</span>
                </li>
                <li class="flex items-center gap-3">
                  <div class="w-5 h-5 rounded-full bg-noreva-gold/20 flex items-center justify-center">
                    <svg class="w-3 h-3 text-noreva-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-noreva-black text-sm">{{ langService.currentLang() === 'ar' ? 'شحن مجاني لجميع الخليج' : 'Free shipping across GCC' }}</span>
                </li>
              </ul>

              <a [routerLink]="['/product', 'effortless-magnetic-lashes-set']" 
                 class="btn-luxury inline-flex items-center gap-3 px-8 py-4 text-white rounded-full font-medium tracking-wide text-sm">
                {{ langService.currentLang() === 'ar' ? 'تسوقي الآن' : 'Shop Now' }}
                <svg class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonial Section -->
      <section class="py-24 md:py-32 px-6 bg-noreva-ivory">
        <div class="container mx-auto max-w-4xl text-center">
          <div class="mb-8">
            <div class="flex items-center justify-center gap-1 mb-4">
              @for (star of [1,2,3,4,5]; track star) {
                <svg class="w-5 h-5 text-noreva-gold fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              }
            </div>
            <span class="text-sm text-noreva-taupe">{{ langService.currentLang() === 'ar' ? 'تقييم 4.9/5 من أكثر من 300 عميلة' : 'Rated 4.9/5 from 300+ customers' }}</span>
          </div>

          <blockquote class="text-2xl md:text-4xl font-serif text-noreva-black leading-relaxed mb-8 italic">
            "{{ langService.currentLang() === 'ar' 
              ? 'أخيراً وجدت رموش تناسب حياتي المزدحمة. سهلة، سريعة، وفخمة!'
              : 'Finally found lashes that fit my busy life. Easy, quick, and luxurious!' }}"
          </blockquote>

          <div class="flex items-center justify-center gap-4">
            <div class="w-12 h-12 rounded-full bg-noreva-champagne overflow-hidden">
              <img src="https://api.dicebear.com/9.x/micah/svg?seed=Sarah" class="w-full h-full object-cover">
            </div>
            <div class="text-start">
              <p class="text-sm font-medium text-noreva-black">{{ langService.currentLang() === 'ar' ? 'سارة أ.' : 'Sarah A.' }}</p>
              <p class="text-xs text-noreva-taupe">{{ langService.currentLang() === 'ar' ? 'عميلة موثقة' : 'Verified Customer' }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-24 md:py-32 bg-noreva-black text-white text-center px-6 monogram-bg monogram-gold">
        <div class="container mx-auto max-w-3xl">
          <h2 class="text-3xl md:text-5xl font-serif mb-6 leading-tight">
            {{ langService.currentLang() === 'ar' 
              ? 'جربي الفرق بنفسكِ'
              : 'Experience The Difference' }}
          </h2>
          <p class="text-white/60 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {{ langService.currentLang() === 'ar'
              ? 'انضمي لآلاف النساء اللواتي اختارن أناقة بلا جهد.'
              : 'Join thousands of women who chose effortless elegance.' }}
          </p>
          <a [routerLink]="['/products']" 
             class="inline-flex items-center gap-3 px-10 py-4 bg-noreva-gold text-noreva-black rounded-full font-medium tracking-wide text-sm hover:bg-noreva-goldLight transition-colors">
            {{ langService.currentLang() === 'ar' ? 'تسوقي المجموعة' : 'Shop The Collection' }}
            <svg class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>

    </div>
  `,
  styles: [`
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-marquee { display: inline-flex; animation: marquee 40s linear infinite; }
    :host { 
      display: block; 
      overflow-x: hidden; 
    }
  `]
})
export class LandingComponent implements OnInit, OnDestroy {
  langService = inject(LanguageService);

  timeLeft = signal('23:55:43');
  private interval: any;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  private startCountdown() {
    let seconds = 23 * 3600 + 55 * 60 + 43;
    this.interval = setInterval(() => {
      seconds--;
      if (seconds < 0) seconds = 24 * 3600;

      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;

      this.timeLeft.set(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    }, 1000);
  }
}
