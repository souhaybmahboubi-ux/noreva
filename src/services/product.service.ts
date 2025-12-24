
import { Injectable, signal } from '@angular/core';

export interface ProductVariant {
  name: string;
  colorCode: string; // Hex for UI
  image?: string; // Optional: Linked to specific gallery image
}

export interface ProductBundle {
  id: string;
  title: string;
  quantity: number;
  price: number; // Total price for the bundle
  savings: number; // Percentage or Amount saved label
  isBestValue?: boolean;
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
      id: 'stealth-hydrate-1',
      title: 'مطارة نوريفا™',
      price: 86.99,
      compareAtPrice: 195.00,
      description: `تبي الفكة من قروشة التفتيش؟ وتبي أغراضك تكون معك طول الوقت؟
مطارة نوريفا™ هي الحل اللي تدوره. شكلها مطارة ماي كشخة وعادية، بس داخلها "علوم ثانية"! 😉
فيها مخبا سري تحت، وسيع وراهي! يشيل جوالك بالراحة (حتى لو معك آيفون 17 برو ماكس)، ويشيل سماعاتك، والفيب (Vape)، وحتى فلوسك.
والأهم من هذا كله؟ ما تخر ماي أبد! نظام العزل فيها بطل، يعني تطمن أغراضك ناشفة وأمان 100%.
شكلها بريء ما يلفت النظر، يعني تمشي أمورك فالمدرسة والطلعات وأنت مرتاح. خلك ذيب واضمن أغراضك معك!`,
      features: [
        'مخبا راهي: يشيل آيفون 17 برو ماكس، إيربودز، والفيب بالراحة.',
        'ما تخر أبد: عزل 100% بين الماي والأغراض، يعني أجهزتك بأمان.',
        'تمويه ولا غلطة: شكلها مطارة عادية، محد بيشك فيك.',
        'جودة توب: تتحمل الكرف والطيحات، تعيش معك.'
      ],
      // Images ordered exactly as per CSV input
      images: [
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/wmremove-transformed.png?v=1766527136',       // Position 1
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/wmremove-transformed_1.png?v=1766527136',     // Position 2
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/Gemini_Generated_Image_zbpzyfzbpzyfzbpz.png?v=1766527136', // Position 3
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/image_6.png?v=1766527136',                    // Position 4
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/S5c5dfff128554bc88b28bfcea87a7d39T.webp?v=1766527136',      // Position 5 (2nd to Last)
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/S46a2503ca66d4869b91e7678c28a8324z.webp?v=1766527136'       // Position 6 (Last)
      ],
      variants: [
        { 
          name: 'أبيض لؤلؤي', 
          colorCode: '#f9fafb',
          // Linked to the last image
          image: 'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/S46a2503ca66d4869b91e7678c28a8324z.webp?v=1766527136'
        },
        { 
          name: 'أحمر كلاسيك', 
          colorCode: '#dc2626',
          // Linked to the one before the last (2nd to last)
          image: 'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/S5c5dfff128554bc88b28bfcea87a7d39T.webp?v=1766527136'
        }
      ],
      bundles: [
        { id: 'b1', title: 'حبة وحدة', quantity: 1, price: 86.99, savings: 0 },
        { id: 'b2', title: 'عرض الربع (حبتين)', quantity: 2, price: 155.00, savings: 18.98, isBestValue: true },
        { id: 'b3', title: 'عرض الشلة (4 حبات)', quantity: 4, price: 290.00, savings: 57.96 }
      ]
    }
  ];

  getProducts() {
    return this.products;
  }

  getProduct(id: string) {
    return this.products.find(p => p.id === id);
  }

  getRelatedProducts(currentId: string) {
    return this.products.filter(p => p.id !== currentId);
  }
}
