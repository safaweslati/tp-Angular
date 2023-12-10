import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiniWordComponent } from './mini-word/mini-word.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArcEnCielDirective } from './directive/arc-en-ciel.directive';
import { TestComponent } from './directive/test/test.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { StreamsComponent } from './streams/streams.component';
import { ProductItemComponent } from './product/product-item/product-item.component';
import { ProductsListComponent } from './product/products-list/products-list.component';
import {AuthentificationInterceptorProvider, AuthInterceptor} from "./auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    MiniWordComponent,
    ArcEnCielDirective,
    TestComponent,
    HeaderComponent,
    StreamsComponent,
    ProductItemComponent,
    ProductsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
   providers: [AuthentificationInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
