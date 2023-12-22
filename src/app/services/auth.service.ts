import { EventEmitter, Injectable, Output } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, from, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  private isAuthenticated = false;
  private authSecretKey = 'Token';

  constructor(private auth: Auth) { 
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }
  
async login(email: string, password: string): Promise<boolean> {
  let result =  await this.authService(email, password)

  if (!result) { return false;   }
  else {  
          const authToken = "found"; // Generate or receive the token from your server
          localStorage.setItem(this.authSecretKey, authToken);
          this.isAuthenticated = true;
          this.getLoggedInName.emit(true);
        return true}
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  authService(username: string, password: string): Promise<boolean> {
    //return from(signInWithEmailAndPassword(this.auth, username, password));
    return signInWithEmailAndPassword(this.auth, username, password)
    .then (data => { return true;})
    .catch(err=> { return false})
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
    this.auth.signOut();
  }

}
