import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Product, ProductVariant } from './product.service';
import { PixelService } from './pixel.service'; // Import PixelService

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  priceOverride?: number; // For bundles
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = signal<CartItem[]>([]);
  isCartOpen = signal(false);
  // Changed to true by default as requested
  shippingProtection = signal(true);
  readonly shippingProtectionCost = 5.75;
  private pixelService = inject(PixelService);

  constructor() {
    this.loadCart();
    // Auto-save cart on changes
    effect(() => {
      localStorage.setItem('noreva_cart', JSON.stringify({
        items: this.items(),
        shippingProtection: this.shippingProtection()
      }));
    });
  }

  private loadCart() {
    const saved = localStorage.getItem('noreva_cart');
    if (saved) {
      try {
        const { items, shippingProtection } = JSON.parse(saved);
        this.items.set(items || []);
        this.shippingProtection.set(shippingProtection !== undefined ? shippingProtection : true);
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    }
  }

  totalItems = computed(() => this.items().reduce((acc, item) => acc + item.quantity, 0));

  totalPrice = computed(() => {
    const itemsTotal = this.items().reduce((acc, item) => {
      const price = item.priceOverride !== undefined ? item.priceOverride : item.product.price;
      return acc + (price * item.quantity);
    }, 0);

    return itemsTotal + (this.shippingProtection() ? this.shippingProtectionCost : 0);
  });

  addToCart(product: Product, quantity: number, variant?: ProductVariant, priceOverride?: number) {
    this.items.update(currentItems => {
      const existingItemIndex = currentItems.findIndex(item =>
        item.product.id === product.id &&
        item.variant?.id === variant?.id &&
        item.priceOverride === priceOverride
      );

      if (existingItemIndex > -1) {
        const newItems = [...currentItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        return newItems;
      } else {
        return [...currentItems, { product, quantity, variant, priceOverride }];
      }
    });

    this.pixelService.trackAddToCart(
      product.title,
      product.id,
      priceOverride || product.price,
      quantity
    );
  }

  removeFromCart(itemToRemove: CartItem) {
    this.items.update(items => items.filter(item =>
      !(item.product.id === itemToRemove.product.id &&
        item.variant?.id === itemToRemove.variant?.id &&
        item.priceOverride === itemToRemove.priceOverride)
    ));
    this.checkGiftEligibility();
  }

  updateQuantity(itemToUpdate: CartItem, newQuantity: number) {
    if (newQuantity < 1) {
      this.removeFromCart(itemToUpdate);
      return;
    }
    this.items.update(items => items.map(item =>
      (item.product.id === itemToUpdate.product.id &&
        item.variant?.id === itemToUpdate.variant?.id &&
        item.priceOverride === itemToUpdate.priceOverride)
        ? { ...item, quantity: newQuantity }
        : item
    ));
    this.checkGiftEligibility();
  }

  private checkGiftEligibility() {
    const hasPaidItems = this.items().some(item => (item.priceOverride !== undefined ? item.priceOverride : item.product.price) > 0);
    if (!hasPaidItems) {
      // Remove free items (gifts)
      this.items.update(items => items.filter(item => (item.priceOverride !== undefined ? item.priceOverride : item.product.price) > 0));
    }
  }

  toggleShippingProtection() {
    this.shippingProtection.update(v => !v);
  }

  clearCart() {
    this.items.set([]);
    this.shippingProtection.set(true);
    localStorage.removeItem('noreva_cart');
  }
}
