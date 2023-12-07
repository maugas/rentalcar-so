import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, doc, collectionData, updateDoc, deleteDoc, getDoc, query, where, getFirestore, getDocs, QuerySnapshot} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CarStatus, Type, RentalStatus, Car, Cars } from '../models/car.model'
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { DocumentData } from '@angular/fire/compat/firestore';
import { formatDate } from '@angular/common';




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
  querySnapshot! : any;
  querySnapshotList0 : any[] =[];
  querySnapshotList: Record<string, any> = [];


  type: typeof Type = Type;
  carStatus: typeof CarStatus = CarStatus;
  rentalStatus: typeof RentalStatus = RentalStatus;





  constructor(private fs:Firestore, private router: Router, private carService: CarService){
    this.getCarData();
    console.log("Getting test data!!")
    this.getNewTestData();
  }

  ngOnInit(): void {
    this.getAvailableCars();

    let todayDate =  formatDate( new Date().toISOString(), 'dd/MM/yyyy hh:mm', 'en-US', 'GMT+3');
    console.log(todayDate);
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
  getDoc(carInstance)
   .then ((value)=> {
      this.currentCarData = {id:value.id, ... value.data()}
      console.log(this.currentCarData);
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


 getTestData(){
  const db = this.fs;
  const q = query(collection(db, "cars"), where("make", "==", 'Toyota'));

  const querySnapshot =  getDocs(q);
   querySnapshot.then ( (data) => {
    data.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
         console.log(doc.id, " => ", doc.data());
       //  this.querySnapshotList.push(doc.data());
    });
   } )

}


 getNewTestData(){
   this.querySnapshotList = this.carService.getAvailableCars("123");
}


}


