
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CurrencySelectorComponent, CartDrawerComponent],
  template: `
    <app-header></app-header>
    <main class="pb-20 md:pb-0">
      <router-outlet></router-outlet>
    </main>
    <app-cart-drawer></app-cart-drawer>
    <app-footer></app-footer>
    <app-currency-selector></app-currency-selector>
  `
})
export class AppComponent { }
