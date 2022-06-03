import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { Rpi } from '../../model/rpi';
import { DataServiceService } from '../../services/data-service.service';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';



@Component({
  selector: 'app-rpi-view',
  templateUrl: './rpi-view.component.html',
  styleUrls: ['./rpi-view.component.css']
})
export class RpiViewComponent implements OnInit {


  displayedColumns: string[] = ['teamid', 'teamName','gamesPlayed','gamesWon','winRate', 'oppntsAvgWinRate', 'oppntsOfOppntsAvgWinRate', 'rpi']
  dataSource = new MatTableDataSource<Rpi>();
  

  constructor(private dataService: DataServiceService) { }

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    //this.getResponse();
  }

  public getResponse() {
    let resp = this.dataService.getRpi();
    resp.subscribe(report => this.dataSource.data = report as unknown as Rpi[]);

  }

  public getResponseByDivision(division: string) {
    let resp = this.dataService.getResponseByDivision(division);
    resp.subscribe(report => this.dataSource.data = report as unknown as Rpi[]);

  }
}