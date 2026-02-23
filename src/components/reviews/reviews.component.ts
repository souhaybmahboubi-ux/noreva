
import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Review {
  id: number;
  name: string;
  city: string;
  country: string;
  comment: string;
  rating: number;
  image?: string;
  date: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="space-y-16">
      
      <!-- Minimalist Header -->
      <div class="text-center max-w-xl mx-auto">
        <span class="inline-block text-[10px] md:text-xs font-medium tracking-[0.3em] text-noreva-gold uppercase mb-4">
          {{ langService.currentLang() === 'ar' ? 'آراء العميلات' : 'TESTIMONIALS' }}
        </span>
        <h2 class="text-3xl md:text-5xl font-serif text-noreva-black mb-6">
          {{ langService.currentLang() === 'ar' ? 'تجارب عميلات نوريڤا' : 'Why Women Love Noreva' }}
        </h2>
        <div class="flex items-center justify-center gap-3">
           <div class="flex items-center gap-0.5">
             @for (star of [1,2,3,4,5]; track star) {
               <svg class="w-4 h-4 text-noreva-gold fill-current" viewBox="0 0 20 20">
                 <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
               </svg>
             }
           </div>
           <span class="text-sm text-noreva-taupe">
             {{ langService.currentLang() === 'ar' ? '4.9/5 من أكثر من 300 عميلة' : '4.9/5 from 300+ customers' }}
           </span>
        </div>
      </div>

      <!-- Reviews Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        @for (review of displayedReviews(); track review.id) {
          <div class="flex flex-col bg-white p-3 md:p-5 rounded-2xl md:rounded-3xl border border-noreva-champagne/30 hover:shadow-luxury transition-all duration-500 break-inside-avoid">
            
            <div class="flex justify-between items-start mb-2 md:mb-4">
                <div class="flex gap-2 md:gap-3 items-center">
                   <div class="w-7 h-7 md:w-8 md:h-8 rounded-full bg-noreva-ivory flex items-center justify-center text-[9px] md:text-[10px] font-medium text-noreva-black">
                      {{ review.name.charAt(0) }}
                   </div>
                   <div>
                      <h5 class="font-medium text-noreva-black text-[10px] md:text-xs leading-tight">{{ review.name }}</h5>
                      <p class="text-noreva-taupe text-[8px] md:text-[9px] font-medium uppercase tracking-wider leading-none mt-0.5">{{ review.city }}</p>
                   </div>
                </div>
                <div class="flex items-center gap-0.5">
                  @for (star of [1,2,3,4,5]; track star) {
                    <svg class="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" [class.text-noreva-gold]="star <= review.rating" [class.text-noreva-champagne]="star > review.rating" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  }
                </div>
            </div>

            <!-- Review Image -->
            @if (review.image) {
              <div class="mb-2 md:mb-4 rounded-xl md:rounded-2xl overflow-hidden border border-noreva-champagne/20 aspect-video relative bg-noreva-ivory img-reveal">
                <img [ngSrc]="review.image" width="300" height="200" referrerpolicy="no-referrer" class="object-cover w-full h-full">
              </div>
            }

            <p class="text-noreva-taupe text-[10px] md:text-sm leading-relaxed mb-2 md:mb-4 text-right line-clamp-4" dir="rtl">
              {{ review.comment }}
            </p>
            
            <div class="mt-auto pt-2 md:pt-3 border-t border-noreva-champagne/20 flex items-center justify-between">
               <span class="text-[8px] text-noreva-taupe/40 font-mono">{{ review.date }}</span>
            </div>
          </div>
        }
      </div>

      @if (hasMoreReviews()) {
        <div class="text-center pt-4">
          <button (click)="loadMore()" class="btn-luxury-outline px-12 py-4 text-noreva-black rounded-full font-medium tracking-wide text-xs hover:bg-noreva-black hover:text-white transition-all duration-400">
            {{ langService.currentLang() === 'ar' ? 'عرض المزيد' : 'Load More Reviews' }}
          </button>
        </div>
      }
    </div>
  `
})
export class ReviewsComponent {
  langService = inject(LanguageService);

  reviews: Review[] = [
    {
      id: 1, name: 'الجوهرة آل سعود', city: 'الرياض', country: 'KSA', rating: 5, date: 'منذ يومين',
      image: 'https://ae01.alicdn.com/kf/Ab4481cf4142b47daa7b3f81fb10fdac7f.jpg',
      comment: 'بنات لا تفوتكم! الرموش خيال، تركب بثواني بدون صمغ وحوسة، والمغناطيس قوي ما يتحرك. شكلها مرة طبيعي عالعين.'
    },
    {
      id: 2, name: 'مريم الكعبي', city: 'دبي', country: 'UAE', rating: 5, date: 'منذ 3 أيام',
      image: 'https://ae01.alicdn.com/kf/A39b78ba5557d48188d1c1cc6ef6feba4Y.jpg',
      comment: 'وايد حبيتهم، الكواليتي ممتازة وسهلين في التركيب. أحلى شي إنهم ما يقطعون رموشي الطبيعية نفس الصمغ.'
    },
    {
      id: 3, name: 'نورة الدوسري', city: 'الدمام', country: 'KSA', rating: 5, date: 'منذ 5 أيام',
      image: 'https://ae01.alicdn.com/kf/A275861ba51844d65a73afd4a0392ab40c.jpg',
      comment: 'يا بنات تجنن، وربي فكت لي أزمة المناسبات. دقيقتين وأنا جاهزة، والسواد فاحم يخلي العين مرسومة رسم.'
    },
    {
      id: 4, name: 'فاطمة العلي', city: 'الكويت', country: 'KW', rating: 5, date: 'منذ أسبوع',
      image: 'https://ae01.alicdn.com/kf/A74daed21421d4460994c516b23c435d0X.jpg',
      comment: 'عجيبة والله، ما توقعت بتكون بهالسهولة. المغناطيس صغير وما يبين، وشكل الرمش وايد راقي.'
    },
    {
      id: 5, name: 'شوق البلوشي', city: 'المنامة', country: 'BH', rating: 4, date: 'منذ أسبوع',
      image: 'https://ae01.alicdn.com/kf/A03ba24ed8d5e4f78b53c7dec525a8284P.jpg',
      comment: 'حلوين وايد وخفاف عالعين، بس يبي لج تتعودين على طريقة التركيب أول مرة، بعدها تصير سهالات.'
    },
    {
      id: 6, name: 'سارة الزياني', city: 'المحرق', country: 'BH', rating: 5, date: 'منذ أسبوعين',
      image: 'https://ae01.alicdn.com/kf/A7d01c722457b4bb98cd4cb6eb826f769I.jpg',
      comment: 'ريحتني من الصمغ اللي كان يلعوزني. الرموش تثبت طول اليوم حتى بالرطوبة، أنصح فيها وبقوة.'
    },
    {
      id: 7, name: 'هند القحطاني', city: 'جدة', country: 'KSA', rating: 5, date: 'منذ أسبوعين',
      image: 'https://ae01.alicdn.com/kf/Ab0f644da02204a4eacf455fbd3b73d19b.jpg',
      comment: 'رهيبة يا بنات، تعطي كثافة وطول يجنن وبنفس الوقت شكلها ناعم مو أوفر. التوصيل كان سريع.'
    },
    {
      id: 8, name: 'لطيفة الهاجري', city: 'الدوحة', country: 'QA', rating: 5, date: 'منذ 3 أسابيع',
      image: 'https://ae01.alicdn.com/kf/A3d4a812a19d343828ea0145ea4ac30b1Z.jpg',
      comment: 'وايد حلوة وعملية، الباكيجنج راقي وتجي معها علبة تحفظها. طلبت لي ولأختي.'
    },
    {
      id: 9, name: 'العنود السبيعي', city: 'الرياض', country: 'KSA', rating: 5, date: 'منذ 3 أسابيع',
      image: 'https://ae01.alicdn.com/kf/A78930bd861fc4e3c908b10ed7b9bb35b2.jpg',
      comment: 'استخدمتها بزواج، والله الكل يسألني وين مسوية رموشك. ما صدقوا إنها تركيب مغناطيس.'
    },
    {
      id: 10, name: 'ريم المطيري', city: 'بريدة', country: 'KSA', rating: 4, date: 'منذ شهر',
      image: 'https://ae01.alicdn.com/kf/A2e1bba3cd179409f9e14dc170e1804f00.jpg',
      comment: 'جودتها بطلة، بس يبيلك تدربين يدك عالتركيب عشان تضبطينها من أول مرة.'
    },
    {
      id: 11, name: 'منيرة الخالدي', city: 'الجهراء', country: 'KW', rating: 4, date: 'منذ شهر',
      image: 'https://ae01.alicdn.com/kf/A95f122f3a48d48e4b24700467f89ca5ft.jpg',
      comment: 'صج فرق عن الرموش العادية، خفيفة وما تحسين فيها، وأهم شي ماكو صمغ يدبق العين.'
    },
    {
      id: 12, name: 'دانة المري', city: 'الريان', country: 'QA', rating: 5, date: 'منذ شهر',
      image: 'https://ae01.alicdn.com/kf/A5442ea69c69844b7bf0bd5e08a2af791i.jpg',
      comment: 'تهبل، والله تختصر الوقت بشكل مو طبيعي. والنتيجة ولا غلطة، سواد وكثافة.'
    },
    {
      id: 13, name: 'أسماء الشمري', city: 'حائل', country: 'KSA', rating: 5, date: 'منذ شهر',
      image: 'https://ae01.alicdn.com/kf/A89584118adcd477d9c0a69285a6d6b380.jpg',
      comment: 'يابنات خذوها وأنتوا مغمضين، مريحة جداً وما تسبب حساسية للعين.'
    },
    {
      id: 14, name: 'خلود العتيبي', city: 'الطائف', country: 'KSA', rating: 5, date: 'منذ شهر',
      image: 'https://ae01.alicdn.com/kf/Aa77a9d0ebca44231bcc1cb142e682d36J.jpg',
      comment: 'أحلى اختراع بالحياة! وداعاً للرموش اللي تطيح بنص السهرة. هذه تثبت بقوة.'
    },
    {
      id: 15, name: 'شيخة المهيري', city: 'أبوظبي', country: 'UAE', rating: 5, date: 'منذ شهرين',
      image: 'https://ae01.alicdn.com/kf/A624edcbf213842a4bffbe416b777e91fC.jpg',
      comment: 'فنانة الرموش، وايد ناعمة وشكلها طبيعي مو بلاستيك. حبيتها حق الدوام.'
    },
    {
      id: 16, name: 'بشاير الظفيري', city: 'حفر الباطن', country: 'KSA', rating: 4, date: 'منذ شهرين',
      image: 'https://ae01.alicdn.com/kf/S070f93ce6125489ca9a9f666790f15b9v.jpg',
      comment: 'حلوة مرة، بس لازم تقصينها شوي عشان تناسب عرض عينك، بعدها تطلع بيرفكت.'
    },
    {
      id: 17, name: 'نوف العنزي', city: 'الرياض', country: 'KSA', rating: 5, date: 'منذ شهرين',
      image: 'https://ae01.alicdn.com/kf/A1c14d718f9c44638898f433327fe8ed5i.jpg',
      comment: 'صرت ما أستغني عنها، تعطي سحبة للعين تجنن، وكأنها رموشك الطبيعية بس أكثف.'
    },
    {
      id: 18, name: 'مشاعل الرشيدي', city: 'الفروانية', country: 'KW', rating: 5, date: 'منذ شهرين',
      image: 'https://ae01.alicdn.com/kf/A596023466f364cbaaccb78eb1495e94bg.jpg',
      comment: 'خيااال، تركبينها بثانية وتطلعين. وفرت علي وقت الصمغ وانتظاره ينشف.'
    },
    {
      id: 19, name: 'عبير الحربي', city: 'المدينة', country: 'KSA', rating: 5, date: 'منذ 3 أشهر',
      image: 'https://ae01.alicdn.com/kf/A29ad787e1abd4c8eab4a340f6f688a787.jpg',
      comment: 'تجنن وتجي معها أداة تساعد عالتركيب. جودة المغناطيس ممتازة ما يتحرك.'
    },
    {
      id: 20, name: 'لولوه السالم', city: 'الخبر', country: 'KSA', rating: 5, date: 'منذ 3 أشهر',
      image: 'https://ae01.alicdn.com/kf/Aec88c40faa2743ab9a208b75e754b341R.jpg',
      comment: 'شكلها باللبس يموووت، تعطي نظرة جذابة. والأهم إنها ما تعور العين.'
    },
    {
      id: 21, name: 'وضحى المري', city: 'الوكرة', country: 'QA', rating: 5, date: 'منذ 3 أشهر',
      image: 'https://ae01.alicdn.com/kf/A456e4ea997ca43f78e530112dad912d58.jpg',
      comment: 'طلبت الباقة الكاملة، التوصيل سريع والرموش كواليتي عالي، وايد مستانسة عليهم.'
    },
    {
      id: 22, name: 'حصة البوعينين', city: 'الجبيل', country: 'KSA', rating: 5, date: 'منذ 3 أشهر',
      image: 'https://ae01.alicdn.com/kf/Afbb5a88598a44ad1bb1b9ef3200587344.jpg',
      comment: 'من أفضل الرموش اللي جربتها، خفيفة وما تحسين بوزن عالعين، وثباتها بطل.'
    },
    {
      id: 23, name: 'غادة الفايز', city: 'عنيزة', country: 'KSA', rating: 5, date: 'منذ 3 أشهر',
      image: 'https://ae01.alicdn.com/kf/A69a33c5b9a0e467a8f2765f39d3e3417L.jpg',
      comment: 'مرة حبيتها، تنفع للدوام وللمناسبات. سهلة الفك والتركيب وما تقطع الرموش.'
    },
    {
      id: 24, name: 'مياسه العبدالله', city: 'الشارقة', country: 'UAE', rating: 5, date: 'منذ 4 أشهر',
      image: 'https://ae01.alicdn.com/kf/A174331a6f5ba43f2bad5d7e0a236741bK.jpg',
      comment: 'وايد روعة، المغناطيس دقيق وما يبين كلش. أنصح فيها لكل البنات.'
    }
  ];

  visibleCount = signal(8);

  displayedReviews = computed(() => {
    return this.reviews.slice(0, this.visibleCount());
  });

  hasMoreReviews() {
    return this.visibleCount() < this.reviews.length;
  }

  loadMore() {
    this.visibleCount.update(c => Math.min(c + 8, this.reviews.length));
  }
}
