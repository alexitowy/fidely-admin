import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../../core/services/event.service';
import { FirebaseAuthenticationService } from '../../../services/firebase-authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  forgotForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.required]),
      confirmEmail: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
    },
    {
      validators: this.validations('email', 'confirmEmail'),
    }
  );
  showLoading: boolean = false;

  constructor(
    private readonly firebaseAuthService: FirebaseAuthenticationService,
    private router: Router,
    private eventService: EventService
  ) { }

  validations(email: string, confirmEmail: string) {
    return (form: FormGroup) => {
      let currentEmail = form.get(email).value;
      let currentConfirmEmail = form.get(confirmEmail).value;
      if (currentEmail !== currentConfirmEmail) {
        let errors = form.get(confirmEmail).errors;
        if (errors === null) {
          errors = {};
        }
        errors['match'] = true;
        form.get(confirmEmail).setErrors(errors);
        return null;
      }
      if (form.get(confirmEmail).errors !== null) {
        delete form.get(confirmEmail).errors['match'];
      }
    };
  }

  resetPassword(){

    if(this.forgotForm.valid){
      const email = this.forgotForm.controls['email'].value;
      this.showLoading = true;
      this.firebaseAuthService.resetPassword(email).then(()=>{
        this.eventService.presentToastInfo('Te hemos enviado un correo para restablecer tu contraseña.');
        this.router.navigateByUrl('auth');
      }).catch((err)=>{
        console.log(err);
      }).finally(()=>{
        this.showLoading = false;
      });

    }else{
      this.forgotForm.markAllAsTouched();
    }
  }
}
