import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class PackagePageService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  allPrize() {
    return this.httpClient.get(`${this.url}/prizes/manual`);
  }

  getProfile() {
    return this.httpClient.get(`${this.url}/customers/profile`);
  }

  prizeExchange(prize_id: any, store_id: any) {
    return this.httpClient.post(
      `${this.url}/prizes/manual/exchange?prize_id=${prize_id}&store_id=${store_id}`,
      null
    );
  }
}
