import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  locAction:string =" Add Location";
  public locsData! : Observable<any>;
  locId:string ="";


  public totalPages: number = 0;
  public page: number = 1;

  constructor(private fb: FormBuilder, private carService : CarService ) { }
  
  locationForm = this.fb.group({
    location: [''],  address: [''], picture: [''], telephone: ['']
  });
  
  ngOnInit(): void {
    this.gatAllLocations();
  }

  manageCar() {}

  clearForm(){
    this.locAction = "Add Location"
    this.locId = "",
    this.locationForm.patchValue({
      location: "Location", address:"", telephone:"", picture:""
    })
  }

  saveLocation(){
    if (this.locAction == "Edit Location"){
      this.carService.updateLocation(this.locId, this.locationForm);
    } 
    else  // Add location
    {
       this.addLoc(this.locationForm);
    }
   
    this.clearForm();
  }

  editLoc(loc:any){
    this.locAction = "Edit Location"
    this.locId = loc.id,
    this.locationForm.patchValue({
     location: loc.location, address: loc.address , telephone: loc.telephone , picture:loc.picture  })

  }

  deleteLoc(id:string){
    this.carService.deleteLocation(id);
  }

  gatAllLocations(){
    this.locsData = this.carService.getAllLocations();
  }

  addLoc(f:any) {
    this.carService.addLocationData(f);
    console.log(f.value);
  }

}
