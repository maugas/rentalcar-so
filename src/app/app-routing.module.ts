import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestpageComponent } from './testpage/testpage.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { CarsComponent } from './admin/cars/cars.component';
import { RentsearchComponent } from './rentsearch/rentsearch.component';
import { RentavailableComponent } from './rentavailable/rentavailable.component';
import { RentbookingComponent } from './rentbooking/rentbooking.component';

const routes: Routes = [
  {path:"test", component:TestpageComponent},
  {path:"search", component: RentsearchComponent },
  {path:"available", component: RentavailableComponent },
  {path:"booking", component: RentbookingComponent },
  {path:"admin", component:AdminComponent, children: [
    {path:"login", component:LoginComponent },
    {path:"cars", component:CarsComponent},
    {path:"", component:AdminComponent}
  ]},
  {path:"", redirectTo:"search", pathMatch:"full"},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
