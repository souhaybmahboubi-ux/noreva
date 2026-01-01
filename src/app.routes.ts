
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CatalogComponent } from './components/catalog/catalog.component';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/auth/login.component';
import { AccountComponent } from './components/auth/account.component';
import { TrackingComponent } from './components/pages/tracking.component';
import { AboutComponent, PrivacyComponent, TermsComponent, ContactComponent, ShippingComponent } from './components/pages/static-pages.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: CatalogComponent },
  { path: 'product/:handle', loadComponent: () => import('./components/product-page/product-page.component').then(m => m.ProductPageComponent) },

  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: '**', redirectTo: '' }
];
