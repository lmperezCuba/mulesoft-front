import { Component, OnInit } from '@angular/core';
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
export class CreateComponent implements OnInit {
  submitted = false;
  form: FormGroup = new FormGroup({
    name: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required]
    }),
    price: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required, Validators.pattern('([0-9]*)(.[0-9]+)?')]
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

  /**
 * Create a new user
 */
  create() {
    if (!this.form.valid) return;
    this.submitted = true;
    this.createService.create({
      name: this.f['name'].value,
      price: this.f['price'].value,
    }).pipe(first(),
      tap(x => console.log(x)),
      catchError(error => {
        this.securityService.handleError(error);
        return of();
      }))
      .subscribe(x => {
        console.log('product created');
        this.submitted = false;
        this.router.navigate(['admin/products/list'])
      });
  }

}
