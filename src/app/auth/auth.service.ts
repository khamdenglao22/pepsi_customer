import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  login(phone: string | null | undefined, otp: string | null | undefined) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(
      `${this.url}/login`,
      {
        phone,
        otp,
      },
      { headers: headers }
    );
  }

  sendOtp(phone: string | null | undefined) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(
      `${this.url}/otp/send`,
      {
        phone,
      },
      { headers: headers }
    );
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  decodeToken() {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token) as any;
    }
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
