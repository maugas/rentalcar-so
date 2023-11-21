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

   export interface Rental {
    id?: number;
    pickupDate: Date;
    pickupTime: string;
    dropoffDate: Date;
    dropoffTime: string;
    status: RentalStatus;
    registration: string;
    userId : string;
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
    FullSize = "FullSize",
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

   export interface User {
    id?: string;
    firstName: string;
    middleName: string;
    lastName: string;
    address: string;
    email: string;
    telephone: string;
    contact: string;
    dl: string;
   }

   export interface UserPI {
    id?: string;
    lastName: string;
    dl: string;
    dlCountry: string;
    dlExpration: string;
    dob: string;
    otherId:string;
    dlImgPath: string;
    otherImgPath: string;
}