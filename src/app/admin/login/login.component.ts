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
  authError: string="";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route:ActivatedRoute) { }

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });


  ngOnInit(): void {
  }

  public get email() {  return this.loginForm.get('email') }
  public get password() { return this.loginForm.get('password') }

  login(){
    if(!this.loginForm.valid){ return; }
    const { email, password } = this.loginForm.value;
    this.authService.login(email!, password!)
    .then(()=>  this.router.navigate(['/admin/booking']))
    .catch((err)=> console.log ('Error accoured.. error login'))
  }

  logout(){    
  }

}
