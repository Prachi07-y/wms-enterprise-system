import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import Swal from 'sweetalert2';

import { Sidebar }
from '../../../layouts/sidebar/sidebar';

import { Navbar }
from '../../../layouts/navbar/navbar';

import { ProjectService }
from '../../../services/project';

import { AuthService }
from '../../../services/auth';

import { EmployeeProjectAllocationService }
from '../../../services/employee-project-allocation';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Sidebar,
    Navbar
  ],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})

export class ProjectList
implements OnInit {

  showModal = false;

  isEditMode = false;

  searchText = '';

  projects: any[] = [];

  filteredProjects: any[] = [];

  pendingProjects = 0;

  inProgressProjects = 0;

  completedProjects = 0;

  projectData: any = {

    projectId: 0,

    projectName: '',

    manager: '',

    deadline: '',

    status: 'Pending'

  };

  constructor(

    private projectService:
      ProjectService,

    public authService:
      AuthService,

    private allocationService:
      EmployeeProjectAllocationService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.getProjects();

  }

  // GET PROJECTS

  getProjects() {

    this.projectService
      .getProjects()
      .subscribe({

        next: (res: any) => {

          // ADMIN → ALL PROJECTS

          if (
            this.authService.isAdmin()
          ) {

            this.projects = res;

            this.filteredProjects = res;

            this.calculateStats();

            this.cdr.detectChanges();

          }

          // EMPLOYEE → ONLY ASSIGNED PROJECTS

          else {

            this.loadEmployeeProjects(
              res
            );

          }

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  // LOAD EMPLOYEE PROJECTS

  loadEmployeeProjects(
    allProjects: any[]
  ) {

    this.allocationService
      .getAllocations()
      .subscribe({

        next: (allocations: any) => {

          const employeeId =

            this.authService
              .getEmployeeId();

          // GET ASSIGNED PROJECT IDS

          const assignedProjectIds =

            allocations

              .filter(

                (x: any) =>

                  x.empId ===
                  employeeId

              )

              .map(

                (x: any) =>

                  x.projectId

              );

          // FILTER PROJECTS

          this.projects =

            allProjects.filter(

              (project: any) =>

                assignedProjectIds.includes(
                  project.projectId
                )

            );

          this.filteredProjects =
            this.projects;

          this.calculateStats();

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  // CALCULATE STATS

  calculateStats() {

    this.pendingProjects =

      this.projects.filter(

        x => x.status ===
        'Pending'

      ).length;

    this.inProgressProjects =

      this.projects.filter(

        x => x.status ===
        'In Progress'

      ).length;

    this.completedProjects =

      this.projects.filter(

        x => x.status ===
        'Completed'

      ).length;

  }

  // OPEN MODAL

  openModal() {

    this.isEditMode = false;

    this.showModal = true;

    this.cdr.detectChanges();

  }

  // CLOSE MODAL

  closeModal() {

    this.showModal = false;

    this.cdr.detectChanges();

  }

  // ADD / UPDATE PROJECT

  addProject() {

    // UPDATE

    if (this.isEditMode) {

      this.projectService
        .updateProject(
          this.projectData
        )
        .subscribe({

          next: () => {

            Swal.fire(

              'Success',

              'Project updated successfully.',

              'success'

            );

            this.closeModal();

            this.getProjects();

            this.cdr.detectChanges();

          },

          error: (err: any) => {

            console.log(err);

            Swal.fire(

              'Error',

              'Failed to update project.',

              'error'

            );

          }

        });

    }

    // ADD

    else {

      this.projectService
        .addProject(
          this.projectData
        )
        .subscribe({

          next: () => {

            Swal.fire(

              'Success',

              'Project added successfully.',

              'success'

            );

            this.closeModal();

            this.getProjects();

            this.projectData = {

              projectId: 0,

              projectName: '',

              manager: '',

              deadline: '',

              status: 'Pending'

            };

            this.cdr.detectChanges();

          },

          error: (err: any) => {

            console.log(err);

            Swal.fire(

              'Error',

              'Failed to add project.',

              'error'

            );

          }

        });

    }

  }

  // SEARCH PROJECT

  searchProject() {

    const search =

      this.searchText
        .toLowerCase();

    this.filteredProjects =

      this.projects.filter(

        (project) =>

          project.projectName
            ?.toLowerCase()
            .includes(search)

          ||

          project.manager
            ?.toLowerCase()
            .includes(search)

      );

    this.cdr.detectChanges();

  }

  // EDIT PROJECT

  editProject(project: any) {

    this.isEditMode = true;

    this.showModal = true;

    this.projectData = {

      projectId:
        project.projectId,

      projectName:
        project.projectName,

      manager:
        project.manager,

      deadline:
        project.deadline
          ?.split('T')[0],

      status:
        project.status

    };

    this.cdr.detectChanges();

  }

  // DELETE PROJECT

  deleteProject(project: any) {

    this.projectService
      .deleteProject(
        project.projectId
      )
      .subscribe({

        next: () => {

          Swal.fire(

            'Deleted',

            'Project deleted successfully.',

            'success'

          );

          this.getProjects();

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire(

            'Error',

            'Failed to delete project.',

            'error'

          );

        }

      });

  }

}