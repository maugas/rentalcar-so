import { CurrencyPipe, formatCurrency, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { doc } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { BookingRef, Rental, RentalStatus, Type } from 'src/app/models/car.model';
import { BookingService } from 'src/app/services/booking.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})

export class RentalsComponent implements OnInit {
  querySnapshotList: Record<string, any> = [];
  public locsData! : Observable<any>;
  //querySnapshotList!: Observable<any>;
  querySearchList!: Observable<any>;
  locations! : Observable<any>;
  public totalPages: number = 0;
  public page: number = 1;
  userList : any;
  rentalAction ="New rental";
  currentDate ='';
  minReturnDate = '';
  type: typeof Type = Type;
  booking! : BookingRef;
  rental! : Rental;
  bookingNumber ="";
  rentalId ="";
  bookingId = "";
  rentalList :any;
  showRentalList = true;
  submitted = true;
  rentalKey = ""
  rentStatus: typeof RentalStatus = RentalStatus;
  userName = "";
  userTelephone ="";
  userEmail = "";
  coName="";
  coTelephone="";
  rentLocation = "";
 // docSnapshots = Promise<any[]>; 
 // tooltipTriggerList: NodeListOf<Element> = document.querySelectorAll('[data-bs-toggle="tooltip"]')
 // tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  constructor(private fb: FormBuilder, private carService : CarService, private bookingService: BookingService ) { }
  
    rentalForm = this.fb.group({
    fullname: [{value:'', disabled: true}], nname:[{value:'', disabled: true}], telephone:[{value:'', disabled: true} ], 
    email:[{value:'', disabled: true}], work:[{value:'', disabled: true}], 
    cosignerName:[{value:'', disabled: true}], cosignerTelephone:[{value:'', disabled: true}], cosignerWork:[{value:'', disabled: true}],
    location: [{value:'', disabled: true}], type: ['Type'], pickupDate:[''], dropoffDate:[''],
    registration: [''],  price: [''], discount:[''], totalCharge:[''], comment:[''], status:[RentalStatus]
  });

  
  ngOnInit(): void {
   // this.getAllRentals();
    //this.carService.getReports();
    this.rentalKey = "";
    this.getRentedRentals();
   // let docSnapshots = this.carService.getRentalsByStatus(this.rentStatus.Rented);
   // console.log('docSnapshots=' + docSnapshots);

  }

  get rentalFormControl() {  return this.rentalForm.controls;}

  getRentedRentals(){ 
    //this.querySnapshotList = this.carService.getAllRentals(); 
    this.querySnapshotList = this.carService.getRentalsByStatus(this.rentStatus.Rented);

  }

  clearForm(){  }

  updateRental(){
      this.submitted = true;
      if (!this.rentalForm.valid) { return }
    
      const {type, pickupDate, dropoffDate, registration, price, discount, totalCharge, comment, status} = this.rentalForm.value;
  
      const carRental = {
        pickupDate: pickupDate!,  dropoffDate: dropoffDate!, status:  status!,  carType: type!,
        registration: registration!, carPrice : Number(price?.replace(/[^0-9.-]+/g,"")),
        totalCharge: Number(totalCharge?.replace(/[^0-9.-]+/g,"")), discount : Number(discount), comment : comment!,
      };    
      this.carService.updateRental(this.rentalKey, carRental);
      this.rentalKey = "";
      this.getRentedRentals();  
      this.showRentalList = true;
    }

    cancelRental(){
    this.showRentalList = true;
  }

  editRental(id: string, rental:any){
    this.userName = "";
    this.userTelephone ="";
    this.userEmail = "";
    this.coName="";
    this.coTelephone="";
    this.rentLocation = "";
    this.bookingId = rental.value['bookingId'];
    this.rentalId = rental.value['rentalId'];

    this.showRentalList = false;
    this.rentalKey = id;
    this.rentalAction = "Rental No: " + rental.value['rentalId']
    this.userName = rental.value['userName'];
    this.userTelephone = rental.value['userTelephone'];
    this.userEmail = rental.value['userEmail'];
    if (rental.value['coName'].length > 0) { this.coName= "Co: " + rental.value['coName']  }
    if (rental.value['coTelephone'].length > 0) {  this.coTelephone= "Tel: " + rental.value['coTelephone']  }
    this.rentLocation = rental.value['location'];

    this.rentalForm.patchValue({
      fullname: this.userName, nname: rental.value['nname'], telephone: this.userTelephone , email: this.userEmail, 
      work:rental.value['userWork'], cosignerName: rental.value['coName'],  cosignerTelephone: rental.value['coTelephone'], 
      cosignerWork:rental.value['coWork'], location: rental.value['location'], type: rental.value['carType'],
      pickupDate:formatDate(new Date(rental.value['pickupDate']), 'yyyy-MM-dd', 'en'), 
      dropoffDate: formatDate(new Date(rental.value['dropoffDate']), 'yyyy-MM-dd', 'en'),
      registration: rental.value['registration'], price: formatCurrency(rental.value['carPrice'], 'en', '$'),
      discount:rental.discount, totalCharge: formatCurrency(rental.value['totalCharge'], 'en', '$'), 
      comment: rental.value['comment'], status:rental.value['status']
    })
  }

  reports(){
    
  }
  getBookedReservations(){
  }

  getReservationsByRefId(){
  }

}
