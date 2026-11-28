import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { emailTaken } from '../../../shared/validators/email-taken.validator';
import { passwordStrength } from '../../../shared/validators/password-strength.validator';
import { passwordsMatch } from '../../../shared/validators/passwords-match.validator';
import { FieldError } from '../../../shared/components/field-error/field-error';
import { PasswordInput } from '../../../shared/components/password-input/password-input';

@Component({
  imports: [ReactiveFormsModule, FieldError,RouterLink,PasswordInput],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  private fb = inject(FormBuilder).nonNullable;
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  serverError = signal('');
  success = signal(false);

  form = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.email],[emailTaken(this.http)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      password: ['', [Validators.required, passwordStrength]],
      confirmPassword: ['', Validators.required]
    },
    { validators: passwordsMatch }
  );

  submit(): void {
    this.serverError.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { confirmPassword, ...data } = this.form.getRawValue();

    this.loading.set(true);
    this.auth.register(data).subscribe({
      next: () =>{
         this.loading.set(false);
          this.success.set(true);
          setTimeout(() => this.router.navigate(['/products']), 1500);
      }, 
      error: err => {
        this.loading.set(false);
        this.serverError.set(
          err.status === 400
            ? 'Registration failed. This email may already be registered.'
            : 'Could not reach the server. Please try again.'
        );
      }
    });
  }
}
