import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestpageComponent } from './testpage/testpage.component';
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
import { ModelsComponent } from './admin/models/models.component';

const routes: Routes = [
  {path:"test", component:TestpageComponent},
  {path:"search", component: RentsearchComponent },
  {path:"available", component: RentavailableComponent },
  {path:"booking", component: RentbookingComponent },
  {path:"confirm", component: RentconfirmComponent},
  {path:"admin", component:AdminComponent, children: [
    {path:"login", component:LoginComponent },
    {path:"cars", component:CarsComponent},
    {path:"reservations", component:RentalsComponent},
    {path:"locations", component:LocationsComponent},
    {path:"users", component:UsersComponent},
    {path:"models", component:ModelsComponent},
    {path:"login", component:LoginComponent},
    {path:"", component:LoginComponent}
  ]},
  {path:"", redirectTo:"search", pathMatch:"full"},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
