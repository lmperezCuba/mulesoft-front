import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  incorrectCredentials = false;

  constructor(private loginService: LoginService, private router: Router,
    private permissionsService: NgxPermissionsService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  ngOnInit(): void {
    console.log('Not implementes yet');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  logIn() {
    this.loginService.login(this.f['username'].value, this.f['password'].value)
      .subscribe(res => {
        if (res) {
          this.permissionsService.loadPermissions(res['claims']);
          this.router.navigate(['/'])
        } else {
          this.incorrectCredentials = true;
        }
      })
  }
}
