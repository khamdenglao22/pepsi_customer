import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  findCarts(lang: string | null, store_id: number | null) {
    return this.httpClient.get(
      `${this.url}/carts?lang=${lang}&store_id=${store_id}`
    );
  }

  addCarts(data: any) {
    return this.httpClient.post(`${this.url}/carts`, data);
  }

  updateCarts(data: any) {
    return this.httpClient.put(`${this.url}/carts`, data);
  }

  delateCarts(product_id: number | null) {
    return this.httpClient.delete(`${this.url}/carts?product_id=${product_id}`);
  }
}
