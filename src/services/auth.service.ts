import { Injectable, signal, inject } from '@angular/core';
import { ShopifyService } from './shopify.service';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  orders: {
    id: string;
    date: string;
    total: number;
    currency: string;
    status: string;
    items: { title: string; img: string }[];
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  shopifyService = inject(ShopifyService);
  currentUser = signal<UserProfile | null>(null);
  isLoggedIn = signal<boolean>(false);

  constructor() {
    // Load from local storage on init
    const savedUser = localStorage.getItem('noreva_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this.currentUser.set(user);
        this.isLoggedIn.set(true);
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await this.shopifyService.loginCustomer(email, password);
      if (response && response.accessToken) {
        const customer = await this.shopifyService.getCustomer(response.accessToken);
        if (customer) {
          const user: UserProfile = {
            email: customer.email,
            firstName: customer.firstName || '',
            lastName: customer.lastName || '',
            phone: customer.phone || '',
            city: customer.defaultAddress?.city || '',
            country: customer.defaultAddress?.country || '',
            address: customer.defaultAddress?.address1 || '',
            orders: customer.orders?.edges.map((edge: any) => ({
              id: edge.node.orderNumber,
              date: new Date(edge.node.processedAt).toLocaleDateString(),
              total: parseFloat(edge.node.totalPrice.amount),
              currency: edge.node.totalPrice.currencyCode,
              status: edge.node.fulfillmentStatus || 'UNFULFILLED',
              items: edge.node.lineItems.edges.map((item: any) => ({
                title: item.node.title,
                img: item.node.variant?.image?.url || ''
              }))
            })) || []
          };
          this.setSession(user);
          return { success: true };
        }
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    }
  }

  async register(email: string, password: string, firstName: string, lastName: string) {
    try {
      // 1. Create Customer
      await this.shopifyService.createCustomer(email, password, firstName, lastName);

      // 2. Auto-login after creation
      return await this.login(email, password);
    } catch (error: any) {
      console.error('Registration error:', error);
      return { success: false, message: error.message || 'Registration failed' };
    }
  }

  private setSession(user: UserProfile) {
    this.currentUser.set(user);
    this.isLoggedIn.set(true);
    localStorage.setItem('noreva_user', JSON.stringify(user));
  }

  logout() {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    localStorage.removeItem('noreva_user');
  }

  updateProfile(user: UserProfile) {
    this.setSession(user);
  }
}
