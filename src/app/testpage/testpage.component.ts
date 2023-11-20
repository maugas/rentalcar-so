import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, doc, collectionData, updateDoc, deleteDoc, getDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CarStatus, Type, RentalStatus } from '../models/car.model'
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';




@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {
  title = 'rentalcar-so';
  selectedType = "";
  carsData! : Observable<any>;
  currentCarData : any;
  availCars! :any;

  locationData! : Observable<any>;

  type: typeof Type = Type;
  carStatus: typeof CarStatus = CarStatus;
  rentalStatus: typeof RentalStatus = RentalStatus;


  constructor(private fs:Firestore, private router: Router, private carService: CarService){
    this.getCarData();
  }

  ngOnInit(): void {
    this.getAvailableCars();
  }

 addCarData(f:any){
  console.log(f.value);
  const carCollection = collection(this.fs, "cars");
  addDoc(carCollection, f.value )
    .then( () =>  console.log("Saved car data"))
    .catch(err => console.log(err))

 }

 getCarData(){
  const carCollection = collection(this.fs, "cars");
  const locationCollection = collection(this.fs, "locations");

  collectionData(carCollection, {idField : 'id'}).subscribe( value => { console.log(value);  })

  this.carsData = collectionData(carCollection, {idField : 'id'});
  this.locationData = collectionData(locationCollection);
 }

 getCarById(id:string){
  const carInstance = doc(this.fs, "cars", id);
  //onst docSnap = await getDoc(carInstance);
  getDoc(carInstance)
   .then ((value)=> {
      this.currentCarData = {id:value.id, ... value.data()}
      console.log(this.currentCarData);
    //console.log(value.id)
    //console.log(value.data())
   } )
   .catch(err => console.log(err));
  
 }

 updateCar(id:string){
  const carInstance = doc(this.fs, "cars", id);
  const carData = {
    location : "Airport" 
  }

  updateDoc(carInstance, carData )
  .then(()=> { console.log("Car Data is updated!")})
  .catch(err=> {console.log(err)})
 }

 deleteCar(id:string){
  const carInstance = doc(this.fs, "cars", id);
  console.log(carInstance);
   deleteDoc(carInstance )
   .then(()=> { console.log("Car " + id + " is deleted!")})
   .catch(err=> {console.log(err)})

 }

 gotoCarlist(){
  this.router.navigate(['/carList'])
 }


 onChange(val:any) {
  this.selectedType = val;
  console.log(val);
}



getAvailableCars(){
  this.availCars =this.carService.getAvailableCars("t");
  console.log("in Test page logging available cars")
  console.log(this.availCars);
}

}


