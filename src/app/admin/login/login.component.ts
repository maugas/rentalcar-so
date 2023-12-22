// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 // @ViewChild('name') namelogin!: ElementRef;
 // @ViewChild('password') passwordlogin!: ElementRef;
  
  authError: string="";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route:ActivatedRoute) { }

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });


  ngOnInit(): void {
  }

  public get email() {    return this.loginForm.get('email');  }
  public get password() {     return this.loginForm.get('password');  }

  login(){
    if(!this.loginForm.valid){     return;    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email!, password!)
    .then(()=> {
          //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          //this.router.navigateByUrl(returnUrl);
          this.router.navigate(['/admin/booking'])
        }
      )
    .catch((err)=> console.log ('Error accoured.. Step error login'))


    // .subscribe(()=> {
    //   console.log("Login Step 1")
    //    this.router.navigate(['/admin/reservations'])
    // }, 
    // (error)=>{ 
    //   console.log("Login Step 2 - Error")
    //  this.authError="user email or password is incorrect";
    // })    
    
  }

  
  logout(){    
  }


}
