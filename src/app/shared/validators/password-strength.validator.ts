import { AbstractControl,ValidationErrors} from '@angular/forms';
export function passwordStrength(control : AbstractControl):ValidationErrors | null{
    const value:string = control.value ??'';
    if(!value) return null;
    const valid=/^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value);
    return valid?null : {weakPassword:true};
}