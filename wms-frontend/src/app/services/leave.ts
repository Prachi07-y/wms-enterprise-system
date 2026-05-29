import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import {
  HttpClient
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LeaveService {

 private apiUrl =
  `${environment.apiUrl}/Leave`;

  constructor(
    private http: HttpClient
  ) {}

  // GET ALL LEAVES

  getLeaves(): Observable<any[]> {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  // ADD LEAVE

  addLeave(leave: any) {

    return this.http.post(
      this.apiUrl,
      leave
    );

  }

  // UPDATE LEAVE

  updateLeave(leave: any) {

    return this.http.put(

      this.apiUrl,

      leave

    );

  }

  // DELETE LEAVE

  deleteLeave(id: number) {

    return this.http.delete(

      `${this.apiUrl}/${id}`

    );

  }

  // APPROVE LEAVE

  approveLeave(id: number) {

    return this.http.put(

      `${this.apiUrl}/approve/${id}`,

      {}

    );

  }

  // REJECT LEAVE

  rejectLeave(id: number) {

    return this.http.put(

      `${this.apiUrl}/reject/${id}`,

      {}

    );

  }

}