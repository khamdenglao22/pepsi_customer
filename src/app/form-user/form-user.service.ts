import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FormUserService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  findProvinces(lang: string | null) {
    return this.httpClient.get(`${this.url}/provinces?lang=${lang}`);
  }

  findDistricts(lang: string | null, province_id: any) {
    return this.httpClient.get(
      `${this.url}/districts?lang=${lang}&province_id=${province_id}`
    );
  }

  findVillages(lang: string | null, province_id: any, district_id: any) {
    return this.httpClient.get(
      `${this.url}/villages?lang=${lang}&province_id=${province_id}&district_id=${district_id}`
    );
  }

  updateProfile(data: any) {
    return this.httpClient.put(`${this.url}/customers/profile`, data);
  }
}
