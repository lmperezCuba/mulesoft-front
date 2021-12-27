import { SecurityService } from './../../../config/services/security.service';
import { Router } from '@angular/router';
import { CreateService } from './create.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { tap, first, catchError, of } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  hide = true;
  submitted = false;
  roles = new FormControl();
  roleList: string[] = ['ADMIN', 'USER'];
  form: FormGroup = new FormGroup({
    username: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required]
    }),
    confirmPassword: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required, this.matchOtherValidator('password')]
    }),
  },
  );

  constructor(private createService: CreateService, private router: Router,
    private securityService: SecurityService) { }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  matchOtherValidator(otherControlName: string) {

    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate(control: FormControl) {

      if (!control.parent) {
        return null;
      }

      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }

      if (!otherControl) {
        return null;
      }

      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true
        };
      }

      return null;

    }
  }

  /**
   * Create a new user
   */
  create() {
    if (!this.form.valid) return;
    this.submitted = true;
    this.createService.create({
      username: this.f['username'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
      roles: this.roles.value
    }).pipe(first(),
      catchError(error => {
        this.securityService.handleError(error);
        return of();
      }))
      .subscribe(x => {
        this.submitted = false;
        this.router.navigate(['admin/users/list'])
      });
  }


}
