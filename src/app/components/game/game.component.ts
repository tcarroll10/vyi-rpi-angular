import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/model/game.model';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  games: Game[] = [];
  
  displayedColumns: string[] = ['id', 'gameDt','homeId','awayId','winnerId', 'amtPtsHome', 'amtPtsAway']
  dataSource = new MatTableDataSource<Game>();

  constructor(private gameService: GameService) { }

    ngOnInit(): void {
    this.getGameList();
    this.getGameList2();
  
  }

  onDelete(id: number) {
    
    this.gameService.deleteGame(id).subscribe((result)=> {
      console.log(result);
      this.ngOnInit();
    })
    
  }

  onEdit(id: number){
    console.log(id);
  }

  getGameList() {
    this.gameService.getGames().subscribe((data: any) => {
      this.games = data;
      console.log(data);
    });
  }

  public getGameList2() {
    let resp = this.gameService.getGames();
    resp.subscribe(report => this.dataSource.data = report as unknown as Game[]);
    console.log(this.dataSource);
  }

}
