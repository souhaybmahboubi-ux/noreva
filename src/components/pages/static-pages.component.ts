import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="container mx-auto px-6 pt-44 pb-32 max-w-3xl" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
      <h1 class="text-4xl font-black font-serif mb-8 text-gray-900 leading-tight">
        {{ langService.currentLang() === 'ar' ? 'نوريڤا™: رحلة الابتكار والجمال' : 'Noreva™: An Innovative Beauty Journey' }}
      </h1>
      <div class="space-y-8 text-gray-600 leading-relaxed">
        <p class="text-lg text-gray-900">
          {{ langService.currentLang() === 'ar' 
            ? 'تأسست نوريڤا™ برؤية واحدة: توفير حلول تكنولوجية ذكية تغني النساء عن استهلاك الوقت المفرط في روتين الجمال اليومي وتمنحهن مظهراً طبيعياً وجذاباً بكل سهولة.' 
            : 'Noreva™ was founded with a single vision: to provide smart technological solutions that free women from excessive time consumption in their daily beauty routines, giving them a natural and attractive look with ease.' }}
        </p>

        <section>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? 'العلم خلف الجمال' : 'The science behind the beauty' }}</h3>
            <p>
              {{ langService.currentLang() === 'ar' 
                ? 'تقنيتنا تعتمد على "المغناطيس المجهري الثنائي" المدمج بدقة متناهية في قاعدة الرموش. هذه التقنية تضمن ثباتاً فائقاً يتحدى الظروف اليومية، مع الحفاظ على مرونة كاملة تسمح للرموش باتخاذ شكل جفنكِ الطبيعي تماماً.' 
                : 'Our technology is based on "Dual Micro-Magnets" precision-embedded at the base of the lashes. This technology ensures a superior grip that defies daily conditions, while maintaining full flexibility that allows the lashes to contour perfectly to your natural eyelid.' }}
            </p>
        </section>
        
        <div class="grid md:grid-cols-2 gap-8 mt-12 mb-16">
            <div class="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 class="text-lg font-medium text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? 'تصميم مغناطيسي مبتكر' : 'Innovative Magnetic Design' }}</h3>
                <p class="text-sm opacity-80">
                  {{ langService.currentLang() === 'ar' 
                    ? 'تصميم سهل الارتداء بدون صمغ، يتميز بهيكل متكامل بسيط ومريح يوفر وقتكِ وجهدكِ.' 
                    : 'Glue-free design that is easy to wear, featuring a simple and convenient integrated structure that saves your time and effort.' }}
                </p>
            </div>
            <div class="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 class="text-lg font-medium text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? 'جودة وراحة فائقة' : 'Premium Quality & Comfort' }}</h3>
                <p class="text-sm opacity-80">
                  {{ langService.currentLang() === 'ar' 
                    ? 'مصنوعة من مغناطيسات مرنة عالية الجودة ومواد شعر محاكية، خفيفة الوزن وتناسب جميع أشكال العيون لمظهر طبيعي وكثيف.' 
                    : 'Made of high-quality flexible magnets and simulated hair material, lightweight and suitable for all eye shapes for a natural and thick effect.' }}
                </p>
            </div>
        </div>

        <section class="bg-gray-100 p-8 rounded-2xl">
            <h3 class="text-2xl font-bold text-black mb-6">{{ langService.currentLang() === 'ar' ? 'المواصفات الفنية' : 'Technical Specifications' }}</h3>
            <div class="space-y-4 text-black">
                <div class="flex flex-col md:flex-row md:justify-between border-b border-gray-300 pb-4 gap-2">
                    <span class="opacity-70 text-sm">{{ langService.currentLang() === 'ar' ? 'مدة الصلاحية' : 'Shelf Life' }}</span>
                    <span class="text-base font-bold">{{ langService.currentLang() === 'ar' ? '3 سنوات من تاريخ الإنتاج' : '3 Years from Production Date' }}</span>
                </div>
                <div class="flex flex-col md:flex-row md:justify-between border-b border-gray-300 pb-4 gap-2">
                    <span class="opacity-70 text-sm">{{ langService.currentLang() === 'ar' ? 'المادة الخام' : 'Primary Material' }}</span>
                    <span class="text-base font-bold">{{ langService.currentLang() === 'ar' ? 'ألياف صناعية مجهرية فاخرة PBT' : 'Premium PBT Synthetic Micro-Fiber' }}</span>
                </div>
            </div>
        </section>
      </div>
    </div>
  `
})
export class AboutComponent {
  langService = inject(LanguageService);
}

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="container mx-auto px-6 pt-44 pb-32 max-w-3xl" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
      <h1 class="text-4xl font-black font-serif mb-6 text-gray-900 leading-tight">
        {{ langService.currentLang() === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy' }}
      </h1>
      <p class="text-sm text-gray-500 mb-12">Last Updated: January 2026</p>
      
      <div class="space-y-12 text-gray-700 leading-relaxed">
        <section>
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '1. الالتزام بالخصوصية' : '1. Our Commitment' }}</h2>
          <p>
            {{ langService.currentLang() === 'ar' 
              ? 'في نوريڤا™، نعتبر خصوصية زوارنا وعملائنا أولوية قصوى. تلتزم هذه السياسة بتوضيح كيفية جمع ومعالجة وحماية بياناتكم الشخصية وفقاً لأعلى المعايير القانونية الدولية، بما في ذلك اللائحة العامة لحماية البيانات (GDPR).' 
              : 'At Noreva™, your privacy is our highest priority. This policy outlines our commitment to collecting, processing, and protecting your personal data in accordance with international legal standards, including GDPR.' }}
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '2. المعلومات التي نجمعها' : '2. Information We Collect' }}</h2>
          <div class="space-y-4">
            <p>
              {{ langService.currentLang() === 'ar' 
                ? 'نقوم بجمع فئات مختلفة من المعلومات لتقديم خدمة أفضل:' 
                : 'We collect various categories of information to provide a superior service:' }}
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
              <li>{{ langService.currentLang() === 'ar' ? 'معلومات الهوية: الاسم، اللقب، وتاريخ الميلاد.' : 'Identity Data: Name, surname, and date of birth.' }}</li>
              <li>{{ langService.currentLang() === 'ar' ? 'معلومات التواصل: البريد الإلكتروني، رقم الهاتف، وعنوان الشحن.' : 'Contact Data: Email address, phone number, and shipping address.' }}</li>
              <li>{{ langService.currentLang() === 'ar' ? 'المعلومات التقنية: عنوان IP، نوع المتصفح، وإعدادات المنطقة.' : 'Technical Data: IP address, browser type, and region settings.' }}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '3. كيف نستخدم بياناتكم' : '3. Usage of Information' }}</h2>
          <p>
            {{ langService.currentLang() === 'ar' 
              ? 'نستخدم البيانات لمعالجة طلباتكم، وإرسال تحديثات تتبع الشحنات، وتحسين تجربة التسوق الخاصة بكم. كما نستخدمها للتواصل معكم بخصوص العروض الحصرية (فقط إذا اخترتم الاشتراك في القائمة البريدية).' 
              : 'We use your data to process orders, send shipping updates, and enhance your shopping experience. We also use it to communicate exclusive offers (only if you opt-in to our newsletter).' }}
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '4. حماية البيانات وأمن المدفوعات' : '4. Security & Payments' }}</h2>
          <p>
            {{ langService.currentLang() === 'ar' 
              ? 'تتم معالجة جميع المدفوعات عبر بوابات دفع مشفرة (SSL). نوريڤا™ لا تطلع ولا تخزن تفاصيل بطاقاتكم الائتمانية. نحن نطبق تدابير أمنية تقنية وتنظيمية صارمة لمنع الوصول غير المصرح به إلى بياناتكم الشخصية.' 
              : 'All payments are processed through encrypted (SSL) gateways. Noreva™ does not see or store your credit card details. We implement rigorous technical and organizational security measures to prevent unauthorized access to your personal information.' }}
          </p>
        </section>

        <section class="bg-gray-50 p-8 rounded-2xl border border-gray-100">
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '5. حقوقكم القانونية' : '5. Your Rights' }}</h2>
          <p>
            {{ langService.currentLang() === 'ar' 
              ? 'بموجب قوانين حماية البيانات، لديكم الحق في طلب الوصول إلى بياناتكم الشخصية، أو تصحيحها، أو حذفها، أو تقييد معالجتها. لممارسة هذه الحقوق، يرجى التواصل معنا عبر البريد الإلكتروني المعتمد.' 
              : 'Under data protection laws, you have the right to access, correct, delete, or restrict the processing of your personal data. To exercise these rights, please contact us via our official support email.' }}
          </p>
        </section>
      </div>
    </div>
  `
})
export class PrivacyComponent {
  langService = inject(LanguageService);
}

