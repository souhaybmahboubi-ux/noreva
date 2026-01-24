
import { Injectable } from '@angular/core';

export interface ProductVariant {
  id: string;
  name: string;
  colorCode: string;
  image?: string;
}

export interface ProductBundle {
  id: string;
  title: string;
  subtitle: string;
  quantity: number;
  price: number;
  compareAtPrice: number;
  savings: number;
  isBestValue?: boolean;
  isMostPopular?: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number;
  description: string;
  features: string[];
  images: string[];
  variants: ProductVariant[];
  bundles?: ProductBundle[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 'noreva-face-brush', // Keeping ID for route compatibility, but content changes
      title: 'نوريڤا™ الرموش المغناطيسية السحرية',
      price: 161.00,
      compareAtPrice: 300.00,
      description: '【استخدام سهل مع مغناطيس ناعم】 استمتعي بتجربة رموش سلسة مع رموشنا المغناطيسية الناعمة. مزودة بزوج واحد من شرائح الرموش ذات المغناطيسين وأداة تطبيق، يمكنكِ تركيبها في 3 ثوانٍ وإزالتها في ثانية واحدة، وهي مثالية للمبتدئات.\n\n【بدون صمغ أو مزيل، لطيفة على البشرة الحساسة】 ودعي فوضى الصمغ والمزيلات التقليدية. توفر رموشنا المغناطيسية تجربة لطيفة وآمنة دون إتلاف الرموش الطبيعية، مما يجعلها مثالية للبشرة الحساسة.\n\n【مريحة في الارتداء】 تتميز ببطانة شفافة رفيعة للغاية، مما يجعل رموشنا المغناطيسية أكثر نعومة وخفة ومرونة، مما يضمن ملاءمة طبيعية ومريحة دون أي عبء على العينين.\n\n【رموش مغناطيسية قابلة لإعادة الاستخدام】 رموشنا مصنوعة من مواد عالية الجودة، مقاومة للماء وتدوم طويلاً، ويمكن إعادة استخدامها لأكثر من 100 مرة. عززي روتين جمالكِ بشكل مستدام.\n\n【ثبات قوي لارتداء مستقر】 تحافظ التقنية المغناطيسية الفريدة على الرموش في مكانها بشكل آمن، مما يلبي احتياجات يوم كامل بسهولة دون الحاجة إلى تعديلات مستمرة.',
      features: [
        'تركيب فوري في 3 ثواني بدون صمغ',
        'مغناطيس دقيق غير مرئي وثبات عالي',
        'قابلة لإعادة الاستخدام حتى 100 مرة',
        'خفيفة الوزن وآمنة على الرموش الطبيعية'
      ],
      images: [
        'https://ae01.alicdn.com/kf/Ab4481cf4142b47daa7b3f81fb10fdac7f.jpg',
        'https://ae01.alicdn.com/kf/A39b78ba5557d48188d1c1cc6ef6feba4Y.jpg',
        'https://ae01.alicdn.com/kf/A275861ba51844d65a73afd4a0392ab40c.jpg',
        'https://ae01.alicdn.com/kf/A74daed21421d4460994c516b23c435d0X.jpg'
      ],
      variants: [
        { id: 'v1', name: 'Black', colorCode: '#000000' },
        { id: 'v2', name: 'Dark Brown', colorCode: '#3D2314' },
        { id: 'v3', name: 'Light Brown', colorCode: '#7D513B' }
      ],
      bundles: [
        {
          id: 'b1',
          title: 'زوج واحد',
          subtitle: 'تجربة السحر المغناطيسي',
          quantity: 1,
          price: 161.00,
          compareAtPrice: 300.00,
          savings: 0
        },
        {
          id: 'b2',
          title: 'عرض الـ ٢ زوج (١+١ مجاناً)',
          subtitle: 'لوك يومي ولوك سهرة ✈️ شحن مجاني',
          quantity: 2,
          price: 161.00,
          compareAtPrice: 600.00,
          savings: 439.00,
          isMostPopular: true
        },
        {
          id: 'b3',
          title: 'باقة الصديقات (٣ أزواج + ٢ مجاناً)',
          subtitle: 'توفير خيالي لكِ ولصديقاتكِ ✈️',
          quantity: 5,
          price: 322.00,
          compareAtPrice: 1500.00,
          savings: 1178.00,
          isBestValue: true
        }
      ]
    }
  ];

  getProducts() { return this.products; }
  getProduct(id: string) { return this.products.find(p => p.id === id); }
}
