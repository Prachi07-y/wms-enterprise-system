import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AttendanceService {

  private apiUrl =
    `${environment.apiUrl}/Attendance`;

  constructor(
    private http: HttpClient
  ) {}

  // GET ATTENDANCE

  getAttendance(): Observable<any[]> {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  // ADD ATTENDANCE

  addAttendance(attendance: any) {

    return this.http.post(
      this.apiUrl,
      attendance
    );

  }

  // DELETE ATTENDANCE

  deleteAttendance(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

  // MONTHLY ATTENDANCE

  getMonthlyAttendance(
    employeeId: number,
    year: number,
    month: number
  ) {

    return this.http.get(
      `${this.apiUrl}/monthly/${employeeId}/${year}/${month}`
    );

  }

  // CHECK IN

  checkIn(employeeId: number) {

    return this.http.post(

      `${this.apiUrl}/checkin/${employeeId}`,

      {},

      {
        responseType: 'text'
      }

    );

  }

  // CHECK OUT

  checkOut(employeeId: number) {

    return this.http.post(

      `${this.apiUrl}/checkout/${employeeId}`,

      {},

      {
        responseType: 'text'
      }

    );

  }

}