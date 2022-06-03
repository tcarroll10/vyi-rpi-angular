import { Injectable } from '@angular/core';
import { Game } from '../model/game.model';
import { Team } from '../model/team';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'observe': 'response' })
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
 

  addGameUrl: string = 'http://localhost:9888/vyi/api/addGame';
  getTeamsUrl: string = 'http://localhost:9888/vyi/api/teams';
  url: string = 'http://localhost:9888/vyi/api';
  getGamesUrl: string = 'http://localhost:9888/vyi/api/games';

  constructor(private http: HttpClient) { }
  
  game: any; 

  games: Game[] = []

    /* {
      id: 1,
      gameDt: new Date(2013, 9, 23),
      homeId: 1,
      awayId: 2,
      winnerId: 3,
      amtPtsHome:58,
      amtPtsAway: 38
    },

    {
      id: 2,
      gameDt: new Date(2013, 9, 23),
      homeId: 1,
      awayId: 2,
      winnerId: 3,
      amtPtsHome:58,
      amtPtsAway: 38
    }
  ] */; 


  onGet() {
    return this.games;
  }

 // HttpClient Api to get all the games
 getGames() {
  return this.http.get<Game[]>(this.getGamesUrl, httpOptions)
    .pipe( 
      map((data: Game[]) =>{
          return data;
        }),
      retry(1),
      catchError(this.handleError)

      
    )
}
  //http client api to get a game
  getGame(id: Number) {   
    let endPoint = "/game/" + id.toString();
    console.log("getGame with " +  this.url + endPoint + " called");
    return this.http.get<Game>(this.url + endPoint, httpOptions)
    .pipe( 
        map((data: Game) =>{
            console.log("i got here" + data);
            return data;
          }),
        retry(1),
        catchError(this.handleError)
      ) 
      
   }
  //http client api to delete a game
  public deleteGame(id: Number) {
    
     let endPoint = "/deleteGame/" + id.toString();
       return this.http.delete(this.url + endPoint, httpOptions);
       
    }

   // HttpClient API update game
   updateGame(game: Game): Observable<Game> {
    let endPoint = "/updateGame";
    return this.http.put<Game>(this.url + endPoint, JSON.stringify(game), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  
   
   
    // HttpClient API post() method => add game
   addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.addGameUrl, JSON.stringify(game), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  


   // HttpClient Api to get all the teams
   getTeams() {
    return this.http.get<Team[]>(this.getTeamsUrl, httpOptions)
      .pipe( 
        map((data: Team[]) =>{
            return data;
          }),
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


