import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-informations-vehicule',
  templateUrl: './informations-vehicule.component.html',
  styleUrls: ['./informations-vehicule.component.css']
})
export class InformationsVehiculeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //01-
    Chart.register(...registerables);
    //02-
    this.chartVitesseMaximale();
    this.chartVitesseMoyenne();
    this.chartConsommationCarburant();
    this.chartDistanceParcourue();
    this.chartEmissionCo2();
    this.chartTempsConduite();
    this.chartFuelConsomme();
    this.chartFuelGaspille();
    this.chartBilanCarbone();
    this.chartScore();
  }

  //01- *** Vitesse maximale Km ***
  chartVitesseMaximale(){
    let chart:any=$('#chart_vitesse_maximale');
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

  //02- *** Vitesse moyenne Km ***
  chartVitesseMoyenne(){
    let chart:any=$('#chart_vitesse_moyenne');
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

  //03- *** Consommation carburant ***
  chartConsommationCarburant(){
    let chart:any=$('#chart_consommation_carburants');
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
 
  //04- *** Distance parcourue Km ***
  chartDistanceParcourue(){
    let chart:any=$('#chart_distance_parcourue');
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

  //05- *** Emission CO2 kg ***
  chartEmissionCo2(){
    let chart:any=$('#chart_emition_co2');
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

  //06- *** Temps de conduite ***
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

  //07- *** Fuel consomme ***
  chartFuelConsomme(){
    let chart:any=$('#chart_fuel_consomme');
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

  //08- *** Fuel gaspillé ***
  chartFuelGaspille(){
    let chart:any=$('#chart_fuel_gaspille');
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

  //09- *** Bilan carbone ***
  chartBilanCarbone(){
    let chart:any=$('#chart_bilan_carbone');
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
            backgroundColor: 'rgba(44, 123, 228)',
            borderColor: 'rgba(44, 123, 228)'
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

}
