import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../Models/product';
import {BehaviorSubject, concatMap, Observable, of, scan, takeWhile} from 'rxjs';
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products$ = new Observable<Product[]>();
  pageSize = new BehaviorSubject<number>(0);

  constructor(private productsService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.pageSize.pipe(
      concatMap((pageSize: number) =>
        this.productsService.getProducts(pageSize)
      ),
      scan((allProducts:Product[], products:Product[]) => {
        return [...allProducts, ...products];
      }, [])
    );
    }


    loadProducts(): void {
      if (this.pageSize.value + 12 < 100)
        this.pageSize.next(this.pageSize.value + 12);
      else this.pageSize.complete();
  }
}
