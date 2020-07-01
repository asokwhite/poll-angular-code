import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min';
import { ApiService } from '../services/api.service';

import * as io from 'socket.io-client';

import { Observable, Subject } from 'rxjs';


export interface PeriodicElement {
  name: string;
  position: number;
  votes: number;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  public TABLE_DATA: PeriodicElement[] = [
  ];
  
  private socket;

  displayedColumns: string[] = ['position', 'name', 'votes'];
  dataSource : PeriodicElement[] = [];

 
  constructor(private apiService: ApiService) { }
  public  myOptions = {
    type: 'line',
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]
  }
  ngOnInit() {
    this.socket = io('http://localhost:3000/');
  this.getChartDetails();
  }

  public getVotes = () => {
    this.updatedVotes().subscribe(res => {
      this.getChartDetails();
    })
  }

  public updatedVotes = () => {
    return Observable.create((observer) => {
      this.socket.on(`updateVotes`, (slide) => {
        observer.next(slide);
      });
    });
  
  }

  getChartDetails() {
    this.apiService.getChartResult().subscribe((response) => {
      const dataPoints = response.result.map(data => ({label: data.name, y: data.y}) );

      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Vote Survey Graph"
        },
        data: [{
          type: "column",
          dataPoints
        }]
      });
        
      chart.render();

      this.dataSource = response.result.map((data, index) => ({position: index + 1, name: data.name, votes: data.y}));
    }, err => console.error('Error ', err));
  }

}
