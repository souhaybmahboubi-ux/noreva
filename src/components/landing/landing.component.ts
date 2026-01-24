
import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  template: `
    <div class="bg-white min-h-screen text-right pt-16 md:pt-20">
      <!-- العنوان الرئيسي الجذاب -->
      <section class="container mx-auto max-w-2xl px-6 mb-20 text-center">
        <div class="inline-block bg-black text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest mb-6">NOREVA BEAUTY</div>
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
          5 أسباب تخلي النساء يفضلون <span class="bg-noreva-bone px-2">رموش نوريڤا</span> على الرموش التقليدية
        </h1>
        
        <p class="text-gray-600 text-lg leading-relaxed font-medium">
          السؤال الحقيقي مو "هل هي فعلاً سهلة؟"، السؤال هو "هل بقدر أركبها في ثواني؟". رموش نوريڤا نجحت لأنكِ بتستخدمينها فعلاً: سريعة بما يكفي للدوام، سهلة جداً للمناسبات، وبدون فوضى الصمغ المزعجة.
        </p>
        <p class="text-gray-900 font-black mt-6 text-xl">
          النساء اللي عشقوا نوريڤا ما كانوا يدورون على تعقيد، هم لقوا شيء يناسب حياتهم الواقعية ويعطي مظهر جذاب في ثوانٍ.
        </p>
      </section>

      <!-- السبب الأول -->
      <section class="container mx-auto max-w-2xl px-6 mb-24">
        <div class="rounded-[3rem] overflow-hidden shadow-2xl mb-10 border-4 border-white relative group bg-gray-50">
           <img src="https://ae01.alicdn.com/kf/Ab4481cf4142b47daa7b3f81fb10fdac7f.jpg" class="w-full aspect-[4/5] object-cover">
           <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
           <div class="absolute bottom-8 right-8 left-8 text-white text-end">
              <span class="text-noreva-bone font-black text-sm uppercase tracking-widest mb-2 block">التركيب في 3 ثواني</span>
              <p class="text-xl font-bold italic leading-relaxed">"أخيراً لقيت رموش تعطيني لوك فخم بدون حوسة الصمغ اللي تدمع عيني."</p>
           </div>
        </div>

        <h2 class="text-3xl font-black mb-6 leading-tight">1. هي مصممة "لراحتكِ" مو لتعقيدكِ</h2>
        <div class="prose prose-lg text-gray-600 leading-loose space-y-6">
          <p>
            إليكِ السر: أغلب الرموش في السوق تتطلب صمغاً كيميائياً يضر رموشكِ الطبيعية ويسبب تهيجاً لجفونكِ. نوريڤا غيرت القواعد.
          </p>
          <p class="text-gray-900 font-bold">
            تقنية المغناطيس الذكي هي البديل الصحي.
          </p>
          <p>
            مغناطيساتنا "مايكرو" يعني صغيرة جداً وغير مرئية للعين المجردة، لكنها قوية بما يكفي للصمود طوال اليوم. لا صمغ، لا مواد كيميائية، ولا سحب لرموشكِ الطبيعية عند الإزالة.
          </p>
        </div>
      </section>

      <!-- السبب الثاني -->
      <section class="container mx-auto max-w-2xl px-6 mb-24">
        <div class="aspect-video rounded-[3rem] overflow-hidden mb-10 border shadow-xl bg-gray-50">
           <img src="https://ae01.alicdn.com/kf/A39b78ba5557d48188d1c1cc6ef6feba4Y.jpg" class="w-full h-full object-cover">
        </div>
        <h2 class="text-3xl font-black mb-6 leading-tight">2. عيون جذابة في ثانية واحدة</h2>
        <div class="prose prose-lg text-gray-600 leading-loose space-y-6">
          <p>
            خلونا نكون صريحين: وقتكِ ثمين جداً. ليش تضيعين 15 دقيقة تحاولين تضبطين الرموش العادية؟
          </p>
          <p class="text-gray-900 font-bold">
            نوريڤا تعطيكِ اللوك المثالي في وقت قياسي.
          </p>
          <p>
            ضعي الرمش العلوي، ثم السفلي، والتقنية المغناطيسية ستتكفل بالباقي. الأمر بهذه البساطة. مثالية للصباحات المزدحمة أو لما تكونين مستعجلة لمناسبة مهمة.
          </p>
        </div>
      </section>

      <!-- السبب الثالث -->
      <section class="container mx-auto max-w-2xl px-6 mb-24 text-center">
        <div class="bg-noreva-gray-50 rounded-[3rem] p-10 mb-10 border border-gray-100">
           <img [src]="'https://ae01.alicdn.com/kf/A275861ba51844d65a73afd4a0392ab40c.jpg'" class="w-48 h-48 mx-auto mb-8 rounded-full shadow-lg border-4 border-white object-cover">
           <h2 class="text-3xl font-black mb-6 leading-tight">3. لا صمغ، لا فوضى، لا دموع</h2>
           <p class="text-gray-600 leading-relaxed mb-6 font-medium">
             تذكرين الصمغ اللي كان يدخل في عينكِ ويخرب المكياج؟ أو التكتلات السوداء اللي تبقى على جفنكِ بعد الإزالة؟
           </p>
           <p class="text-gray-900 font-bold text-xl leading-relaxed">
             رموش نوريڤا تنهي هذه المأساة تماماً.
           </p>
        </div>
        <p class="text-gray-600 leading-loose text-lg mb-8">
          إزالتها أسهل من تركيبها؛ في ثانية واحدة بدون الحاجة لأي مزيل مكياج زيتي. رموشكِ الطبيعية ستبقى بأمان، ومظهركِ سيبقى نظيفاً طوال اليوم.
        </p>
      </section>

      <!-- السبب الرابع -->
      <section class="container mx-auto max-w-2xl px-6 mb-24">
        <div class="grid grid-cols-2 gap-4 mb-10">
           <div class="bg-gray-50 rounded-3xl p-6 text-center border">
              <span class="text-gray-400 font-bold text-xs uppercase block mb-2">الرموش التقليدية</span>
              <span class="text-2xl font-black text-gray-900 leading-none">تكلفة مستمرة</span>
              <p class="text-xs mt-2 text-gray-400">تستخدم لمرة واحدة أو مرتين</p>
           </div>
           <div class="bg-black rounded-3xl p-6 text-center border border-black shadow-xl">
              <span class="text-white font-black text-xs uppercase block mb-2">رموش نوريڤا</span>
              <span class="text-2xl font-black text-noreva-bone leading-none">161 ريال</span>
              <p class="text-xs mt-2 text-noreva-bone font-bold">قابلة للاستخدام 100+ مرة</p>
           </div>
        </div>
        <h2 class="text-3xl font-black mb-6 leading-tight">4. استثمار يدوم لأشهر</h2>
        <div class="prose prose-lg text-gray-600 leading-loose space-y-6">
          <p>
            بدلاً من شراء علب رموش جديدة وصمغ كل أسبوع، احصلي على زوج واحد من نوريڤا يدوم معكِ لأكثر من 100 مرة من الاستخدام.
          </p>
          <p class="text-gray-900 font-bold">
            جودة عالية، مظهر طبيعي، وتوفير ذكي.
          </p>
          <p>
            تخيلي التوفير الذي ستحققينه سنوياً، مع الحفاظ على مظهركِ المتألق والراقي في كل مرة.
          </p>
        </div>
      </section>

      <!-- السبب الخامس -->
      <section class="container mx-auto max-w-2xl px-6 mb-32">
        <div class="aspect-square rounded-[3rem] overflow-hidden mb-10 border shadow-2xl relative">
           <img src="https://ae01.alicdn.com/kf/A74daed21421d4460994c516b23c435d0X.jpg" class="w-full h-full object-cover">
        </div>
        <h2 class="text-3xl font-black mb-6 leading-tight">5. مظهر طبيعي يمنحكِ الثقة</h2>
        <div class="prose prose-lg text-gray-600 leading-loose space-y-6">
          <p>
            الموضوع مو بس رموش. الموضوع هو كيف تشعرين تجاه نفسكِ. الرموش المغناطيسية تعطي "رفعة" فورية للعين (Eye Lift) وتخفي علامات التعب. بتشوفين وجهكِ منتعش ومستقر، بدون القلق من سقوط الرمش في منتصف الحديث.
          </p>
        </div>
      </section>

      <!-- صندوق العرض الحصري -->
      <section class="container mx-auto max-w-2xl px-4 mb-40">
        <div class="bg-gray-50 rounded-[3rem] border-2 border-dashed border-black p-8 md:p-12 relative shadow-2xl overflow-hidden">
           <div class="absolute -top-10 -left-10 w-40 h-40 bg-black/5 rounded-full blur-3xl"></div>
           
           <div class="relative z-10 text-center">
              <h3 class="text-3xl font-black mb-4 leading-tight italic">عرض الـ ٢ زوج (١+١ مجاناً) 🌟</h3>
              <div class="flex items-center justify-center gap-4 mb-8">
                 <span class="text-gray-400 font-bold">ينتهي العرض خلال:</span>
                 <div class="flex gap-2 font-mono text-xl font-black text-red-600 bg-white px-4 py-2 rounded-xl shadow-sm">
                    <span>{{ timeLeft() }}</span>
                 </div>
              </div>

              <div class="bg-white rounded-[2rem] p-6 mb-10 shadow-sm border border-gray-100">
                 <img [src]="'https://ae01.alicdn.com/kf/Ab4481cf4142b47daa7b3f81fb10fdac7f.jpg'" class="w-full aspect-square object-cover rounded-2xl mb-8">
                 <ul class="space-y-4 text-right mb-10">
                    <li class="flex items-center justify-end gap-3">
                       <span class="font-bold text-gray-800">أداة تطبيق احترافية مجانية</span>
                       <div class="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    </li>
                    <li class="flex items-center justify-end gap-3">
                       <span class="font-bold text-gray-800">حقيبة حفظ فاخرة مجانية</span>
                       <div class="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    </li>
                    <li class="flex items-center justify-end gap-3">
                       <span class="font-bold text-gray-800">شحن سريع ومجاني</span>
                       <div class="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    </li>
                 </ul>
                 
                 <div class="flex flex-col gap-4">
                    <a [routerLink]="['/product', 'effortless-magnetic-lashes-set']" class="w-full py-6 bg-black text-white rounded-2xl font-black text-2xl uppercase tracking-widest hover:bg-gray-900 active:scale-95 transition-all shadow-xl">
                       تسوقي الآن
                    </a>
                    <div class="flex items-center justify-center gap-2">
                       <span class="text-xs font-black uppercase text-gray-400 tracking-[0.2em]">خطر نفاذ الكمية:</span>
                       <span class="text-xs font-black uppercase text-red-600 tracking-[0.2em] animate-pulse">عالٍ جداً 🔥</span>
                    </div>
                 </div>
              </div>

              <p class="text-xs text-gray-400 font-bold leading-relaxed px-10">
                ملاحظة: متوفر فقط عبر موقعنا الرسمي، احذري المنتجات المقلدة التي قد تستخدم مغناطيسات ثقيلة أو مواد رديئة.
              </p>
           </div>
        </div>
      </section>

      <!-- تذييل الصفحة -->
      <section class="container mx-auto max-w-2xl px-6 mb-40 text-center">
         <div class="aspect-square w-64 h-64 mx-auto mb-10 rounded-full overflow-hidden border-8 border-gray-50 shadow-2xl">
            <img src="https://api.dicebear.com/9.x/micah/svg?seed=EyelashExpert" class="w-full h-full object-cover">
         </div>
         <h4 class="text-3xl font-black italic mb-6 leading-tight">"ما كنت أصدق إن الرموش تقدر تغير شكلي وتريحني كذا.. وداعاً للصالونات!"</h4>
         <p class="text-gray-400 font-bold text-sm tracking-widest uppercase">نورة أ. - عميلة نوريڤا الفخورة</p>
      </section>
    </div>

  `
})
export class LandingComponent implements OnInit, OnDestroy {
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
