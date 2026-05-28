import { Injectable }
from '@angular/core';

import { HttpClient }
from '@angular/common/http';

import { Observable }
from 'rxjs';

import { environment }
from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class EmployeeProjectAllocationService {

  private apiUrl =

    `${environment.apiUrl}/EmployeeProjectAllocation`;

  constructor(
    private http: HttpClient
  ) {}

  // GET ALLOCATIONS

  getAllocations(): Observable<any> {

    return this.http.get(
      this.apiUrl
    );

  }

}