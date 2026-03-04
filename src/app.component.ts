
import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CurrencyDrawerComponent } from './components/currency-selector/currency-drawer.component';
import { CurrencyService } from './services/currency.service';
import { LanguageService } from './services/language.service';
import { VideoIntroComponent } from './components/video-intro/video-intro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CurrencyDrawerComponent, VideoIntroComponent],
  template: `
    <app-video-intro></app-video-intro>
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-currency-drawer></app-currency-drawer>
  `,
  host: {
    '[attr.dir]': 'langService.isRtl() ? "rtl" : "ltr"',
    '[attr.lang]': 'langService.currentLang()',
    '(dblclick)': '$event.preventDefault()',
    '(copy)': 'handleGlobalCopy($event)'
  }
})
export class AppComponent implements OnInit {
  private currencyService = inject(CurrencyService);
  langService = inject(LanguageService);

  ngOnInit() {
    this.currencyService.detectAndSetCurrency();
  }

  handleGlobalCopy(event: ClipboardEvent) {
    event.preventDefault();
  }
}
