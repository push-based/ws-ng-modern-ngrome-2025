import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppShellComponent } from './app-shell/app-shell.component';
import { DirtyCheckComponent } from './dirty-check.component';

@Component({
  selector: 'app-root',
  template: `
    <app-shell>
      <dirty-check />
      <router-outlet />
    </app-shell>
  `,
  imports: [RouterOutlet, AppShellComponent, DirtyCheckComponent],
})
export class AppComponent {}
