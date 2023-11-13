import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserLogin } from '../models/UserLogin';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  emailInputInFocus = false;
  passwordInputInFocus = false;
  constructor(
    private authentificationService: AuthentificationService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required],
        asyncValidators: [],
        updateOn: 'change',
      }),
      password: new FormControl(null, {
        validators: [Validators.minLength(4), Validators.required],
        asyncValidators: [],
        updateOn: 'change',
      }),
    });
  }

  get email(): AbstractControl {
    return this.form.get('email')!;
  }
  get password(): AbstractControl {
    return this.form.get('password')!;
  }
  // logout() {
  //   // remove user from local storage and set current user to null
  //   // localStorage.removeItem('currentUser');
  //   // this.currentUserSubject.next(null);
  // }
  handleSubmit() {
    const userLogin: UserLogin = this.form.value;
    this.authentificationService.login(userLogin).subscribe(
      (response: User) => {
        // console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['cv']);
      },
      (error) => {
        this.toastr.error('wrong credentials');
      }
    );
  }
}
