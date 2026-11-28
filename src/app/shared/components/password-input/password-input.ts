import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-password-input',
  styleUrl: './password-input.scss',
  templateUrl: './password-input.html',
})
export class PasswordInput {
   control = input.required<FormControl<string>>();
  inputId = input<string>('password');

  visible = signal(false);

  toggle(): void {
    this.visible.update(v => !v);
  }
}
