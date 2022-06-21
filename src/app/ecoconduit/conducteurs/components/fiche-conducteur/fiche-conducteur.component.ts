import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-fiche-conducteur',
  templateUrl: './fiche-conducteur.component.html',
  styleUrls: ['./fiche-conducteur.component.css']
})
export class FicheConducteurComponent implements OnInit {
  //
  date=new Date();
  typeFilter='jour'; filter: any = { vehicule_id: null, date_debut: this.datepipe.transform(this.date, 'yyyy-MM-dd'), date_fin: this.datepipe.transform(this.date, 'yyyy-MM-dd') };
  
  constructor(
    private datepipe:DatePipe
  ) { }

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

  changeType(type:any){
    this.typeFilter = type;
    if (type == "jour")  this.filter.date_fin = this.filter.date_debut=this.datepipe.transform(this.date, 'yyyy-MM-dd');
    else {
        this.filter.date_debut = this.datepipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd");
        this.filter.date_fin = this.datepipe.transform(this.date, 'yyyy-MM-dd');
      }
  }

}
