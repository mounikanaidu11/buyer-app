import { AbstractControl, ValidationErrors } from '@angular/forms';
export function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  if (!confirm) return null; // "required" handles empty
  return password === confirm ? null : { mismatch: true };
}