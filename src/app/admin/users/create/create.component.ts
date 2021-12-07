import { SecurityService } from './../../../config/services/security.service';
import { Router } from '@angular/router';
import { CreateService } from './create.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { tap, first, catchError, of } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  hide = true;
  submitted = false;
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
    confirmPassword: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required]
    }),
  },
    //{ validators: passwordMatchingValidatior }
  );

  constructor(private createService: CreateService, private router: Router,
    private securityService: SecurityService) { }

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

  /**
   * Create a new user
   */
  create() {
    if (!this.form.valid) return;
    this.submitted = true;
    this.createService.create({
      username: this.f['username'].value,
      email: this.f['email'].value,
      password: this.f['password'].value
    }).pipe(first(),
      tap(x => console.log(x)),
      catchError(error => {
        this.securityService.handleError(error);
        return of();
      }))
      .subscribe(x => {
        console.log('user created');
        this.submitted = false;
        this.router.navigate(['admin/users/list'])
      });
  }

  
}
