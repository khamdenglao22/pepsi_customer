import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileUserService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getProfile() {
    return this.httpClient.get(`${this.url}/customers/profile`);
  }

  pointHistories(pageNumber: any, pageSize: any) {
    return this.httpClient.get(
      `${this.url}/customers/point-histories?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  prizeHistories(pageNumber: any, pageSize: any) {
    return this.httpClient.get(
      `${this.url}/customers/prize-histories?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
