import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  findStores(lang: string | null, store_id: number | null) {
    return this.httpClient.get(
      `${this.url}/stores?lang=${lang}&store_id=${store_id}`
    );
  }


  findProducts(lang: string | null, store_id: number | null,pageNumber:any,pageSize:any) {
    return this.httpClient.get(
      `${this.url}/products?lang=${lang}&store_id=${store_id}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }


}
