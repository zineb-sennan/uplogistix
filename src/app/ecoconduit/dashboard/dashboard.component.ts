import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EcoconduiteService } from '../../_services/ecoconduite.service';
import { VehiculeService } from '../../_services/vehicule.service';
import { ConducteurService } from '../../_services/conducteur.service';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as $ from 'jquery';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chart$: any; myChart: any; chartConducteur:any;

  //vehicule
  infosGlobaleVehicule:any={ total_fuel_consomme : 0, total_fuel_gaspille:0, total_distance_conduite:0, total_temps_total_conduite:'', nb_conducteurs:0 }
  list_resume_vehicule: any = []; show_dropdown_vehicule = false;

  //conducteur
  //temps_total_inactivité = 0; freinage_extreme = 0; acceleration_brutale = 0; conduite_dangereuse = 0;

  type: any = null; filterBy: any = null;

  constructor(
    private vehiculeService: VehiculeService,
    private readonly ecoconduiteService: EcoconduiteService,
    private conducteurService:ConducteurService
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.getResumeOfAllehicule('chartVehicule', 'fuel_consomme');
  }

  toSeconds(str:string) {
    var res = str.split(':');
    return (+res[0])* 3600 + (+res[1])* 60 + (+res[2]);  
  }

  secondsToDhms(seconds:number) {
    // var hours = Math.floor(seconds / 3600);
    // seconds %= 3600;
    // var minutes = Math.floor(seconds / 60);
    // seconds = seconds % 60;
    // return this.pad(hours,2) + ':' + this.pad(minutes,2) + ':' + this.pad(seconds,2);

    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " jour " : " jours ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "min " : "min ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  pad(num:any, size:any) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  getNombreConducteurs(){
    this.conducteurService.getAll(1).subscribe(
      res=>{
        this.infosGlobaleVehicule.nb_conducteurs=res['total_records'];
      }
    )
  }

  totalInfoVehicule(){
    var temps_total_conduite_seconds=0;
    this.infosGlobaleVehicule={ total_fuel_consomme : 0, total_fuel_gaspille:0, total_distance_conduite:0, total_temps_total_conduite:0, nb_conducteurs:0 }
    this.list_resume_vehicule.forEach((val:any) => {
      this.infosGlobaleVehicule.total_fuel_consomme+=val.fuel_consomme;
      this.infosGlobaleVehicule.total_fuel_gaspille+=val.fuel_gaspille;
      this.infosGlobaleVehicule.total_distance_conduite+=val.distance_conduite;
      temps_total_conduite_seconds+=this.toSeconds(val.temps_total_conduite);
    });
    
    this.infosGlobaleVehicule.total_temps_total_conduite=this.secondsToDhms(temps_total_conduite_seconds);
    this.getNombreConducteurs();
  }

  async getResumeOfAllehicule(idChart: any, ChartBy: any) {
    var titre = null; var data = null;
    //01
    const vehicules$ = this.vehiculeService.getAll().pipe(
      map(vehicule => vehicule.filter((v: any) => v.eco_conduite)),
      switchMap(data => forkJoin(data.map(this.getInfosForVehicule.bind(this))))
    );
    //02
    this.list_resume_vehicule = await vehicules$.toPromise();
    const maticules = this.list_resume_vehicule.map((t: any) => t.matricule);
    //03
    if (ChartBy == "fuel_consomme") { data = this.list_resume_vehicule.map((t: any) => t.fuel_consomme); titre = "Fuel consommé"; }
    else if (ChartBy == "fuel_gaspille") { data = this.list_resume_vehicule.map((t: any) => t.fuel_gaspille); titre = "Fuel gaspillé"; }
    else if (ChartBy == "distance_conduite") { data = this.list_resume_vehicule.map((t: any) => t.distance_conduite); titre = "Distance conduite"; }
    else if (ChartBy == "temps_total_conduite") { data = this.list_resume_vehicule.map((t: any,index:any=2) => ({ x: t.matricule, y: index, matricule: t.temps_total_conduite})); titre = "Temps conduite"; }
    //04
    this.createChart(idChart, titre, maticules, data);
    this.show_dropdown_vehicule = false;
    this.totalInfoVehicule();
  }

  private getInfosForVehicule(vehicule: any): any {
    return this.ecoconduiteService.resumeOfVehicule(vehicule.id).pipe(
      map(resume => (
        {
          fuel_consomme: resume.litres,
          fuel_gaspille: resume.litres * .007,
          distance_conduite: resume.distance,
          temps_total_conduite: resume.duree,
          matricule: vehicule.matricule,
          vehicule_id: vehicule.id
        }))
    );
  }

  createChart(id: any, titre: any, labels: any, data: any) {
    if (this.myChart) this.myChart.destroy();
    this.chart$ = $('#' + id);
    if (titre == "Temps conduite") {
      this.myChart = new Chart(this.chart$, {
        type: 'bar',
        data: {
          datasets: [{
            data: data,
            backgroundColor: 'rgba(54, 162, 235)',
            label: titre,
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.40,
            categoryPercentage: 0.2
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize:1,
                callback: function (value, index) {
                  return data[value].matricule
                }//
              }
            }
          }
        }
      });
    }//
    else {
      this.myChart = new Chart(this.chart$, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: titre,
            data: data,
            backgroundColor:'rgba(54, 162, 235)',
            borderWidth: 1,
            borderRadius: 10,
            borderSkipped: false,
            barPercentage: 0.40,
            categoryPercentage: 0.5
          }]
        },
        options: {
          indexAxis: 'y',
        }
      });
     }//fin else
  }

  show_dropdown_v() {
    if (this.show_dropdown_vehicule) this.show_dropdown_vehicule = false;
    else this.show_dropdown_vehicule = true;
  }


}
