import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MES_CONSTANTES } from 'src/config/constantes.config';
import { Product } from '../models/product';
import { ProductsResponse } from '../models/ProductsResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = MES_CONSTANTES.product;

  constructor(private http: HttpClient) {}
  getProducts(
    limit: number = 12,
    skip: number = 0
  ): Observable<ProductsResponse> {
    const params = {
      limit: limit.toString(),
      skip: skip.toString(),
    };

    return this.http.get<ProductsResponse>(this.api, { params });
  }
}
