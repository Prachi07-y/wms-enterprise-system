import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

  loginData = {

    username: '',

    password: ''

  };

  isLoading = false;

  constructor(

    private authService: AuthService,

    private router: Router

  ) {}

  login() {

    this.isLoading = true;

    this.authService
      .login(this.loginData)
      .subscribe({

        next: (res: any) => {

          // SAVE TOKEN

          this.authService
            .saveToken(res.token);

          // GET ROLE

          const role =
            this.authService.getRole();

          Swal.fire(

            'Success',

            'Login successful.',

            'success'

          );

          // ROLE-BASED REDIRECT

          if (role === 'Admin') {

            this.router.navigate([
              '/dashboard'
            ]);

          }

          else {

            this.router.navigate([
              '/dashboard'
            ]);

          }

          this.isLoading = false;

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire(

            'Error',

            'Invalid username or password.',

            'error'

          );

          this.isLoading = false;

        }

      });

  }

}