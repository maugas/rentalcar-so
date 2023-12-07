import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {
  public locsData! : Observable<any>;
  querySnapshotList: Record<string, any> = [];

  locId:string ="";


  public totalPages: number = 0;
  public page: number = 1;

  constructor(private fb: FormBuilder, private carService : CarService ) { }
    
  ngOnInit(): void {
    this.getBookedReservations();
  }

  manageCar() {}

  clearForm(){
  }

  saveLocation(){
     // this.carService.updateLocation(this.locId, this.locationForm);
   
    this.clearForm();
  }

  editLoc(loc:any){

  }

  deleteLoc(id:string){
    this.carService.deleteLocation(id);
  }

  getBookedReservations(){
    this.querySnapshotList = this.carService.getBookedReservations("Mogadishu");
  }

}
