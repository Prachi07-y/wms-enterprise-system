import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import {
  HttpClient
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private apiUrl = `${environment.apiUrl}/Project`;

  constructor(
    private http: HttpClient
  ) {}

  // GET ALL PROJECTS

  getProjects(): Observable<any[]> {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  // ADD PROJECT

  addProject(project: any) {

    return this.http.post(
      this.apiUrl,
      project
    );

  }

  // UPDATE PROJECT

  updateProject(project: any) {

    return this.http.put(

      this.apiUrl,

      project

    );

  }

  // DELETE PROJECT

  deleteProject(id: number) {

    return this.http.delete(

      `${this.apiUrl}/${id}`

    );

  }

}