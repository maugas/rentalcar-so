import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userAction:string =" Add User";
  public usersData! : Observable<any>;
  public userList : any = [];
  userId:string ="";
  public totalPages: number = 0;
  public page: number = 1;

  constructor(private fb: FormBuilder, private carService : CarService ) { }
  
  usersForm = this.fb.group({
    fname: [''],  lname: [''], mname: [''], address: [''], telephone: [''], email: [''], cosigner: ['']
  });
  
  ngOnInit(): void {
    this.getUsers();
  }

  manageCar() {}

  clearForm(){
    this.userAction = "Add User"
    this.userId = "",
    this.  usersForm.patchValue({
      fname: "", lname: "", mname: "", address:"", telephone:"", email:"", cosigner: ""
    })
  }

  saveUser(){
    if (this.userAction == "Edit User"){
      this.carService.updateUser(this.userId, this.  usersForm);
    } 
    else  // Add location
    {
       this.addUser(this.  usersForm);
    }
    this.clearForm();
  }

  editUser(user:any){
    this.userAction = "Edit User"
    this.userId = user.id,
    this.  usersForm.patchValue({
      fname: user.fname, lname: user.lname, mname: user.mname,address: user.address , telephone: user.telephone , email: user.email , cosigner:user.cosigner  })
  }

  deleteUser(id:string){
    this.carService.deleteUser(id);
  }

  getUsers(){
    this.usersData = this.carService.getUsers();
    this.usersData.subscribe((data:any)=> {
      this.totalPages = data.length;
      this.userList = data;
    })
  }

  addUser(f:any) {
    this.carService.addUser(f);
    console.log(f.value);
  }

}
