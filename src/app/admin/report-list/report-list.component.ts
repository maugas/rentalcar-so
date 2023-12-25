import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { BookingRef, Rental, RentalStatus, Type } from 'src/app/models/car.model';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  querySnapshotList: Record<string, any> = [];
  public reportList : any = [];
  public listReport : any = [];
  public totalPages: number = 0;
  public page: number = 1;
  rentStatus: typeof RentalStatus = RentalStatus;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getRentalsReports();
  }


  getRentalsReports(){ 
    this.querySnapshotList = this.carService.getRentalsReports(this.rentStatus.Returned);
  }

}
