import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-fiche-conducteur',
  templateUrl: './fiche-conducteur.component.html',
  styleUrls: ['./fiche-conducteur.component.css']
})
export class FicheConducteurComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.charTest();
  }

  charTest(){
    let chart:any=$('#chart_test');
    new Chart(chart,{
      type:'radar',
      data:{
        datasets:[
          {
            data:[ 100, 80, 50, 100 ],
            label:"chart",
            //backgroundColor: 'rgb(44, 123, 228)',
            borderColor: 'rgba(44, 123, 228, 0.5)'
          }
        ],
        labels:["Score consommation", "Freinage brusque", "Comportement excessif", "Accélération brusque"]
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
