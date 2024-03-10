import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  //Generar token
  public generateToken(userName: String, password: String) {
    return this.http.post(`${baseUrl}generate-token`, { userName, password });
  }
}
