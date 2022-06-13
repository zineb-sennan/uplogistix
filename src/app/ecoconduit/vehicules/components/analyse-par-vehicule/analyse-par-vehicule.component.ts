import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';
import { GeoLocalisationService } from 'src/app/_services/geolocalisation.service';
import { VehiculeService } from 'src/app/_services/vehicule.service';

@Component({
  selector: 'app-analyse-par-vehicule',
  templateUrl: './analyse-par-vehicule.component.html',
  styleUrls: ['./analyse-par-vehicule.component.css']
})
export class AnalyseParVehiculeComponent implements OnInit {
  //
  typeFilter='jour';  filter: any = { vehicule_id: 9, date_debut: "2022-03-10", date_fin: "2022-03-10" };
  vehicules:any=[];

  constructor(
    private geoLocalisationService:GeoLocalisationService,
    private vehiculeService:VehiculeService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    //01-
    Chart.register(...registerables);
    //02-
    this.getVehiculeWitheEco();
    //03-
    this.chartScore();
    this.getMaxSpeed();
    }

  changeTypeChart(e:any){
    if(e.target.value=='vitesse-maximale') this.getMaxSpeed();
    else if(e.target.value=='vitesse-moyenne') this.getSpeedAverage();
    else if(e.target.value=='consommation-carburant') this.getFuel();
    else if(e.target.value=='distance-parcourue') this.getDistance();
    else if(e.target.value=='emission-co2') this.getCarbone();
    else if(e.target.value=='temps-de-conduite') this.getDriveTime();
    else if(e.target.value=='l_100') this.getL100();
  }

  getVehiculeWitheEco() {
    this.vehiculeService.getAll().subscribe(
      res => {
        this.vehicules = res.filter((v: any) => v.eco_conduite);
      },
      // error => {
      //   if (error.status == 401 && this.securiteClass.refreshToken()) this.getVehiculeWitheEco();
      // }
    )
  }

  myChart:any;
  genererGraphe(titre:any, _data:any){ 
    var data_ref=[]; let chart:any=$('#chart_vehicule');
    if (this.myChart) this.myChart.destroy();
    if(this.typeFilter=="jour") data_ref=[{x:"0:00", y:100},{x:"1:00", y:200},{x:"2:00", y:300},{x:"3:00", y:100},{x:"4:00", y:110},{x:"5:00", y:80},{x:"6:00", y:50},{x:"7:00", y:300},{x:"8:00", y:300},{x:"9:00", y:700},{x:"10:00", y:80},{x:"11:00", y:90},{x:"12:00", y:50},{x:"13:00", y:78},{x:"14:00", y:100},{x:"15:00", y:100},{x:"16:00", y:87},{x:"17:00", y:95},{x:"18:00", y:100},{x:"19:00", y:87},{x:"20:00", y:40},{x:"21:00", y:100},{x:"22:00", y:40},{x:"23:00", y:80}];
    else  data_ref=[{x:"01", y:80},{x:"02", y:100},{x:"03", y:90},{x:"04", y:50},{x:"05", y:30},{x:"06", y:70},{x:"07", y:50},{x:"08", y:70},{x:"09", y:100},{x:"10", y:100},{x:"11", y:100},{x:"12", y:100},{x:"13", y:100},{x:"14", y:100},{x:"15", y:80},{x:"16", y:60},{x:"17", y:100},{x:"17:00", y:100},{x:"18", y:80},{x:"19", y:100},{x:"20", y:100},{x:"21", y:80},{x:"22", y:100},{x:"23", y:74}];

    this.myChart = new Chart(chart,{
      type:'line',
      data:{
        datasets:[
          {
            data: _data,
            label: titre,
            backgroundColor: 'rgb(44, 123, 228)',
            borderColor: 'rgb(44, 123, 228)'
          },
          {
            data:data_ref,
            label:"Référencements",
            backgroundColor: 'rgba(168, 175, 183, 1)',
            borderColor: 'rgb(168, 175, 183)',
            borderDash: [3, 5]
          }
        ],
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
            data:[ 0, 0, 0, 0, 0, 0 ],
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

  //MaxSpeed | Vitesse maximale Km
  getMaxSpeed(){
    this.geoLocalisationService.getMaxSpeed(this.filter).subscribe(
      res=>{
        var _data = res.map((v: any) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y: v.average }));
        this.genererGraphe("Vitesse maximale Km", _data);
      } 
    )
  }

  //SpeedAverage| Vitesse moyenne Km
  getSpeedAverage(){
    this.geoLocalisationService.getSpeedAverage(this.filter).subscribe(
      res=> {
        var _data = res.map((v: any) => ({ x: this.typeFilter == 'jour' ? v.date_heure + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y: v.average }));
        this.genererGraphe("Vitesse moyenne Km", _data)
      }
    )
  }

  //Fuel | Consommation carburant
  getFuel(){
    this.geoLocalisationService.getFuel(this.filter).subscribe(
      res=> {
        var _data=res.map((v: any) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y: Number(v.montant_carburant) }));
        this.genererGraphe("Consommation carburant", _data)
      }
    )
  }

  //Distance | Distance parcourue Km
  getDistance(){
    this.geoLocalisationService.getDistance(this.filter).subscribe(
      res=> {
        var _data=res.map((v: any) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y: v.distance }));;
        this.genererGraphe("Distance parcourue Km", _data)
      }
    )
  }

  //carbone | Emission CO2 kg
  getCarbone(){
    this.geoLocalisationService.getCarbone(this.filter).subscribe(
      res=> {
        var _data=res.map((v: any) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y: Number(v.CO2g) }));;
        this.genererGraphe("Emission CO2 kg", _data)
      }
    )
  }
  
  //DriveTime | Temps de conduite
  getDriveTime(){
    this.geoLocalisationService.getDriveTime(this.filter).subscribe(
      res=> {
        var _data=res.map((v: any,index:any=2) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y:index , z: v.duree }));;
        this.genererGraphe("Temps de conduite", _data)
      }
    )
  }

  //L100 | Consommation l/100km
  getL100(){
    this.geoLocalisationService.getL100(this.filter).subscribe(
      res=>{
        var _data=res.map((v: any) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y: Number(v.consommation) }));;
        this.genererGraphe("Consommation l/100km", _data)
      }
    )
  }

  filterData(){
    this.chartScore();
    this.getMaxSpeed();
  }

}
