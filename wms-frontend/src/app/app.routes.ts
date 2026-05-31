import { Routes } from '@angular/router';

import { Login }
from './features/auth/login/login';

import { DashboardHome }
from './features/dashboard/dashboard-home/dashboard-home';

import { EmployeeList }
from './features/employees/employee-list/employee-list';

import { AttendanceList }
from './features/attendance/attendance-list/attendance-list';

import { LeaveList }
from './features/leave/leave-list/leave-list';

import { ProjectList }
from './features/projects/project-list/project-list';

import { authGuard }
from './guards/auth-guard';
import { ClientList }
from './features/client/client-list/client-list';

export const routes: Routes = [

  // LOGIN

  {
    path: '',
    component: Login
  },

  {
    path: 'login',
    component: Login
  },

  // DASHBOARD

  {
    path: 'dashboard',
    component: DashboardHome,
    canActivate: [authGuard]
  },

  // EMPLOYEES
  // ADMIN ONLY

  {
    path: 'employees',
    component: EmployeeList,

    canActivate: [authGuard],

    data: {
      role: 'Admin'
    }

  },

  // ATTENDANCE

  {
    path: 'attendance',
    component: AttendanceList,
    canActivate: [authGuard]
  },

  // LEAVES

  {
    path: 'leaves',
    component: LeaveList,
    canActivate: [authGuard]
  },

  // PROJECTS

  {
    path: 'projects',
    component: ProjectList,
    canActivate: [authGuard]
  },
  {
  path: 'clients',
  component: ClientList
},

  // INVALID ROUTES

  {
    path: '**',
    redirectTo: 'login'
  }
  

];