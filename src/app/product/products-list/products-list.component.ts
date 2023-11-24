import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products$!: Observable<Product[]>;
  products: Product[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.productService
      .getProducts(12, this.products.length)
      .subscribe((newProducts) => {
        // console.log(newProducts.products);

        this.products = [...this.products, ...newProducts.products];
        this.products$ = of(this.products);
      });
  }
}
