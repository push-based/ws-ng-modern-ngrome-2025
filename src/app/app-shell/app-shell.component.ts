import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

import { AuthService } from '../core/auth.service';
import { MovieService } from '../movie/movie.service';
import { TrackingService } from '../shared/tracking.service';
import { DarkModeToggleComponent } from '../ui/component/dark-mode-toggle/dark-mode-toggle.component';
import { HamburgerButtonComponent } from '../ui/component/hamburger-button/hamburger-button.component';
import { SearchBarComponent } from '../ui/component/search-bar/search-bar.component';
import { SideDrawerComponent } from '../ui/component/side-drawer/side-drawer.component';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  imports: [
    SideDrawerComponent,
    RouterLinkActive,
    RouterLink,
    FastSvgComponent,
    HamburgerButtonComponent,
    SearchBarComponent,
    ReactiveFormsModule,
    FormsModule,
    DarkModeToggleComponent,
  ],
})
export class AppShellComponent {
  protected authService = inject(AuthService);
  private movieService = inject(MovieService);
  private router = inject(Router);
  private trackingService = inject(TrackingService);

  genres = toSignal(this.movieService.getGenres(), { initialValue: [] });

  sideDrawerOpen = signal(false);

  searchValue = signal('');

  constructor() {
    effect(() => {
      if (this.searchValue()) {
        this.router.navigate(['search', this.searchValue()]);
      }
    });
  }

  toggleSideDrawer() {
    this.sideDrawerOpen.update((open) => !open);
  }

  trackNavigation(route: string) {
    this.trackingService.trackEvent(`nav to: ${route}`);
  }
}
