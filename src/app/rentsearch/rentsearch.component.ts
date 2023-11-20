import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Observable, map } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-rentsearch',
  templateUrl: './rentsearch.component.html',
  styleUrls: ['./rentsearch.component.css']
})
export class RentsearchComponent implements OnInit {
  locations! : Observable<any>;
  currentDate = "";
  minReturnDate = "";
  maxDate = "";

  carsData! : Observable<any>;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.gatAllLocations();
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(this.currentDate)

    var sdate = new Date();
    sdate.setDate(sdate.getDate() + 1);
    console.log("sdate :" + sdate);
    var minReturnDate = formatDate(new Date(sdate), "yyyy-MM-dd", 'en')
    console.log("minReturnDate :" + minReturnDate);

  }

  gatAllLocations(){
    this.locations = this.carService.getAllLocations();
  }

  getAvailableCars(dt:string){
    this.carsData = this.carService.getAllCars();
    
    console.log(this.carsData)
    this.carsData.pipe( map((items:any) => {
          items.filter ((item:any) => item.status === "Available")
      }
      )).subscribe((data)=> {  
        console.log("data------")   
        console.log(data);
      })

   }
    
  
}

