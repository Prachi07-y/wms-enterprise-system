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

import { AttendanceService }
from '../../../services/attendance';

import { EmployeeService }
from '../../../services/employee';

import { AuthService }
from '../../../services/auth';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Sidebar,
    Navbar
  ],
  templateUrl: './attendance-list.html',
  styleUrl: './attendance-list.css'
})

export class AttendanceList
implements OnInit {

  searchText = '';

  showModal = false;

  attendanceRecords: any[] = [];

  filteredAttendance: any[] = [];

  employees: any[] = [];

  presentCount = 0;

  absentCount = 0;

  attendanceRate = 0;

  attendanceData: any = {

    attendanceId: 0,

    employeeId: 1,

    date: '',

    status: 'Present'

  };

  constructor(

    private attendanceService:
      AttendanceService,

    private employeeService:
      EmployeeService,

    public authService:
      AuthService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.getEmployees();

    this.getAttendance();

  }

  // GET ATTENDANCE

  getAttendance() {

    this.attendanceService
      .getAttendance()
      .subscribe({

        next: (res: any) => {

          // ADMIN → ALL DATA

          if (
            this.authService.isAdmin()
          ) {

            this.attendanceRecords =
              res;

          }

          // EMPLOYEE → ONLY OWN DATA

          else {

            const employeeId =

              this.authService
                .getEmployeeId();

            this.attendanceRecords =

              res.filter(

                (x: any) =>

                  x.employeeId ===
                  employeeId

              );

          }

          this.filteredAttendance =
            this.attendanceRecords;

          this.calculateStats();

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  // GET EMPLOYEES

  getEmployees() {

    this.employeeService
      .getEmployees()
      .subscribe({

        next: (res: any) => {

          this.employees = res;

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  // GET EMPLOYEE NAME

  getEmployeeName(
    employeeId: number
  ): string {

    const employee =

      this.employees.find(

        (x: any) =>

          x.employeeId ===
          employeeId

      );

    return employee

      ? `${employee.firstName}
         ${employee.lastName}`

      : 'Unknown Employee';

  }

  // CALCULATE STATS

  calculateStats() {

    this.presentCount =

      this.attendanceRecords.filter(

        (x: any) =>

          x.status ===
          'Present'

      ).length;

    this.absentCount =

      this.attendanceRecords.filter(

        (x: any) =>

          x.status ===
          'Absent'

      ).length;

    const total =
      this.attendanceRecords.length;

    this.attendanceRate =

      total > 0

      ? Math.round(

          (
            this.presentCount
            / total
          ) * 100

        )

      : 0;

  }

  // OPEN MODAL

  openModal() {

    this.showModal = true;

    this.cdr.detectChanges();

  }

  // CLOSE MODAL

  closeModal() {

    this.showModal = false;

    this.cdr.detectChanges();

  }

  // ADD ATTENDANCE

  addAttendance() {

    // AUTO SET EMPLOYEE ID

    if (
      this.authService.isEmployee()
    ) {

      this.attendanceData.employeeId =

        this.authService
          .getEmployeeId();

    }

    this.attendanceService
      .addAttendance(
        this.attendanceData
      )
      .subscribe({

        next: () => {

          Swal.fire(

            'Success',

            'Attendance marked successfully.',

            'success'

          );

          this.closeModal();

          this.getAttendance();

          this.attendanceData = {

            attendanceId: 0,

            employeeId: 1,

            date: '',

            status: 'Present'

          };

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire(

            'Error',

            'Failed to mark attendance.',

            'error'

          );

        }

      });

  }

  // SEARCH

  searchAttendance() {

    const search =

      this.searchText
        .toLowerCase();

    this.filteredAttendance =

      this.attendanceRecords.filter(

        (record: any) =>

          this.getEmployeeName(
            record.employeeId
          )

          .toLowerCase()

          .includes(search)

      );

    this.cdr.detectChanges();

  }

  // DELETE

  deleteAttendance(record: any) {

    this.attendanceService
      .deleteAttendance(
        record.attendanceId
      )
      .subscribe({

        next: () => {

          Swal.fire(

            'Deleted',

            'Attendance deleted successfully.',

            'success'

          );

          this.getAttendance();

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire(

            'Error',

            'Failed to delete attendance.',

            'error'

          );

        }

      });

  }

}