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

  announcementData = {

    title: '',

    message: '',

    time: 'Today'

  };

  // DYNAMIC ANNOUNCEMENTS

  announcements = [

    {
      title: 'Team Meeting',

      message:
        'Weekly team sync scheduled at 4 PM.',

      time: 'Today'
    },

    {
      title: 'Leave Policy Update',

      message:
        'HR updated the leave approval guidelines.',

      time: 'Yesterday'
    },

    {
      title: 'New Project Launch',

      message:
        'Project Phoenix officially starts Monday.',

      time: '2 Days Ago'
    }

  ];

  constructor(

    private employeeService:
      EmployeeService,

    private projectService:
      ProjectService,

    private clientService:
      ClientService,


    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadDashboardData();

    this.loadProjects();
     this.loadClients();

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

      title:
        announcement.title,

      message:
        announcement.message,

      time:
        announcement.time

    };

  }

  // ADD / UPDATE ANNOUNCEMENT

  addAnnouncement() {

    if (
      this.isEditAnnouncement
    ) {

      this.announcements[
        this.editingIndex
      ] = {

        ...this.announcementData

      };

    }

    else {

      this.announcements.unshift({

        ...this.announcementData

      });

    }

    this.cdr.detectChanges();

    this.closeAnnouncementModal();

    this.announcementData = {

      title: '',

      message: '',

      time: 'Today'

    };

  }

  // DELETE ANNOUNCEMENT

  deleteAnnouncement(
    index: number
  ) {

    this.announcements.splice(
      index,
      1
    );

    this.cdr.detectChanges();

  }

}