@Component({
  selector: 'app-shipping-policy',
  standalone: true,
  template: `
    <div class="container mx-auto px-6 pt-44 pb-32 max-w-3xl" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
      <h1 class="text-4xl font-black font-serif mb-6 text-gray-900 leading-tight">
        {{ langService.currentLang() === 'ar' ? 'التسليم والشحن' : 'Shipping & Delivery' }}
      </h1>
      <p class="text-sm text-gray-500 uppercase tracking-widest mb-12">
        {{ langService.currentLang() === 'ar' ? 'جمالكِ يصلكِ أينما كنتِ' : 'Beauty delivered with care' }}
      </p>

      <div class="grid md:grid-cols-2 gap-8 mb-16">
          <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span class="opacity-50 text-2xl">🌍</span>
                  {{ langService.currentLang() === 'ar' ? 'الوجهات' : 'Destinations' }}
              </h3>
              <ul class="space-y-3 text-base text-gray-600">
                  <li class="flex items-center gap-3">🇸🇦 {{ langService.currentLang() === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia' }}</li>
                  <li class="flex items-center gap-3">🇦🇪 {{ langService.currentLang() === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates' }}</li>
                  <li class="flex items-center gap-3">🇰🇼 {{ langService.currentLang() === 'ar' ? 'الكويت' : 'Kuwait' }}</li>
                  <li class="flex items-center gap-3">🇧🇭 {{ langService.currentLang() === 'ar' ? 'البحرين' : 'Bahrain' }}</li>
              </ul>
              <div class="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                  <span>{{ langService.currentLang() === 'ar' ? 'مركز التوزيع' : 'Distributed By' }}</span>
                  <span class="text-gray-900 font-bold">Noreva™ Global</span>
              </div>
          </div>
          
          <div class="bg-gray-100 p-8 rounded-2xl text-black shadow-none flex flex-col justify-center">
              <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
                  <span class="opacity-50">⚡</span>
                  {{ langService.currentLang() === 'ar' ? 'سرعة التوصيل' : 'Delivery Window' }}
              </h3>
              <p class="text-sm text-gray-600 mb-8 leading-relaxed">
                {{ langService.currentLang() === 'ar' 
                  ? 'يتم شحن طلباتكم من مراكز توزيعنا العالمية لضمان الجودة الفائقة وسرعة التوصيل' 
                  : 'Orders are dispatched from our global centers to ensure quality control and expedited handling.' }}
              </p>
              <div class="text-2xl font-bold border-l-4 border-black pl-6 py-2">
                  4 - 12 <span class="text-xs uppercase tracking-widest opacity-40 block mt-1 font-normal">{{ langService.currentLang() === 'ar' ? 'أيام عمل' : 'Business Days' }}</span>
              </div>
          </div>
      </div>
    </div>
  `
})
export class ShippingComponent {
  langService = inject(LanguageService);
}

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <div class="container mx-auto px-6 pt-44 pb-32 max-w-3xl" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
      <h1 class="text-4xl font-black font-serif mb-6 text-gray-900 leading-tight">
        {{ langService.currentLang() === 'ar' ? 'شروط الخدمة' : 'Terms of Service' }}
      </h1>
      <p class="text-sm text-gray-500 mb-12">Effective: January 2026</p>

      <div class="space-y-12 text-gray-700 leading-relaxed">
        <section>
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '1. قبول الشروط' : '1. Acceptance' }}</h2>
          <p>
            {{ langService.currentLang() === 'ar' 
              ? 'بدخولك واستخدامك لموقع نوريڤا™، فإنك توافق على الالتزام بشروط الخدمة هذه وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استكمال استخدام الموقع.' 
              : 'By accessing and using the Noreva™ website, you agree to be bound by these Terms of Service. If you do not agree with any of these terms, please discontinue your use of the site.' }}
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '2. المشتريات والمدفوعات' : '2. Purchases' }}</h2>
          <p>
            {{ langService.currentLang() === 'ar' 
              ? 'عند تقديم طلب، فإنك تتعهد بأن جميع المعلومات المقدمة دقيقة وكاملة. نحن نقبل وسائل الدفع المعتمدة (Visa, Mastercard, Apple Pay). نوريڤا بالحق في رفض أي طلب أو إلغائه في حال وجود أخطاء في التسعير أو اشتباه في نشاط غير قانوني.' 
              : 'When placing an order, you represent that all information provided is accurate. We accept authorized payment methods (Visa, Mastercard, Apple Pay). Noreva reserves the right to cancel orders in case of pricing errors or suspected fraud.' }}
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '3. سياسة الاسترجاع والصحة' : '3. Hygiene Policy' }}</h2>
          <p>
            {{ langService.currentLang() === 'ar' 
              ? 'نظراً للطبيعة الحساسة لمنتجاتنا (الرموش)، ولاسباب صحية صارمة، لا نقبل استرجاع أو استبدال أي منتج تم فتح غلافه أو استخدامه. يُسمح بالاسترجاع فقط للمنتجات المعيبة مسبقاً، بشرط الإبلاغ عن ذلك خلال 48 ساعة من الاستلام.' 
              : 'Due to the intimate nature of our products and strict hygiene standards, we do not accept returns on opened or used items. Returns are only permitted for pre-existing defects reported within 48 hours of delivery.' }}
          </p>
        </section>

        <section class="bg-gray-50 p-8 rounded-2xl">
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '4. القانون الحاكم' : '4. Governing Law' }}</h2>
          <p class="text-gray-600">
            {{ langService.currentLang() === 'ar' 
              ? 'تخضع هذه الشروط للقوانين الدولية المعترف بها. أي نزاع ينشأ عن استخدام هذا الموقع يخضع للاختصاص الحصري للمحاكم في الدول التي نقدم فيها خدماتنا.' 
              : 'These terms are governed by recognized international laws. Any disputes arising from the use of this site are subject to the exclusive jurisdiction of the courts in our service regions.' }}
          </p>
        </section>
      </div>
    </div>
  `
})
export class TermsComponent {
  langService = inject(LanguageService);
}

@Component({
  selector: 'app-help',
  standalone: true,
  template: `
    <div class="container mx-auto px-6 pt-44 pb-32 max-w-3xl" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
      <h1 class="text-4xl font-black font-serif mb-6 text-gray-900 leading-tight">
        {{ langService.currentLang() === 'ar' ? 'مركز المساعدة' : 'Help Center' }}
      </h1>
      <p class="text-sm text-gray-500 mb-12">
        {{ langService.currentLang() === 'ar' ? 'كل ما تحتاجين معرفته' : 'Commonly asked questions' }}
      </p>

      <div class="space-y-4">
        <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100">
          <h3 class="text-lg font-bold text-gray-900 mb-2">
            {{ langService.currentLang() === 'ar' ? 'كيف تعمل الرموش المغناطيسية؟' : 'How does it work?' }}
          </h3>
          <p class="text-base text-gray-600 leading-relaxed">
            {{ langService.currentLang() === 'ar' 
              ? 'تستخدم رموش نوريڤا™ تقنية "المغناطيس المجهري الثنائي". يتم وضع طبقتين من الرموش لتلتصق ببعضها البعض مغناطيسياً، مما يغنيك تماماً عن استخدام الصمغ.' 
              : 'Noreva™ lashes use "Dual Micro-Magnet" technology. Two layers click together magnetically, completely eliminating the need for messy glue.' }}
          </p>
        </div>

        <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100">
          <h3 class="text-lg font-bold text-gray-900 mb-2">
            {{ langService.currentLang() === 'ar' ? 'كم مرة يمكنني إعادة استخدامها؟' : 'How often can I reuse them?' }}
          </h3>
          <p class="text-base text-gray-600 leading-relaxed">
            {{ langService.currentLang() === 'ar' 
              ? 'مع العناية الصحيحة، يمكن استخدام رموش نوريڤا™ لأكثر من 200 مرة دون أن تفقد شكلها أو قوتها المغناطيسية.' 
              : 'With proper storage in their original box, our lashes can be reused over 200 times without compromising their quality.' }}
          </p>
        </div>

        <div class="bg-gray-100 p-12 rounded-2xl mt-12 text-center">
          <h3 class="text-xl font-bold mb-6 text-gray-900 cursor-default">
            {{ langService.currentLang() === 'ar' ? 'هل لديكِ أسئلة أخرى؟' : 'Still have questions?' }}
          </h3>
          <a href="mailto:contact@trynoreva.store" class="inline-block text-xs uppercase tracking-[0.2em] bg-white border border-gray-200 px-10 py-4 rounded-full hover:bg-black hover:text-white transition-all text-black font-bold">
            {{ langService.currentLang() === 'ar' ? 'تراسلي معنا' : 'Contact Support' }}
          </a>
        </div>
      </div>
    </div>
  `
})
export class HelpComponent {
  langService = inject(LanguageService);
}

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-white min-h-screen pt-32 md:pt-48 pb-20 md:pb-32 font-sans selection:bg-noreva-bone selection:text-black">
      <div class="container mx-auto px-4 md:px-6 max-w-7xl" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
        
        <!-- Header Section -->
        <div class="text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 class="text-4xl md:text-7xl font-serif text-black leading-[1.1] mb-8">
            @if (langService.currentLang() === 'ar') { نوريڤا.. سر العيون اللي تخطف الأنظار، بدون تعب ولا عذاب } @else { The Lash Revolution You’ve Been Waiting For. This is Noreva. }
          </h1>
        </div>

        <!-- Intro Text Block -->
        <div class="max-w-4xl mx-auto px-4 mb-20 md:mb-24 text-center">
            <p class="text-lg md:text-2xl text-gray-700 leading-relaxed font-medium">
              @if (langService.currentLang() === 'ar') {
                في نوريڤا، ما قدمنا مجرد رموش جديدة، إحنا حلينا كل المشاكل اللي تعانين منها مع الرموش التقليدية. ليش تتحملين الصمغ والحساسية وضياع الوقت عشان تكشخين؟ جمعنا بين التكنولوجيا الطبية والجودة العالية عشان نعطيج لوك "الإكستنشن" الفخم وانتي ببيتج، وبدون أي مجهود. اكتشفي ليش البنات اختاروا نوريڤا:
              } @else {
                We didn’t just create another eyelash brand; we solved the problems that made beauty painful. At Noreva, we believe that looking effortless shouldn’t require effort. By combining medical-grade technology with hand-crafted artistry, we have bridged the gap between salon-quality extensions and an at-home routine. Here is why thousands of girls are switching to Noreva:
              }
            </p>
        </div>

        <!-- 1. Health & Safety -->
        <div class="relative w-full bg-white shadow-2xl border border-gray-100 flex flex-col md:flex-row overflow-hidden rounded-[2rem] mb-16 md:mb-24">
           <!-- Visual Side (Video Panel) -->
           <div class="w-full md:w-1/2 bg-[#ebeae6] min-h-[400px] md:min-h-[500px] relative order-1 rounded-[2rem] overflow-hidden">
              <video 
                class="absolute inset-0 w-full h-full object-cover" 
                autoplay 
                muted 
                loop 
                playsinline>
                <source src="/assets/134df3903ce84e98ae782b4b3becff2a.mp4" type="video/mp4">
              </video>
              <div class="absolute inset-0 bg-black/5 pointer-events-none"></div>
           </div>
           <!-- Content Side -->
           <div class="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center order-2">
              <span class="text-9xl font-serif text-gray-50 font-bold leading-none absolute top-4 right-4 select-none -z-10">01</span>
              <h2 class="text-3xl md:text-4xl font-serif text-black mb-6 leading-tight">
                @if (langService.currentLang() === 'ar') { حماية طبية تنهي عذاب الرموش التقليدية } @else { Medical Grade Safety: End The Cycle Of Failed Products }
              </h2>
              <p class="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                @if (langService.currentLang() === 'ar') { 
                  تعبتي من الرموش اللي تطلع عوجة؟ أو الصمغ اللي يسبب حساسية ويحرق جلدج؟ أغلب المنتجات توعد بالسهولة بس النتيجة تكون "كارثية". في نوريڤا، ننهي دورة التعب هذي. تقنيتنا تعتمد على مغناطيس "النيوديميوم" الطبي المدمج بالباند (مستحيل ينفك)، وبدون أي "لاينر" كيميائي ممكن يسبب تهيج. طقم واحد تقدرين تستخدمينه ٢٠٠-٣٠٠ مرة، وبكل ثقة. جمال حقيقي صممناه عشان يناسبج، مو بس حق "البلوقرز".
                } @else {
                  If you’ve tried strip lashes that ended up crooked, glue that caused allergic reactions, or old magnetic lashes with liner that burned your sensitive skin—you know the heartbreak of products that promise easy but deliver disaster. Noreva is different. We use medical-grade neodymium magnets custom-molded into the lash band (impossible to come loose), removing the need for messy glues or irritating liners. One Noreva set is reusable 200-300 times and actually works. Finally, a lash solution designed for YOUR body—natural lashes that stay put and restore your confidence.
                }
              </p>
           </div>
        </div>

        <!-- 2. Money/Value -->
        <div class="relative w-full bg-white shadow-2xl border border-gray-100 flex flex-col md:flex-row overflow-hidden rounded-[2rem] mb-16 md:mb-24">
           <!-- Visual Side (Video Panel) -->
           <div class="w-full md:w-1/2 bg-[#ebeae6] min-h-[400px] md:min-h-[500px] relative order-1 rounded-[2rem] overflow-hidden">
             <video 
               class="absolute inset-0 w-full h-full object-cover" 
               autoplay 
               muted 
               loop 
               playsinline>
               <source src="/assets/2fde79da74954d39be978a6a9394c455.mp4" type="video/mp4">
             </video>
             <div class="absolute inset-0 bg-black/5 pointer-events-none"></div>
           </div>
           <!-- Content Side -->
           <div class="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center order-2">
              <span class="text-9xl font-serif text-gray-50 font-bold leading-none absolute top-4 right-4 select-none -z-10">02</span>
              <h2 class="text-3xl md:text-4xl font-serif text-black mb-6 leading-tight">
                @if (langService.currentLang() === 'ar') { لوك الإكستنشن بدون ما يضيع يومك } @else { The "Extensions Look" Without Ruining Your Morning }
              </h2>
              <p class="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                @if (langService.currentLang() === 'ar') {
                  تعرفين هذاك اللوك الفخم والجاهز لما تطلعين من الصالون؟ نوريڤا تعطيج نفس النتيجة بالضبط—رموش كثيفة، سواد فاحم، وبمكانها الصح—في أقل من دقيقة قدام منظرة بيتج. وداعاً لمواعيد الصالونات اللي تآخذ ساعات من يومج، ودفع مبالغ خيالية كل أسبوعين عشان "الري-فيل". ليش تدفعين مئات الدراهم والريالات وتضيعين وقتج بمواد كيميائية؟ نوريڤا هي الاستثمار الصح لجمالج وراحتج. طقم واحد يغنيج عن مئات الموديلات التقليدية اللي ما تضبط.
                } @else {
                  You know that gorgeous, put-together look you get walking out of the salon? Noreva gives you that exact same result—full, dark, perfectly positioned lashes—in 60 seconds at your bathroom mirror. No 2-hour appointments eating up your weekend. No paying $200 and half your day. The salon-quality look that used to cost you hundreds now takes less time than your morning coffee. That’s the power of Noreva—luxury that actually respects your time and budget.
                }
              </p>
           </div>
        </div>

        <!-- 3. Time/Tool (GIF) -->
        <div class="relative w-full bg-white shadow-2xl border border-gray-100 flex flex-col md:flex-row overflow-hidden rounded-[2rem] mb-16 md:mb-24">
           <!-- Content Side -->
            <div class="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center order-2 md:order-1">
              <span class="text-9xl font-serif text-gray-50 font-bold leading-none absolute top-4 left-4 select-none -z-10">03</span>
              <h2 class="text-3xl md:text-4xl font-serif text-black mb-6 leading-tight">
                @if (langService.currentLang() === 'ar') { جاهزة في أقل من ٣٠ ثانية } @else { Ready in Under 30 Seconds }
              </h2>
              <p class="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                 @if (langService.currentLang() === 'ar') {
                   ندري إن وقتج ضيق، وما عندج ٤٠ دقيقة تضيعينها وانتي تحاولين تضبطين الرموش وتتلطخين بالصمغ. الحل عندنا في أداة التركيب الذكية اللي تضبط الرموش في أقل من ٣٠ ثانية وبكل سهولة. والجميل؟ تشيلينها في "رمشة عين" بدون أي ألم أو شد. رفعة وحدة، كبسة وحدة، وتكونين جاهزة.
                 } @else {
                   We know you are busy, and you don’t have 40 minutes to fight with glue or 2 hours to lie still in a salon. Our proprietary spring-loaded applicator does the work for you in less than 30 seconds. And the best part? They are removed in a blink without any tugging or irritation. It turns a frustrating morning struggle into a satisfying, flawless ritual.
                 }
              </p>
            </div>
            <!-- Visual Side (Dual GIFs) -->
            <div class="w-full md:w-1/2 bg-[#f5f5f5] min-h-[400px] md:min-h-[500px] grid grid-cols-2 gap-3 p-4 relative order-1 md:order-2 rounded-[2rem] overflow-hidden">
               <div class="relative h-full rounded-[1.5rem] overflow-hidden shadow-sm">
                  <img src="/assets/gif 2.webp" alt="Putting on" class="absolute inset-0 w-full h-full object-cover">
                  <div class="absolute bottom-3 left-3 right-3 text-center">
                     <span class="bg-black/40 backdrop-blur-md text-white text-[9px] px-3 py-1.5 rounded-full uppercase tracking-widest font-bold">
                        {{ langService.currentLang() === 'ar' ? 'تركيب سهل' : 'Easy On' }}
                     </span>
                  </div>
               </div>
               <div class="relative h-full rounded-[1.5rem] overflow-hidden shadow-sm">
                  <img src="/assets/gif3.webp" alt="Taking off" class="absolute inset-0 w-full h-full object-cover">
                  <div class="absolute bottom-3 left-3 right-3 text-center">
                     <span class="bg-black/40 backdrop-blur-md text-white text-[9px] px-3 py-1.5 rounded-full uppercase tracking-widest font-bold">
                        {{ langService.currentLang() === 'ar' ? 'إزالة سريعة' : 'Blink Off' }}
                     </span>
                  </div>
               </div>
            </div>
        </div>

         <!-- 4. Appearance/Natural -->
        <div class="relative w-full bg-white shadow-2xl border border-gray-100 flex flex-col md:flex-row overflow-hidden rounded-[2rem] mb-16 md:mb-24">
           <!-- Content Side -->
           <div class="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center order-2 md:order-1">
              <span class="text-9xl font-serif text-gray-50 font-bold leading-none absolute top-4 left-4 select-none -z-10">04</span>
              <h2 class="text-3xl md:text-4xl font-serif text-black mb-6 leading-tight">
                @if (langService.currentLang() === 'ar') { سر الجمال الطبيعي الخفي } @else { The Secret to Effortless Beauty }
              </h2>
              <p class="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                 @if (langService.currentLang() === 'ar') {
                   تعبتي من الرموش اللي تبين "فيك" ومو مريحة؟ في نوريڤا، كسرنا القواعد. صممنا أنحف باند في العالم (٠.٢ ملم) عشان يختفي تماماً تحت رموشج الأصلية. رموشنا مصنوعة من أرقى الألياف اللي تشبه الطبيعية ١٠٠٪، خفيفة لدرجة إنج بتنسين إنج لابستها، بس الكل بيلاحظ جمال عيونج. لوك "الإكستنشن" الفخم الحين صار بمتناول إيدج.. بكل طبيعية، وبدون أي جهد.
                 } @else {
                   Tired of lashes that look stiff or feel heavy? At Noreva, we’ve redefined the standard. Our ultra-flexible 0.2mm band is the thinnest in the industry, designed to blend seamlessly with your natural lash line. Crafted from premium, hand-tapered fibers, our lashes offer a soft, weightless volume that feels as natural as it looks. It's the salon-quality extension look you've always wanted—undetectable, effortlessly beautiful, and designed to make your eyes truly pop.
                 }
              </p>
           </div>
           <!-- Visual Side (Final Model Image) -->
           <div class="w-full md:w-1/2 bg-[#f5f5f5] min-h-[300px] md:min-h-[500px] relative order-1 md:order-2 rounded-[2rem] overflow-hidden">
              <img src="/assets/finalmodel.png" alt="Natural Look" class="absolute inset-0 w-full h-full object-cover transition-all duration-700">
           </div>
        </div>

         <!-- CTA Footer -->
        <div class="text-center pt-24 md:pt-32">
             <h3 class="text-2xl md:text-5xl font-bold font-serif mb-12">
               @if (langService.currentLang() === 'ar') { جمالكِ يستحق التميّز.. هل أنتِ مستعدة؟ } @else { Your Beauty Deserves Perfection }
             </h3>
             <a routerLink="/product/magic-lashes" class="inline-flex w-full md:w-auto items-center justify-center bg-[#ebeae6] hover:bg-[#dedcd6] text-black px-12 py-6 font-serif font-bold text-lg uppercase tracking-[0.2em] transition-all shadow-sm cursor-pointer border border-black/5 rounded-full">
               @if (langService.currentLang() === 'ar') { تسوقي مجموعتكِ المفضلة الآن } @else { Shop Your Collection Now }
             </a>
             <p class="mt-10 text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">
               @if (langService.currentLang() === 'ar') { انضمي لآلاف النساء الواثقات • شحن سريع • ضمان الاسترجاع } @else { Join thousands of confident women • Fast Shipping • Guarantee }
             </p>
        </div>

      </div>
    </div>
  `
})
export class WhyUsComponent {
  langService = inject(LanguageService);
}

