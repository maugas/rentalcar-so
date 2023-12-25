import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Rental } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public reportList1!:  any;
  //reportList: Record<string, any> = [];

  public reportList!:  any;
  public displayTopic: string = "";
  public totalPages: number = 0;
  public page: number = 1;

  constructor(private carService:CarService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.getRentalReport(id!);
      //console.log("report list: " + this.reportList);

    });
  }

 async  getRentalReport(id:string){
  this.reportList = await this.carService.getRentalReport(id)
      // .then (doc => {
      //   //  console.log(doc);
      //   return  =  doc;
      // })
      // .catch (err => console.log("error accoured"))

      console.log("report list: 000 " + this.reportList.bookingId);

      let report: Rental[] = JSON.parse(this.reportList) as Rental[];

      console.log("report :" + report)
  }

}
