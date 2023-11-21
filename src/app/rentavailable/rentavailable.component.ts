import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-rentavailable',
  templateUrl: './rentavailable.component.html',
  styleUrls: ['./rentavailable.component.css']
})
export class RentavailableComponent implements OnInit {
  public availCarsData! : Observable<any>;
  public querySnapshotList : any[]=[];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getAvailableCars();
  }
  
  gatAllCars(){
    this.availCarsData = this.carService.getAllCars();
  }

  getAvailableCars(){
    // Initialize Firestore and get a reference to the service
     this.querySnapshotList = this.carService.getAvailableCars("21/11/2023");
  }
  

}
