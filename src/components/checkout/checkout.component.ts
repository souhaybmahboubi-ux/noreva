
import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CurrencyService } from '../../services/currency.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
   selector: 'app-checkout',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule, RouterLink],
   template: `
    <div class="bg-white min-h-screen font-sans" [dir]="langService.currentLang() === 'ar' ? 'rtl' : 'ltr'">
      
      <!-- Mobile Order Summary Toggle (Shopify Style) -->
      <div class="lg:hidden bg-[#fafafa] border-b border-[#e6e6e6] p-4">
        <button (click)="toggleMobileSummary()" class="flex items-center justify-between w-full text-blue-600">
           <span class="flex items-center gap-2 text-sm font-medium">
             <span class="text-gray-600">Show order summary</span>
             <svg class="w-3 h-3 transition-transform" [class.rotate-180]="showMobileSummary()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
             </svg>
           </span>
           <span class="text-lg font-bold text-gray-900">{{ currencyService.formatPrice(getTotal()) }}</span>
        </button>
        
        @if (showMobileSummary()) {
          <div class="mt-4 pt-4 border-t border-gray-200 space-y-4 animate-slide-down">
             @for (item of cartService.items(); track item.product.id) {
                <div class="flex gap-4 items-center justify-between">
                  <div class="flex gap-4 items-center">
                    <div class="relative w-16 h-16 bg-white rounded-lg border border-gray-200 flex-shrink-0">
                       <img [src]="item.variant?.image || item.product.images[0]" class="w-full h-full object-cover rounded-lg">
                       <span class="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{{ item.quantity }}</span>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-800 text-sm">{{ item.product.title }}</h4>
                      <p class="text-xs text-gray-500">{{ item.variant?.name }}</p>
                    </div>
                  </div>
                  <span class="text-sm font-medium">{{ currencyService.formatPrice((item.priceOverride || item.product.price) * item.quantity) }}</span>
                </div>
             }
             <div class="border-t border-gray-200 pt-4 space-y-2">
                <div class="flex justify-between text-sm text-gray-600">
                   <span>Subtotal</span>
                   <span>{{ currencyService.formatPrice(cartService.totalPrice() - (cartService.shippingProtection() ? cartService.shippingProtectionCost : 0)) }}</span>
                </div>
                <div class="flex justify-between text-sm text-gray-600">
                   <span>Shipping</span>
                   <span class="text-xs font-bold text-gray-500 uppercase">Calculated at next step</span>
                </div>
                <div class="flex justify-between text-lg font-bold text-gray-900 pt-2">
                   <span>Total</span>
                   <span>{{ currencyService.formatPrice(getTotal()) }}</span>
                </div>
             </div>
          </div>
        }
      </div>

      <div class="lg:flex flex-row-reverse">
        
        <!-- Right Column: Summary (Desktop) - Shopify Gray Background -->
        <div class="hidden lg:block w-full lg:w-[45%] bg-[#fafafa] border-l border-[#e6e6e6] min-h-screen p-12 pt-16">
           <div class="max-w-md mx-auto sticky top-12">
              <div class="space-y-4 mb-8">
                 @for (item of cartService.items(); track item.product.id) {
                    <div class="flex gap-4 items-center justify-between">
                      <div class="flex gap-4 items-center">
                        <div class="relative w-16 h-16 bg-white rounded-lg border border-[#e6e6e6] flex-shrink-0">
                           <img [src]="item.variant?.image || item.product.images[0]" class="w-full h-full object-cover rounded-lg">
                           <span class="absolute -top-3 -right-3 bg-[#737373] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium opacity-90">{{ item.quantity }}</span>
                        </div>
                        <div>
                          <h4 class="font-bold text-[#333] text-sm">{{ item.product.title }}</h4>
                          <p class="text-xs text-[#737373]">{{ item.variant?.name }}</p>
                        </div>
                      </div>
                      <span class="text-sm font-medium text-[#333]">{{ currencyService.formatPrice((item.priceOverride || item.product.price) * item.quantity) }}</span>
                    </div>
                 }
              </div>

              <div class="border-t border-[#e6e6e6] pt-6 space-y-3">
                  <div class="flex justify-between text-sm text-[#545454]">
                    <span>Subtotal</span>
                    <span class="font-medium text-[#333]">{{ currencyService.formatPrice(cartService.totalPrice() - (cartService.shippingProtection() ? cartService.shippingProtectionCost : 0)) }}</span>
                  </div>
                  <div class="flex justify-between text-sm text-[#545454]">
                    <span>Shipping</span>
                    <span class="text-xs font-medium text-[#737373]">Calculated at next step</span>
                  </div>
                  @if (cartService.shippingProtection()) {
                     <div class="flex justify-between text-sm text-[#545454]">
                        <span class="flex items-center gap-1">Shipping Protection</span>
                        <span class="font-medium text-[#333]">{{ currencyService.formatPrice(cartService.shippingProtectionCost) }}</span>
                     </div>
                  }
              </div>

              <div class="border-t border-[#e6e6e6] pt-6 mt-6">
                  <div class="flex justify-between items-center">
                    <span class="text-base text-[#333]">Total</span>
                    <div class="flex items-baseline gap-2">
                       <span class="text-xs text-[#737373]">{{ currencyService.selectedCurrency().code }}</span>
                       <span class="text-2xl font-bold text-[#333]">{{ currencyService.formatPrice(getTotal()).replace(currencyService.selectedCurrency().symbol, '') }}</span>
                    </div>
                  </div>
              </div>
           </div>
        </div>

        <!-- Left Column: Form -->
        <div class="w-full lg:w-[55%] p-6 md:p-12 lg:pt-16">
           <div class="max-w-lg mx-auto ltr:mr-0 rtl:ml-0 rtl:lg:ml-auto">
              
              <!-- Header -->
              <div class="mb-8">
                 <h1 class="text-2xl md:text-3xl font-[900] tracking-tighter text-[#4a4945] leading-none mb-4 uppercase italic">NOREVA</h1>
                 
                 <!-- Breadcrumbs -->
                 <div class="flex items-center gap-2 text-xs text-[#737373]">
                    <span class="text-blue-600">Cart</span>
                    <svg class="w-3 h-3 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    <span class="font-medium text-[#333]">Information</span>
                    <svg class="w-3 h-3 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    <span>Shipping</span>
                    <svg class="w-3 h-3 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    <span>Payment</span>
                 </div>
              </div>

              <!-- Express Checkout -->
              <div class="mb-10">
                 <div class="flex items-center gap-3 mb-4">
                    <hr class="flex-grow border-gray-200">
                    <span class="text-xs text-gray-500 uppercase px-2">Express Checkout</span>
                    <hr class="flex-grow border-gray-200">
                 </div>
                 <div class="grid grid-cols-3 gap-2">
                    <button class="bg-[#5A31F4] h-10 rounded-md flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                       <span class="font-black italic text-sm">Shop Pay</span>
                    </button>
                    <button class="bg-black h-10 rounded-md flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                       <span class="font-medium text-sm">GPay</span>
                    </button>
                    <button class="bg-black h-10 rounded-md flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                       <span class="font-medium text-sm"> Pay</span>
                    </button>
                 </div>
                 <div class="flex items-center gap-3 mt-4">
                    <hr class="flex-grow border-gray-200">
                    <span class="text-xs text-gray-500 uppercase px-2">OR</span>
                    <hr class="flex-grow border-gray-200">
                 </div>
              </div>

              <!-- Form -->
              <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" class="space-y-8">
                 
                 <!-- Contact Info -->
                 <div>
                    <div class="flex justify-between items-center mb-4">
                       <h2 class="text-lg font-medium text-[#333]">Contact</h2>
                       @if(!authService.isLoggedIn()) {
                         <a routerLink="/login" class="text-xs text-blue-600 hover:underline">Log in</a>
                       }
                    </div>
                    <div class="relative group">
                       <input type="email" id="email" formControlName="email" placeholder=" " 
                              class="peer w-full px-3 pt-5 pb-2 rounded-lg border border-[#d9d9d9] focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-transparent bg-white">
                       <label for="email" class="absolute left-3 top-1 text-[10px] text-[#737373] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#737373]">Email</label>
                    </div>
                    <div class="mt-3 relative">
                         <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                         <span class="ml-2 text-sm text-[#545454]">Email me with news and offers</span>
                    </div>
                 </div>

                 <!-- Shipping Address -->
                 <div>
                    <h2 class="text-lg font-medium text-[#333] mb-4">Shipping address</h2>
                    <div class="space-y-3">
                       <div class="relative">
                          <select formControlName="country" class="w-full px-3 py-3.5 rounded-lg border border-[#d9d9d9] bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm">
                             <option value="SA">Saudi Arabia</option>
                             <option value="AE">United Arab Emirates</option>
                             <option value="KW">Kuwait</option>
                             <option value="QA">Qatar</option>
                             <option value="BH">Bahrain</option>
                             <option value="OM">Oman</option>
                          </select>
                       </div>
                       
                       <div class="grid grid-cols-2 gap-3">
                          <div class="relative">
                             <input type="text" id="fname" formControlName="firstName" placeholder=" " class="peer w-full px-3 pt-5 pb-2 rounded-lg border border-[#d9d9d9] focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-transparent bg-white">
                             <label for="fname" class="absolute left-3 top-1 text-[10px] text-[#737373] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-[10px]">First name</label>
                          </div>
                          <div class="relative">
                             <input type="text" id="lname" formControlName="lastName" placeholder=" " class="peer w-full px-3 pt-5 pb-2 rounded-lg border border-[#d9d9d9] focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-transparent bg-white">
                             <label for="lname" class="absolute left-3 top-1 text-[10px] text-[#737373] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-[10px]">Last name</label>
                          </div>
                       </div>

                       <div class="relative">
                          <input type="text" id="address" formControlName="address" placeholder=" " class="peer w-full px-3 pt-5 pb-2 rounded-lg border border-[#d9d9d9] focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-transparent bg-white">
                          <label for="address" class="absolute left-3 top-1 text-[10px] text-[#737373] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-[10px]">Address</label>
                       </div>

                       <div class="grid grid-cols-2 gap-3">
                          <div class="relative">
                             <input type="text" id="city" formControlName="city" placeholder=" " class="peer w-full px-3 pt-5 pb-2 rounded-lg border border-[#d9d9d9] focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-transparent bg-white">
                             <label for="city" class="absolute left-3 top-1 text-[10px] text-[#737373] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-[10px]">City</label>
                          </div>
                          <div class="relative">
                             <input type="text" id="postal" placeholder=" " class="peer w-full px-3 pt-5 pb-2 rounded-lg border border-[#d9d9d9] focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-transparent bg-white">
                             <label for="postal" class="absolute left-3 top-1 text-[10px] text-[#737373] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-[10px]">Postal code (Optional)</label>
                          </div>
                       </div>

                       <div class="relative">
                          <input type="tel" id="phone" formControlName="phone" placeholder=" " class="peer w-full px-3 pt-5 pb-2 rounded-lg border border-[#d9d9d9] focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-transparent bg-white">
                          <label for="phone" class="absolute left-3 top-1 text-[10px] text-[#737373] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-[10px]">Phone</label>
                          <div class="absolute right-3 top-3.5 group relative cursor-pointer">
                             <span class="text-gray-400 text-xs bg-gray-100 rounded-full w-4 h-4 flex items-center justify-center">?</span>
                             <div class="hidden group-hover:block absolute bottom-full mb-2 right-0 w-48 bg-gray-900 text-white text-[10px] p-2 rounded shadow-lg z-10">
                                In case we need to contact you about your order
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <!-- Footer Actions -->
                 <div class="flex flex-col-reverse md:flex-row items-center justify-between gap-6 pt-6 mt-6">
                    <a routerLink="/cart" class="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                       <svg class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                       Return to cart
                    </a>
                    <button type="submit" [disabled]="isProcessing()" class="w-full md:w-auto px-8 py-4 bg-[#111] text-white rounded-lg font-medium hover:bg-[#000] transition-colors disabled:opacity-70 text-sm">
                       {{ isProcessing() ? 'Processing...' : 'Continue to shipping' }}
                    </button>
                 </div>
              </form>
              
              <div class="mt-12 border-t border-gray-100 pt-4 flex gap-4 text-xs text-gray-500">
                 <a href="#" class="hover:underline">Refund policy</a>
                 <a href="#" class="hover:underline">Shipping policy</a>
                 <a href="#" class="hover:underline">Privacy policy</a>
                 <a href="#" class="hover:underline">Terms of service</a>
              </div>
           </div>
        </div>
      </div>
    </div>
  `,
   styles: [`
    @keyframes slide-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-slide-down { animation: slide-down 0.3s ease-out forwards; }
  `]
})
export class CheckoutComponent implements OnInit {
   cartService = inject(CartService);
   currencyService = inject(CurrencyService);
   authService = inject(AuthService);
   langService = inject(LanguageService);
   fb: FormBuilder = inject(FormBuilder);
   router: Router = inject(Router);

