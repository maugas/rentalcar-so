import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars/cars.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { RentalsComponent } from './rentals/rentals.component';
import { ModelsComponent } from './models/models.component';
import { LocationsComponent } from './locations/locations.component';


@NgModule({
  declarations: [
    CarsComponent,
    AdminComponent,
    UsersComponent,
    RentalsComponent,
    ModelsComponent,
    LocationsComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class AdminModule { }
