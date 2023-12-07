import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/car.model';

@Component({
  selector: 'app-rentconfirm',
  templateUrl: './rentconfirm.component.html',
  styleUrls: ['./rentconfirm.component.css']
})
export class RentconfirmComponent implements OnInit {
  booking! : Booking;
  bookingNumber ="";
  userName = "";
  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.currentBooking.subscribe (booking => this.booking = booking);
    this.bookingNumber = this.booking.refrence;
    this.userName = this.booking.name;

  //  this.bookingNumber = localStorage.getItem('bookingRefId') + '';
  //  this.userName = localStorage.getItem('userName') +'';
  }

close(){
  localStorage.clear();
}

}
