import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-analyse-par-conducteur',
  templateUrl: './analyse-par-conducteur.component.html',
  styleUrls: ['./analyse-par-conducteur.component.css']
})
export class AnalyseParConducteurComponent implements OnInit {
  //
  typeFilter='jour';

  constructor() { }

  ngOnInit(): void {
     //01-
     Chart.register(...registerables);
     //02-
     this.chartScore();
     this.genererGraphe("Vitesse maximale");
  }
  
  changeTypeChart(e:any){
    this.genererGraphe(e.target.value);
  }

  myChart:any;
  genererGraphe(type:any){
    let chart:any=$('#chart_vehicule');
    if (this.myChart) this.myChart.destroy();
    //
    this.myChart = new Chart(chart,{
      type:'line',
      data:{
        datasets:[
          {
            data:[
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0)
            ],
            label: type,
            backgroundColor: 'rgb(44, 123, 228)',
            borderColor: 'rgb(44, 123, 228)'
          },
          {
            data:[
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0)
            ],
            label:"Référencements",
            backgroundColor: 'rgba(221, 4, 23, 1)',
            borderColor: 'rgba(221, 4, 23, 0.3)'
          }
        ],
        labels:["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      },
      options:{
        maintainAspectRatio:false,
        scales:{
          x:{
            grid:{ drawOnChartArea:false }
          },
          y:{
              grid:{ drawOnChartArea:false }
          }
        }
      }
    })
  } // ./genererGraphe

  chartScore(){
    let chart:any=$('#chart_score');
    new Chart(chart,{
      type:'line',
      data:{
        datasets:[
          {
            data:[
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0)
            ],
            label:"chart",
            pointBackgroundColor: 'rgb(44, 123, 228)',
            pointHoverBackgroundColor: 'rgb(44, 123, 228)',
            pointBorderWidth: 10,
            borderWidth: 3
          }
        ],
        labels:["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      },
      options:{
        maintainAspectRatio:false,
        scales:{
          x:{
            grid:{ drawOnChartArea:false }
          },
          y:{
              grid:{ drawOnChartArea:false }
            }
        },
        plugins: {
          legend: { display: false }
        }
      },
    })
  }// ./ fun chartScore

}
