import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-analyse-par-conducteur',
  templateUrl: './analyse-par-conducteur.component.html',
  styleUrls: ['./analyse-par-conducteur.component.css']
})
export class AnalyseParConducteurComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
        //01-
        Chart.register(...registerables);
        //02-
        this.chartAccelerationBrusque();
        this.chartFreinageBrusque();
        this.chartComportementExcessif();
        this.chartTempsConduite();
        this.chartEmissionCo2();
        this.chartConduiteDangereuse();
        this.chartExcesVitesse();
        this.chartScore();
  }
  
  //01- *** le score ***
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
  }

   //02- *** Acceleration brusque ***
   chartAccelerationBrusque(){
    let chart:any=$('#chart_acceleration_brusque');
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
            backgroundColor: 'rgb(44, 123, 228)',
            borderColor: 'rgb(44, 123, 228)'
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

  //03- *** Freinage brusque ***
  chartFreinageBrusque(){
    let chart:any=$('#chart_freinage_brusque');
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

  //04- *** Comportement excessif ***
  chartComportementExcessif(){
    let chart:any=$('#chart_comportement_excessif');
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

 
  //05- *** Temps de conduite ***
  chartTempsConduite(){
    let chart:any=$('#chart_temps_conduite');
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


  //06- *** Conduite dangereuse/100km ***
  chartConduiteDangereuse(){
    let chart:any=$('#chart_conduite_dangereuse');
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

  //07- *** Nbre des excès de vitesse ***
  chartExcesVitesse(){
    let chart:any=$('#chart_nbre_exces_vitesse');
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
            backgroundColor: 'rgb(44, 123, 228)',
            borderColor: 'rgb(44, 123, 228)'
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

    //05- *** Emission CO2 kg ***
    chartEmissionCo2(){
      let chart:any=$('#chart_emission_co2');
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
