import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, collectionData, 
  updateDoc, deleteDoc, getDoc, query, where, getDocs, and, setDoc, orderBy } from '@angular/fire/firestore';
import { Observable, map} from 'rxjs';
import { Rental, RentalStatus } from '../models/car.model';


@Injectable()
export class CarService {
  carsData! : Observable<any>;
  usersData! : Observable<any>;
  locationsData! : Observable<any>;
  public reportList : any = [];
  public listReport : any = [];


  carRentals! : Observable<any>;
  userData! : Observable<any>;
  userId : any;
  currentCarData : any;
  dictAvailCars = {};

  constructor(private fs:Firestore){ }

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
    const db = this.fs;
      const q = query(collection(db, "cars"), where("status", "==", 'Available'));
      let querySnapshotList : any[]=[];
      const dict: Record<string, any> = [];
      const querySnapshot =  getDocs(q);
       querySnapshot.then ( (data) => {
        data.forEach((doc) => {
             querySnapshotList.push(doc.data());
             dict[doc.id] = doc.data();  });
       })
    return dict;
  }
  
   getCarById(id:string){
    const carInstance = doc(this.fs, "cars", id);
    return getDoc(carInstance);
   }
  
   updateCar(id:string, f:any){
    const {registration, make, model, type, location, price, status, carImgPath  } = f.value;
    const carData = {registration:registration, make:make, model:model, type:type, location:location, price:price, status:status }
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
           dict[doc.id] = doc.data();  });
     })
    return dict;
 }

  calculateDiffDates(startDate:any, endDate:any) {
  var date1:any = new Date(endDate);
  var date2:any = new Date(startDate);
  var diffDays:any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
  return diffDays;
}

 addCarRental(rental:any){
  const carCollection = collection(this.fs, "rentals");
  return addDoc(carCollection, rental )
    .then( (docRef) => console.log("Rental Data id:" + docRef.id))
    .catch(err => console.log(err))
 }


 addCarBooking(booking:any){
  const carCollection = collection(this.fs, "bookings");
  return addDoc(carCollection, booking )
    .then( (docRef) => console.log("Booking Data id:" + docRef.id))
    .catch(err => console.log(err))
 }

 getAllRentals(){
  const carCollection = collection(this.fs, "rentals");
  return this.carRentals = collectionData(carCollection, {idField : 'id'});
 }

async addLocation(f:any){
  const {location } = f.value;
  const db = this.fs;
  await setDoc(doc(db, "locations", location), f.value)
}

 updateLocation(id:string, f:any){
  const {location, address, telephone, picture  } = f.value;
  const locData = { location:location, address:address+'', telephone:telephone+'', picture:picture+''  }
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

 deleteUser(id:string){
  const userInstance = doc(this.fs, "users", id);
  deleteDoc(userInstance )
   .then(()=> { console.log("user " + id + " is deleted!")})
   .catch(err=> {console.log(err)})
 }

 updateUser(id:string, f:any){
  const {fname, mname, lname, address, telephone, email, cosigner  } = f.value;
  const locData = { fname:fname, mname:mname+'', lname:lname+'', address:address+'', email:email+'', cosigner:cosigner+'' }
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
    data.forEach((doc) =>  dict[doc.id] = doc.data() );
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
   .then(()=> console.log("bookings " + id + " is deleted!"))
   .catch(err=> console.log("error"))
 }

 updateRentalStatus(id:string, status:RentalStatus){
  const resData = { status: status }
  const locInstance = doc(this.fs, "bookings", id);
  updateDoc(locInstance, resData)
  .then(()=>  console.log("Booking data is updated!"))
  .catch(err=> console.log('error'))
 }

 getReservationsByRefId(refId:string){
  const db = this.fs;
  const q = query(collection(db, "bookings"), where("bookingId", "==", refId) );
   let array = [];
  const dict: Record<string, any> = [];
  const querySnapshot =  getDocs(q);
  querySnapshot.then (data => data.forEach((doc) => dict[doc.id] = doc.data()))
  return dict;
 }

 getBookedReservationByEmail(email:string){
  const db = this.fs;
  const q = query(collection(db, "bookings"), where("email", "==", email) );
  const dict: Record<string, any> = [];
  const querySnapshot =  getDocs(q);
  querySnapshot.then (data => { data.forEach(doc =>  dict[doc.id] = doc.data()) })
  return dict;
}

getBookingById(id:string){
  return getDoc(doc(this.fs, "bookings", id));
 }


saveRental(rental:any){
  const carCollection = collection(this.fs, "rentals");
  return addDoc(carCollection, rental );
}

updateRental(id:string, rentData:any){
  const rentInstance = doc(this.fs, "rentals", id);
    updateDoc(rentInstance, rentData)
    .then(()=> { console.log("Rentals Data is updated!")})
    .catch(err=> {console.log('error')})
}


getRentalsByStatus(status:RentalStatus){
  const db = this.fs;
  const q = query(collection(db, "rentals"),  where("status", "==", status) );
  const dict: Record<string, any> = [];
  const querySnapshot = getDocs(q);
    querySnapshot.then ( (data) => {
     data.forEach((doc) =>  dict[doc.id] = doc.data() );
  } )
  return dict;
 }


 getRentalsReports(status:RentalStatus){
  const db = this.fs;
  const q = query(collection(db, "rentals"),  where("status", "==", status), orderBy("dropoffDate") );
  const dict: Record<string, any> = [];
  const querySnapshot = getDocs(q);
    querySnapshot.then ( (data) => {
     data.forEach((doc) =>  dict[doc.id] = doc.data() );
  } )
  return dict;
 }

 async getRentalReport(id:string){
   return (await getDoc(doc(this.fs, "rentals", id))).data();
 }

 formatYmd (date: Date) { 
  return date.toLocaleDateString().slice(0, 10);
}

formatYmdWithTime (date: Date) { 
  return date.toLocaleDateString().slice(0, 10) + " "  + date.toLocaleTimeString()
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

//  getReports() {
//   this.listReport = this.afs.collection<any>('rentals', ref => 
//     ref.where('status', '==', 'returned').orderBy('totalCharge', 'desc') 
//     )
//     .snapshotChanges().pipe(
//     map(actions => {
//     return actions.map(
//     c => ({ id: c.payload.doc.id,
//           ...c.payload.doc.data()
//          }));
//       }));

//    this.listReport.subscribe((data:any)=> {
//      //this.totalPages = data.length;
//      this.reportList = data;
//      console.log(data);
//    })
//   }

}
