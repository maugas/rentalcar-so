import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Car, User, Rental, RentalStatus, CarStatus, Booking } from '../models/car.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-rentbooking',
  templateUrl: './rentbooking.component.html',
  styleUrls: ['./rentbooking.component.css']
})
export class RentbookingComponent implements OnInit {
  location = "";
  pickupDate = "";
  pickupTime ="";
  dropoffDate ="";
  dropoffTime = "";
  cCar = new Car();
  cCarKey = "";
  nDays = 0;
  cPrice = 0;
  userData = new User();

  constructor(private fb: FormBuilder, private carService : CarService, 
    private bookingService: BookingService , private router:Router) { }

  bookingForm = this.fb.group({
    fname: new FormControl('', [Validators.required, Validators.minLength(3)]), 
    lname: new FormControl('', [Validators.required, Validators.minLength(3)]), 
    address: new FormControl(''), 
    email: new FormControl('', [Validators.required, Validators.email]), 
    telephone: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  ngOnInit(): void {
    let carSearchForm= localStorage.getItem("searchForm") + "";
    var searchFormValue = carSearchForm?.split('|');
    this.location = searchFormValue[0];
    this.pickupDate = formatDate(searchFormValue[1], "dd-MMM-YYYY", 'en');
    this.pickupTime = searchFormValue[2];
    this.dropoffDate = formatDate(searchFormValue[3], "dd-MMM-YYYY", 'en');
    this.dropoffTime = searchFormValue[4];
    this.nDays = Number(searchFormValue[5]);

    let currentCar= localStorage.getItem("currentCar") + "";
    var carValues = currentCar?.split('|');
    this.cCar.id = carValues[0];
    this.cCar.registration = carValues[1];
    this.cCar.location = carValues[2];
    this.cCar.make = carValues[3];
    this.cCar.model = carValues[4];
    this.cCar.type = carValues[5];
    this.cCar.price = carValues[6];
    this.cPrice = Number(this.cCar.price);

    this.bookingService.currentBooking.subscribe(data => console.log(data))
  }


  fname(){
   return this.bookingForm.get('fname')
 }

 lname(){
  return this.bookingForm.get('lname')
}

  manageSearch(){}

  async booking(){

    await this.addUser();
    let carRental : Rental = {
      location: this.location,
      bookingId : this.carService.getBookingRefId(5),
      pickupDate : this.pickupDate,
      pickupTime : this.pickupTime,
      dropoffDate : this.dropoffDate,
      dropoffTime : this.dropoffTime,
      status: RentalStatus.Booked,
      carId: this.cCar.id + "",
      registration: this.cCar.registration,
      userId : this.userData.id + "",
      userName : this.userData.fname + " " + this.userData.lname,
      userPhone : this.userData.telephone + "",
      userAddress : this.userData.address + "",
      userEmail : this.userData.email + "",
      carPrice : this.cPrice,
      totalCharge: this.cPrice * this.nDays,
      discount : 0,
      tax:0,
      otherCharge: 0,
      bookedDate: formatDate( new Date().toISOString(), 'dd/MM/yyyy hh:mm', 'en-US', 'GMT+3'),
    };    

  await this.carService.addCarRental(carRental)
    .then ((data) => {
      // update the car make it booked
      console.log("Updating the car id " + this.cCar.id + " status: " + CarStatus.booked )
      console.log("Booking id: " + carRental.bookingId);
      this.carService.updateCarStatus(this.cCar.id+'', CarStatus.booked);
      
      localStorage.clear();
      let booking = new Booking ();
        booking.name = this.userData.fname + " " + this.userData.lname;
        booking.refrence = carRental.bookingId;

        this.bookingService.updateBooking(booking);

      localStorage.setItem("userName", this.userData.fname + " " + this.userData.lname );
      localStorage.setItem("userEmail", this.userData.email)
      localStorage.setItem("bookingRefId", carRental.bookingId)
      
      this.router.navigate(['/confirm'])

    } )
   

  }

async addUser(){
  const {fname, lname, email, telephone} = this.bookingForm.value;

  this.userData = {
    fname: fname +"",
    mname:  "",
    lname: lname + "",
    address: "",
    email: email + "",
    telephone: telephone + "",
    coSigner: "",
   };

let userId = "";

await this.carService.addUser(this.userData)
   .then( data => userId = data.id);
  this.userData.id = userId;

}

}
