import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {

  currentUser$ = new BehaviorSubject<{id: string; name:string} | null | undefined> (undefined); 
  constructor() { }

  setCurrentUser(){
    if(localStorage.getItem('token'))
    {
      this.currentUser$.next({id: 'test', name : 'test123'});
    }
    else {
      this.currentUser$.next(null);
    }
  }
}
