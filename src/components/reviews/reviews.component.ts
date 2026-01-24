
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
    <div class="space-y-24">
      
      <!-- Minimalist Header -->
      <div class="text-center max-w-xl mx-auto">
        <span class="text-gray-400 font-black tracking-[0.5em] uppercase text-[10px] mb-8 block">
          {{ langService.currentLang() === 'ar' ? 'آراء العميلات' : 'Customer Reviews' }}
        </span>
        <h2 class="text-4xl font-black text-black tracking-tighter mb-6 italic">
          {{ langService.currentLang() === 'ar' ? 'تجارب بنات الخليج' : 'Khaleeji Girls Love It' }}
        </h2>
        <div class="flex items-center justify-center gap-4">
           <div class="flex text-yellow-500 text-lg">★★★★★</div>
           <span class="text-gray-400 font-bold uppercase text-[9px] tracking-widest">
             {{ langService.currentLang() === 'ar' ? '4.9 تقييم عام' : '4.9 Overall Rating' }}
           </span>
        </div>
      </div>

      <!-- Reviews Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (review of displayedReviews(); track review.id) {
          <div class="flex flex-col bg-white p-6 rounded-[1.5rem] border border-gray-100 hover:border-black/20 hover:shadow-lg transition-all duration-300 break-inside-avoid">
            
            <div class="flex justify-between items-start mb-4">
                <div class="flex gap-3 items-center">
                   <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black">
                      {{ review.name.charAt(0) }}
                   </div>
                   <div>
                      <h5 class="font-bold text-black text-xs">{{ review.name }}</h5>
                      <p class="text-gray-400 text-[9px] font-bold uppercase tracking-widest">{{ review.city }}</p>
                   </div>
                </div>
                <div class="flex text-yellow-500 text-[10px] gap-0.5">
                  @for (star of [1,2,3,4,5]; track star) {
                    <span [class.opacity-30]="star > review.rating">★</span>
                  }
                </div>
            </div>

            <!-- Review Image from CSV -->
            @if (review.image) {
              <div class="mb-4 rounded-xl overflow-hidden border border-gray-100 aspect-video relative bg-gray-50">
                <img [ngSrc]="review.image" width="300" height="200" class="object-cover w-full h-full hover:scale-105 transition-transform duration-500">
              </div>
            }

            <p class="text-gray-600 text-sm leading-relaxed font-medium mb-4 text-right" dir="rtl">
              {{ review.comment }}
            </p>
            
            <div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
               <span class="text-[8px] text-gray-300 font-mono">{{ review.date }}</span>
            </div>
          </div>
        }
      </div>

      @if (hasMoreReviews()) {
        <div class="text-center pt-2">
          <button (click)="loadMore()" class="px-16 py-5 border border-black text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all shadow-xl">
            {{ langService.currentLang() === 'ar' ? 'عرض المزيد من التجارب' : 'Show More Reviews' }}
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
    },
    {
      id: 25, name: 'بدور القاسمي', city: 'رأس الخيمة', country: 'UAE', rating: 5, date: 'منذ 4 أشهر',
      image: 'https://ae01.alicdn.com/kf/A6cc779c6c4254000857899ae014e2efaB.jpg',
      comment: 'منتج ممتاز ويستاهل سعره. الرموش تعيش معاك فترة طويلة اذا حافظتي عليها.'
    },
    {
      id: 26, name: 'فوزية الغامدي', city: 'الباحة', country: 'KSA', rating: 5, date: 'منذ 4 أشهر',
      image: 'https://ae01.alicdn.com/kf/A749181e1b2ec47ec84e5217070c4508eM.jpg',
      comment: 'ريحتني من هم تركيب الرموش، الحين بدقيقتين أخلص وأطلع. شكراً نوريڤا.'
    },
    {
      id: 27, name: 'أميرة الطويل', city: 'الرياض', country: 'KSA', rating: 5, date: 'منذ 4 أشهر',
      image: 'https://ae01.alicdn.com/kf/Ae5fa57a3594144cab9aa97b4b1321f39U.jpg',
      comment: 'جودة وتغليف يفتح النفس، والرموش نفسها خفيفة وسوادها حلو.'
    },
    {
      id: 28, name: 'نجلاء الكواري', city: 'الخور', country: 'QA', rating: 5, date: 'منذ 4 أشهر',
      image: 'https://ae01.alicdn.com/kf/A6cc0ad161efb4cd0b045fa4626e84114z.jpg',
      comment: 'وايد ارتحت عليهم، ماكو حساسية ولا دموع نفس الصمغ. فكرة عبقرية.'
    },
    {
      id: 29, name: 'سناء العوضي', city: 'حولي', country: 'KW', rating: 5, date: 'منذ 5 أشهر',
      image: 'https://ae01.alicdn.com/kf/A66b1cacf1a104576beb4fe18bcc64511c.jpg',
      comment: 'صج فرق، شكل العين يصير مسحوب وجذاب. والتركيب ولا أسهل.'
    },
    {
      id: 30, name: 'روان الصالح', city: 'الرياض', country: 'KSA', rating: 5, date: 'منذ 5 أشهر',
      image: 'https://ae01.alicdn.com/kf/A8e401c4fdaf9440a9b82bc6fd4ba7f39x.jpg',
      comment: 'اعتمدتها للمناسبات والزواجات، تثبت وما تتحرك حتى مع الرقص والحر.'
    },
    {
      id: 31, name: 'تهاني الشمري', city: 'رفحاء', country: 'KSA', rating: 5, date: 'منذ 5 أشهر',
      image: 'https://ae01.alicdn.com/kf/A5e3b2f7c402e409881ba88a0b455f793q.jpg',
      comment: 'روعة يا بنات، خفيفة مرة ولا كأنك مركبة شي، بس الشكل يفرق 180 درجة.'
    },
    {
      id: 32, name: 'هيا السبيعي', city: 'الخرمة', country: 'KSA', rating: 5, date: 'منذ 5 أشهر',
      image: 'https://ae01.alicdn.com/kf/Af3cd3c8ecc57420f8ce54fd9ca580ef9v.jpg',
      comment: 'حبيت إنها تجي مع علبة ومراية، عملية جداً للشنطة والسفر.'
    },
    {
      id: 33, name: 'دلال المطيري', city: 'المجمعة', country: 'KSA', rating: 5, date: 'منذ 6 أشهر',
      image: 'https://ae01.alicdn.com/kf/Abd636784a72d4f9baf584ba7f554dbc2N.jpg',
      comment: 'ما أستغني عنها، غيرت نظرتي للرموش الصناعية تماماً. سهولة ونظافة.'
    },
    {
      id: 34, name: 'أفنان الزهراني', city: 'مكة', country: 'KSA', rating: 4, date: 'منذ 6 أشهر',
      image: 'https://ae01.alicdn.com/kf/A40e27c2caeeb4175b957570919216990E.jpg',
      comment: 'حلوة بس يبي لك تضبطين مكان المغناطيس صح عشان تثبت زين من الزوايا.'
    },
    {
      id: 35, name: 'نوال الكويتية', city: 'الكويت', country: 'KW', rating: 5, date: 'منذ 6 أشهر',
      image: 'https://ae01.alicdn.com/kf/A13257667c2e4465cab69955557609b6fn.jpg',
      comment: 'تهبل! تعطي لوك فخم للعين بدون مبالغة. وايد حبيتهم.'
    },
    {
      id: 36, name: 'ملاك الحسيني', city: 'الرياض', country: 'KSA', rating: 4, date: 'منذ 6 أشهر',
      image: 'https://ae01.alicdn.com/kf/Aed9a2a5d995c468591cd9f640d099a8eX.jpg',
      comment: 'جيدة جداً، وفكرة المغناطيس مريحة، بس تمنيت لو فيه أشكال أكثر كثافة.'
    },
    {
      id: 37, name: 'رغد الدوسري', city: 'وادي الدواسر', country: 'KSA', rating: 5, date: 'منذ 7 أشهر',
      image: 'https://ae01.alicdn.com/kf/A08fa6098be7e42a7b42829daa44bf94eS.jpg',
      comment: 'تجنن يا بنات، تكبر العين وتحلي المكياج بشكل مو طبيعي.'
    },
    {
      id: 38, name: 'جميلة البلوشي', city: 'الرفاع', country: 'BH', rating: 5, date: 'منذ 7 أشهر',
      image: 'https://ae01.alicdn.com/kf/A785f5c8509b049b8ac72c1fd32d32e4bG.jpg',
      comment: 'خدمة العملاء ذوق والمنتج ولا غلطة. الرموش ناعمة وما تلمع كأنها بلاستيك.'
    },
    {
      id: 39, name: 'ليان الشهري', city: 'النماص', country: 'KSA', rating: 5, date: 'منذ 7 أشهر',
      image: 'https://ae01.alicdn.com/kf/A988da4a9e2104fc5a20a70b0f1152df8Z.jpg',
      comment: 'والله تستاهل كل ريال، توفر عليك قيمة الصمغ والرموش اللي تنرمى كل مرة.'
    },
    {
      id: 40, name: 'مضاوي العتيبي', city: 'الدوادمي', country: 'KSA', rating: 5, date: 'منذ 7 أشهر',
      image: 'https://ae01.alicdn.com/kf/Ac7ce2e82d2674a798ebed9ec963909fef.jpg',
      comment: 'اللي تبي عينها تصير واسعة وجذابة لا تتردد تطلبها. خيااال.'
    },
    {
      id: 41, name: 'سمر الخالدي', city: 'سكاكا', country: 'KSA', rating: 4, date: 'منذ 8 أشهر',
      image: 'https://ae01.alicdn.com/kf/A7d630a24780a42de84787ff16528a0dbo.jpg',
      comment: 'حلوة وعملية، بس انتبهوا لا تفركون عينكم بقوة عشان ما تتحرك.'
    },
    {
      id: 42, name: 'علياء الشمسي', city: 'عجمان', country: 'UAE', rating: 5, date: 'منذ 8 أشهر',
      image: 'https://ae01.alicdn.com/kf/Af00331178772484ba65182454209670f0.jpg',
      comment: 'Amazing lashes! So easy to use and look very natural. I recommend it.'
    },
    {
      id: 43, name: 'بسمة السعيد', city: 'الرياض', country: 'KSA', rating: 5, date: 'منذ 8 أشهر',
      image: 'https://ae01.alicdn.com/kf/A5bfb7bb2fc954cb4a5f9439fef3802f2m.jpg',
      comment: 'يا زينها زيناه، تفك أزمات اذا كنتي مستعجلة وتبين كشخة سريعة.'
    },
    {
      id: 44, name: 'وجدان القحطاني', city: 'خميس مشيط', country: 'KSA', rating: 5, date: 'منذ 8 أشهر',
      image: 'https://ae01.alicdn.com/kf/A93ab0131b6b2493a9d7c6fc23c4cff6cA.jpg',
      comment: 'خيااالية، ما توقعت بتثبت كذا بدون صمغ. اختراع بطل.'
    },
    {
      id: 45, name: 'مرام الصيعري', city: 'شرورة', country: 'KSA', rating: 5, date: 'منذ 9 أشهر',
      image: 'https://ae01.alicdn.com/kf/A65a9b8955e3e4e13a15696fc5e410eaaf.jpg',
      comment: 'بنات تراها ادمان، اذا جربتوا المغناطيس مستحيل ترجعون للصمغ.'
    },
    {
      id: 46, name: 'نرجس العوامي', city: 'القطيف', country: 'KSA', rating: 5, date: 'منذ 9 أشهر',
      image: 'https://ae01.alicdn.com/kf/Af990fdb821b6478db60efe7b8b3c5130Q.jpg',
      comment: 'ريحت عيوني من الحساسية والاحمرار، وفوقها شكلها يجنن.'
    },
    {
      id: 47, name: 'لجين الهذلول', city: 'الرياض', country: 'KSA', rating: 5, date: 'منذ 9 أشهر',
      image: 'https://ae01.alicdn.com/kf/Ad662f40bae3d4a088a4e291b0880b98bT.jpg',
      comment: 'منتج بطل وسعره فيه، توفير للكوافير والوقت والجهد.'
    },
    {
      id: 48, name: 'فرح البابطين', city: 'مبارك الكبير', country: 'KW', rating: 4, date: 'منذ 9 أشهر',
      image: 'https://ae01.alicdn.com/kf/A95f122f3a48d48e4b24700467f89ca5ft.jpg',
      comment: 'زينة وتنفع للهدايا، بس الشحن تأخر يوم عن الموعد.'
    },
    {
      id: 49, name: 'عهود الرشيد', city: 'الرياض', country: 'KSA', rating: 5, date: 'منذ 10 أشهر',
      image: 'https://ae01.alicdn.com/kf/Afba3d0a5957946bc9b75b97b16d12a68j.jpg',
      comment: 'اللي تبي نظرة ساحرة ورموش كثيفة تاخذها وهي مغمضة.'
    },
    {
      id: 50, name: 'زينب الموسوي', city: 'سترة', country: 'BH', rating: 5, date: 'منذ 10 أشهر',
      image: 'https://ae01.alicdn.com/kf/Acf83e0ec328e4537b87ccd004552b5be6.jpg',
      comment: 'استخدمها كل يوم للدوام، سريعة وشكلها ناعم مو مبالغ فيه.'
    },
    {
      id: 51, name: 'حنان العمري', city: 'النماص', country: 'KSA', rating: 4, date: 'منذ 10 أشهر',
      image: 'https://ae01.alicdn.com/kf/Afe6bf455b2c84814b41b309f42fcbc06L.jpg',
      comment: 'حلوة بس يبي لها ممارسة عشان تضبطين الوزنية صح.'
    },
    {
      id: 52, name: 'سديم التركي', city: 'جدة', country: 'KSA', rating: 5, date: 'منذ 10 أشهر',
      image: 'https://ae01.alicdn.com/kf/Aaaace99688334cdd8a541e9aecff6557W.jpg',
      comment: 'واووو من قلب، الرمش يندمج مع رموشك الطبيعية بشكل رهيب.'
    },
    {
      id: 53, name: 'ريما العبدالله', city: 'تبوك', country: 'KSA', rating: 5, date: 'منذ 11 شهر',
      image: 'https://ae01.alicdn.com/kf/A629f9a7ae0d74889ad2ba6f0b092eb18R.jpg',
      comment: 'ما صدقت المدح لين جربت، فعلاً أسهل تركيب رموش بالتاريخ.'
    },
    {
      id: 54, name: 'منال الشريف', city: 'ينبع', country: 'KSA', rating: 5, date: 'منذ 11 شهر',
      image: 'https://ae01.alicdn.com/kf/A0a708ae0712449cab50b4342691c25dcg.jpg',
      comment: 'طلبتها لي ولأمي، أمي حبتها مرة لأنها سهلة وما تغلبها.'
    },
    {
      id: 55, name: 'أروى العمران', city: 'الرياض', country: 'KSA', rating: 5, date: 'منذ 11 شهر',
      image: 'https://ae01.alicdn.com/kf/Ad3b459e356034686ad5cd985d96d83c5O.jpg',
      comment: 'بنات اللي تبي كشخة بدون تعب لا تتعداها. خيااال.'
    },
    {
      id: 56, name: 'مشاعل العتيبي', city: 'عفيف', country: 'KSA', rating: 5, date: 'منذ سنة',
      image: 'https://ae01.alicdn.com/kf/Aa6266e8eced04627a90d4acd751c8a9eW.jpg',
      comment: 'رهيبة رهيبة، صارت ركن أساسي بمكياجي اليومي.'
    },
    {
      id: 57, name: 'فدوى المالكي', city: 'الطائف', country: 'KSA', rating: 5, date: 'منذ سنة',
      image: 'https://ae01.alicdn.com/kf/Ab9158f6b99cb4ec08c408131f881ddb8J.jpg',
      comment: 'جودة ممتازة وسرعة بالتوصيل، والأهم النتيجة اللي تفتح النفس.'
    },
    {
      id: 58, name: 'عفاف المطيري', city: 'المجمعة', country: 'KSA', rating: 5, date: 'منذ سنة',
      image: 'https://ae01.alicdn.com/kf/Acf5b80ada8994727b5de9a62ad227d24Q.jpg',
      comment: 'أحلى اختراع، يفك أزمة الصمغ اللي يخرب الميك اب.'
    },
    {
      id: 59, name: 'لمياء السلطان', city: 'الرياض', country: 'KSA', rating: 5, date: 'منذ سنة',
      image: 'https://ae01.alicdn.com/kf/A322ff9e6bb814f87a10848d5099a6829F.jpg',
      comment: 'حبيتها مرة، أنيقة وفعالة، وتجي معها حافظة مرتبة.'
    },
    {
      id: 60, name: 'نوره الحارثي', city: 'بيشة', country: 'KSA', rating: 4, date: 'منذ سنة',
      image: 'https://ae01.alicdn.com/kf/A19a3f6c0f8714fd98869f551fee711b0q.jpg',
      comment: 'كويسة، بس انتبهوا للمغناطيس لا يطيح منكم وانتوا تنظفونها.'
    },
    {
      id: 61, name: 'سوسن الفهد', city: 'الأحمدي', country: 'KW', rating: 5, date: 'منذ سنة',
      image: 'https://ae01.alicdn.com/kf/S4d694cfea2a04a669f7a53b9b9331658M.jpg',
      comment: 'قوية ونتايجها قوية، برافو نوريڤا على هالمنتج.'
    },
    {
      id: 62, name: 'مها السبيعي', city: 'رنية', country: 'KSA', rating: 5, date: 'منذ سنة',
      image: 'https://ae01.alicdn.com/kf/Ab4481cf4142b47daa7b3f81fb10fdac7f.jpg',
      comment: 'رجعت طلبتها مرة ثانية هدية لصديقتي، من كثر ما عجبتني.'
    },
    {
      id: 63, name: 'تهاني القحطاني', city: 'أبها', country: 'KSA', rating: 5, date: 'منذ سنة',
      image: 'https://ae01.alicdn.com/kf/A39b78ba5557d48188d1c1cc6ef6feba4Y.jpg',
      comment: 'تجنن يا بنات، تحلي العين بشكل مو طبيعي.'
    },
    {
      id: 64, name: 'ريناد العتيبي', city: 'الرياض', country: 'KSA', rating: 5, date: 'منذ سنة',
      image: 'https://ae01.alicdn.com/kf/A275861ba51844d65a73afd4a0392ab40c.jpg',
      comment: 'ما أطلع من البيت إلا فيها، تعطي نظرة وثقة بالنفس.'
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
