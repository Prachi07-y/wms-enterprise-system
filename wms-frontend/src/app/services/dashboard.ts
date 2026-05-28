import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  employees: any[] = [];

  attendance: any[] = [];

  leaves: any[] = [];

  projects: any[] = [];

}
