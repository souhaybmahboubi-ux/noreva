
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

      <!-- ═══════════════════════════════════════════════
           HERO — Cinematic full-screen with zoom effect
      ════════════════════════════════════════════════ -->
      <section class="relative h-screen w-full overflow-hidden">
        <div class="absolute inset-0 w-full h-full"
             [style.transform]="'scale(' + zoomScale() + ')'"
             style="transform-origin: center center; transition: transform 0.1s linear; will-change: transform;">
          <img src="/assets/hero-zoom.png" class="w-full h-full object-cover" alt="Noreva Magnetic Lashes">
        </div>

        <!-- Multi-layer overlay for depth -->
        <div class="absolute inset-0 bg-gradient-to-b from-noreva-black/50 via-noreva-black/10 to-noreva-black/70"></div>

        <!-- Hero content -->
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div class="max-w-4xl mx-auto pt-16">
            <span class="hero-eyebrow inline-block text-[10px] md:text-[11px] font-medium tracking-[0.4em] text-noreva-gold uppercase mb-8">
              NOREVA™ MAGNETIC LASHES
            </span>

            <h1 class="hero-heading text-5xl md:text-8xl font-serif text-white leading-[1.0] tracking-tight mb-8">
              {{ langService.currentLang() === 'ar'
                ? 'رموش تستحقها,'
                : 'The Lashes' }}<br>
              <em class="italic font-serif">
                {{ langService.currentLang() === 'ar'
                  ? 'بدون صمغ'
                  : 'You Deserve.' }}
              </em>
            </h1>

            <p class="hero-sub text-base md:text-xl text-white/75 max-w-xl mx-auto leading-relaxed mb-14">
              {{ langService.currentLang() === 'ar'
                ? 'تقنية مغناطيسية فاخرة. تركيب في ٣ ثوانٍ. بدون صمغ، بدون فوضى، بدون تنازلات.'
                : 'Premium magnetic technology. On in 3 seconds. No glue, no mess, no compromise.' }}
            </p>

            <!-- Dual CTA — the two primary paths -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a [routerLink]="['/products']"
                 id="hero-shop-cta"
                 class="hero-cta-primary group flex items-center gap-3 px-10 py-4 rounded-full font-medium tracking-wide text-sm transition-all duration-300">
                {{ langService.currentLang() === 'ar' ? 'تسوقي الآن' : 'Shop Collection' }}
                <svg class="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a [routerLink]="['/why-us']"
                 id="hero-whyus-cta"
                 class="hero-cta-secondary px-10 py-4 rounded-full font-medium tracking-wide text-sm transition-all duration-300">
                {{ langService.currentLang() === 'ar' ? 'لماذا نوريڤا؟' : 'Why Noreva?' }}
              </a>
            </div>


          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════
           MARQUEE STRIP
      ════════════════════════════════════════════════ -->
      <section class="bg-noreva-black py-5 overflow-hidden" dir="ltr">
        <div class="flex whitespace-nowrap animate-marquee items-center text-white">
          <div class="flex items-center gap-10 pr-10">
            @for(i of [1,2,3,4,5,6,7,8]; track i) {
              <div class="flex items-center gap-8">
                <span class="text-[10px] font-medium tracking-[0.3em] uppercase opacity-60">{{ langService.currentLang() === 'ar' ? 'تركيب في ٣ ثواني' : '3 Second Application' }}</span>
                <span class="w-1 h-1 bg-noreva-gold rounded-full shrink-0"></span>
                <span class="text-[10px] font-medium tracking-[0.3em] uppercase opacity-60">{{ langService.currentLang() === 'ar' ? 'بدون صمغ' : 'Glue Free' }}</span>
                <span class="w-1 h-1 bg-noreva-gold rounded-full shrink-0"></span>
                <span class="text-[10px] font-medium tracking-[0.3em] uppercase opacity-60">{{ langService.currentLang() === 'ar' ? '+١٠٠ استخدام' : '100+ Reuses' }}</span>
                <span class="w-1 h-1 bg-noreva-gold rounded-full shrink-0"></span>
                <span class="text-[10px] font-medium tracking-[0.3em] uppercase opacity-60">{{ langService.currentLang() === 'ar' ? 'آمنة للعيون الحساسة' : 'Safe For Sensitive Eyes' }}</span>
                <span class="w-1 h-1 bg-noreva-gold rounded-full shrink-0"></span>
              </div>
            }
          </div>
          <div class="flex items-center gap-10 pr-10">
            @for(i of [1,2,3,4,5,6,7,8]; track i) {
              <div class="flex items-center gap-8">
                <span class="text-[10px] font-medium tracking-[0.3em] uppercase opacity-60">{{ langService.currentLang() === 'ar' ? 'تركيب في ٣ ثواني' : '3 Second Application' }}</span>
                <span class="w-1 h-1 bg-noreva-gold rounded-full shrink-0"></span>
                <span class="text-[10px] font-medium tracking-[0.3em] uppercase opacity-60">{{ langService.currentLang() === 'ar' ? 'بدون صمغ' : 'Glue Free' }}</span>
                <span class="w-1 h-1 bg-noreva-gold rounded-full shrink-0"></span>
                <span class="text-[10px] font-medium tracking-[0.3em] uppercase opacity-60">{{ langService.currentLang() === 'ar' ? '+١٠٠ استخدام' : '100+ Reuses' }}</span>
                <span class="w-1 h-1 bg-noreva-gold rounded-full shrink-0"></span>
                <span class="text-[10px] font-medium tracking-[0.3em] uppercase opacity-60">{{ langService.currentLang() === 'ar' ? 'آمنة للعيون الحساسة' : 'Safe For Sensitive Eyes' }}</span>
                <span class="w-1 h-1 bg-noreva-gold rounded-full shrink-0"></span>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════
           PRODUCT SPOTLIGHT — Rich editorial section
      ════════════════════════════════════════════════ -->
      <section class="py-28 md:py-36 px-6 bg-white monogram-bg">
        <div class="container mx-auto max-w-6xl">
          <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <!-- Image stack -->
            <div class="relative order-2 lg:order-1">
              <!-- Main image (Composite) -->
              <div class="spotlight-main rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
                <img src="/assets/rrf3g.png" class="w-full h-full object-cover" alt="Noreva Magnetic Lash Product">
              </div>
            </div>

            <!-- Content -->
            <div class="order-1 lg:order-2 text-start">
              <span class="inline-block text-[10px] md:text-xs font-medium tracking-[0.35em] text-noreva-gold uppercase mb-5">
                {{ langService.currentLang() === 'ar' ? 'الأكثر مبيعاً' : 'BESTSELLER' }}
              </span>

              <h2 class="text-3xl md:text-5xl font-serif text-noreva-black mb-6 leading-tight">
                {{ langService.currentLang() === 'ar'
                  ? 'رموش نوريڤا المغناطيسية'
                  : 'Noreva Magnetic Lash Set' }}
              </h2>

              <p class="text-noreva-taupe text-base md:text-lg leading-relaxed mb-10">
                {{ langService.currentLang() === 'ar'
                  ? 'مصممة بتقنية المغناطيس الدقيق لتمنحكِ عيوناً جذابة في ثوانٍ. خفيفة، طبيعية، وتبقى طوال اليوم بدون أي صمغ أو كيماويات.'
                  : 'Engineered with precision micro-magnet technology for captivating eyes in seconds. Lightweight, natural-looking, and all-day hold — without a single drop of glue or chemicals.' }}
              </p>

              <!-- Feature pills -->
              <div class="flex flex-wrap gap-3 mb-10">
                @for (feat of (langService.currentLang() === 'ar' ? arFeatures : enFeatures); track feat) {
                  <span class="feature-pill text-xs font-medium px-4 py-2 rounded-full border border-noreva-champagne text-noreva-black bg-noreva-ivory tracking-wide">
                    {{ feat }}
                  </span>
                }
              </div>

              <!-- CTA row -->
              <div class="flex flex-col sm:flex-row gap-4">
                <a [routerLink]="['/products']"
                   class="btn-luxury inline-flex items-center justify-center gap-3 px-8 py-4 text-white rounded-full font-medium tracking-wide text-sm">
                  {{ langService.currentLang() === 'ar' ? 'تسوقي المجموعة' : 'Shop the Collection' }}
                  <svg class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a [routerLink]="['/why-us']"
                   class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium tracking-wide text-sm border border-noreva-black text-noreva-black hover:bg-noreva-black hover:text-white transition-all duration-300">
                  {{ langService.currentLang() === 'ar' ? 'اعرفي أكثر' : 'Learn More' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════
           BEFORE / AFTER TRANSFORMATION
      ════════════════════════════════════════════════ -->
      <section class="py-28 md:py-36 px-6 bg-noreva-cream monogram-bg">
        <div class="container mx-auto max-w-5xl text-center">
          <span class="inline-block text-[10px] md:text-xs font-medium tracking-[0.35em] text-noreva-gold uppercase mb-5">
            {{ langService.currentLang() === 'ar' ? 'التحول' : 'THE TRANSFORMATION' }}
          </span>
          <h2 class="text-3xl md:text-5xl font-serif text-noreva-black mb-6">
            {{ langService.currentLang() === 'ar' ? 'قبل وبعد' : 'Before & After' }}
          </h2>
          <p class="text-noreva-taupe text-base md:text-lg max-w-xl mx-auto mb-16 leading-relaxed">
            {{ langService.currentLang() === 'ar'
              ? 'شاهدي الفرق الذي تصنعه نوريڤا في ثوانٍ — اكتظاظ درامي، نظرة طبيعية.'
              : 'See the difference Noreva makes in seconds — dramatic volume with a natural, undetectable finish.' }}
          </p>

          <div class="grid md:grid-cols-2 gap-6 md:gap-8">
            <!-- Before -->
            <div class="ba-card group relative overflow-hidden rounded-3xl shadow-luxury border border-noreva-champagne/30">
              <div class="aspect-[4/3] overflow-hidden">
                <img src="/assets/4t2t.png" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Before Noreva">
              </div>
              <div class="absolute top-5 left-5">
                <span class="ba-label before-label text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full">
                  {{ langService.currentLang() === 'ar' ? 'قبل' : 'Before' }}
                </span>
              </div>
            </div>
            <!-- After -->
            <div class="ba-card group relative overflow-hidden rounded-3xl shadow-luxury border border-noreva-gold/20">
              <div class="aspect-[4/3] overflow-hidden">
                <img src="/assets/trhetetht.png" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="After Noreva">
              </div>
              <div class="absolute top-5 left-5">
                <span class="ba-label after-label text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full">
                  {{ langService.currentLang() === 'ar' ? 'بعد نوريڤا' : 'After Noreva' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════
           SOCIAL PROOF — Stars & testimonial
      ════════════════════════════════════════════════ -->
      <section class="py-24 md:py-28 px-6 bg-noreva-ivory monogram-bg">
        <div class="container mx-auto max-w-4xl text-center">
          <!-- Stars -->
          <div class="flex items-center justify-center gap-1.5 mb-3">
            @for (star of [1,2,3,4,5]; track star) {
              <svg class="w-5 h-5 text-noreva-gold fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            }
          </div>
          <span class="text-xs text-noreva-taupe tracking-[0.15em] uppercase mb-14 inline-block">
            {{ langService.currentLang() === 'ar' ? 'تقييم 4.9 من 5 — أكثر من 300 عميلة' : 'Rated 4.9 / 5 — 300+ Verified Customers' }}
          </span>

          <blockquote class="text-2xl md:text-4xl font-serif text-noreva-black leading-relaxed mb-10 italic">
            "{{ langService.currentLang() === 'ar'
              ? 'أخيراً وجدت رموش تناسب حياتي المزدحمة. تركيب في ثوانٍ، تثبت طوال اليوم، ولا أحد يصدق أنها مش طبيعية!'
              : 'Finally found lashes that fit my busy life. On in seconds, stay all day, and nobody believes they are not real!' }}"
          </blockquote>

          <div class="flex items-center justify-center gap-4">
            <div class="w-11 h-11 rounded-full bg-noreva-champagne overflow-hidden border-2 border-noreva-gold/30">
              <img src="https://api.dicebear.com/9.x/micah/svg?seed=Layla" class="w-full h-full object-cover" alt="Customer">
            </div>
            <div class="text-start">
              <p class="text-sm font-semibold text-noreva-black">{{ langService.currentLang() === 'ar' ? 'ليلى م.' : 'Layla M.' }}</p>
              <p class="text-xs text-noreva-taupe">{{ langService.currentLang() === 'ar' ? 'عميلة موثقة — الرياض' : 'Verified Customer — Riyadh' }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════
           DUAL-PATH CTA — The two main choices
      ════════════════════════════════════════════════ -->
      <section class="py-28 md:py-36 px-6 bg-noreva-black monogram-bg monogram-gold">
        <div class="container mx-auto max-w-5xl">
          <div class="text-center mb-16">
            <span class="inline-block text-[10px] md:text-xs font-medium tracking-[0.35em] text-noreva-gold uppercase mb-5">
              {{ langService.currentLang() === 'ar' ? 'اختاري مساركِ' : 'CHOOSE YOUR PATH' }}
            </span>
            <h2 class="text-3xl md:text-5xl font-serif text-white leading-tight">
              {{ langService.currentLang() === 'ar'
                ? 'مستعدة لتجربة الفرق؟'
                : 'Ready to Experience' }}<br>
              <span class="text-noreva-gold italic">{{ langService.currentLang() === 'ar' ? '' : 'The Difference?' }}</span>
            </h2>
          </div>

          <!-- Two path cards -->
          <div class="grid md:grid-cols-2 gap-6">

            <!-- Path 1: Shop -->
            <a [routerLink]="['/products']"
               id="cta-shop-products"
               class="path-card shop-card group relative overflow-hidden rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[360px] cursor-pointer">
              <div>
                <div class="path-icon-wrap shop-icon mb-8 w-14 h-14 rounded-2xl flex items-center justify-center">
                  <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span class="text-[10px] font-medium tracking-[0.3em] uppercase opacity-70 mb-3 block">
                  {{ langService.currentLang() === 'ar' ? 'تسوقي الآن' : 'SHOP NOW' }}
                </span>
                <h3 class="text-2xl md:text-3xl font-serif mb-4 leading-tight">
                  {{ langService.currentLang() === 'ar'
                    ? 'اكتشفي المجموعة الكاملة'
                    : 'Explore the\nFull Collection' }}
                </h3>
                <p class="text-sm leading-relaxed opacity-70">
                  {{ langService.currentLang() === 'ar'
                    ? 'تصفحي جميع أنماط الرموش المغناطيسية. تسليم سريع لجميع دول الخليج.'
                    : 'Browse all styles of luxury magnetic lashes. Fast delivery across the GCC.' }}
                </p>
              </div>
              <div class="path-arrow flex items-center gap-3 text-sm font-medium tracking-wide mt-10 group-hover:gap-5 transition-all duration-300">
                {{ langService.currentLang() === 'ar' ? 'تسوقي الآن' : 'Shop Collection' }}
                <svg class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>

            <!-- Path 2: Why Us -->
            <a [routerLink]="['/why-us']"
               id="cta-why-noreva"
               class="path-card whyus-card group relative overflow-hidden rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[360px] cursor-pointer">
              <div>
                <div class="path-icon-wrap whyus-icon mb-8 w-14 h-14 rounded-2xl flex items-center justify-center">
                  <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span class="text-[10px] font-medium tracking-[0.3em] uppercase opacity-70 mb-3 block">
                  {{ langService.currentLang() === 'ar' ? 'تعرفي أكثر' : 'LEARN MORE' }}
                </span>
                <h3 class="text-2xl md:text-3xl font-serif mb-4 leading-tight">
                  {{ langService.currentLang() === 'ar'
                    ? 'لماذا نوريڤا™ مختلفة؟'
                    : 'Why Noreva\nis Different' }}
                </h3>
                <p class="text-sm leading-relaxed opacity-70">
                  {{ langService.currentLang() === 'ar'
                    ? 'اكتشفي التكنولوجيا، الجودة، والأسباب التي تجعل آلاف النساء يختارون نوريڤا في كل مرة.'
                    : 'Discover the science, quality, and reasons why thousands of women choose Noreva every time.' }}
                </p>
              </div>
              <div class="path-arrow flex items-center gap-3 text-sm font-medium tracking-wide mt-10 group-hover:gap-5 transition-all duration-300">
                {{ langService.currentLang() === 'ar' ? 'اعرفي أكثر' : 'Discover Why' }}
                <svg class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          </div>

          <!-- Bottom tagline -->
          <p class="text-center text-white/30 text-xs tracking-[0.2em] uppercase mt-14">
            {{ langService.currentLang() === 'ar'
              ? 'شحن مجاني • ضمان الجودة • تسليم سريع للخليج'
              : 'Free Shipping • Quality Guarantee • Fast GCC Delivery' }}
          </p>
        </div>
      </section>

    </div>
  `,
  styles: [`
    :host { display: block; }

    /* ── Marquee ────────── */
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-marquee { display: inline-flex; animation: marquee 60s linear infinite; }



    /* ── Hero typography ─ */
    .hero-eyebrow  { opacity: 0; animation: fadeSlideUp 0.9s ease 0.2s forwards; }
    .hero-heading  { opacity: 0; animation: fadeSlideUp 0.9s ease 0.35s forwards; }
    .hero-sub      { opacity: 0; animation: fadeSlideUp 0.9s ease 0.5s forwards; }
    .hero-cta-primary, .hero-cta-secondary { opacity: 0; animation: fadeSlideUp 0.9s ease 0.65s forwards; }
    .hero-scroll-nudge { opacity: 0; animation: fadeSlideUp 1s ease 1.2s forwards; }

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Hero CTA buttons ─ */
    .hero-cta-primary {
      background: var(--color-noreva-gold, #C9A96E);
      color: #fff;
      box-shadow: 0 0 0 0 rgba(201,169,110,0);
      transition: background 0.3s, box-shadow 0.4s, transform 0.3s;
    }
    .hero-cta-primary:hover {
      background: #b8904f;
      box-shadow: 0 0 30px rgba(201,169,110,0.45);
      transform: translateY(-1px);
    }
    .hero-cta-secondary {
      color: rgba(255,255,255,0.85);
      border: 1px solid rgba(255,255,255,0.28);
      backdrop-filter: blur(6px);
    }
    .hero-cta-secondary:hover {
      background: rgba(255,255,255,0.1);
      color: #fff;
      border-color: rgba(255,255,255,0.45);
    }



    /* ── Product spotlight ─ */
    .spotlight-main {
      transition: box-shadow 0.5s;
      box-shadow: 0 32px 80px rgba(0,0,0,0.18);
    }
    .spotlight-main:hover { box-shadow: 0 40px 100px rgba(0,0,0,0.24); }
    .spotlight-accent {
      transition: transform 0.5s ease;
    }
    .spotlight-accent:hover { transform: translateY(-4px); }

    /* ── Feature pills ─ */
    .feature-pill {
      transition: background 0.25s, border-color 0.25s;
    }
    .feature-pill:hover {
      background: #fff;
      border-color: var(--color-noreva-gold, #C9A96E);
    }

    /* ── Before/After ─ */
    .ba-card { overflow: hidden; }
    .ba-label {
      font-family: inherit;
    }
    .before-label {
      background: rgba(255,255,255,0.9);
      color: #1a1a1a;
      backdrop-filter: blur(6px);
    }
    .after-label {
      background: var(--color-noreva-gold, #C9A96E);
      color: #fff;
    }

    /* ── Dual-path CTA cards ─ */
    .path-card {
      transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s;
    }
    .path-card:hover { transform: translateY(-6px); }

    .shop-card {
      background: #fff;
      color: #1a1a1a;
      box-shadow: 0 24px 64px rgba(255,255,255,0.06);
    }
    .shop-card:hover {
      box-shadow: 0 32px 80px rgba(255,255,255,0.12);
    }
    .shop-card .path-icon-wrap.shop-icon {
      background: #f5f0e8;
      color: var(--color-noreva-gold, #C9A96E);
    }
    .shop-card .path-arrow { color: var(--color-noreva-gold, #C9A96E); }

    .whyus-card {
      background: transparent;
      border: 1px solid rgba(255,255,255,0.1);
      color: #fff;
      box-shadow: inset 0 0 0 0 rgba(201,169,110,0);
      transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s, border-color 0.4s;
    }
    .whyus-card:hover {
      border-color: rgba(201,169,110,0.4);
      box-shadow: 0 32px 80px rgba(201,169,110,0.08);
      transform: translateY(-6px);
    }
    .whyus-card .path-icon-wrap.whyus-icon {
      background: rgba(201,169,110,0.12);
      color: var(--color-noreva-gold, #C9A96E);
    }
    .whyus-card .path-arrow { color: rgba(255,255,255,0.7); }
    .whyus-card:hover .path-arrow { color: var(--color-noreva-gold, #C9A96E); }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  langService = inject(LanguageService);
  productService = inject(ProductService);
  shopifyService = inject(ShopifyService);

  featuredProducts = signal<any[]>([]);
  zoomScale = signal(1.5);

  enFeatures = ['Glue Free', '3-Sec Application', '200+ Reuses', 'Sensitive Eyes Safe', 'Waterproof Hold'];
  arFeatures = ['بدون صمغ', 'تركيب في ٣ ثوانٍ', '+٢٠٠ استخدام', 'آمنة للعيون الحساسة', 'ثبات مقاوم للماء'];

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
