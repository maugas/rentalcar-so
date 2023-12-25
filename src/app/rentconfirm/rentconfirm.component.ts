import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { BookingRef } from '../models/car.model';

@Component({
  selector: 'app-rentconfirm',
  templateUrl: './rentconfirm.component.html',
  styleUrls: ['./rentconfirm.component.css']
})
export class RentconfirmComponent implements OnInit {
  booking! : BookingRef;
  bookingNumber ="";
  userName = "";
  
  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.currentBooking.subscribe (booking => this.booking = booking);
    this.bookingNumber = this.booking.bookingId;
    this.userName = this.booking.name;
  }

close(){
  localStorage.clear();
}

}
