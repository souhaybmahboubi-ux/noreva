
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShopifyService } from '../../services/shopify.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
    selector: 'app-bottom-nav',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule],
    template: `
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-gray-100 px-6 py-3 z-[45] flex items-center justify-between shadow-[0_-10px_25px_rgba(0,0,0,0.05)] rounded-t-3xl">
      
      <a routerLink="/" routerLinkActive="text-primary-600" [routerLinkActiveOptions]="{exact: true}" class="flex flex-col items-center gap-1 text-gray-400 transition-all active:scale-95">
        <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        </div>
        <span class="text-[10px] font-black uppercase tracking-widest">الرئيسية</span>
      </a>

      <a routerLink="/products" routerLinkActive="text-primary-600" class="flex flex-col items-center gap-1 text-gray-400 transition-all active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span class="text-[10px] font-black uppercase tracking-widest">المنتجات</span>
      </a>

      <div class="relative -top-6">
        <button (click)="shopifyService.toggleCart()" class="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-gray-900/20 transform hover:scale-110 active:scale-90 transition-all border-4 border-white">
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            @if (cartItemCount(); as total) {
                @if (total > 0) {
                    <span class="absolute -top-2 -right-2 h-5 w-5 bg-primary-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-gray-900">
                        {{ total }}
                    </span>
                }
            }
          </div>
        </button>
      </div>

      <a routerLink="/account" routerLinkActive="text-primary-600" class="flex flex-col items-center gap-1 text-gray-400 transition-all active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-[10px] font-black uppercase tracking-widest">حسابي</span>
      </a>

      <a routerLink="/contact" routerLinkActive="text-primary-600" class="flex flex-col items-center gap-1 text-gray-400 transition-all active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span class="text-[10px] font-black uppercase tracking-widest">دعمنا</span>
      </a>
    </nav>
  `
})
export class BottomNavComponent {
    shopifyService = inject(ShopifyService);

    cartItemCount = toSignal(
        this.shopifyService.cart$.pipe(
            map(cart => cart?.lineItems?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0)
        ),
        { initialValue: 0 }
    );
}
