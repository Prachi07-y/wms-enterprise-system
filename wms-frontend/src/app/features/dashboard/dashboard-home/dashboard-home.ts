import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Chart,
  registerables
} from 'chart.js';

import { Sidebar }
from '../../../layouts/sidebar/sidebar';

import { Navbar }
from '../../../layouts/navbar/navbar';

import { EmployeeService }
from '../../../services/employee';

import { ProjectService }
from '../../../services/project';
import { ClientService }
from '../../../services/client';
import { AnnouncementService }
from '../../../services/announcement';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Sidebar,
    Navbar
  ],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css'
})

export class DashboardHome
implements OnInit {

  totalEmployees = 0;

  activeEmployees = 0;


  totalProjects = 0;
  totalClients = 0;

  chart: any;

  // ANNOUNCEMENT MODAL

  showAnnouncementModal = false;

  isEditAnnouncement = false;

  editingIndex = -1;

 announcementData: any = {

  announcementId: 0,

  title: '',

  message: '',

  createdBy: '',

  createdOn: new Date(),

  isActive: true

};

  // DYNAMIC ANNOUNCEMENTS

 announcements: any[] = [];

  constructor(

    private employeeService:
      EmployeeService,

    private projectService:
      ProjectService,

    private clientService:
      ClientService,
      private announcementService:
  AnnouncementService,


    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadDashboardData();

    this.loadProjects();
     this.loadClients();
     this.loadAnnouncements();

  }

  // LOAD PROJECTS

  loadProjects() {

    this.projectService
      .getProjects()
      .subscribe({

        next: (res: any) => {

          this.totalProjects =
            res.length;

          this.cdr.detectChanges();

          setTimeout(() => {

            this.renderChart();

          }, 100);

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }
  // LOAD CLIENTS

loadClients() {

  this.clientService
    .getClients()
    .subscribe({

      next: (res: any[]) => {

        this.totalClients =
          res.length;

        this.cdr.detectChanges();

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}
loadAnnouncements() {

  this.announcementService
    .getAnnouncements()
    .subscribe({

      next: (res: any[]) => {

        this.announcements = res;

        this.cdr.detectChanges();

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}

  // LOAD DASHBOARD DATA

  loadDashboardData() {

    this.employeeService
      .getEmployees()
      .subscribe({

        next: (res: any[]) => {

          this.totalEmployees =
            res.length;

          this.activeEmployees =

            res.filter(

              employee =>

                employee.status ===
                'Active'

            ).length;

          this.cdr.detectChanges();

          setTimeout(() => {

            this.renderChart();

          }, 100);

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  // RENDER CHART

  renderChart() {

    if (this.chart) {

      this.chart.destroy();

    }

    this.chart = new Chart(

      'employeeChart',

      {

        type: 'bar',

        data: {

          labels: [

            'Employees',

            'Active',

           

            'Projects',
             'Clients'

          ],

          datasets: [

            {

              label:
                'WMS Statistics',

              data: [

                this.totalEmployees,

                this.activeEmployees,

               

                this.totalProjects,
                  this.totalClients


              ],

              borderRadius: 12

            }

          ]

        },

        options: {

          responsive: true,

          plugins: {

            legend: {

              display: false

            }

          }

        }

      }

    );

  }

  // OPEN MODAL

  openAnnouncementModal() {

    this.isEditAnnouncement =
      false;

    this.showAnnouncementModal =
      true;

  }

  // CLOSE MODAL

  closeAnnouncementModal() {

    this.showAnnouncementModal =
      false;

  }

  // EDIT ANNOUNCEMENT

 editAnnouncement(
  announcement: any,
  index: number
) {

  this.isEditAnnouncement =
    true;

  this.editingIndex = index;

  this.showAnnouncementModal =
    true;

  this.announcementData = {

    announcementId:
      announcement.announcementId,

    title:
      announcement.title,

    message:
      announcement.message,

    createdBy:
      announcement.createdBy,

    createdOn:
      announcement.createdOn,

    isActive:
      announcement.isActive

  };

}

  // ADD / UPDATE ANNOUNCEMENT

  addAnnouncement() {

  if (
    this.isEditAnnouncement
  ) {

    this.announcementService
      .updateAnnouncement(
        this.announcementData
      )
      .subscribe({

        next: () => {

          this.loadAnnouncements();

          this.closeAnnouncementModal();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  else {

    this.announcementData.createdBy =
      'Employee';

    this.announcementService
      .addAnnouncement(
        this.announcementData
      )
      .subscribe({

        next: () => {

          this.loadAnnouncements();

          this.closeAnnouncementModal();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}

  // DELETE ANNOUNCEMENT

 deleteAnnouncement(
  id: number
) {

  this.announcementService
    .deleteAnnouncement(id)
    .subscribe({

      next: () => {

        this.loadAnnouncements();

      },

      error: (err) => {

        console.log(err);

      }

    });

}

}