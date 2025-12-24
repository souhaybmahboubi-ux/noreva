
import { Injectable, signal, effect } from '@angular/core';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  login(user: UserProfile) {
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
    this.login(user); // Same logic updates state and storage
  }
}
