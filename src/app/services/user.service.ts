import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from '../interface/userNew';
import baseUrl from './helper';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  //opcion para cuando el back no devuelva la respuesta en json y solo un string
  //public registrarUser(newUser: NewUser) {
  //  return this.httpClient.post(`${baseUrl}Usuario/`, newUser, {
  //    responseType: 'text',
  //  });
  //}

  public registrarUser(newUser: NewUser) {
    return this.httpClient.post(`${baseUrl}Usuario/`, newUser);
  }
}
