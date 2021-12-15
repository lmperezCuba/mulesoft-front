import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from '../config/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  incorrectCredentials = false;

  constructor(private securityService: SecurityService) {
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

  logIn(){
    const logged = this.securityService.logIn(this.f['username'].value, this.f['password'].value);
    if(logged === false){
      this.incorrectCredentials = true;
    }
  }
}
