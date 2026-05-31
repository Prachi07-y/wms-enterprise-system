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

export class AnnouncementService {

  private apiUrl =
    `${environment.apiUrl}/Announcements`;

  constructor(
    private http: HttpClient
  ) {}

  getAnnouncements(): Observable<any[]> {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  addAnnouncement(
    announcement: any
  ) {

    return this.http.post(
      this.apiUrl,
      announcement
    );

  }

  updateAnnouncement(
    announcement: any
  ) {

    return this.http.put(
      this.apiUrl,
      announcement
    );

  }

  deleteAnnouncement(
    id: number
  ) {

    return this.http.delete(

      `${this.apiUrl}/${id}`

    );

  }

}