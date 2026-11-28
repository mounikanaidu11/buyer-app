import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  imports: [],
  selector: 'app-welcome-banner',
  styleUrl: './welcome-banner.scss',
  templateUrl: './welcome-banner.html',
})
export class WelcomeBanner {
  auth = inject(AuthService);
}
