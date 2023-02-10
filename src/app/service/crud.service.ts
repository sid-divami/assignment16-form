import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  serviceURL: string;
  constructor(private http: HttpClient) {
    this.serviceURL = 'http://localhost:3000/users';
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.serviceURL, user);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceURL);
  }
}

export function getUniqueId(parts: number): string {
  const stringArr = [];
  for (let i = 0; i < parts; i++) {
    // tslint:disable-next-line:no-bitwise
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');
}
