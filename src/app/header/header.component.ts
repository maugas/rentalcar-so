import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  siteLocale: string = "";
  siteLanguage: string = "English";

   languageList: any = [
    { code : 'en', label : 'English'},
    { code : 'so', label : 'Soomaali'}
   ];

  constructor(private authService: AuthService) {
    authService.getLoggedInName.subscribe(name => this.isAdmin =name);
   }

  ngOnInit(): void {
    this. isAdmin = this.authService.isAuthenticatedUser();

    this.siteLocale = window.location.pathname.split('/')[1];
    //this.siteLanguage = this.languageList.find( (f:any) => f.code === this.siteLocale).label;
  }

  logout(){
    this. isAdmin = false;
    localStorage.clear();
  }

toggle(){
//  document.querySelectorAll('.nav-link').forEach(link => {
//    link.addEventListener('click', () => {
        const navbarResponsive = document.getElementById('navbarNav');
        if (navbarResponsive!.classList.contains('show')) {                        
            const navbarToggler = document.querySelector('.navbar-toggler');
            navbarResponsive!.classList.remove('show');
        }
  //  });
//});
}

}
