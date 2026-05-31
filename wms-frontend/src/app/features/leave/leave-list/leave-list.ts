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

import { LeaveService }
from '../../../services/leave';

import { EmployeeService }
from '../../../services/employee';

import { AuthService }
from '../../../services/auth';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Sidebar,
    Navbar
  ],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.css'
})

export class LeaveList
implements OnInit {

  showModal = false;

  searchText = '';

  leaveRequests: any[] = [];

  filteredLeaves: any[] = [];

  employees: any[] = [];

  pendingCount = 0;

  approvedCount = 0;

  rejectedCount = 0;

  leaveData: any = {

    leaveId: 0,

    employeeId: 1,

    leaveType: 'Sick Leave',

    startDate: '',

    endDate: '',

    reason: '',

    status: 'Pending'

  };

  constructor(

    private leaveService:
      LeaveService,

    private employeeService:
      EmployeeService,

    public authService:
      AuthService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.getEmployees();

    this.getLeaves();

  }

  // GET LEAVES

  getLeaves() {

    this.leaveService
      .getLeaves()
      .subscribe({

        next: (res: any) => {

          // ADMIN → ALL LEAVES

          if (
            this.authService.isAdmin()
          ) {

            this.leaveRequests =
              res;

          }

          // EMPLOYEE → ONLY OWN LEAVES

          else {

            const employeeId =

              this.authService
                .getEmployeeId();

            this.leaveRequests =

              res.filter(

                (x: any) =>

                  x.employeeId ===
                  employeeId

              );

          }

          this.filteredLeaves =
            this.leaveRequests;

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

    this.pendingCount =

      this.leaveRequests.filter(

        (x: any) =>

          x.status === 'Pending'

      ).length;

    this.approvedCount =

      this.leaveRequests.filter(

        (x: any) =>

          x.status === 'Approved'

      ).length;

    this.rejectedCount =

      this.leaveRequests.filter(

        (x: any) =>

          x.status === 'Rejected'

      ).length;

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

  // APPLY LEAVE

  applyLeave() {

    // AUTO SET EMPLOYEE ID

    this.leaveService
      .addLeave(this.leaveData)
      .subscribe({

        next: () => {

          Swal.fire(

            'Success',

            'Leave request submitted.',

            'success'

          );

          this.closeModal();

          this.getLeaves();

          this.leaveData = {

            leaveId: 0,

            employeeId: 1,

            leaveType: 'Sick Leave',

            startDate: '',

            endDate: '',

            reason: '',

            status: 'Pending'

          };

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire(

            'Error',

            'Failed to submit leave.',

            'error'

          );

        }

      });

  }

  // SEARCH

  searchLeave() {

    const search =

      this.searchText
        .toLowerCase();

    this.filteredLeaves =

      this.leaveRequests.filter(

        (leave: any) =>

          this.getEmployeeName(
            leave.employeeId
          )

          .toLowerCase()

          .includes(search)

      );

    this.cdr.detectChanges();

  }

  // APPROVE

  approveLeave(leave: any) {

    this.leaveService
      .approveLeave(
        leave.leaveId
      )
      .subscribe({

        next: () => {

          Swal.fire(

            'Approved',

            'Leave request approved.',

            'success'

          );

          this.getLeaves();

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire(

            'Error',

            'Failed to approve leave.',

            'error'

          );

        }

      });

  }

  // REJECT

  rejectLeave(leave: any) {

    this.leaveService
      .rejectLeave(
        leave.leaveId
      )
      .subscribe({

        next: () => {

          Swal.fire(

            'Rejected',

            'Leave request rejected.',

            'warning'

          );

          this.getLeaves();

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire(

            'Error',

            'Failed to reject leave.',

            'error'

          );

        }

      });

  }

  // DELETE

  deleteLeave(leave: any) {

    this.leaveService
      .deleteLeave(
        leave.leaveId
      )
      .subscribe({

        next: () => {

          Swal.fire(

            'Deleted',

            'Leave deleted successfully.',

            'success'

          );

          this.getLeaves();

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire(

            'Error',

            'Failed to delete leave.',

            'error'

          );

        }

      });

  }

}