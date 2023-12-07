import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  myBooking : Booking = {
    name : '',
    refrence : ''
  };
  constructor() { }

  private booking = new BehaviorSubject<Booking>(this.myBooking);
  currentBooking = this.booking.asObservable();
  
  updateBooking(newBooking: any){
    this.booking.next(newBooking); 
    console.log("from service: " + newBooking.name);
    console.log("from service currentBooking: " + this.currentBooking);

  }

}
