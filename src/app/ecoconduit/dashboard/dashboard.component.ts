import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EcoconduiteService } from '../../_services/ecoconduite.service';
import { VehiculeService } from '../../_services/vehicule.service';
import { ConducteurService } from '../../_services/conducteur.service';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as $ from 'jquery';
import { GeoLocalisationService } from 'src/app/_services/geolocalisation.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chart$: any; myChart: any; chartConducteur: any;

  //vehicule
  date = new Date();
  infosGlobaleVehicule: any = { carbone: 0, total_fuel_consomme: 0, total_fuel_gaspille: 0, total_distance_conduite: 0, total_temps_total_conduite: '', nb_conducteurs: 0 }
  list_resume_vehicule: any = []; show_dropdown_vehicule = false;
  filter: any = { vehicule_id: null, date_debut: this.datePipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datePipe.transform(this.date, 'yyyy-MM-dd') }; vehicules: any = [];

  //conducteur
  //temps_total_inactivité = 0; freinage_extreme = 0; acceleration_brutale = 0; conduite_dangereuse = 0;

  type: any = null; filterBy: any = null;

  constructor(
    private vehiculeService: VehiculeService,
    private readonly ecoconduiteService: EcoconduiteService,
    private conducteurService: ConducteurService,
    private geoLocalisationService: GeoLocalisationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.getResumeOfAllehicule('chartVehicule', 'fuel_consomme');
  }

  toSeconds(str: string) {
    var res = str.split(':');
    return (+res[0]) * 3600 + (+res[1]) * 60 + (+res[2]);
  }

  secondsToDhms(seconds: number) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " jour " : " jours ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "min " : "min ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  pad(num: any, size: any) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  getNombreConducteurs() {
    this.conducteurService.getAll(1).subscribe(
      res => {
        this.infosGlobaleVehicule.nb_conducteurs = res['total_records'];
      }
    )
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
    //03
    if (ChartBy == "fuel_consomme") { data = this.list_resume_vehicule.map((t: any) => ({ x: t.matricule, y: t.fuel_consomme })); titre = "Fuel consommé"; }
    else if (ChartBy == "fuel_gaspille") { data = this.list_resume_vehicule.map((t: any) => ({ x:t.matricule, y:t.fuel_gaspille })); titre = "Fuel gaspillé"; }
    else if (ChartBy == "distance_conduite") { data = [...this.list_resume_vehicule].map(t => ({ x:t.distance_conduite, y: t.matricule })); titre = "Distance conduite"; }
    else if (ChartBy == "temps_total_conduite") { data = this.list_resume_vehicule.map((t: any, index: any = 2) => ({ x: t.matricule, y: index, matricule: t.temps_total_conduite })); data.push({x:0, y:0, t:'0:00'}); titre = "Temps conduite"; }
    //04
    this.createChart(idChart, titre,  data);
    this.show_dropdown_vehicule = false;

    //05 L'affichage des infos globale
    this.infosGlobaleVehicule.total_distance_conduite = this.list_resume_vehicule.reduce((prev: any, next: any) => prev + next.distance_conduite, 0);
    this.infosGlobaleVehicule.total_fuel_consomme = this.list_resume_vehicule.reduce((prev: any, next: any) => prev + next.fuel_consomme, 0);
    this.infosGlobaleVehicule.total_temps_total_conduite = this.secondsToDhms(this.list_resume_vehicule.reduce((prev: any, next: any) => prev + next.temps_conduite_seconds, 0));
    this.infosGlobaleVehicule.carbone = this.list_resume_vehicule.reduce((prev: any, next: any) => prev + next.carbone, 0);
    this.getNombreConducteurs();
  }

  private getInfosForVehicule(vehicule: any): any {
    this.filter.vehicule_id = vehicule.id;
    return this.geoLocalisationService.getAnalyseVehicule({vehicule_id: vehicule.id, date_debut: this.filter.date_debut, date_fin:this.filter.date_fin}).pipe(
      map(resume => (
        {
          fuel_consomme: [...resume.fuel].reduce((prev: any, next: any) => prev + next.montant_carburant, 0),
          distance_conduite: [...resume.distance].reduce((prev: any, next: any) => prev + next.distance, 0),
          temps_total_conduite: this.secondsToDhms([...resume.driveTime].reduce((prev: any, next: any) => prev + this.toSeconds(next.duree), 0)),
          temps_conduite_seconds: [...resume.driveTime].reduce((prev: any, next: any) => prev + this.toSeconds(next.duree), 0),
          carbone: [...resume.carbone].reduce((prev: any, next: any) => prev + next.Cg, 0),
          fuel_gaspille: 0,
          matricule: vehicule.matricule,
          vehicule_id: vehicule.id
        }
      ))
    );
  }

  createChart(id: any, titre: any, _data: any) {
    if (this.myChart) this.myChart.destroy();
    this.chart$ = $('#' + id);
    const _myChar: any = {
      type: 'bar',
      data: {
        datasets: [{
          label: titre,
          data: _data,
          backgroundColor: 'rgba(54, 162, 235)',
          borderWidth: 1,
          borderRadius: 10,
          borderSkipped: false,
          barPercentage: 0.20
        }]
      },
      options: {
        maintainAspectRatio: false,
      },
      plugins: {
        legend: { display: false }
      }
    };

    if (titre == "Temps conduite") {
      _myChar.options.scales = {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            callback: function (value: any) {
              return _data[value].matricule
            }//;
          }
        }
      };
      _myChar.data.datasets[0].categoryPercentage = 0.2;
    }
    else{
      _myChar.options.indexAxis='y';
      _myChar.data.datasets[0].categoryPercentage = 0.4;
    }

    this.myChart=new Chart(<any>$('#' + id), _myChar);
  }

  show_dropdown_v() {
    if (this.show_dropdown_vehicule) this.show_dropdown_vehicule = false;
    else this.show_dropdown_vehicule = true;
  }

}
