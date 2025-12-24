
import { Injectable, signal, computed } from '@angular/core';
import { Product, ProductVariant } from './product.service';

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
  // Changed to true by default as requested
  shippingProtection = signal(true);
  readonly shippingProtectionCost = 25;

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
      // Check if item exists with same variant AND same price (to separate bundle items from normal items)
      const existingItemIndex = currentItems.findIndex(item => 
        item.product.id === product.id && 
        item.variant?.name === variant?.name &&
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
  }

  removeFromCart(itemToRemove: CartItem) {
    this.items.update(items => items.filter(item => item !== itemToRemove));
  }

  updateQuantity(itemToUpdate: CartItem, newQuantity: number) {
    if (newQuantity < 1) return;
    this.items.update(items => items.map(item => 
      item === itemToUpdate ? { ...item, quantity: newQuantity } : item
    ));
  }

  toggleShippingProtection() {
    this.shippingProtection.update(v => !v);
  }

  clearCart() {
    this.items.set([]);
    this.shippingProtection.set(true); // Reset to true by default
  }
}
