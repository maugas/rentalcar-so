import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, collectionData, 
  updateDoc, deleteDoc, getDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, filter, map } from 'rxjs';

@Injectable()
export class CarService {
  carsData! : Observable<any>;
  currentCarData : any;

  constructor(private fs:Firestore){
    this.getAllCars();
  }

  addCarData(f:any){
    console.log(f.value);
    const carCollection = collection(this.fs, "cars");
    return addDoc(carCollection, f.value )
      .then( () => console.log("Saved car data"))
      .catch(err => console.log(err))
   }
  
   getAllCars(){
    const carCollection = collection(this.fs, "cars");
    return this.carsData = collectionData(carCollection, {idField : 'id'});
   }

   getAvailableCars(date:string){
    const carCollection = collection(this.fs, "cars");
    //return this.carsData = collectionData(carCollection, {idField : 'id'});

    // Create a query against the collection.
    const q = query(carCollection, where("1", "==", "1"));
    let querySnapshot!:any;
    console.log("service logging : ")
    return getDocs(q)
      // .then ( (data:any) => {
      //   querySnapshot = data;
      //   querySnapshot.forEach((doc:any) => {
      //     // doc.data() is never undefined for query doc snapshots
      //     console.log(doc.id, " => ", doc.data());
      //   })
      // })
      console.log("donoe service log")

    //  return querySnapshot;
    //return getDocs(q);
   }
  
   getCarById(id:string){
    const carInstance = doc(this.fs, "cars", id);
    return getDoc(carInstance);
   }
  
   updateCar(id:string, f:any){
    const {registration, make, model, type, location, price, status, carImgPath  } = f.value;
    const carData = { registration:registration, make:make, model:model, type:type, 
      location:location, price:price, status:status 
    }
    const carInstance = doc(this.fs, "cars", id);
    updateDoc(carInstance, carData)
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
  

   getAllLocations(){
    const carCollection = collection(this.fs, "locations");
    return this.carsData = collectionData(carCollection, {idField : 'id'});
   }
  
   getAllMakes(){
    const carCollection = collection(this.fs, "makes");
    return this.carsData = collectionData(carCollection, {idField : 'id'});
   }
  
   getAllModeles__(make:string){
    const carCollection = collection(this.fs, "models");
    return this.carsData = collectionData(carCollection, {idField : 'id'});
   }


}
