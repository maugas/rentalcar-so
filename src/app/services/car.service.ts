import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, collectionData, 
  updateDoc, deleteDoc, getDoc, query, where, getDocs, and, setDoc } from '@angular/fire/firestore';
import { Observable, filter, map } from 'rxjs';
import { Rental, RentalStatus } from '../models/car.model';

@Injectable()
export class CarService {
  carsData! : Observable<any>;
  usersData! : Observable<any>;
  locationsData! : Observable<any>;

  carRentals! : Observable<any>;
  userData! : Observable<any>;
  userId : any;
  currentCarData : any;
  dictAvailCars = {};

  constructor(private fs:Firestore){
    this.getAllCars();
  }

  addCarData(f:any){
    const carCollection = collection(this.fs, "cars");
    return addDoc(carCollection, f.value )
      .then( () => console.log("Saved car data"))
      .catch(err => console.log(err))
   }
  
   getAllCars(){
    const carCollection = collection(this.fs, "cars");
    return this.carsData = collectionData(carCollection, {idField : 'id'});
   }

   getAvailableCars2(date:string){
      // Initialize Firestore and get a reference to the service
    const db = this.fs;
      const q = query(collection(db, "cars"), where("status", "==", 'Available'));
      
      let querySnapshotList : any[]=[];
      const dict: Record<string, any> = [];
      const querySnapshot =  getDocs(q);
       querySnapshot.then ( (data) => {
        data.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
             //console.log(doc.id, " => ", doc.data());
             querySnapshotList.push(doc.data());
             dict[doc.id] = doc.data();
        });
       } )
    return dict;

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
   
   updateCarStatus(id:string, status:any){
    const carData = {  status:status }
    const carInstance = doc(this.fs, "cars", id);
    updateDoc(carInstance, carData)
    .then(()=> { console.log("Car status is updated to !" + status)})
    .catch(err=> {console.log(err)})
   }
  
  
   deleteCar(id:string){
    const carInstance = doc(this.fs, "cars", id);
    deleteDoc(carInstance )
     .then(()=> { console.log("Car " + id + " is deleted!")})
     .catch(err=> {console.log(err)})
   }
  

   getAllLocations(){
    const carCollection = collection(this.fs, "locations");
    return this.locationsData = collectionData(carCollection, {idField : 'id'});
   }
  
   getAllMakes(){
    const carCollection = collection(this.fs, "makes");
    return this.carsData = collectionData(carCollection, {idField : 'id'});
   }
  
   getAllModeles__(make:string){
    const carCollection = collection(this.fs, "models");
    return this.carsData = collectionData(carCollection, {idField : 'id'});
   }

  getAvailableCars(date:string){
    let carSearchForm= localStorage.getItem("searchForm") + "";
    var searchFormValue = carSearchForm?.split('|');
    var loc = searchFormValue[0];

    const db = this.fs;
    const q = query(collection(db, "cars"), and ( where("location", "==", loc), where("status", "==", "Available") ));
    
    const dict: Record<string, any> = [];
    const querySnapshot =  getDocs(q);
     querySnapshot.then ( (data) => {
      data.forEach((doc) => {
           dict[doc.id] = doc.data();
      });
     } )
    return dict;
 }

  calculateDiffDates(startDate:any, endDate:any) {
  var date1:any = new Date(endDate);
  var date2:any = new Date(startDate);
  var diffDays:any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
  return diffDays;
}

