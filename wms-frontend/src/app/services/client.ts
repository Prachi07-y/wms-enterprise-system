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

export class ClientService {

  private apiUrl =
    `${environment.apiUrl}/Clients`;

  constructor(
    private http: HttpClient
  ) {}

  getClients(): Observable<any[]> {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  addClient(client: any) {

    return this.http.post(
      this.apiUrl,
      client
    );

  }

  updateClient(client: any) {

    return this.http.put(
      this.apiUrl,
      client
    );

  }

  deleteClient(id: number) {

    return this.http.delete(

      `${this.apiUrl}/${id}`

    );

  }

}