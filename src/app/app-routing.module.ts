import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from './CV/cv/cv.component';
import { DetailsCvComponent } from './CV/details-cv/details-cv.component';
import { MiniWordComponent } from './mini-word/mini-word.component';
import { TestComponent } from './directive/test/test.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  {
    path: 'cv',
    children: [
      { path: '', component: CvComponent },
      { path: ':id', component: DetailsCvComponent },
    ],
  },
  { path: '', redirectTo: '/cv', pathMatch: 'full' },
  { path: 'word', component: MiniWordComponent },
  { path: 'rainbow', component: TestComponent },
  { path: 'login', component: LoginFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
