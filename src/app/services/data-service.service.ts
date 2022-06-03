import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rpi } from '../model/rpi';
import { Game } from '../model/game.model';
import { Team } from '../model/team';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'observe': 'response' })
}

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  //Define API
  getUrl: string = 'http://localhost:9888/vyi/api/results/';
  
  getGameRsltUrl: string = 'http://localhost:9888/vyi/api/gameRslt';

  constructor(private http: HttpClient) { }

  // HttpClient API get all the RPI results
  getRpi(): Observable<Rpi> {
    return this.http.get<Rpi>(this.getUrl, httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

   // HttpClient Api to get all the game rslts
   getGameRslts(): Observable<Game>{
    return this.http.get<Game>(this.getGameRsltUrl, httpOptions)
      .pipe( 
        retry(1),
        catchError(this.handleError)
      )
  }
  
 
   
  // HttpClient API get all the results by Division
  getResponseByDivision(division: string): Observable<Rpi> {
    
    return this.http.get<Rpi>(this.getUrl + `${division}`,httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  
  // Error handling 
  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}


