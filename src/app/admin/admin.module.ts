import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars/cars.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { RentalsComponent } from './rentals/rentals.component';
import { LocationsComponent } from './locations/locations.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';


@NgModule({
  declarations: [
    CarsComponent,
    AdminComponent,
    UsersComponent,
    RentalsComponent,
    LocationsComponent,
    LoginComponent,
    BookingComponent
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
