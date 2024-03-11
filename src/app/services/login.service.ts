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

  //iniciamos sesion y establecemos el token en localStorage

  public login(token: any) {
    localStorage.setItem('auth_token', token);
  }

  public isLoggedIn(): boolean {
    let tokenStr = localStorage.getItem('auth_token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    return true;
  }

  //Cerramos sesion y eliminamos token
  public logOut(): boolean {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return true;
  }

  //obtener el token
  public getToken(): any {
    return localStorage.getItem('auth_token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any {
    const userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logOut();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();

    if (user != null) {
      return user.authorities[0].authority;
    } else {
      return null;
    }
  }

  public getCurrentUser() {
    return this.http.get(`${baseUrl}actual-usuario`);
  }
}
