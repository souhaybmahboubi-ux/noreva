
import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, CommonModule],
  template: `
    <div class="bg-white min-h-screen selection:bg-noreva-bone selection:text-black overflow-x-hidden">
      

      <!-- Hero Section -->
      <section class="pt-32 md:pt-44 pb-24 px-6 border-b border-gray-50">
        <div class="container mx-auto max-w-4xl text-center">
           <h1 class="text-5xl md:text-8xl font-black font-serif text-black mb-10 leading-[1] tracking-tight animate-fade-up">
              {{ langService.currentLang() === 'ar' ? 'رموش أحلامك..' : 'Dream Lashes..' }} <br/>
              {{ langService.currentLang() === 'ar' ? 'بدون صمغ، بدون فوضى!' : 'No Glue, No Mess!' }}
           </h1>
           
           <p class="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed mb-16 max-w-2xl mx-auto animate-fade-up" style="animation-delay: 0.1s">
              {{ langService.currentLang() === 'ar' 
                ? 'وداعاً للصمغ اللي يدبق ويخرب المكياج. نوريڤا تقدم لكِ التقنية المغناطيسية لرموش تركب بثواني وتثبت طول اليوم.' 
                : 'Say goodbye to sticky glue ruining your makeup. Noreva brings you magnetic tech for lashes that apply in seconds and stay all day.' }}
           </p>

           <div class="flex flex-col items-center gap-8 animate-fade-up" style="animation-delay: 0.2s">
              <a [routerLink]="['/products']" class="bg-black text-white px-16 py-7 text-xl font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl">
                 {{ langService.currentLang() === 'ar' ? 'احصلي عليها الآن' : 'GET YOURS NOW' }}
              </a>
              <div class="flex gap-10 opacity-30 grayscale items-center">
                 <span class="text-xs font-black tracking-widest uppercase italic">{{ langService.currentLang() === 'ar' ? 'تركيب فوري' : 'INSTANT APPLY' }}</span>
                 <span class="text-xs font-black tracking-widest uppercase italic">{{ langService.currentLang() === 'ar' ? 'قابلة للإعادة' : 'REUSABLE' }}</span>
                 <span class="text-xs font-black tracking-widest uppercase italic">{{ langService.currentLang() === 'ar' ? 'آمنة' : 'SAFE' }}</span>
              </div>
           </div>
        </div>
      </section>

      <!-- Expert Section -->
      <section class="py-32 px-6 bg-gray-50/50">
        <div class="container mx-auto max-w-3xl">
           <div class="flex flex-col md:flex-row items-center gap-12 mb-20 grayscale">
              <div class="w-32 h-32 rounded-full overflow-hidden border-2 border-black p-1">
                 <img src="https://api.dicebear.com/9.x/micah/svg?seed=Expert" class="w-full h-full rounded-full bg-noreva-bone">
              </div>
              <div class="flex-1 text-start">
                 <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                   {{ langService.currentLang() === 'ar' ? 'نصيحة خبيرة تجميل' : 'EXPERT BEAUTY ADVICE' }}
                 </p>
                 <p class="text-xl font-bold leading-relaxed italic">
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

              <div class="bg-black text-noreva-bone p-12 rounded-[3.5rem] shadow-2xl my-24 relative overflow-hidden">
                 <div class="absolute -top-10 -right-10 w-40 h-40 bg-noreva-bone/10 rounded-full blur-3xl"></div>
                 <h3 class="text-2xl font-black font-serif mb-6">
                   {{ langService.currentLang() === 'ar' ? 'تقنية نوريڤا™ الدقيقة ✨' : 'Noreva™ Precision Tech ✨' }}
                 </h3>
                 <p class="opacity-80 leading-loose text-lg text-start">
                   {{ langService.currentLang() === 'ar' 
                     ? 'مغناطيساتنا "مايكرو" يعني صغيرة جداً وغير مرئية للعين المجردة، لكنها قوية بما يكفي للصمود في أجواءنا الحارة والرطبة. خفيفة كالريشة، ستنسين أنك ترتدينها.' 
                     : 'Our "Micro" magnets are tiny and invisible to the naked eye, yet strong enough to withstand hot and humid weather. Light as a feather, you will forget you are wearing them.' }}
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

  ngOnInit() { }
  ngOnDestroy() { }
}
