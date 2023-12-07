import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-rentavailable',
  templateUrl: './rentavailable.component.html',
  styleUrls: ['./rentavailable.component.css']
})
export class RentavailableComponent implements OnInit {
  public availCarsData! : Observable<any>;
  querySnapshotList: Record<string, any> = [];


  constructor(private carService: CarService) { }

  ngOnInit(): void {
    let carSearchForm= localStorage.getItem("searchForm") + "";
    var searchFormValue = carSearchForm?.split('|');
    var loc = searchFormValue[0];
    const pickupDate = searchFormValue[1];
    const pickupTime = searchFormValue[2];
    const dropoffDate = searchFormValue[3];
    const dropoffTime = searchFormValue[4];
  
    this.getAvailableCars();
  }
  
  gatAllCars(){
    this.availCarsData = this.carService.getAllCars();
  }

  getAvailableCars(){
     this.querySnapshotList = this.carService.getAvailableCars("21/11/2023");
  }
  
  carBooking(key: string, car:Car){
    localStorage.setItem("currentCar", key + '|' +  car.registration  + '|' + car.location + '|' + car.make + '|' + car.model + '|'+ car.type + '|' + car.price );
  }

}
