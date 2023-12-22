export class BookingRef{
    bookingId: string ='';
    name: string = '';
}

export class Rental {
    rentalId?: string ='';
    location: string ='';
    bookingId: string ='';
    pickupDate: string ='';
    pickupTime: string ='';
    dropoffDate: string ='';
    dropoffTime: string ='';
    status: RentalStatus = RentalStatus.Rented;
    carType: string = "";
    registration: string ='';
    userEmail : string ='';
    userName : string ='';
    nname: string = ';'
    userTelephone : string =''; 
    userWork: string = '';
    coName: string ='';
    coTelephone: string =''; 
    coWork: string = '';
    carPrice : number =0;
    totalCharge: number = 0;
    discount : number = 0;
    tax:number =0;
    otherCharge: number =0;
    comment: string ='';
   }


export class Booking{
    bookingId: string ='';
    location: string = '';
    name: string = '';
    email: string ='';
    telefone : string ='';
    carType: string ='';
    pickupDate: string ='';
    pickupTime: string ='';
    dropoffDate: string ='';
    dropoffTime: string ='';
    carPrice : number = 0;
    totalCharge: number= 0;
    bookedDate: string='';
    status: RentalStatus = RentalStatus.Booked;
}

export class Car {
    id?: string ="";
    registration: string="";
    make: string ="";
    model: string ="";
    type: string ="";
    location: string ="";
    carImgPath: string ="";
    price: string = "";
    status: CarStatus = CarStatus.Available;
   } 

   export class Cars{
    id : string = ""
    car: Car[]=[];
   }

   export interface Location {
    id?: number;
    name: string;
    address: string;
    telephone: string;
   }

   export interface _Rental {
    id?: number;
    location: string;
    bookingId: string;
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
    status: RentalStatus;
    carId: string;
    registration: string;
    userId : string;
    userName : string;
    userPhone : string;
    userAddress: string;
    userEmail : string;
    carPrice : number;
    totalCharge: number;
    discount : number;
    tax:number;
    otherCharge: number;
    rentedDate: string;
   }

   export interface Make {
    name: string
   }

   export interface Model {
    make: string;
    model: string
   }

   export enum Type {
    Compact = "Compact",
    FullSize = "Full-Size",
    SUV = "SUV",
    Luxury = "Luxury",
    Other = "Other",
   }

   export enum CarStatus {
    Available = "Available",
    Rented = "Rented",
    booked = "Booked",
    Maintenance = "Maintenance",
    OutOfService = "OutOfService",
   }

   export enum RentalStatus {
    Booked = "Booked",
    Rented = "Rented",
    Returned = "Returned",
    Cancelled = "Cancelled",
    Missing = "Missing",
   }

   export class User {
    id?: string ="";
    fname: string ="";
    mname: string ="";
    lname: string ="";
    address: string ="";
    email: string ="";
    telephone: string ="";
    coSigner: string ="";
   }

   export interface UserPI {
    id?: string;
    userId : string;
    firstName: string;
    lastName: string;
    dl: string;
    dlCountry: string;
    dlExpration: string;
    dob: string;
    otherId:string;
    dlImgPath: string;
    otherImgPath: string;
}