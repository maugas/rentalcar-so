import { CurrencyPipe, formatCurrency, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  public locsData! : Observable<any>;
  querySnapshotList!: Observable<any>;
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

  constructor(private fb: FormBuilder, private carService : CarService,
              private bookingService: BookingService ) { }
  
    rentalForm = this.fb.group({
    fullname: [{value:'', disabled: true}], nname:[{value:'', disabled: true}], telephone:[{value:'', disabled: true} ], 
    email:[{value:'', disabled: true}], work:[{value:'', disabled: true}], 
    cosignerName:[{value:'', disabled: true}], cosignerTelephone:[{value:'', disabled: true}], cosignerWork:[{value:'', disabled: true}],
    location: [{value:'', disabled: true}], type: ['Type'], pickupDate:[''], dropoffDate:[''],
    registration: [''],  price: [''],
    discount:[''], totalCharge:[''], comment:[''], status:[RentalStatus]

  });

  
  ngOnInit(): void {
    this.getAllRentals();
    this.rentalKey = "";
  }

  get rentalFormControl() {  return this.rentalForm.controls;}

  getAllRentals(){
    this.querySnapshotList = this.carService.getAllRentals();
  }

  manageCar() {}
  onChange() {}
  onChangeType(type: any){}

  clearForm(){  }

  updateRental(){
      this.submitted = true;
      if (!this.rentalForm.valid) { return }
    
      const { type, pickupDate, dropoffDate, registration,
        price, discount, totalCharge, comment, status} = this.rentalForm.value;
  
      const carRental = {
        pickupDate: pickupDate!,
        dropoffDate: dropoffDate!,
        status:  status!,
        carType: type!,
        registration: registration!,
        carPrice : Number(price?.replace(/[^0-9.-]+/g,"")),
        totalCharge: Number(totalCharge?.replace(/[^0-9.-]+/g,"")),
        discount : Number(discount),
        comment : comment!,
      };    
  
      this.carService.updateRental(this.rentalKey, carRental);
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
    this.bookingId = rental.bookingId;
    this.rentalId = rental.rentalId;

    this.showRentalList = false;
    this.rentalKey = id;
    this.rentalAction = "Rental No: " + rental.rentalId
    this.userName = rental.userName;
    this.userTelephone = rental.userTelephone;
    this.userEmail = rental.userEmail;
    if (rental.coName!.length > 0) { this.coName= "Co: " + rental.coName;  }
    if (rental.coTelephone!.length > 0) {  this.coTelephone= "Tel: " + rental.coTelephone;   }
    this.rentLocation = rental.location;

    this.rentalForm.patchValue({
      fullname: rental.userName, nname: rental.nname, telephone: rental.userTelephone , email: rental.userEmail, 
      work:rental.userWork, cosignerName: rental.coName,  cosignerTelephone: rental.coTelephone, cosignerWork:rental.coWork,
      location: rental.location, type: rental.carType,
      pickupDate:formatDate(new Date(rental.pickupDate), 'yyyy-MM-dd', 'en'), 
      dropoffDate: formatDate(new Date(rental.dropoffDate), 'yyyy-MM-dd', 'en'),
      registration: rental.registration, 
      price: formatCurrency(rental.carPrice!, 'en', '$'),
      discount:rental.discount, totalCharge: formatCurrency(rental.totalCharge, 'en', '$'), 
      comment: rental.comment, status:rental.status

    })



  }



  getBookedReservations(){
   //this.querySnapshotList = this.carService.getBookedReservations("Mogadishu");
  }

  getReservationsByRefId(){
    // const  {search} = this.rentalForm.value;
    // if (search?.length != 0){
    //    if (search?.includes('@')){
    //     this.querySnapshotList = this.carService.getBookedReservationByEmail(search!);
    //    } else {    
    //     this.querySnapshotList = this.carService.getReservationsByRefId(search!);
    //    }
    // }else
    // {
    //   this.getBookedReservations();
    // }

  }


}
