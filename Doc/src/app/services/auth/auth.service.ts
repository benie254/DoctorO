import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReqHandlerService } from 'src/app/helpers/requests/req-handlers.service';

@Injectable({
  providedIn: 'any'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  
  constructor(
    private handler: ReqHandlerService,
    private http: HttpClient,
    ) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
     }
     
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
}