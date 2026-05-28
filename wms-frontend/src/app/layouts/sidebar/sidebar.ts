import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})

export class Sidebar {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  // LOGOUT

  logout() {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}