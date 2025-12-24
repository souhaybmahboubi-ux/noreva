
import { Component, signal } from '@angular/core';
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
          <h2 class="text-3xl font-black text-gray-900 mb-2">التقييمات (83)</h2>
          <div class="flex items-center gap-2">
             <div class="flex text-gold-500 text-xl">★★★★★</div>
             <span class="text-gray-500 font-bold">4.9 من 5</span>
          </div>
        </div>
      </div>

      <!-- Reviews Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (review of displayedReviews(); track review.id) {
          <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
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
    { 
      id: 1, 
      name: 'حمود القحطاني', 
      initial: 'ح', 
      rating: 5, 
      location: 'الرياض، السعودية', 
      comment: 'يا عيال والله تفك أزمة! الوكيل مر سوانا تفتيش فجأة، حطيت الجوال والايربودز داخل القارورة وحطيتها عالاولة ولا شك فيني 😂🔥.', 
      verified: true, 
      avatarBg: 'bg-blue-100', 
      avatarText: 'text-blue-700',
      images: []
    },
    { 
      id: 2, 
      name: 'عزوز المطيري', 
      initial: 'ع', 
      rating: 5, 
      location: 'الجهراء، الكويت', 
      comment: 'من صجكم؟ خاش فيها التلفون والأغراض والوضع طيب، المدرسين عبالهم بس ماي 😂. انصح فيها وبقوة حق المدرسة.', 
      verified: true, 
      avatarBg: 'bg-green-100', 
      avatarText: 'text-green-700',
      images: [] 
    },
    { 
      id: 3, 
      name: 'سلوم الكواري', 
      initial: 'س', 
      rating: 5, 
      location: 'الدوحة، قطر', 
      comment: 'أقوى اختراع للمدرسة. قبل كل يوم ينسحب جوالي، الحين محد يدري وين خاشه. الشكل بريء محد يشك.', 
      verified: true, 
      avatarBg: 'bg-red-100', 
      avatarText: 'text-red-700',
      images: []
    },
    { 
      id: 4, 
      name: 'راشد المري', 
      initial: 'ر', 
      rating: 5, 
      location: 'دبي، الإمارات', 
      comment: 'دخيل الله شو قوية، حاط فيها السماعات والبطاقة، والمشرف يمر ولا هو داري. شكلها كشخة ومحد يتوقع.', 
      verified: true, 
      avatarBg: 'bg-purple-100', 
      avatarText: 'text-purple-700',
      images: []
    },
    { id: 5, name: 'فهد الشمري', initial: 'ف', rating: 5, location: 'حائل، السعودية', comment: 'الصدق كنت خايف تكشفني الادارة بس والله عدت سلامات. المخبا وسيع يشيل ايفون برو ماكس بالراحة.', verified: true, avatarBg: 'bg-yellow-100', avatarText: 'text-yellow-700', images: [] },
    { id: 6, name: 'مشاري العازمي', initial: 'م', rating: 5, location: 'السالمية، الكويت', comment: 'شنو هالاختراع الناري! مريحتني من عوار الراس مع الادارة، اغراضي كلها داخل ومحد يكلمني.', verified: true, avatarBg: 'bg-indigo-100', avatarText: 'text-indigo-700', images: [] },
    { id: 7, name: 'سعيد العامري', initial: 'س', rating: 5, location: 'العين، الإمارات', comment: 'والله انها فنانه، حاط فيها مصروف الاسبوع والجوال، المدرس يطالع فيها يحسبها مطارة عادية 😂.', verified: true, avatarBg: 'bg-orange-100', avatarText: 'text-orange-700', images: [] },
    { id: 8, name: 'تركي العتيبي', initial: 'ت', rating: 5, location: 'جدة، السعودية', comment: 'يا رجل فكتني من تعهد، الموجه دخل الفصل وانا حاط السماعات داخلها، ولا درى عن شي.', verified: true, avatarBg: 'bg-teal-100', avatarText: 'text-teal-700', images: [] },
    { id: 9, name: 'أحمد البلوشي', initial: 'أ', rating: 4, location: 'مسقط، عمان', comment: 'ممتازة حال المدرسة، اشيل فيها تلفوني وما حد يكشفني. بس زين لو تسوون الوان اكثر.', verified: true, avatarBg: 'bg-rose-100', avatarText: 'text-rose-700', images: [] },
    { id: 10, name: 'خليفة الدوسري', initial: 'خ', rating: 5, location: 'الدمام، السعودية', comment: 'الطلاب كلهم يسألوني من وين، صارت ترند عندنا بالمدرسة. اهم شي الوكيل مو عارف السالفة 😂.', verified: true, avatarBg: 'bg-cyan-100', avatarText: 'text-cyan-700', images: [] },
    { id: 11, name: 'جاسم الكندري', initial: 'ج', rating: 5, location: 'حولي، الكويت', comment: 'قوية قوية، خاش فيها الايربودز طول الحصة والوضع سهالات. شكرا نوريفا انقذتونا.', verified: true, avatarBg: 'bg-emerald-100', avatarText: 'text-emerald-700', images: [] },
    { id: 12, name: 'حمدان الفلاسي', initial: 'ح', rating: 5, location: 'الشارقة، الإمارات', comment: 'ما استغني عنها، كل ممنوعات المدرسة داخلها ومحد يدري. وجودتها ممتازة تتحمل الطيحات.', verified: true, avatarBg: 'bg-slate-100', avatarText: 'text-slate-700', images: [] },
  ];

  visibleCount = signal(6);
  
  displayedReviews = signal(this.reviews.slice(0, 6));

  hasMoreReviews() {
    return this.visibleCount() < this.reviews.length;
  }

  loadMore() {
    this.visibleCount.update(c => Math.min(c + 12, this.reviews.length));
    this.displayedReviews.set(this.reviews.slice(0, this.visibleCount()));
  }
}