addCarRental(rental:any){
  console.log(rental);
  const carCollection = collection(this.fs, "rentals");
  return addDoc(carCollection, rental )
    .then( (docRef) => console.log("Rental Data id:" + docRef.id))
    .catch(err => console.log(err))
 }


 addCarBooking(booking:any){
  console.log(booking);
  const carCollection = collection(this.fs, "bookings");
  return addDoc(carCollection, booking )
    .then( (docRef) => console.log("Booking Data id:" + docRef.id))
    .catch(err => console.log(err))
 }


 getAllRentals(){
  const carCollection = collection(this.fs, "rentals");
  return this.carRentals = collectionData(carCollection, {idField : 'id'});
 }

 addUser_old(user:any){
  console.log(user);
  this.userId = "000-000";
  const userCollection = collection(this.fs, "users");
   return addDoc(userCollection, user );
 }

 getBookingRefId(length:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async addLocation(f:any){
  const {location } = f.value;
  console.log(location)
  const db = this.fs;
  await setDoc(doc(db, "locations", location), f.value)
}

addLocationData_old(f:any){
  const carCollection = collection(this.fs, "locations")
  return addDoc(carCollection, f.value )
    .then( () => console.log("Saved Location data"))
    .catch(err => console.log(err))
 }

 updateLocation(id:string, f:any){
  const {location, address, telephone, picture  } = f.value;
  const locData = { location:location, address:address+'', telephone:telephone+'', picture:picture+''
  }
  const locInstance = doc(this.fs, "locations", id);
  updateDoc(locInstance, locData)
  .then(()=> { console.log("Location Data is updated!")})
  .catch(err=> {console.log(err)})
 }

 deleteLocation(id:string){
  const locInstance = doc(this.fs, "locations", id);
  deleteDoc(locInstance )
   .then(()=> { console.log("Location " + id + " is deleted!")})
   .catch(err=> {console.log(err)})
 }

 getUsers(){
  const carCollection = collection(this.fs, "users");
  return this.usersData = collectionData(carCollection, {idField : 'id'});
 }


 async addUser(f:any){
  const {email } = f.value;
  const db = this.fs;
  await setDoc(doc(db, "users", email), f.value)
}

 addUserData_old(f:any){
  const userCollection = collection(this.fs, "users");
  return addDoc(userCollection, f.value )
    .then( () => console.log("Saved users data"))
    .catch(err => console.log(err))
 }

 deleteUser(id:string){
  const userInstance = doc(this.fs, "users", id);
  deleteDoc(userInstance )
   .then(()=> { console.log("user " + id + " is deleted!")})
   .catch(err=> {console.log(err)})
 }

 updateUser(id:string, f:any){
  const {fname, mname, lname, address, telephone, email, cosigner  } = f.value;
  const locData = { fname:fname, mname:mname+'', lname:lname+'', address:address+'', email:email+'', cosigner:cosigner+''
  }
  const locInstance = doc(this.fs, "locations", id);
  updateDoc(locInstance, locData)
  .then(()=> { console.log("Location Data is updated!")})
  .catch(err=> {console.log(err)})
 }

 getBookedReservations(loc:string){
  const db = this.fs;
  const q = query(collection(db, "bookings"), and ( where("location", "==", loc), where("status", "==", "Booked") ));
  
  const dict: Record<string, any> = [];
  const querySnapshot =  getDocs(q);
   querySnapshot.then ( (data) => {
    data.forEach((doc) => {
         dict[doc.id] = doc.data();
    });
   } )
  return dict;
}

async getUserById(id:any){
  return getDoc(doc(this.fs, "users", id));
}

getLocationById(id:string){
  return getDoc(doc(this.fs, "locations", id));
 }



 deleteReservation(id:string){
  const locInstance = doc(this.fs, "bookings", id);
  deleteDoc(locInstance )
   .then(()=> { console.log("bookings " + id + " is deleted!")})
   .catch(err=> {console.log(err)})
 }

 updateRentalStatus(id:string, status:RentalStatus){
  const resData = { status: status }
  const locInstance = doc(this.fs, "bookings", id);
  updateDoc(locInstance, resData)
  .then(()=> { console.log("Booking data is updated!")})
  .catch(err=> {console.log(err)})
 }

 getReservationsByRefId(refId:string){
  const db = this.fs;
  const q = query(collection(db, "bookings"), where("bookingId", "==", refId) );
   let array = [];
  const dict: Record<string, any> = [];
  const querySnapshot =  getDocs(q);
   querySnapshot.then ( (data) => {
    data.forEach((doc) => {
         dict[doc.id] = doc.data();
    });
   } )
  return dict;
 }

 getBookedReservationByEmail(email:string){
  const db = this.fs;
  const q = query(collection(db, "bookings"), where("email", "==", email) );
  const dict: Record<string, any> = [];
  const querySnapshot =  getDocs(q);
   querySnapshot.then ( (data) => {
    data.forEach((doc) => {
         dict[doc.id] = doc.data();
         console.log(doc.id + '=> ' + JSON.stringify(doc.data()))
    });
   } )
  return dict;
}

getBookingById(id:string){
  return getDoc(doc(this.fs, "bookings", id));
 }


saveRental(rental:any){
  const carCollection = collection(this.fs, "rentals");
  return addDoc(carCollection, rental );
//     .then( () => console.log("Saved rental data"))
//     .catch(err => console.log(err))
  }

updateRental(id:string, rentData:any){
  const rentInstance = doc(this.fs, "rentals", id);
    updateDoc(rentInstance, rentData)
    .then(()=> { console.log("Rentals Data is updated!")})
    .catch(err=> {console.log(err)})
}



}
