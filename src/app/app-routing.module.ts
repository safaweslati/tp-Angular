import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { MiniWordComponent } from './mini-word/mini-word.component';
import { TestComponent } from './directive/test/test.component';
import {StreamsComponent} from "./streams/streams.component";
import {ProductsListComponent} from "./product/products-list/products-list.component";
import {CustomPreloadingStrategy} from "./custom-preloading-strategy";


const routes: Routes = [
  { path: 'word', component: MiniWordComponent },
  { path: 'rainbow', component: TestComponent },
  { path: 'streams', component: StreamsComponent },
  { path: 'product', component: ProductsListComponent},
  {path: 'login' , loadChildren: () => import('./login-form/auth.module').then((m) => m.AuthModule)},
  {path: '', loadChildren: () =>
      import('./CV/cv.module').then((m) => m.CvModule) ,
       data: { preload : true }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: CustomPreloadingStrategy}) ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
