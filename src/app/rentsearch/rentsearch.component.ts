import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Observable, map } from 'rxjs';
import { formatDate } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder, private carService: CarService) { }

  searchForm = this.fb.group({
    pickupLoc: new FormControl('', [Validators.required]), 
    pickupDate: [''], dropoffDate: [''], pickupTime: ['10:30'], 
    dropoffTime: ['10:30'], dropoffLoc: ['']
  });

  ngOnInit(): void {
    this.gatAllLocations();
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(this.currentDate)

    var sdate = new Date();
    sdate.setDate(sdate.getDate() + 1);
    console.log("sdate :" + sdate);
    var minReturnDate = formatDate(new Date(sdate), "yyyy-MM-dd", 'en')
    console.log("minReturnDate :" + minReturnDate);
    
    localStorage.setItem("searchForm", "")
  }

  gatAllLocations(){
    this.locations = this.carService.getAllLocations();
  }

  getAvailableCars(){
    const {pickupLoc, pickupDate, pickupTime, dropoffDate, dropoffTime } = this.searchForm.value;
    var days =this.carService.calculateDiffDates(pickupDate, dropoffDate);
    localStorage.setItem("searchForm", pickupLoc+"|"+pickupDate+"|"+ pickupTime+"|"+ dropoffDate+"|"+ dropoffTime + "|" + days);
  }
    
  manageSearch(){}
}

