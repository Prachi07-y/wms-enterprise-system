import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl =
    `${environment.apiUrl}/Auth`;

  constructor(
    private http: HttpClient
  ) {}

  // LOGIN

  login(data: any): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/login`,
      data

    );

  }

  // SAVE TOKEN

  saveToken(token: string) {

    localStorage.setItem(
      'token',
      token
    );

  }

  // GET TOKEN

  getToken() {

    return localStorage.getItem(
      'token'
    );

  }

  // LOGOUT

  logout() {

    localStorage.removeItem(
      'token'
    );

  }

  // CHECK LOGIN

  isLoggedIn(): boolean {

    return !!this.getToken();

  }

  // GET PAYLOAD

  getPayload(): any {

    const token =
      this.getToken();

    if (!token) {

      return null;

    }

    return JSON.parse(

      atob(
        token.split('.')[1]
      )

    );

  }

  // GET ROLE

  getRole(): string {

    const payload =
      this.getPayload();

    return payload?.role || '';

  }

  // GET EMPLOYEE ID

  getEmployeeId(): number {

    const payload =
      this.getPayload();

    return Number(
      payload?.Employeeid
    );

  }

  // GET USERNAME

  getUsername(): string {

    const payload =
      this.getPayload();

    return payload?.unique_name || '';

  }

  // CHECK ADMIN

  isAdmin(): boolean {

    return this.getRole() === 'Admin';

  }

  // CHECK EMPLOYEE

  isEmployee(): boolean {

    return this.getRole() === 'Employee';

  }

}