   checkoutForm: FormGroup;
   isProcessing = signal(false);
   orderComplete = signal(false);
   showMobileSummary = signal(false);

   constructor() {
      this.checkoutForm = this.fb.group({
         email: ['', [Validators.required, Validators.email]],
         firstName: ['', Validators.required],
         lastName: ['', Validators.required],
         phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(9)]],
         country: ['SA', Validators.required],
         city: ['', Validators.required],
         address: ['', Validators.required],
         paymentMethod: ['card', Validators.required]
      });

      effect(() => {
         const user = this.authService.currentUser();
         if (user) {
            this.checkoutForm.patchValue({
               email: user.email,
               firstName: user.firstName,
               lastName: user.lastName,
               phone: user.phone,
               city: user.city,
               country: user.country,
               address: user.address
            });
         }
      });
   }

   ngOnInit() {
      if (this.cartService.items().length === 0 && !this.orderComplete()) {
         this.router.navigate(['/products']);
      }
   }

   toggleMobileSummary() {
      this.showMobileSummary.update(v => !v);
   }

   getTotal() {
      let total = this.cartService.totalPrice();
      return total;
   }

   onSubmit() {
      if (this.checkoutForm.valid) {
         this.isProcessing.set(true);
         setTimeout(() => {
            this.isProcessing.set(false);
            this.orderComplete.set(true);
            this.cartService.clearCart();
            alert('Order placed successfully! (Simulation)');
            this.router.navigate(['/']);
         }, 2000);
      } else {
         this.checkoutForm.markAllAsTouched();
      }
   }
}
