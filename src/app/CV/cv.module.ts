import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvComponent } from './cv/cv.component';
import { AddCvComponent } from './add-cv/add-cv.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import {DetailsComponent} from "./details/details.component";
import {ListeComponent} from "./liste/liste.component";
import {ItemComponent} from "./item/item.component";
import {EmbaucheComponent} from "./embauche/embauche.component";
import {DefaultImagePipe} from "./pipes/default-image.pipe";
import {MasterDetailComponent} from "./master-detail/master-detail.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CvRouting} from "./cv.routing";
import {AutocompleteComponent} from "./autocomplete/autocomplete.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthentificationInterceptorProvider, AuthInterceptor} from "../auth.interceptor";

@NgModule({
  declarations: [
    CvComponent,
    ListeComponent,
    ItemComponent,
    DetailsComponent,
    EmbaucheComponent,
    DefaultImagePipe,
    DetailsCvComponent,
    MasterDetailComponent,
    AddCvComponent,
    AutocompleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CvRouting
  ],
  providers: [],
})
export class CvModule {}
