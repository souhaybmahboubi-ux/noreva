import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

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
