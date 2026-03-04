import {
  Component,
  signal,
  computed,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-video-intro',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div
        class="video-intro-overlay"
        [class.fading-out]="fadingOut()"
        (click)="handleOverlayClick($event)"
        role="dialog"
        aria-modal="true"
        aria-label="Brand intro video"
      >
        <!-- Video -->
        <video
          #introVideo
          class="intro-video"
          [muted]="true"
          autoplay
          playsinline
          preload="auto"
          (ended)="onVideoEnd()"
          (canplay)="onCanPlay()"
        >
          <source src="/assets/0304 (2)(2).mp4" type="video/mp4" />
        </video>

        <!-- Gradient vignette -->
        <div class="vignette"></div>

        <!-- Top branding -->
        <div class="intro-brand" [class.brand-visible]="brandVisible()">
          <span class="brand-wordmark">NOREVA</span>
        </div>

        <!-- Bottom controls -->
        <div class="intro-controls" [class.controls-visible]="brandVisible()">
          <!-- Progress bar -->
          <div class="progress-track">
            <div
              class="progress-fill"
              [style.width.%]="progress()"
            ></div>
          </div>

          <!-- Skip button -->
          <button
            class="skip-btn"
            (click)="skip()"
            [attr.aria-label]="langService.currentLang() === 'ar' ? 'تخطي المقدمة' : 'Skip intro'"
          >
            @if (langService.currentLang() === 'ar') {
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform: scaleX(-1)">
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
              <span class="skip-text">تخطي</span>
            } @else {
              <span class="skip-text">Skip</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            }
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }

    .video-intro-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: default;
    }

    .video-intro-overlay.fading-out {
      opacity: 0;
      pointer-events: none;
    }

    /* Video */
    .intro-video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Vignette overlay for cinematic look */
    .vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse at center,
        transparent 40%,
        rgba(0, 0, 0, 0.55) 100%
      );
      pointer-events: none;
    }

    /* Noreva branding — centre of screen */
    .intro-brand {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      opacity: 0;
      transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
    }

    .intro-brand.brand-visible {
      opacity: 1;
      transform: translateX(-50%) translateY(-50%);
    }

    .brand-wordmark {
      font-family: 'Didact Gothic', 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.1rem, 3vw, 1.6rem);
      letter-spacing: 0.45em;
      color: rgba(255, 255, 255, 0.95);
      font-weight: 400;
      text-transform: uppercase;
      user-select: none;
      display: flex;
      align-items: flex-start;
      gap: 0.05em;
      white-space: nowrap;
    }

    .brand-tm {
      font-size: 0.4em;
      line-height: 1.8;
      vertical-align: super;
      letter-spacing: 0;
      opacity: 0.8;
    }

    /* Bottom controls bar */
    .intro-controls {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0 2rem 2.25rem;
      display: flex;
      align-items: center;
      gap: 1.25rem;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
    }

    .intro-controls.controls-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Progress bar */
    .progress-track {
      flex: 1;
      height: 1.5px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 999px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: rgba(255, 255, 255, 0.85);
      border-radius: 999px;
      transition: width 0.25s linear;
    }

    /* Skip button */
    .skip-btn {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.8);
      padding: 0.45rem 1rem 0.45rem 0.85rem;
      border-radius: 999px;
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      white-space: nowrap;
    }

    .skip-btn:hover {
      background: rgba(255, 255, 255, 0.18);
      color: #fff;
      border-color: rgba(255, 255, 255, 0.35);
    }

    .skip-text {
      font-family: inherit;
      font-weight: 500;
    }
  `]
})
export class VideoIntroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('introVideo') videoRef!: ElementRef<HTMLVideoElement>;

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  langService = inject(LanguageService);

  visible = signal(false);
  fadingOut = signal(false);
  brandVisible = signal(false);
  progress = signal(0);

  private progressInterval: ReturnType<typeof setInterval> | null = null;
  private dismissed = false;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const seen = sessionStorage.getItem('noreva_intro_seen');
    if (!seen) {
      this.visible.set(true);
    }
  }

  ngAfterViewInit() {
    if (!this.visible()) return;
    // Lock body scroll while intro plays
    document.body.style.overflow = 'hidden';
  }

  onCanPlay() {
    // Reveal branding once video is ready
    setTimeout(() => {
      this.brandVisible.set(true);
      this.cdr.markForCheck();
    }, 200);
    this.startProgress();
  }

  private startProgress() {
    const video = this.videoRef?.nativeElement;
    if (!video) return;
    this.progressInterval = setInterval(() => {
      if (video.duration && video.duration > 0) {
        const pct = (video.currentTime / video.duration) * 100;
        this.progress.set(pct);
        this.cdr.markForCheck();
      }
    }, 250);
  }

  onVideoEnd() {
    this.dismiss();
  }

  skip() {
    this.dismiss();
  }

  handleOverlayClick(event: MouseEvent) {
    // Only dismiss if clicking directly on the overlay (not children)
    if ((event.target as HTMLElement).classList.contains('video-intro-overlay')) {
      this.dismiss();
    }
  }

  private dismiss() {
    if (this.dismissed) return;
    this.dismissed = true;
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    sessionStorage.setItem('noreva_intro_seen', '1');
    this.fadingOut.set(true);
    this.cdr.markForCheck();
    // Remove from DOM after fade completes
    setTimeout(() => {
      this.visible.set(false);
      document.body.style.overflow = '';
      this.cdr.markForCheck();
    }, 950);
  }

  ngOnDestroy() {
    if (this.progressInterval) clearInterval(this.progressInterval);
    document.body.style.overflow = '';
  }
}
