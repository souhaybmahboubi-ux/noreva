import { Component, signal, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="space-y-12">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="text-right">
          <h2 class="text-3xl font-black text-gray-900 mb-2">التقييمات ({{ reviews.length }})</h2>
          <div class="flex items-center gap-2">
             <div class="flex text-gold-500 text-xl">★★★★★</div>
             <span class="text-gray-500 font-bold">4.9 من 5</span>
          </div>
        </div>
      </div>

      <!-- Reviews Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (review of displayedReviews(); track review.id) {
          <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col animate-in fade-in zoom-in duration-300">
            <div class="flex items-center gap-4 mb-4">
              <div class="relative">
                 <div [class]="'h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ' + review.avatarBg + ' ' + review.avatarText">
                  {{ review.initial }}
                </div>
                <div class="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
              </div>
              <div>
                <h5 class="font-bold text-gray-900">{{ review.name }}</h5>
                <div class="flex items-center gap-1">
                   <div class="flex text-gold-500 text-sm">
                     @for (star of [1,2,3,4,5]; track star) {
                       <span>{{ star <= review.rating ? '★' : '☆' }}</span>
                     }
                   </div>
                </div>
              </div>
            </div>
            <div class="mb-4 flex-grow">
               <p class="text-gray-600 text-sm leading-relaxed font-medium">"{{ review.comment }}"</p>
               
               <!-- User Uploaded Images -->
               @if (review.images && review.images.length > 0) {
                 <div class="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                    @for (img of review.images; track img) {
                      <div class="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
                         <img [ngSrc]="img" width="100" height="100" class="w-full h-full object-cover">
                      </div>
                    }
                 </div>
               }
            </div>
            <div class="pt-4 border-t border-gray-50 mt-auto">
               <span class="text-xs text-gray-400 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {{ review.location }}
              </span>
            </div>
          </div>
        }
      </div>

      @if (hasMoreReviews()) {
        <div class="text-center pt-8">
          <button (click)="loadMore()" class="bg-white border border-gray-200 text-gray-700 font-bold py-3 px-8 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
            عرض المزيد من التقييمات
          </button>
        </div>
      }
    </div>
  `
})
export class ReviewsComponent {
  reviews = [
    { id: 1, name: 'حمود القحطاني', initial: 'ح', rating: 5, location: 'الرياض، السعودية', comment: 'يا عيال والله تفك أزمة! الوكيل مر سوانا تفتيش فجأة، حطيت الجوال والايربودز داخل القارورة وحطيتها عالاولة ولا شك فيني 😂🔥.', verified: true, avatarBg: 'bg-blue-100', avatarText: 'text-blue-700', images: [] },
    { id: 2, name: 'عزوز المطيري', initial: 'ع', rating: 5, location: 'الجهراء، الكويت', comment: 'من صجكم؟ خاش فيها التلفون والأغراض والوضع طيب، المدرسين عبالهم بس ماي 😂. انصح فيها وبقوة حق المدرسة.', verified: true, avatarBg: 'bg-green-100', avatarText: 'text-green-700', images: [] },
    { id: 3, name: 'سلوم الكواري', initial: 'س', rating: 5, location: 'الدوحة، قطر', comment: 'أقوى اختراع للمدرسة. قبل كل يوم ينسحب جوالي، الحين محد يدري وين خاشه. الشكل بريء محد يشك.', verified: true, avatarBg: 'bg-red-100', avatarText: 'text-red-700', images: [] },
    { id: 4, name: 'راشد المري', initial: 'ر', rating: 5, location: 'دبي، الإمارات', comment: 'دخيل الله شو قوية، حاط فيها السماعات والبطاقة، والمشرف يمر ولا هو داري. شكلها كشخة ومحد يتوقع.', verified: true, avatarBg: 'bg-purple-100', avatarText: 'text-purple-700', images: [] },
    { id: 5, name: 'فهد الشمري', initial: 'ف', rating: 5, location: 'حائل، السعودية', comment: 'الصدق كنت خايف تكشفني الادارة بس والله عدت سلامات. المخبا وسيع يشيل ايفون برو ماكس بالراحة.', verified: true, avatarBg: 'bg-yellow-100', avatarText: 'text-yellow-700', images: [] },
    { id: 6, name: 'مشاري العازمي', initial: 'م', rating: 5, location: 'السالمية، الكويت', comment: 'شنو هالاختراع الناري! مريحتني من عوار الراس مع الادارة، اغراضي كلها داخل ومحد يكلمني.', verified: true, avatarBg: 'bg-indigo-100', avatarText: 'text-indigo-700', images: [] },
    { id: 7, name: 'سعيد العامري', initial: 'س', rating: 5, location: 'العين، الإمارات', comment: 'والله انها فنانه، حاط فيها مصروف الاسبوع والجوال، المدرس يطالع فيها يحسبها مطارة عادية 😂.', verified: true, avatarBg: 'bg-orange-100', avatarText: 'text-orange-700', images: [] },
    { id: 8, name: 'تركي العتيبي', initial: 'ت', rating: 5, location: 'جدة، السعودية', comment: 'يا رجل فكتني من تعهد، الموجه دخل الفصل وانا حاط السماعات داخلها، ولا درى عن شي.', verified: true, avatarBg: 'bg-teal-100', avatarText: 'text-teal-700', images: [] },
    { id: 9, name: 'أحمد البلوشي', initial: 'أ', rating: 4, location: 'مسقط، عمان', comment: 'ممتازة حال المدرسة، اشيل فيها تلفوني وما حد يكشفني. بس زين لو تسوون الوان اكثر.', verified: true, avatarBg: 'bg-rose-100', avatarText: 'text-rose-700', images: [] },
    { id: 10, name: 'خليفة الدوسري', initial: 'خ', rating: 5, location: 'الدمام، السعودية', comment: 'الطلاب كلهم يسألوني من وين، صارت ترند عندنا بالمدرسة. اهم شي الوكيل مو عارف السالفة 😂.', verified: true, avatarBg: 'bg-cyan-100', avatarText: 'text-cyan-700', images: [] },
    { id: 11, name: 'جاسم الكندري', initial: 'ج', rating: 5, location: 'حولي، الكويت', comment: 'قوية قوية، خاش فيها الايربودز طول الحصة والوضع سهالات. شكرا نوريفا انقذتونا.', verified: true, avatarBg: 'bg-emerald-100', avatarText: 'text-emerald-700', images: [] },
    { id: 12, name: 'حمدان الفلاسي', initial: 'ح', rating: 5, location: 'الشارقة، الإمارات', comment: 'ما استغني عنها، كل ممنوعات المدرسة داخلها ومحد يدري. وجودتها ممتازة تتحمل الطيحات.', verified: true, avatarBg: 'bg-slate-100', avatarText: 'text-slate-700', images: [] },
    { id: 13, name: 'ناصر السبيعي', initial: 'ن', rating: 5, location: 'الرياض، السعودية', comment: 'ياخي وربي بطلة، ما تخر ماي أبداً والعزل مجنون. حاط جوالي وأنا متطمن.', verified: true, avatarBg: 'bg-blue-100', avatarText: 'text-blue-700', images: [] },
    { id: 14, name: 'يوسف الخالدي', initial: 'ي', rating: 5, location: 'المنامة، البحرين', comment: 'فكره عبقرية، تنفع حق الجيم بعد مو بس المدرسة. المفاتيح والبطاقة في أمان.', verified: true, avatarBg: 'bg-red-100', avatarText: 'text-red-700', images: [] },
    { id: 15, name: 'محمد الهاجري', initial: 'م', rating: 5, location: 'الظهران، السعودية', comment: 'التوصيل سريع ما شاء الله، 3 أيام وهي عندي. المنتج نفس الوصف بالضبط.', verified: true, avatarBg: 'bg-green-100', avatarText: 'text-green-700', images: [] },
    { id: 16, name: 'عبدالله العجمي', initial: 'ع', rating: 5, location: 'الأحمدي، الكويت', comment: 'يا جماعة انصحكم فيها، شكلها كشخة ومحد يشك فيها مولية.', verified: true, avatarBg: 'bg-yellow-100', avatarText: 'text-yellow-700', images: [] },
    { id: 17, name: 'سلطان الظاهري', initial: 'س', rating: 4, location: 'أبو ظبي، الإمارات', comment: 'حلوة وعملية، بس ياليت توفرون حجم أكبر شوي للماي. بس كمخبا سري 10/10.', verified: true, avatarBg: 'bg-purple-100', avatarText: 'text-purple-700', images: [] },
    { id: 18, name: 'بدر الشمري', initial: 'ب', rating: 5, location: 'حفر الباطن، السعودية', comment: 'المنتج بطل بطل، فكني من قروشة التفتيش الصباحي.', verified: true, avatarBg: 'bg-pink-100', avatarText: 'text-pink-700', images: [] },
    { id: 19, name: 'علي حسين', initial: 'ع', rating: 5, location: 'المنامة، البحرين', comment: 'وايد زينة، الكواليتي مالها ممتاز وتتحمل.', verified: true, avatarBg: 'bg-indigo-100', avatarText: 'text-indigo-700', images: [] },
    { id: 20, name: 'خالد العنزي', initial: 'خ', rating: 5, location: 'الجهراء، الكويت', comment: 'ياخي راحة نفسية، امشي وتلفوني معاي ومحد يقدر يكلمني.', verified: true, avatarBg: 'bg-blue-100', avatarText: 'text-blue-700', images: [] },
    { id: 21, name: 'فارس الشهري', initial: 'ف', rating: 5, location: 'أبها، السعودية', comment: 'شكلها فخم، والسرية فيها توب. ما ندمت اني شريتها.', verified: true, avatarBg: 'bg-green-100', avatarText: 'text-green-700', images: [] },
    { id: 22, name: 'ماجد المهيري', initial: 'م', rating: 5, location: 'دبي، الإمارات', comment: 'خيااال، طلبت لي ولربعي، كلنا صرنا نستخدمها.', verified: true, avatarBg: 'bg-red-100', avatarText: 'text-red-700', images: [] },
    { id: 23, name: 'سعد القحطاني', initial: 'س', rating: 5, location: 'الخبر، السعودية', comment: 'والله انها تستاهل كل ريال، جودة وفكرة ذكية.', verified: true, avatarBg: 'bg-yellow-100', avatarText: 'text-yellow-700', images: [] },
    { id: 24, name: 'عمر الصالح', initial: 'ع', rating: 4, location: 'بريدة، السعودية', comment: 'ممتازة بس الشحن تأخر يوم عن الموعد، لكن المنتج يستاهل الانتظار.', verified: true, avatarBg: 'bg-orange-100', avatarText: 'text-orange-700', images: [] },
    { id: 25, name: 'طلال الرشيدي', initial: 'ط', rating: 5, location: 'الفروانية، الكويت', comment: 'ياخي وربي اختراع الموسم، انصح كل طالب فيها.', verified: true, avatarBg: 'bg-teal-100', avatarText: 'text-teal-700', images: [] },
    { id: 26, name: 'حسين الحداد', initial: 'ح', rating: 5, location: 'المحرق، البحرين', comment: 'عجيبة، حطيت فيها فلوسي والسماعة ورحت النادي، مرتاح.', verified: true, avatarBg: 'bg-cyan-100', avatarText: 'text-cyan-700', images: [] },
    { id: 27, name: 'عبدالرحمن الدوسري', initial: 'ع', rating: 5, location: 'الخرج، السعودية', comment: 'أمان يا رجل، محد يدري وش الطبخة 😂.', verified: true, avatarBg: 'bg-blue-100', avatarText: 'text-blue-700', images: [] },
    { id: 28, name: 'منصور العلي', initial: 'م', rating: 5, location: 'الدوحة، قطر', comment: 'الكواليتي عالي جداً، بلاستيك قوي وما يطلع ريحة.', verified: true, avatarBg: 'bg-purple-100', avatarText: 'text-purple-700', images: [] },
    { id: 29, name: 'زايد المنصوري', initial: 'ز', rating: 5, location: 'أبو ظبي، الإمارات', comment: 'رهيبة، حتى شكلها كأنها ماركة غالية.', verified: true, avatarBg: 'bg-pink-100', avatarText: 'text-pink-700', images: [] },
    { id: 30, name: 'فيصل المطرفي', initial: 'ف', rating: 5, location: 'مكة، السعودية', comment: 'ياخي فكت أزمة والله، صرت ادخل الجوال المدرسة وانا حاط رجل على رجل.', verified: true, avatarBg: 'bg-green-100', avatarText: 'text-green-700', images: [] },
    { id: 31, name: 'سيف النعيمي', initial: 'س', rating: 5, location: 'عجمان، الإمارات', comment: 'شي مرتب ومتعوب عليه، التغليف يفتح النفس.', verified: true, avatarBg: 'bg-indigo-100', avatarText: 'text-indigo-700', images: [] },
    { id: 32, name: 'مبارك العازمي', initial: 'م', rating: 5, location: 'الصباحية، الكويت', comment: 'لا تطوفكم يا شباب، العرض بو حبتين يسوى.', verified: true, avatarBg: 'bg-red-100', avatarText: 'text-red-700', images: [] },
    { id: 33, name: 'ياسر الحربي', initial: 'ي', rating: 5, location: 'المدينة، السعودية', comment: 'الحمدلله وصلت سليمة، شكلها أحلى من الصور.', verified: true, avatarBg: 'bg-yellow-100', avatarText: 'text-yellow-700', images: [] },
    { id: 34, name: 'إبراهيم الفهيد', initial: 'إ', rating: 5, location: 'عنيزة، السعودية', comment: 'فكرة جبارة، تصلح هدية بعد.', verified: true, avatarBg: 'bg-blue-100', avatarText: 'text-blue-700', images: [] },
    { id: 35, name: 'عبدالعزيز الكعبي', initial: 'ع', rating: 5, location: 'الدوحة، قطر', comment: 'وايد عملية، صرت استغني عن الشنطة الصغيرة.', verified: true, avatarBg: 'bg-green-100', avatarText: 'text-green-700', images: [] },
    { id: 36, name: 'حسن البناي', initial: 'ح', rating: 5, location: 'مدينة الكويت، الكويت', comment: 'شغل عدل، ما تسرب ولا قطرة ماي على التلفون.', verified: true, avatarBg: 'bg-purple-100', avatarText: 'text-purple-700', images: [] },
    { id: 37, name: 'سعود المالكي', initial: 'س', rating: 5, location: 'الطائف، السعودية', comment: 'ياخي شكراً لكم، منتج يبيض الوجه.', verified: true, avatarBg: 'bg-orange-100', avatarText: 'text-orange-700', images: [] },
    { id: 38, name: 'مازن الغامدي', initial: 'م', rating: 5, location: 'الباحة، السعودية', comment: 'ممتازة جداً، انصح فيها وبشدة.', verified: true, avatarBg: 'bg-teal-100', avatarText: 'text-teal-700', images: [] },
    { id: 39, name: 'راكان الشمري', initial: 'ر', rating: 5, location: 'حائل، السعودية', comment: 'والله يا هي تفك أزمات، خصوصاً وقت الاختبارات.', verified: true, avatarBg: 'bg-red-100', avatarText: 'text-red-700', images: [] },
    { id: 40, name: 'فهد المزروعي', initial: 'ف', rating: 5, location: 'رأس الخيمة، الإمارات', comment: 'جودة عالية وسعر مناسب، شكراً نوريفا.', verified: true, avatarBg: 'bg-blue-100', avatarText: 'text-blue-700', images: [] },
    { id: 41, name: 'علي الزهراني', initial: 'ع', rating: 5, location: 'الدمام، السعودية', comment: 'شريتها لولدي للمدرسة، والحمدلله مبسوط فيها.', verified: true, avatarBg: 'bg-green-100', avatarText: 'text-green-700', images: [] },
    { id: 42, name: 'محمد الفرج', initial: 'م', rating: 4, location: 'القطيف، السعودية', comment: 'حلوة بس ياليت فيه ألوان فسفورية.', verified: true, avatarBg: 'bg-yellow-100', avatarText: 'text-yellow-700', images: [] },
    { id: 43, name: 'نايف العتيبي', initial: 'ن', rating: 5, location: 'الدوادمي، السعودية', comment: 'ياخي انتو مبدعين، وش هالاختراع الرهيب.', verified: true, avatarBg: 'bg-purple-100', avatarText: 'text-purple-700', images: [] },
    { id: 44, name: 'حمد المري', initial: 'ح', rating: 5, location: 'الريان، قطر', comment: 'بيض الله وجيهكم، منتج أصلي.', verified: true, avatarBg: 'bg-indigo-100', avatarText: 'text-indigo-700', images: [] },
    { id: 45, name: 'سالم الدوسري', initial: 'س', rating: 5, location: 'الخبر، السعودية', comment: 'سريعة التوصيل ومضمونة.', verified: true, avatarBg: 'bg-pink-100', avatarText: 'text-pink-700', images: [] },
    { id: 46, name: 'مشعل العنزي', initial: 'م', rating: 5, location: 'عرعر، السعودية', comment: 'ياخي راحة، تحط اغراضك وتنسى.', verified: true, avatarBg: 'bg-cyan-100', avatarText: 'text-cyan-700', images: [] },
    { id: 47, name: 'عبدالله السالم', initial: 'ع', rating: 5, location: 'الكويت', comment: 'تمام التمام، انصح فيها.', verified: true, avatarBg: 'bg-red-100', avatarText: 'text-red-700', images: [] },
    { id: 48, name: 'يوسف الهزاع', initial: 'ي', rating: 5, location: 'الرفاع، البحرين', comment: 'قوية وتتحمل، طاحت مني كذا مرة ولا صار فيها شي.', verified: true, avatarBg: 'bg-green-100', avatarText: 'text-green-700', images: [] },
    { id: 49, name: 'تركي آل الشيخ', initial: 'ت', rating: 5, location: 'الرياض، السعودية', comment: 'فنانه، شكل ومضمون.', verified: true, avatarBg: 'bg-blue-100', avatarText: 'text-blue-700', images: [] },
    { id: 50, name: 'عمر باحسين', initial: 'ع', rating: 5, location: 'جدة، السعودية', comment: 'والله انها تستاهل، ريحتني كثير.', verified: true, avatarBg: 'bg-yellow-100', avatarText: 'text-yellow-700', images: [] },
    { id: 51, name: 'خالد السويدي', initial: 'خ', rating: 5, location: 'الشارقة، الإمارات', comment: 'ممتازة للمدرسة والرحلات.', verified: true, avatarBg: 'bg-orange-100', avatarText: 'text-orange-700', images: [] },
    { id: 52, name: 'فيصل القحطاني', initial: 'ف', rating: 5, location: 'خميس مشيط، السعودية', comment: 'عز الله انكم فكيتوا أزمة.', verified: true, avatarBg: 'bg-purple-100', avatarText: 'text-purple-700', images: [] },
    { id: 53, name: 'محمد الشيباني', initial: 'م', rating: 5, location: 'الوكرة، قطر', comment: 'روعة، انصح كل طالب فيها.', verified: true, avatarBg: 'bg-teal-100', avatarText: 'text-teal-700', images: [] },
    { id: 54, name: 'سلطان المطيري', initial: 'س', rating: 5, location: 'المجمعة، السعودية', comment: 'شي فاخر من الآخر.', verified: true, avatarBg: 'bg-red-100', avatarText: 'text-red-700', images: [] },
    { id: 55, name: 'عبدالاله الحربي', initial: 'ع', rating: 5, location: 'ينبع، السعودية', comment: 'توصيل سريع وتعامل راقي.', verified: true, avatarBg: 'bg-blue-100', avatarText: 'text-blue-700', images: [] },
    { id: 56, name: 'نواف العلي', initial: 'ن', rating: 5, location: 'حولي، الكويت', comment: 'ياخي خيالية، ما اصدق كيف تشيل كل شي.', verified: true, avatarBg: 'bg-green-100', avatarText: 'text-green-700', images: [] },
    { id: 57, name: 'بدر العتيبي', initial: 'ب', rating: 5, location: 'الطائف، السعودية', comment: '100% انصح فيها.', verified: true, avatarBg: 'bg-yellow-100', avatarText: 'text-yellow-700', images: [] },
    { id: 58, name: 'راشد الكتبي', initial: 'ر', rating: 5, location: 'العين، الإمارات', comment: 'ما عليها كلام، ممتازة.', verified: true, avatarBg: 'bg-indigo-100', avatarText: 'text-indigo-700', images: [] },
    { id: 59, name: 'سعيد الزهراني', initial: 'س', rating: 5, location: 'جدة، السعودية', comment: 'افضل شي شريته للمدرسة.', verified: true, avatarBg: 'bg-purple-100', avatarText: 'text-purple-700', images: [] },
    { id: 60, name: 'حمدان الشامسي', initial: 'ح', rating: 5, location: 'أبو ظبي، الإمارات', comment: 'ترتيب، اغراضك في امان.', verified: true, avatarBg: 'bg-pink-100', avatarText: 'text-pink-700', images: [] },
    { id: 61, name: 'مشاري السبيعي', initial: 'م', rating: 5, location: 'رنية، السعودية', comment: 'والله انها كفو.', verified: true, avatarBg: 'bg-cyan-100', avatarText: 'text-cyan-700', images: [] },
    { id: 62, name: 'عبدالله الرويلي', initial: 'ع', rating: 5, location: 'سكاكا، السعودية', comment: 'ممتازة جداً.', verified: true, avatarBg: 'bg-blue-100', avatarText: 'text-blue-700', images: [] },
    { id: 63, name: 'ياسين المري', initial: 'ي', rating: 5, location: 'الدوحة، قطر', comment: 'خدمة ممتازة ومنتج رائع.', verified: true, avatarBg: 'bg-green-100', avatarText: 'text-green-700', images: [] },
    { id: 64, name: 'فواز الشمري', initial: 'ف', rating: 5, location: 'رفحاء، السعودية', comment: 'ياخي شكراً، منتج يحل مشكلة كبيرة.', verified: true, avatarBg: 'bg-red-100', avatarText: 'text-red-700', images: [] },
    { id: 65, name: 'ناصر الدوسري', initial: 'ن', rating: 5, location: 'وادي الدواسر، السعودية', comment: 'حلوة وعملية.', verified: true, avatarBg: 'bg-yellow-100', avatarText: 'text-yellow-700', images: [] },
    { id: 66, name: 'خالد البلوشي', initial: 'خ', rating: 5, location: 'صحار، عمان', comment: 'زينة وايد، انصح فيها الشباب.', verified: true, avatarBg: 'bg-purple-100', avatarText: 'text-purple-700', images: [] },
    { id: 67, name: 'سلطان القاسمي', initial: 'س', rating: 5, location: 'الشارقة، الإمارات', comment: 'فكرة ولا اروع.', verified: true, avatarBg: 'bg-teal-100', avatarText: 'text-teal-700', images: [] },
    { id: 68, name: 'محمد العنزي', initial: 'م', rating: 5, location: 'تيماء، السعودية', comment: 'جودة عالية.', verified: true, avatarBg: 'bg-orange-100', avatarText: 'text-orange-700', images: [] },
    { id: 69, name: 'عبدالرحمن العلي', initial: 'ع', rating: 5, location: 'الرياض، السعودية', comment: 'ما ندمت، تستاهل.', verified: true, avatarBg: 'bg-blue-100', avatarText: 'text-blue-700', images: [] },
    { id: 70, name: 'فهد السالم', initial: 'ف', rating: 5, location: 'الكويت', comment: 'خوش شي والله.', verified: true, avatarBg: 'bg-green-100', avatarText: 'text-green-700', images: [] },
    { id: 71, name: 'تركي الحربي', initial: 'ت', rating: 5, location: 'جدة، السعودية', comment: 'رهيبة.', verified: true, avatarBg: 'bg-red-100', avatarText: 'text-red-700', images: [] },
    { id: 72, name: 'سعود العتيبي', initial: 'س', rating: 5, location: 'الدمام، السعودية', comment: 'انصح فيها وبقوة.', verified: true, avatarBg: 'bg-yellow-100', avatarText: 'text-yellow-700', images: [] },
    { id: 73, name: 'مشعل المطيري', initial: 'م', rating: 5, location: 'المجمعة، السعودية', comment: 'فنانة.', verified: true, avatarBg: 'bg-indigo-100', avatarText: 'text-indigo-700', images: [] },
    { id: 74, name: 'عمر الصيعري', initial: 'ع', rating: 5, location: 'شرورة، السعودية', comment: 'ممتازة.', verified: true, avatarBg: 'bg-pink-100', avatarText: 'text-pink-700', images: [] },
    { id: 75, name: 'يوسف العبدالله', initial: 'ي', rating: 5, location: 'المنامة، البحرين', comment: 'عجيبة حدها.', verified: true, avatarBg: 'bg-cyan-100', avatarText: 'text-cyan-700', images: [] },
    { id: 76, name: 'حمد الكواري', initial: 'ح', rating: 5, location: 'الدوحة، قطر', comment: 'تسوى سعرها.', verified: true, avatarBg: 'bg-blue-100', avatarText: 'text-blue-700', images: [] },
    { id: 77, name: 'عبدالله الشحي', initial: 'ع', rating: 5, location: 'رأس الخيمة، الإمارات', comment: 'ما عليها كلام.', verified: true, avatarBg: 'bg-green-100', avatarText: 'text-green-700', images: [] },
    { id: 78, name: 'ناصر القحطاني', initial: 'ن', rating: 5, location: 'أبها، السعودية', comment: 'بيض الله وجيهكم.', verified: true, avatarBg: 'bg-red-100', avatarText: 'text-red-700', images: [] },
    { id: 79, name: 'فارس العازمي', initial: 'ف', rating: 5, location: 'الكويت', comment: 'قوية.', verified: true, avatarBg: 'bg-yellow-100', avatarText: 'text-yellow-700', images: [] },
    { id: 80, name: 'خالد المطيري', initial: 'خ', rating: 5, location: 'حفر الباطن، السعودية', comment: 'ممتازة جداً.', verified: true, avatarBg: 'bg-purple-100', avatarText: 'text-purple-700', images: [] },
    { id: 81, name: 'سلطان الشهري', initial: 'س', rating: 5, location: 'النماص، السعودية', comment: 'رائعة.', verified: true, avatarBg: 'bg-teal-100', avatarText: 'text-teal-700', images: [] },
    { id: 82, name: 'محمد الدوسري', initial: 'م', rating: 5, location: 'الخرج، السعودية', comment: 'انصح فيها.', verified: true, avatarBg: 'bg-orange-100', avatarText: 'text-orange-700', images: [] },
    { id: 83, name: 'عبدالرحمن الغامدي', initial: 'ع', rating: 5, location: 'الباحة، السعودية', comment: 'خيااال.', verified: true, avatarBg: 'bg-blue-100', avatarText: 'text-blue-700', images: [] }
  ];

  visibleCount = signal(9);
  displayedReviews = computed(() => this.reviews.slice(0, this.visibleCount()));

  hasMoreReviews() {
    return this.visibleCount() < this.reviews.length;
  }

  loadMore() {
    this.visibleCount.update(c => Math.min(c + 12, this.reviews.length));
  }
}
