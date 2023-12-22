import { formatCurrency, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Booking, Rental, RentalStatus } from 'src/app/models/car.model';
import { BookingService } from 'src/app/services/booking.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public locsData! : Observable<any>;
  querySnapshotList: Record<string, any> = [];
  querySearchList: Record<string, any> = []
  locId:string ="";
  public totalPages: number = 0;
  public page: number = 1;
  
  bookingId = "";
  bookingKey ="";

  rentalAction = "New Rental";
  currentDate ='';
  showBookingList = true;
  submitted = false;
  showBookingInfo: any;

  isBookingInfo = false;
  

  constructor(private fb: FormBuilder, private carService : CarService, 
    private bookingService: BookingService, private router: Router ) { }
  
  rentalForm = this.fb.group({
    search: [''],     fullname: [''], nname:[''], telephone:[''], email:[''], work:[''], 
    cosignerName:[''], cosignerTelephone:[''], cosignerWork:[''],
    location: ['Location'], type: ['Type'], pickupDate:[''], dropoffDate:[''],
    registration: ['', [Validators.required, Validators.minLength(5)]],  price: [''],
     discount:[0], totalCharge:[''], comment:['']

  });

   
  ngOnInit(): void {
    this.getBookedReservations();
  }

  get rentalFormControl() {  return this.rentalForm.controls;}

  manageCar() {}

  onChange() {}
  onChangeType(type : any){}

  cancelRental(){
    this.showBookingList = true;
  }

  rentIt(refId:string, booking:any){
     // Need the refId to update the bookings table
     // need the booking to pass the rental service 
     this.bookingId = booking.value['bookingId'];
     this.bookingKey = booking.key;
     this.isBookingInfo = false;
     this.showBookingList = false;
     this.rentalAction = "Rental process"
     
     this.rentalForm.patchValue({
       fullname: booking.value['name'], nname: '', telephone: booking.value['telefone'] , email: booking.value['email'], 
       work:'', cosignerName:'',  cosignerTelephone:'', cosignerWork:'',
       location: booking.value['location'], type: booking.value['carType'],
       pickupDate:formatDate(new Date(booking.value['pickupDate']), 'yyyy-MM-dd', 'en'), 
       dropoffDate: formatDate(new Date(booking.value['dropoffDate']), 'yyyy-MM-dd', 'en'),
       registration: '', 
       price: formatCurrency(booking.value['carPrice'], 'en', '$'),
       discount:0, totalCharge: formatCurrency(booking.value['totalCharge'], 'en', '$'), 
       comment:''
     })
   }

   newRent(){
    this.isBookingInfo = false;
    this.showBookingList = false;
    this.rentalAction = "New Rent"

   }

  clearForm(){
  }

  saveRental(){
    this.submitted = true;
    if (!this.rentalForm.valid) { return }
  
    const {fullname, nname, telephone, email, work, 
      cosignerName, cosignerTelephone, cosignerWork, 
      location, type, pickupDate, dropoffDate, registration,
      price, discount, totalCharge, comment} = this.rentalForm.value;

    let carRental : Rental = {
      rentalId: 'R-' + this.carService.getBookingRefId(5),
      location: location!,
      bookingId: this.bookingId,
      pickupDate: pickupDate!,
      pickupTime: formatDate( new Date().toISOString(), 'hh:mm', 'en-US', 'GMT+3'),
      dropoffDate: dropoffDate!,
      dropoffTime: formatDate( new Date().toISOString(), 'hh:mm', 'en-US', 'GMT+3'),
      status:  RentalStatus.Rented,
      registration: registration!,
      carType: type!,
      userEmail : email!,
      userName : fullname!,
      userTelephone : telephone!, 
      nname: nname!,
      userWork:work!,
      coName: cosignerName!,
      coTelephone: cosignerTelephone!, 
      coWork: cosignerWork!,
      carPrice : Number(price?.replace(/[^0-9.-]+/g,"")),
      totalCharge: Number(totalCharge?.replace(/[^0-9.-]+/g,"")),
      discount : Number(discount),
      tax: 0,
      otherCharge: 0,
      comment : comment!,

    };    

    this.carService.saveRental( carRental);
    this.carService.updateRentalStatus (this.bookingKey, RentalStatus.Rented);
    this.showBookingList = true;
    this.router.navigate(["/admin/rentals"]);
  }

  editBooking(booking:any){  
    this.isBookingInfo = true;
    this.showBookingInfo = booking;
    let start = booking.value['pickupDate'];
    let end = booking.value['dropoffDate'];
    let email = booking.value['email'];
    let status = booking.value['status'];


   // alert( 'Email: ' + email  + ' Status' + status )
  }

  deleteReservation(id:string){
    this.carService.deleteReservation(id);
    this.getBookedReservations();
  }

  getBookedReservations(){
    this.querySnapshotList = this.carService.getBookedReservations("Mogadishu");
  }

  getReservationsByRefId(){
    const  {search} = this.rentalForm.value;
    if (search?.length != 0){
       if (search?.includes('@')){
        this.querySnapshotList = this.carService.getBookedReservationByEmail(search!);
       } else {    
        this.querySnapshotList = this.carService.getReservationsByRefId(search!);
       }
    }else
    {
      this.getBookedReservations();
    }

  }

  cancelReservation(id:string, status:RentalStatus){
    if (status != RentalStatus.Cancelled) {
      this.carService.updateRentalStatus(id, RentalStatus.Cancelled);
      this.getBookedReservations();
    }
      this.isBookingInfo = false;
  }


  acceptReservation(id:string, status:RentalStatus){
    if (status == RentalStatus.Cancelled) {
      this.carService.updateRentalStatus(id, RentalStatus.Booked);
      this.getBookedReservations();
    }
    this.isBookingInfo = false;
  }
}

