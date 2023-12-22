import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarStatus, Type , RentalStatus } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  //public carData: any = [];
  public carsData! : Observable<any>;
  public carData! : Observable<any>;
  public locations! : Observable<any>;
  public makes! :  Observable<any>;
  public models! :  Observable<any>;


  public carUserData: any = [];
  public totalPages: number = 0;
  public page: number = 1;

type: typeof Type = Type;
carStatus: typeof CarStatus = CarStatus;
rentalStatus: typeof RentalStatus = RentalStatus;

carAction:string =" Add car";
carId:string ="";
 

constructor(private fb: FormBuilder, private carService : CarService ) { }

carForm = this.fb.group({
  registration: [''], make: [''], model: [''], type: ['Type'], 
  location: [''],  price: [''], status: ['Status']
});

  ngOnInit(): void {
    this.gatAllCars();
    this.gatAllLocations();
    this. gatAllMakes();
    this.getModelsByMake("Toyota");
  }
  manageCar(){}

  clearCarForm(){
    this.carAction = "Add car"
    this.carId = "",
    this.carForm.patchValue({
      registration: "", make: "", model: "", type: "Type", location: "Location",
      price:"", status:"Status"
    })
  }
  

  editCar(car : any){
    this.carAction = "Edit car"
     this.carId = car.id,
     this.carForm.patchValue({
      registration: car.registration, make: car.make, model:car.model, type: car.type, 
      location: car.location, price: car.price, status: car.status   })
   }
 
 
  onChange(val:any) {
  }
  
  gatAllCars(){
    this.carsData = this.carService.getAllCars();
  }

  getCarById(id:string){
    this.carService.getCarById(id).then ((value)=> console.log( value.data()) )
  }

  saveCar() {
   // const {registration, make, model, type, location, price, status, carImgPath  } = this.carForm.value;
    
    if (this.carAction == "Edit car"){
      this.carService.updateCar(this.carId, this.carForm);
    } 
    else  // Add Car
    {
       this.addCar(this.carForm);
    }
   
    this.clearCarForm();

  }


  addCar(f:any) {
    this.carService.addCarData(f);
    console.log(f.value);
  }

  deleteCar(id:string){
    console.log("car id:"+id);
    this.carService.deleteCar(id);
  }


  gatAllLocations(){
    this.locations = this.carService.getAllLocations();
  }

  gatAllMakes(){
    this.makes = this.carService.getAllMakes();
  }
  
  getModelsByMake(make: string){
  //   this.models = this.afs.collection('models', ref => ref.where('make', '==', make))
  //  .valueChanges();
   }


}
