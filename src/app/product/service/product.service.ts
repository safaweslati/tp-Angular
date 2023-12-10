import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { MES_CONSTANTES } from 'src/config/constantes.config';
import {Product} from "../Models/product";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = MES_CONSTANTES.product;
  private pageSize = MES_CONSTANTES.pageSize;


  constructor(private http: HttpClient) {}
  getProducts(skip: number = 0): Observable<Product[]> {
    return this.http
      .get<{ products: Product[] }>(`${this.api}?limit=${this.pageSize}&skip=${skip}`)
      .pipe(map((response) => response.products));
  }
}
