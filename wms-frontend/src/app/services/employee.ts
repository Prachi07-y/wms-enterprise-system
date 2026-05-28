import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private apiUrl = `${environment.apiUrl}/Employees`;

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {

    return this.http.get(this.apiUrl);

  }

  addEmployee(data: any): Observable<any> {

    return this.http.post(this.apiUrl, data);

  }

  updateEmployee(data: any): Observable<any> {

  return this.http.put(
    `${this.apiUrl}/${data.employeeId}`,
    data
  );

}

  deleteEmployee(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/${id}`);

  }
}
