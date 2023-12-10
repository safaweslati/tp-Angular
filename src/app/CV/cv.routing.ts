import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CvComponent} from "./cv/cv.component";
import {authGuard} from "./guards/auth.guard";
import {cvResolver} from "./resolvers/cv.resolver";
import {AddCvComponent} from "./add-cv/add-cv.component";
import {hasUnsavedChangesGuard} from "./guards/has-unsaved-changes.guard";
import {detailsCvResolver} from "./resolvers/details-cv.resolver";
import {DetailsCvComponent} from "./details-cv/details-cv.component";
import {MasterDetailComponent} from "./master-detail/master-detail.component";

const routes: Routes = [
  {
    path: 'cv' ,
    canActivate: [authGuard],
    children: [
      {path: '', component: CvComponent, resolve: {cvs: cvResolver}},
      { path: 'add',  component: AddCvComponent, canDeactivate: [hasUnsavedChangesGuard] },
      { path: 'add/:id', component: AddCvComponent, canDeactivate: [hasUnsavedChangesGuard]},
      { path: ':id', component: DetailsCvComponent , resolve: {cv : detailsCvResolver}},

    ],
  },
  { path: '', redirectTo: '/cv', pathMatch: 'full' },

  { path: 'list' ,
    component: MasterDetailComponent,
    canActivate: [authGuard],
    resolve: {cvs: cvResolver},
    children:[
      { path: ':id' ,
        component: DetailsCvComponent,
        resolve: {cv: detailsCvResolver}
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvRouting {}
