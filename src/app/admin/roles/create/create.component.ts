import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, first, of, tap } from 'rxjs';
import { SecurityService } from '../../../config/services/security.service';
import { CreateService } from './create.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  hide = true;
  submitted = false;
  form: FormGroup = new FormGroup({
    rolename: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required]
    }),
  },
  );

  constructor(private createService: CreateService, private router: Router,
    private securityService: SecurityService) { }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  /**
   * Create a new user
   */
  create() {
    if (!this.form.valid) return;
    this.submitted = true;
    this.createService.create({
      rolename: this.f['rolename'].value,
    }).pipe(first(),
      tap(x => console.log(x)),
      catchError(error => {
        this.securityService.handleError(error);
        return of();
      }))
      .subscribe(x => {
        console.log('role created');
        this.submitted = false;
        this.router.navigate(['admin/roles/list'])
      });
  }

}
