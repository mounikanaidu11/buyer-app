import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
   auth = inject(AuthService); 
   menuOpen = signal(false);
   toggleMenu() {
    this.menuOpen.update(v => !v);
  }
  closeMenu() {
    this.menuOpen.set(false);
  }
}
