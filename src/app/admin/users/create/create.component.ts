import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  hide = true;
  form: FormGroup = new FormGroup({
    username: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required]
    }),
    confirmPassword: new FormControl(null, [Validators.required]),
  },
    //{ validators: passwordMatchingValidatior }
  );

  constructor() { }

  ngOnInit(): void {
    console.log('');

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  /*
    passwordMatchingValidatior(): ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };
  */

}
