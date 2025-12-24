
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/auth/login.component';
import { TrackingComponent } from './components/pages/tracking.component';
import { AboutComponent, PrivacyComponent, TermsComponent, ContactComponent, ShippingComponent } from './components/pages/static-pages.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: CatalogComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: '**', redirectTo: '' }
];
