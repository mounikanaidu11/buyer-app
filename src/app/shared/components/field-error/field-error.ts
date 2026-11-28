import { Component, computed, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.html'
})
export class FieldError {
  control = input.required<AbstractControl | null>();
  label = input<string>('This field');


  private tick = toSignal(
    toObservable(this.control).pipe(
      switchMap(c => (c ? c.events.pipe(startWith(null)) : of(null))),
      map(() => ({}))
    ),
    { initialValue: {} }
  );

  pending = computed(() => {
    this.tick();
    return !!this.control()?.pending;
  });

  show = computed(() => {
    this.tick();
    const c = this.control();
    return !!c && c.invalid && (c.touched || c.dirty);
  });

  message = computed(() => {
    this.tick();
    const errors = this.control()?.errors;
    if (!errors) return '';
    const label = this.label();

    if (errors['required']) return `${label} is required`;
    if (errors['email']) return 'Enter a valid email address';
    if (errors['minlength']) return `${label} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['pattern']) return `Enter a valid ${label.toLowerCase()}`;
    if (errors['weakPassword']) return 'Password needs 8+ characters, one number and one special character';
    if (errors['emailTaken']) return 'This email is already registered';
    return `${label} is invalid`;
  });
}