import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import Swal from 'sweetalert2';

import {
  Sidebar
} from '../../../layouts/sidebar/sidebar';

import {
  Navbar
} from '../../../layouts/navbar/navbar';

import {
  ClientService
} from '../../../services/client';
import {
  AuthService
} from '../../../services/auth';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Sidebar,
    Navbar
  ],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css'
})

export class ClientList
implements OnInit {

  clients: any[] = [];

  filteredClients: any[] = [];

  searchText = '';

  showModal = false;

  isEditMode = false;

  clientData: any = {

    clientId: 0,

    clientName: '',

    clientAddress: '',

    clientPhoneNumber: '',

    clientLocation: '',

    status: true

  };

  constructor(

  private clientService:
    ClientService,

  public authService:
    AuthService,

  private cdr:
    ChangeDetectorRef

) {}

  ngOnInit(): void {

    this.getClients();

  }

  // GET CLIENTS

  getClients() {

    this.clientService
      .getClients()
      .subscribe({

        next: (res: any) => {

          this.clients = res;

          this.filteredClients = res;

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  // OPEN MODAL

  openModal() {

    this.showModal = true;

  }

  // CLOSE MODAL

  closeModal() {

    this.showModal = false;

    this.isEditMode = false;

    this.clientData = {

      clientId: 0,

      clientName: '',

      clientAddress: '',

      clientPhoneNumber: '',

      clientLocation: '',

      status: true

    };

  }

  // ADD CLIENT

  addClient() {

    this.clientService
      .addClient(this.clientData)
      .subscribe({

        next: () => {

          Swal.fire(
            'Success',
            'Client added successfully',
            'success'
          );

          this.getClients();

          this.closeModal();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire(
            'Error',
            'Failed to add client',
            'error'
          );

        }

      });

  }

  // EDIT CLIENT

  editClient(client: any) {

    this.isEditMode = true;

    this.showModal = true;

    this.clientData = {

      ...client

    };

  }

  // UPDATE CLIENT

  updateClient() {

    this.clientService
      .updateClient(this.clientData)
      .subscribe({

        next: () => {

          Swal.fire(
            'Updated',
            'Client updated successfully',
            'success'
          );

          this.getClients();

          this.closeModal();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire(
            'Error',
            'Update failed',
            'error'
          );

        }

      });

  }

  // DELETE CLIENT

  deleteClient(id: number) {

    Swal.fire({

      title: 'Delete Client?',

      text:
        'This action cannot be undone.',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Delete'

    }).then((result) => {

      if (result.isConfirmed) {

        this.clientService
          .deleteClient(id)
          .subscribe({

            next: () => {

              Swal.fire(
                'Deleted',
                'Client deleted successfully',
                'success'
              );

              this.getClients();

            },

            error: (err: any) => {

              console.log(err);

            }

          });

      }

    });

  }

  // SEARCH

  searchClient() {

    const search =
      this.searchText.toLowerCase();

    this.filteredClients =

      this.clients.filter(

        (client: any) =>

          client.clientName
            ?.toLowerCase()
            .includes(search)

      );

  }

}