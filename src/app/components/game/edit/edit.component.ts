import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DataServiceService } from 'src/app/services/data-service.service';
import { Team } from 'src/app/model/team';
import { Game } from 'src/app/model/game.model';
import { GameService } from 'src/app/services/game.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: number;
  //header: string;

  alert: boolean = false;
  teams = new FormControl();
  selected = 'team';
  teamsList: Team[] = [];
  game: any;

  @Input() gameDetails = { id: 0, gameDt: new Date(), homeId: 0, awayId: 0, winnerId: 0, amtPtsHome: 0, amtPtsAway: 0 };


  constructor(private router: Router, private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {

   this.id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.getTeamList();


      this.game = this.gameService.getGame(this.id).subscribe((data: any) => {
        console.log(data);
        this.gameDetails = data;
      });
 

  }



  

  updateGame(game: Game) {
    this.gameService.updateGame(this.gameDetails).subscribe((data: {}) => {
    })
    this.alert = true;
    this.router.navigateByUrl('');

  }


  closeAlert() {
    this.alert = false;
  }

  getTeamList() {
    this.gameService.getTeams().subscribe((data: any) => {
      console.log(data);
      this.teamsList = data;


    });

  }

}