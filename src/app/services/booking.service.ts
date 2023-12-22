import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookingRef, Rental } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  myBooking : BookingRef = {name : '',  bookingId : ''};
  bookingId = "";

  constructor() { }

  private booking = new BehaviorSubject<BookingRef>(this.myBooking);
  currentBooking = this.booking.asObservable();

  private rental = new BehaviorSubject<string>(this.bookingId);
  currentRental = this.rental.asObservable();

  
  updateBooking(newBooking: any){ 
    this.booking.next(newBooking); 
  }

  updateRental(newRental: string) {
    this.rental.next(newRental); 
  }

}
