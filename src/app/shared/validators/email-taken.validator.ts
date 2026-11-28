import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';
import { environment } from '../../../environments/environment';

export function emailTaken(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;
    if (!email) return of(null);

    return timer(400).pipe(
      switchMap(() =>
        http.get<unknown[]>(`${environment.apiUrl}/users`, { params: { email } })
      ),
      map(users => (users.length > 0 ? { emailTaken: true } : null)),
      catchError(() => of(null)) // if the API fails, don't block the form
    );
  };
}