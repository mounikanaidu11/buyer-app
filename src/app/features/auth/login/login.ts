import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FieldError } from '../../../shared/components/field-error/field-error';
import { PasswordInput } from '../../../shared/components/password-input/password-input';

@Component({
  imports: [ReactiveFormsModule,RouterLink,FieldError,PasswordInput],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder).nonNullable;
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading = signal(false);
  serverError = signal('');
  sessionExpired = this.route.snapshot.queryParamMap.get('reason') === 'session-expired';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit(): void {
    this.serverError.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/products';
        this.router.navigateByUrl(returnUrl);
      },
      error: err => {
        this.loading.set(false);
        this.serverError.set(
          err.status === 400
            ? 'Invalid email or password'
            : 'Could not reach the server. Please try again.'
        );
      }
    });
  }
}
