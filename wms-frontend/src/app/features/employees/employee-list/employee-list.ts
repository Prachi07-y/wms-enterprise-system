
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { Sidebar } from '../../../layouts/sidebar/sidebar';
import { Navbar } from '../../../layouts/navbar/navbar';

import { EmployeeService } from '../../../services/employee';
import { DashboardService } from '../../../services/dashboard';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Sidebar,
    Navbar
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})

export class EmployeeList implements OnInit {

  employees: any[] = [];

  filteredEmployees: any[] = [];

  searchText = '';

  showModal = false;

  isEditMode = false;

  employeeData: any = {

    employeeId: 0,

    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    doj: '',

    departmentId: 1,
    roleId: 1,

    status: 'Active'

  };

 constructor(
  private employeeService: EmployeeService,
  private dashboardService: DashboardService,
  private cdr: ChangeDetectorRef,
) {}

  ngOnInit(): void {

    this.getEmployees();

  }

  getEmployees() {

    this.employeeService
      .getEmployees()
      .subscribe({

        next: (res) => {

          this.employees = res;

          this.filteredEmployees = res;
          this.dashboardService.employees = res;
          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  searchEmployee() {

    const search = this.searchText.toLowerCase();

    this.filteredEmployees =
      this.employees.filter((employee) =>

        employee.firstName
          .toLowerCase()
          .includes(search)

        ||

        employee.lastName
          .toLowerCase()
          .includes(search)

        ||

        employee.email
          .toLowerCase()
          .includes(search)

      );

  }

  openModal() {

    this.isEditMode = false;

    this.showModal = true;

  }

  closeModal() {

    this.showModal = false;

  }

  editEmployee(employee: any) {

    this.isEditMode = true;

    this.showModal = true;

    this.employeeData = {

      employeeId: employee.employeeId,

      firstName: employee.firstName,
      lastName: employee.lastName,

      email: employee.email,

      phoneNumber: employee.phoneNumber,

      dob: employee.dob?.split('T')[0],

      doj: employee.doj?.split('T')[0],

      departmentId: employee.departmentId,

      roleId: employee.roleId,

      status: employee.status

    };

  }

  addEmployee() {

    if (this.isEditMode) {

      this.employeeService
        .updateEmployee(this.employeeData)
        .subscribe({

          next: () => {

            Swal.fire(
              'Success',
              'Employee updated successfully.',
              'success'
            );

            this.closeModal();

            this.getEmployees();

          },

          error: (err) => {

            console.log(err);

            Swal.fire(
              'Error',
              err.error?.message || 'Failed to update employee.',
              'error'
            );

          }

        });

    }

    else {

      this.employeeService
        .addEmployee(this.employeeData)
        .subscribe({

          next: () => {

            Swal.fire(
              'Success',
              'Employee added successfully.',
              'success'
            );

            this.closeModal();

            this.getEmployees();

            this.employeeData = {

              employeeId: 0,

              firstName: '',
              lastName: '',
              email: '',
              phoneNumber: '',
              dob: '',
              doj: '',

              departmentId: 1,
              roleId: 1,

              status: 'Active'

            };

          },

          error: (err) => {

            console.log(err);

            Swal.fire(
              'Error',
              err.error?.message || 'Failed to add employee.',
              'error'
            );

          }

        });

    }

  }
  getDepartmentName(
  departmentId: number
): string {

  switch (departmentId) {

    case 1:
      return 'HR';

    case 2:
      return 'IT';

    case 3:
      return 'Finance';

    case 101:
      return 'HR';

    case 102:
      return 'IT';

    default:
      return 'Operations';

  }

}

  deleteEmployee(id: number) {

    Swal.fire({

      title: 'Delete Employee?',

      text: 'This action cannot be undone.',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#ef4444',

      cancelButtonColor: '#64748b',

      confirmButtonText: 'Yes, Delete'

    }).then((result) => {

      if (result.isConfirmed) {

        this.employeeService
          .deleteEmployee(id)
          .subscribe({

            next: () => {

              Swal.fire(
                'Deleted!',
                'Employee deleted successfully.',
                'success'
              );

              this.getEmployees();

            },

            error: (err) => {

              console.log(err);

              Swal.fire(
                'Error',
                err.error?.message || 'Failed to delete employee.',
                'error'
              );

            }

          });

      }

    });

  }

}