
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-drawer',
  standalone: true,
  imports: [CommonModule],
  template: ``
})
export class CurrencyDrawerComponent {
  currencyService = inject(CurrencyService);
}
