import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.chartOrderIntervention();
    this.chartCoutMaintenance();
  }

  chartOrderIntervention(){
    let chart:any=$('#chart-order-intervention');
    new Chart(chart, {
      type: 'doughnut',
      data: {
          labels: ['Ouvert', 'En instance', 'En réparation','Clôturer'],
          datasets: [{
              label: '# Total consommation',
              data:  [300, 50, 100,40],
              backgroundColor: [
                '#1B509C',
                '#4A92F0',
                '#64A2F3',
                '#8DBEFF'
              ],
              hoverOffset: 4
          }],
      },
      options:{
        maintainAspectRatio:false,
        plugins: {
          legend: { position: 'left' }
        }
      }
    });
  }


  chartCoutMaintenance(){
    let chart:any=$('#chart-cout-maintenance');
    new Chart(chart, {
      type: 'line',
      data: {
          labels: ["FEV", "MAR", "AVR", "MAI", "JUN", "JUL"],
          datasets: [{
              label: '# Total consommation',
              data: [25, 20, 30, 22, 17, 32],
              backgroundColor: 'rgba(44, 123, 228)'
          }]
      },
      options:{
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
      }
    });
  }

}
