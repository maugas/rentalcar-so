import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Observable, map } from 'rxjs';
import { formatDate } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  formErr = 0;
  submitted = false;

  carsData! : Observable<any>;

  constructor(private fb: FormBuilder, private carService: CarService, private router: Router) { }

  searchForm = this.fb.group({
    pickupLoc: new FormControl('', [Validators.required]), 
    pickupDate: ['', [Validators.required]], dropoffDate: ['', [Validators.required]], pickupTime: ['10:30'], 
    dropoffTime: ['10:30'], dropoffLoc: ['']
  });

  ngOnInit(): void {
    this.gatAllLocations();
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'GMT+3');
    var sdate = new Date();
    sdate.setDate(sdate.getDate() + 1);
    var minReturnDate = formatDate(new Date(sdate), "yyyy-MM-dd", 'en')
  }

  get searchFormControl() { return this.searchForm.controls; }

  onChange(){
    this.formErr = 0;
    const {pickupLoc, pickupDate, pickupTime, dropoffDate, dropoffTime } = this.searchForm.value;
    let sDate = String(pickupDate).split('-');
    var newDate = new Date(Number(sDate[0]), Number(sDate[1])-1, Number(sDate[2]));
    this.minReturnDate = formatDate(new Date(this.addDays(newDate, 1)), "yyyy-MM-dd", 'en');
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}

  gatAllLocations(){
    this.locations = this.carService.getAllLocations();
  }

  getAvailableCars(){
    this.submitted = true;
    this.formErr = 0;
    if (!this.searchForm.valid) {
      return
    }
    const {pickupLoc, pickupDate, pickupTime, dropoffDate, dropoffTime } = this.searchForm.value;
    var days =this.carService.calculateDiffDates(pickupDate, dropoffDate);

    if (days < 1){
      this.formErr = 5;
      return
    }

    localStorage.setItem("searchForm", pickupLoc+"|"+pickupDate+"|"+ pickupTime+"|"+ dropoffDate+"|"+ dropoffTime + "|" + days);

    this.router.navigate(['/available'])

  }
    
  manageSearch(){}
}

