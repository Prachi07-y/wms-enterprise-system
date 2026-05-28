import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  private apiUrl = `${environment.apiUrl}/Dashboard`;

  constructor(private http: HttpClient) {}

  getSummary(): Observable<any> {

    return this.http.get(`${this.apiUrl}/summary`);

  }

}