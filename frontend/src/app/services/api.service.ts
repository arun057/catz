import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  API_SERVER = environment.api_server;

  constructor(private httpClient: HttpClient) { }

  public getCats(query) {
    let params = new HttpParams();
    for (const key in query) {
      if (query[key]) {
        params = params.set(key, query[key]);
      }
    }

    console.log(params);

    return this.httpClient.get(`${this.API_SERVER}/cats`, {params});
  }

  public getRandomCat() {
    return this.httpClient.get(`${this.API_SERVER}/cats/random`);
  }

}
