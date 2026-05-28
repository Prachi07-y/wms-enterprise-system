import { Component }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import { AuthService }
from '../../services/auth';
import { EmployeeService }
from '../../services/employee';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {
  employeeName = '';

  constructor(

  public authService:
    AuthService,

  private employeeService:
    EmployeeService

) {

  this.loadEmployee();

}
loadEmployee() {

  const employeeId =

    this.authService
      .getEmployeeId();

  if (!employeeId) {

    return;

  }

  this.employeeService
    .getEmployees()
    .subscribe({

      next: (res: any) => {

        const employee =

          res.find(

            (x: any) =>

              x.employeeId ===
              employeeId

          );

        if (employee) {

          this.employeeName =

            `${employee.firstName}
             ${employee.lastName}`;

        }

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}

}