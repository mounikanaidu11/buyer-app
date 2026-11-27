import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
   menuOpen = signal(false);
   toggleMenu() {
    this.menuOpen.update(v => !v);
  }
  closeMenu() {
    this.menuOpen.set(false);
  }
}
