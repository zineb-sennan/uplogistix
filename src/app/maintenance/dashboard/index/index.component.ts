import { Component, OnInit } from '@angular/core';
import { MaintenancePreventiveService } from 'src/app/_services/maintenance-preventive.service';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  showTask:boolean=false;  vehiculesEnMaintenance:any=[];

  constructor(
    private maintenancePreventiveService:MaintenancePreventiveService
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.chartOrderIntervention();
    this.chartCoutMaintenance();
    this.getVehiculesEnMaintenance();
  }

  getVehiculesEnMaintenance(){
    this.maintenancePreventiveService.getAllPieces().subscribe(
      res =>{
        const array = [...new Map([...res].map(item => [item['vehicule_id'], item])).values()];
        array.forEach(piece => {
          this.vehiculesEnMaintenance.push({matricule:piece.matricule, vehicule_id:piece.vehicule_id, pieces:[...res].filter(d=> d.vehicule_id==piece.vehicule_id)})
        });
      }
    )
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

  chowTasks(vehicule:any, value:boolean){
    vehicule.showTask=value;
  }



}
