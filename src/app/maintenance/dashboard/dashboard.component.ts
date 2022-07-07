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
    
    this.chart();
    this._chart();
    this.chartCoutMaintenance();
  }

  chart(){
    let chart:any=$('#chart-order-intervention');
    new Chart(chart, {
      type: 'doughnut',
      data: {
          labels: ['En attente', 'En cours', 'En attente','Complet'],
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
        /*cutout: 80,*/
        maintainAspectRatio:false,
        plugins: {
          legend: { position: 'left' }
        }
      }
    });
  }

  _chart(){
    let chart:any=$('#_chart');
    new Chart(chart, {
      type: 'doughnut',
      data: {
          labels: ['En attente', 'En cours', 'En attente','Complet'],
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
        /*cutout: 80,*/
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
      type: 'bar',
      data: {
          labels: ["01/07", "02/07", "03/07", "04/07", "05/07", "06/07"],
          datasets: [{
              label: '# Total consommation',
              data: [25, 20, 30, 22, 17, 32],
              backgroundColor: 'rgba(44, 123, 228)',
              borderWidth: 0.3,
              borderRadius: 6,
              borderSkipped: false,
              barPercentage: 0.10,
              categoryPercentage: 0.5
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
