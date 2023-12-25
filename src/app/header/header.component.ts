import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;

  constructor(private authService: AuthService) {
    authService.getLoggedInName.subscribe(name => this.isAdmin =name);
   }

  ngOnInit(): void {
    this. isAdmin = this.authService.isAuthenticatedUser();
  }

  logout(){
    this. isAdmin = false;
    localStorage.clear();
  }

}