@Component({
  selector: 'app-refund-policy',
  standalone: true,
  template: `
    <div class="container mx-auto px-6 pt-44 pb-32 max-w-3xl" [class.text-right]="langService.isRtl()" [class.text-left]="!langService.isRtl()">
      <h1 class="text-4xl font-black font-serif mb-6 text-gray-900 leading-tight">
        {{ langService.currentLang() === 'ar' ? 'سياسة الاسترجاع والاسترداد' : 'Return & Refund Policy' }}
      </h1>
      <p class="text-sm text-gray-500 mb-12">Last Updated: January 2026</p>
      
      <div class="space-y-12 text-gray-700 leading-relaxed">
        <section>
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '1. ضمان استرجاع لمدة 14 يوماً' : '1. 14-Day Money Back Guarantee' }}</h2>
          <p>
            {{ langService.currentLang() === 'ar' 
              ? 'نحن نثق بمنتجاتنا تماماً، ولذلك نقدم لكِ ضمان استرجاع كامل لمدة 14 يوماً من تاريخ استلام الطلب. إذا لم تكوني راضية 100% عن مشترياتك لأي سبب كان، يمكنك إرجاعها واسترداد المبلغ كاملاً بدون أي أسئلة.' 
              : 'We are fully confident in our products, which is why we offer a 14-day full money-back guarantee from the date you receive your order. If you are not 100% satisfied with your purchase for any reason, you can return it for a full refund—no questions asked.' }}
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '2. شروط الاسترجاع' : '2. Return Conditions' }}</h2>
          <div class="space-y-4">
            <p>
              {{ langService.currentLang() === 'ar' 
                ? 'لضمان قبول طلب الاسترجاع ومعالجته بسلاسة، يرجى التأكد من التالي:' 
                : 'To ensure your return is approved and processed smoothly, please ensure the following:' }}
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
              <li>{{ langService.currentLang() === 'ar' ? 'أن يكون المنتج في حالته الأصلية تماماً.' : 'The product must be in its absolute original condition.' }}</li>
              <li>{{ langService.currentLang() === 'ar' ? 'أن يكون غير مستخدم وغير تالف.' : 'It must be unused and undamaged.' }}</li>
              <li>{{ langService.currentLang() === 'ar' ? 'أن يكون في عبوته الأصلية مع كامل ملحقاته.' : 'It must be in its original packaging with all accessories included.' }}</li>
            </ul>
            <p class="text-red-500 text-sm font-bold mt-4 bg-red-50 p-4 rounded-xl border border-red-100">
              {{ langService.currentLang() === 'ar' 
                ? 'تنبيه هام: إذا وصلنا المنتج بحالة تالفة، مستخدمة، أو "مبهذلة" (Messed Up)، فإننا نحتفظ بالحق في رفض استرداد المبلغ وإعادة المنتج إليك على نفقتك الخاصة.' 
                : 'Important: If we receive the product in a damaged, used, or "messed up" condition, we reserve the right to refuse the refund and return the item to you at your expense.' }}
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '3. المنتجات التالفة أو المعيبة' : '3. Damaged or Defective Items' }}</h2>
          <p>
            {{ langService.currentLang() === 'ar' 
              ? 'في حال استلمتِ منتجاً تالفاً أو به عيب مصنعي (وهو أمر نادر جداً)، يرجى التواصل معنا فوراً خلال 48 ساعة من الاستلام. سنقوم بترتيب استبدال فوري أو استرداد كامل المبلغ بما في ذلك رسوم الشحن.' 
              : 'In the rare event that you receive a damaged or defective item, please contact us immediately within 48 hours of receipt. We will arrange for an immediate replacement or a full refund, including shipping costs.' }}
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ langService.currentLang() === 'ar' ? '4. عملية الاسترداد' : '4. Refund Process' }}</h2>
          <p>
            {{ langService.currentLang() === 'ar' 
              ? 'بمجرد استلامنا للمنتج المرتجع وفحصه (عادة خلال 2-3 أيام عمل)، سنبداً في إجراءات استرداد المبلغ. سيتم إرجاع المبلغ إلى نفس وسيلة الدفع المستخدمة (بطاقة ائتمان، مدى، أبل باي). قد تستغرق العملية من 5 إلى 10 أيام عمل حتى يظهر المبلغ في كشف حسابك البنكي.' 
              : 'Once we receive and inspect your return (usually within 2-3 business days), we will initiate the refund process. The refund will be issued to the original payment method (Credit Card, Mada, Apple Pay). Please allow 5-10 business days for the amount to reflect in your bank statement.' }}
          </p>
        </section>

        <section class="bg-gray-50 p-8 rounded-3xl border border-gray-200 mt-12">
            <h3 class="text-lg font-bold text-black mb-2">{{ langService.currentLang() === 'ar' ? 'هل لديك استفسار آخر؟' : 'Have more questions?' }}</h3>
            <p class="text-gray-600 text-sm mb-6">
              {{ langService.currentLang() === 'ar' ? 'فريق خدمة العملاء جاهز لمساعدتك في أي وقت.' : 'Our customer support team is ready to assist you at any time.' }}
            </p>
            <a href="mailto:support@noreva.com" class="inline-flex items-center justify-center bg-black text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
               {{ langService.currentLang() === 'ar' ? 'تواصلي معنا' : 'Contact Us' }}
            </a>
        </section>

      </div>
    </div>
  `
})
export class RefundPolicyComponent {
  langService = inject(LanguageService);
}
