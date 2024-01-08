import { CurrencyPipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Car, User, Rental, RentalStatus, CarStatus, Booking } from '../models/car.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


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
  error = "";
  userExists : any;
  submitted = false;
  isDisplayed = false;

  constructor(private fb: FormBuilder, private carService : CarService, 
    private bookingService: BookingService, private router:Router) { }

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
  }

get bookingFormControl() {  return this.bookingForm.controls;}

manageSearch(){}

async booking(){
  this.submitted = true;
  if (!this.bookingForm.valid) { return }
  this.isDisplayed = true;

  const {fname, lname, address, email, telephone} = this.bookingForm.value;

  let result = await this.addUser()
  if (!result){
       if( this.userExists.fname != fname || this.userExists.lname != lname ) {
         this.error = "This email has differnt information"
       }
     }

    let carBooking : Booking = {
      location: this.location, bookingId : this.carService.getBookingRefId(5),
      carType : this.cCar.type, pickupDate : this.pickupDate, pickupTime : this.pickupTime,
      dropoffDate : this.dropoffDate, dropoffTime : this.dropoffTime, status: RentalStatus.Booked,
      name : fname + " " + lname, telefone : telephone + "", email : email + "",
      carPrice : this.cPrice, totalCharge: this.cPrice * this.nDays,
      bookedDate: formatDate( new Date().toISOString(), 'dd/MM/yyyy hh:mm', 'en-US', 'GMT+3'),
    };    
   
    this.sendEmail(carBooking);
 
    await this.carService.addCarBooking(carBooking)
      .then ((data) => {
        localStorage.clear();
        let booking = new Booking ();
        booking.name = fname + " " + lname;
        booking.bookingId = carBooking.bookingId;
        this.bookingService.updateBooking(booking);
        this.isDisplayed = false
        this.router.navigate(['/confirm'])
      })
  }

async addUser(): Promise<boolean> {
  const {fname, lname, address, email, telephone} = this.bookingForm.value;
      let user = await this.carService.getUserById(email)
      if (user.exists()) 
        {
        this.userExists = user.data();
          return false
        } 
      else {  return true  }
}

async sendEmail(carBooking: Booking) {
 emailjs.init('Ucyn5-8454HN88rA9');
 let result = await  emailjs.send("service_3denl6r","template_8xsk62j",{
  to_name: "Bulsho team",
  subject: "Booking Ref Id: " +  carBooking.bookingId ,
  reply_to: carBooking.email,
  name: carBooking.name,
  carType: carBooking.carType,
  startDate: carBooking.pickupDate,
  endDate: carBooking.dropoffDate,
  total: "$" + carBooking.totalCharge,
  email: carBooking.email,
  tel: carBooking.telefone
  });    
}

}
