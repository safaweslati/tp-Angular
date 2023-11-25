import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiniWordComponent } from './mini-word/mini-word.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CvComponent } from './CV/cv/cv.component';
import { ListeComponent } from './CV/liste/liste.component';
import { ItemComponent } from './CV/item/item.component';
import { DetailsComponent } from './CV/details/details.component';
import { ArcEnCielDirective } from './directive/arc-en-ciel.directive';
import { TestComponent } from './directive/test/test.component';
import { ToastrModule } from 'ngx-toastr';
import { EmbaucheComponent } from './CV/embauche/embauche.component';
import { DefaultImagePipe } from './CV/pipes/default-image.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DetailsCvComponent } from './CV/details-cv/details-cv.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProductModule } from './product/product.module';
import { StreamsComponent } from './streams/streams.component';

@NgModule({
  declarations: [
    AppComponent,
    MiniWordComponent,
    CvComponent,
    ListeComponent,
    ItemComponent,
    DetailsComponent,
    ArcEnCielDirective,
    TestComponent,
    EmbaucheComponent,
    DefaultImagePipe,
    DetailsCvComponent,
    HeaderComponent,
    LoginFormComponent,
    StreamsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ProductModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
