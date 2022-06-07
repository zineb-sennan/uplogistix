import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EcoconduiteService } from '../../_services/ecoconduite.service';
import { VehiculeService } from '../../_services/vehicule.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

 typeFiche:string='vehicule';


  constructor(
    private vehiculeService:VehiculeService,
    private ecoconduiteService:EcoconduiteService
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);
  }

  ngAfterViewInit(){
    this.chartTotalConsommation();
    this.chartCoutKm();
    this.chartConsommationCarburant();
    this.chartServices();
    this.chartDepenses();
    this.evolutionCompteur();

    for (let index = 1; index <= 4; index++) {
      this.autreChart(index);
    }
  }
 
  //01-
  chartTotalConsommation(){
    let chart:any=$('#chart-total-consommation');
    new Chart(chart, {
      type: 'bar',
      data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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

  //02-
  chartCoutKm(){
    let chart:any=$('#chart-cout-km');
    new Chart(chart, {
      type: 'bar',
      data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{
              label: '# Total consommation',
              data: [18, 26, 28, 26, 20, 32],
              backgroundColor: 'rgba(44, 123, 228)',
              borderWidth: 0.3,
              borderRadius: 6,
              borderSkipped: false,
              barPercentage: 0.20,
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

  //03
  chartConsommationCarburant(){
    let chart:any=$('#chart-consommation-carburant');
    new Chart(chart, {
      type: 'bar',
      data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{
              label: '# Total consommation',
              data: [40, 100, 70, 268, 90, 300],
              backgroundColor: 'rgba(44, 123, 228)',
              borderWidth: 0.3,
              borderRadius: 6,
              borderSkipped: false,
              barPercentage: 0.20,
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

  //04-
  chartServices(){
    let chart:any=$('#chart-services');
    new Chart(chart, {
      type: 'bar',
      data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{
              label: '# Total consommation',
              data: [40, 100, 70, 268, 90, 300],
              backgroundColor: 'rgba(44, 123, 228)',
              borderWidth: 0.3,
              borderRadius: 6,
              borderSkipped: false,
              barPercentage: 0.20,
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

  //05-
  chartDepenses(){
    let chart:any=$('#chart-depenses');
    new Chart(chart, {
      type: 'doughnut',
      data: {
          labels: ['carburant', 'Services', 'Autre'],
          datasets: [{
              label: '# Total consommation',
              data:  [300, 50, 100],
              backgroundColor: [
                'rgb(44, 123, 226)',
                'rgb(165, 197, 246)',
                'rgb(210, 222, 236)'
              ],
              hoverOffset: 5
          }],
      },
      options:{
        cutout: '85%',
        maintainAspectRatio:false,
        plugins: {
          legend: { position: 'left' }
        }
      }
    });
  }

  //06-
  evolutionCompteur(){
    let chart:any=$('#chart-evolution-compteur');
    new Chart(chart, {
      type: 'bar',
      data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{
              label: '# Total consommation',
              data: [40, 100, 70, 268, 90, 300],
              backgroundColor: 'rgba(44, 123, 228)',
              borderWidth: 0.3,
              borderRadius: 6,
              borderSkipped: false,
              barPercentage: 0.20,
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

  autreChart(index:number){
    let chart:any=$('#autre-chart-'+index);
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
            backgroundColor: 'rgba(44, 123, 228)',
            borderColor: 'rgba(44, 123, 228)'
          }
        ],
        labels:["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
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
      },
      
    })
  }


}
