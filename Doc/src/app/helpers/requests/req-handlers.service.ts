import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MessagesService } from '../errors/messages.service'; 
import { ErrorsService } from '../errors/errors.service';

@Injectable({
  providedIn: 'any'
})
export class ReqHandlerService {
  error = '';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private handleError(error: HttpErrorResponse) {
    Notiflix.Loading.remove();
    this.errorHandler.allErrors(error);
    setTimeout(() => {
      this.messages.clear();
    }, 4000)
    

    if (error.status === 0) {
      Notiflix.Loading.remove();
      console.error('An error occurred:', error.error);
      Notiflix.Report.failure(
        'Sorry!',
        'An error occured as we attempted to retrieve the requested data.',
        'Okay',
      )
    } else if (error.status === 204){
      Notiflix.Loading.remove();
      Notiflix.Report.failure(
        error.statusText,
        'Sorry, we could not find any content in the requested resource.',
        'Okay',
      )
    } else if (error.status === 301){
      Notiflix.Loading.remove();
      Notiflix.Report.failure(
        error.statusText,
        'Sorry, the requested page has been moved permanently.',
        'Okay',
      )
    }  else if (error.status === 400){
      Notiflix.Loading.remove();
      if (error.error.amount){
        Notiflix.Report.warning(
          error.statusText,
          'Please check your details and try again',
          'Okay'
        )
      }
      console.warn(error)
    }  else if (error.status === 401){
      Notiflix.Loading.remove();
    } else if (error.status === 403){
      Notiflix.Loading.remove();
      Notiflix.Report.warning(
        error.statusText,
        'Sorry, you do not have permission to view or modify the requested resource',
        'Okay',
      )
    } else if (error.status === 404){
      Notiflix.Loading.remove();
    } else if (error.status === 407){
      Notiflix.Loading.remove();
      Notiflix.Report.warning(
        error.statusText,
        '',
        'Okay',
      )
    } else if (error.status === 408 || 504){
      Notiflix.Loading.remove();
      Notiflix.Report.warning(
        error.statusText,
        "Don't worry, this has nothing to do with you. Please give it another try.",
        'Okay',
      )
    } else if (error.status === 421) {
        Notiflix.Notify.warning("Sorry!")
        Notiflix.Notify.warning("That did not work")
        Notiflix.Notify.failure("Something is wrong with your request")
    }
    else if (error.status === 500 || 501 || 503){
      Notiflix.Loading.remove();
      Notiflix.Report.warning(
        error.statusText,
        'Sorry, we ran into a problem while processing your request. Please try again',
        'Okay',
      )
    } else {
      Notiflix.Loading.remove();
      Notiflix.Report.failure(
        error.statusText,
        'Sorry, we ran into a problem while processing your request. Please try again',
        'Okay',
      )
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        console.warn(error.error)
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  constructor(
    private http:HttpClient,
    private messages:MessagesService,
    private errorHandler:ErrorsService,
    private router:Router,
  ) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
  }

  handleGET<T>(apiURL: string, options?): Observable<any>{
    return this.http.get<T>(apiURL, options).pipe(
      catchError(
      (err) => this.handleError(err)
      )
    )
  }
  handlePOST<T>(apiURL: string, payload?, options?): Observable<any>{
    return this.http.post<T>(apiURL, payload, options).pipe(
      catchError(
        (err) => this.handleError(err)
      )
    )
  }
}