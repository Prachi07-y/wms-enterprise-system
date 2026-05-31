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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  monthlyReport: any = null;

selectedEmployeeId = 0;

selectedYear = new Date().getFullYear();

selectedMonth = new Date().getMonth() + 1;

  attendanceData: any = {

  attendanceId: 0,

  employeeId: 1,

  date: '',

  checkIn: '',

  checkOut: '',

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
              this.attendanceRecords.forEach((x: any) => {

  if (x.checkIn) {

    x.checkIn = new Date(x.checkIn);

  }

  if (x.checkOut) {

    x.checkOut = new Date(x.checkOut);

  }

});

          }

          // EMPLOYEE → ONLY OWN DATA

          this.attendanceRecords = res;

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
          if (res.length > 0) {

  this.selectedEmployeeId =
    res[0].employeeId;

}

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

        Number(x.employeeId) ===
        Number(employeeId)

    );

  return employee

    ? `${employee.firstName} ${employee.lastName}`

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
  loadMonthlyAttendance() {

  this.attendanceService
    .getMonthlyAttendance(
      this.selectedEmployeeId,
      this.selectedYear,
      this.selectedMonth
    )
    .subscribe({

      next: (res: any) => {

        this.monthlyReport = res;

        this.cdr.detectChanges();

      },

      error: (err: any) => {

        console.log(err);

        Swal.fire(
          'Error',
          'Failed to load monthly report.',
          'error'
        );

      }

    });

}
downloadPdf() {

  if (!this.monthlyReport) {

    Swal.fire(
      'Warning',
      'Load a monthly report first.',
      'warning'
    );

    return;

  }

  const doc = new jsPDF();

  const employee = this.employees.find(
  (e: any) =>
    Number(e.employeeId) ===
    Number(this.selectedEmployeeId)
);

const employeeName = employee
  ? `${employee.firstName} ${employee.lastName}`
  : 'Unknown Employee';

  doc.setFontSize(18);

  doc.text(
    'Monthly Attendance Report',
    14,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Employee: ${employeeName}`,
    14,
    35
  );

  doc.text(
    `Year: ${this.selectedYear}`,
    14,
    45
  );

  doc.text(
    `Month: ${this.selectedMonth}`,
    14,
    55
  );

  doc.text(
    `Present Days: ${this.monthlyReport.totalPresent}`,
    14,
    65
  );

  doc.text(
    `Absent Days: ${this.monthlyReport.totalAbsent}`,
    14,
    75
  );

  doc.text(
    `Attendance Percentage: ${this.monthlyReport.attendancePercentage}%`,
    14,
    85
  );

  autoTable(doc, {

    startY: 95,

    head: [[
      'Date',
      'Check In',
      'Check Out',
      'Status'
    ]],

    body: this.monthlyReport.records.map(
      (record: any) => [

        new Date(record.date)
          .toLocaleDateString(),

        record.checkIn
          ? new Date(record.checkIn)
              .toLocaleTimeString()
          : '-',

        record.checkOut
          ? new Date(record.checkOut)
              .toLocaleTimeString()
          : '-',

        record.status

      ]
    )

  });

  doc.save(
    `Attendance_Report_${employeeName}.pdf`
  );

}
checkIn() {

  const employeeId =
    this.selectedEmployeeId;

  this.attendanceService
    .checkIn(employeeId)
    .subscribe({

      next: () => {

        Swal.fire(
          'Success',
          'Checked In Successfully',
          'success'
        );

        this.getAttendance();

      },

      error: (err: any) => {

        console.log(err);

        Swal.fire(
          'Error',
          'Check In Failed',
          'error'
        );

      }

    });

}
checkOut() {

  const employeeId =
    this.selectedEmployeeId;

  this.attendanceService
    .checkOut(employeeId)
    .subscribe({

      next: () => {

        Swal.fire(
          'Success',
          'Checked Out Successfully',
          'success'
        );

        this.getAttendance();

      },

      error: (err: any) => {

        console.log(err);

        Swal.fire(
          'Error',
          'Check Out Failed',
          'error'
        );

      }

    });

}

}