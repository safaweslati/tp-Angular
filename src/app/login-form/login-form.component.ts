import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from './Models/UserLogin';
import { ToastrService } from 'ngx-toastr';
import {AuthentificationService} from "./service/authentification.service";

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
    private authentificationService: AuthentificationService ,
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

  handleSubmit() {
    const userLogin: UserLogin = this.form.value;
    this.authentificationService.login(userLogin).subscribe(
      (response) => {
        this.router.navigate(['cv']);
      },
      (error) => {
        this.toastr.error('wrong credentials');
      }
    );
  }
}
