import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginFormComponent} from "./login-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthRouting} from "./auth.routing";



@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRouting
  ],

})
export class AuthModule { }
