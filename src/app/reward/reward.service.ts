import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  allPrize() {
    return this.httpClient.get(`${this.url}/games/prize`);
  }

  updateGame(data: any) {
    return this.httpClient.post(`${this.url}/games/prize`, data);
  }

  getGames(gameId: any) {
    return this.httpClient.get(`${this.url}/games/${gameId}`);
  }
}
