import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { CarsComponent } from './admin/cars/cars.component';
import { RentsearchComponent } from './rentsearch/rentsearch.component';
import { RentavailableComponent } from './rentavailable/rentavailable.component';
import { RentbookingComponent } from './rentbooking/rentbooking.component';
import { RentconfirmComponent } from './rentconfirm/rentconfirm.component';
import { RentalsComponent } from './admin/rentals/rentals.component';
import { LocationsComponent } from './admin/locations/locations.component';
import { UsersComponent } from './admin/users/users.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AuthguardService } from './services/authguard.service';
import { BookingComponent } from './admin/booking/booking.component';
import { ReportListComponent } from './admin/report-list/report-list.component';
import { ReportComponent } from './admin/report/report.component';

const routes: Routes = [
  {path:"admin", component:AdminComponent, children: [
    {path:"cars", component:CarsComponent,  canActivate : [AuthguardService]},
    {path:"booking", component:BookingComponent, canActivate : [AuthguardService]},
    {path:"rentals", component:RentalsComponent, canActivate : [AuthguardService]},
    {path:"locations", component:LocationsComponent, canActivate : [AuthguardService]},
    {path:"users", component:UsersComponent, canActivate : [AuthguardService]},
    {path:"reports", component:ReportListComponent, canActivate : [AuthguardService]},
    {path:"report", component:ReportComponent, canActivate : [AuthguardService]},
    {path:"report/:id", component:ReportComponent, canActivate : [AuthguardService]},
    {path:"", component:BookingComponent, canActivate : [AuthguardService]},
  ]
},
  {path:"admin", component: AdminComponent, children: [
    {path:"login", component:LoginComponent },
    {path:"", redirectTo:"login", pathMatch:"full"},
    {path:"**", redirectTo:"login", pathMatch:"full"},
  ]},
  {path:"search", component: RentsearchComponent },
  {path:"available", component: RentavailableComponent },
  {path:"booking", component: RentbookingComponent },
  {path:"confirm", component: RentconfirmComponent},
  {path:"about", component: AboutComponent},
  {path:"contact", component: ContactComponent},
  {path:'', redirectTo:"search", pathMatch:"full"},
  {path:'**', redirectTo:"search", pathMatch:"full"},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
