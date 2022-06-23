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
  show_dropdown_conducteur=false; show_dropdown_vehicule = false;

  chart$: any; myChart: any=[]; chartConducteur: any;

  //vehicule
  date = new Date();
  infosGlobaleVehicule: any = { carbone: 0, co2 :0, total_fuel_consomme: 0, total_fuel_gaspille: 0, total_distance_conduite: 0, total_temps_total_conduite: '', nb_conducteurs: 0 }
  list_resume_vehicule: any = [];  list_resume_conducteur: any = [];
  filter: any = { vehicule_id: null, date_debut: this.datePipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datePipe.transform(this.date, 'yyyy-MM-dd') }; vehicules: any = [];

  //conducteur
  //temps_total_inactivité = 0; freinage_extreme = 0; acceleration_brutale = 0; conduite_dangereuse = 0;

  type: any = null; filterBy: any = null;

  constructor(
    private vehiculeService: VehiculeService,
    private readonly ecoconduiteService: EcoconduiteService,
    private conducteurService: ConducteurService,
    private geoLocalisationService: GeoLocalisationService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.getResumeOfAllehicule('chartVehicule', 'fuel_consomme');
    this.getResumeOfAllConducteur('chartConducteur','acceleration');

    //this.getInfosForConducteur(null);
  }

  async getResumeOfAllConducteur(idChart: any, ChartBy: any) {
     //01 
    var data=null; var titre:any=null;
    const conducteur$:any = this.conducteurService.getConducteurs().pipe(
      map(conducteur => conducteur.filter((c: any) => c.vehicule_id)),
      switchMap(data => forkJoin(data.map(this.getAnalyseByConducteur.bind(this))))
    );
    this.list_resume_conducteur = await conducteur$.toPromise();

    if (ChartBy == "acceleration") { data = this.list_resume_conducteur.map((t: any) => ({ x: t.nom_complet, y: t.acceleration })); titre="Acceleration brusque"}
    else if (ChartBy == "freinage") { data = this.list_resume_conducteur.map((t: any) => ({ x:t.nom_complet, y:t.freinage }));  titre="Freinage brusque " }
    else if (ChartBy == "speedScore") { data = [...this.list_resume_conducteur].map(t => ({ x:t.nom_complet, y: t.speedScore }));titre="Score d'excès de vitesse "  }
    else if (ChartBy == "virrage_serre") { data = [...this.list_resume_conducteur].map(t => ({ x:t.nom_complet, y: t.virrage_serre })); titre="Comportement excessif" }

    this.infosGlobaleVehicule.freinage_extreme = this.list_resume_conducteur.reduce((prev: any, next: any) => prev + next.freinage, 0);
    this.infosGlobaleVehicule.acceleration_brutale  = this.list_resume_conducteur.reduce((prev: any, next: any) => prev + next.acceleration, 0);


    this.show_dropdown_conducteur = false;

    //this.createChart(idChart, 'titre',  data, 1);
    if (this.myChart[1]) this.myChart[1].destroy();

    this.myChart[1] = new Chart(<any>$('#chartConducteur'), {
      type: 'bar',
      data: {
        labels: [...data].map(d=> d.x),
        datasets: [{
          label: titre,
          data: [...data].map(d=> d.y),
          backgroundColor:'rgba(54, 162, 235)',
          borderWidth: 1,
          borderRadius: 10,
          borderSkipped: false,
          barPercentage: 0.40,
          categoryPercentage: 0.3
        }]
      },
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,
        scales: {
          x: { grid: { drawOnChartArea: false } },
          y: { grid: { drawOnChartArea: false } }
        }
      }
    });

    

   // console.log(data,this.list_resume_conducteur, ChartBy);
  }

  private getAnalyseByConducteur(conducteur: any): any {
    var acceleration:any={}; var freinage:any ={}; var speedScore:any ={}; var virrage_serre:any ={};
    return this.geoLocalisationService.analyseConducteur({vehicule_id: conducteur.vehicule_id, date_debut: this.filter.date_debut, date_fin:this.filter.date_fin}).pipe(
      map(res => {
        acceleration.tab=[... res.acceleration].filter(a => a.score!=0); 
        acceleration.length=acceleration.tab.length;
        acceleration.score_moy=acceleration.length>0?  acceleration.tab.reduce((prev: any, next: any) => prev + next.score, 0)/acceleration.length: 0;

        freinage.tab=[... res.freinage].filter(a => a.score!=0);
        freinage.length= freinage.tab.length;
        freinage.score_moy=freinage.length>0? freinage.tab.reduce((prev: any, next: any) => prev + next.score, 0)/freinage.length: 0;

        
        speedScore.tab=[... res.speedScore].filter(a => a.score!=0);
        speedScore.length= speedScore.tab.length;
        speedScore.score_moy=speedScore.length>0? speedScore.tab.reduce((prev: any, next: any) => prev + next.score, 0)/speedScore.length: 0;

        virrage_serre.tab=[... res.virrage_serre].filter(a => a.score!=0);
        virrage_serre.length= virrage_serre.tab.length;
        virrage_serre.score_moy=virrage_serre.length>0? virrage_serre.tab.reduce((prev: any, next: any) => prev + next.score, 0)/virrage_serre.length:0;
        
        return {
            acceleration: acceleration.score_moy,
            freinage: freinage.score_moy,
            speedScore: speedScore.score_moy,
            virrage_serre: virrage_serre.score_moy,
            nom_complet: conducteur.prenom +' '+conducteur.nom
          }

      })
    );
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
    this.createChart(idChart, titre,  data, 0);
    this.show_dropdown_vehicule = false;

    //05 L'affichage des infos globale
    this.infosGlobaleVehicule.total_distance_conduite = this.list_resume_vehicule.reduce((prev: any, next: any) => prev + next.distance_conduite, 0);
    this.infosGlobaleVehicule.total_fuel_consomme = this.list_resume_vehicule.reduce((prev: any, next: any) => prev + next.fuel_consomme, 0);
    this.infosGlobaleVehicule.total_temps_total_conduite = this.secondsToDhms(this.list_resume_vehicule.reduce((prev: any, next: any) => prev + next.temps_conduite_seconds, 0));
    this.infosGlobaleVehicule.carbone = this.list_resume_vehicule.reduce((prev: any, next: any) => prev + next.carbone, 0)/1000;
    this.infosGlobaleVehicule.co2 = this.list_resume_vehicule.reduce((prev: any, next: any) => prev + next.co2, 0)/1000;
    this.getNombreConducteurs();
  }

  private getInfosForVehicule(vehicule: any): any {
    this.filter.vehicule_id = vehicule.id;
    return this.geoLocalisationService.getAnalyseVehicule({vehicule_id: vehicule.id, date_debut: this.filter.date_debut, date_fin:this.filter.date_fin}).pipe(
      map(resume => (
        {
          fuel_consomme: [...resume.fuel].reduce((prev: any, next: any) => prev + next.qte, 0),
          distance_conduite: [...resume.distance].reduce((prev: any, next: any) => prev + next.distance, 0),
          temps_total_conduite: this.secondsToDhms([...resume.driveTime].reduce((prev: any, next: any) => prev + this.toSeconds(next.duree), 0)),
          temps_conduite_seconds: [...resume.driveTime].reduce((prev: any, next: any) => prev + this.toSeconds(next.duree), 0),
          carbone: [...resume.carbone].reduce((prev: any, next: any) => prev + next.Cg, 0),
          co2: [...resume.carbone].reduce((prev: any, next: any) => prev + next.CO2g, 0),
          fuel_gaspille: 0,
          matricule: vehicule.matricule,
          vehicule_id: vehicule.id
        }
      ))
    );
  }

  toSeconds(str: string) {
    var res = str.split(':');
    return (+res[0]) * 3600 + (+res[1]) * 60 + (+res[2]);
  }

  secondsToDhms(seconds: number) {
    seconds = Number(seconds);
    // var d = Math.floor(seconds / (3600 * 24));
    // var h = Math.floor(seconds % (3600 * 24) / 3600);
    // var m = Math.floor(seconds % 3600 / 60);
    // var s = Math.floor(seconds % 60);

    // var dDisplay = d > 0 ? d + (d == 1 ? " jour " : " jours ") : "";
    // var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
    // var mDisplay = m > 0 ? m + (m == 1 ? "min " : "min ") : "";
    // var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
    // return dDisplay + hDisplay + mDisplay + sDisplay;
    
    let hours   = Math.floor(seconds / 3600); // get hours
    return hours?.toFixed(0) +(hours == 1 ? " heure " : " heures ");
  }

  pad(num: any, size: any) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  getNombreConducteurs() {
    this.conducteurService.getAll(1).subscribe(
      res => {
        this.infosGlobaleVehicule.nb_conducteurs = [...res.records].filter(c=> c.vehicule_id!=null).length +'/'+ res.records.length;
      }
    )
  }

  /*** *** *** **** ***** ***** **** *** */


  createChart(id: any, titre: any, _data: any, position:number) {
    if (this.myChart[position]) this.myChart[position].destroy();
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
        scales: {
          x: { grid: { drawOnChartArea: false } },
          y: { grid: { drawOnChartArea: false } }
        }
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

    this.myChart[position]=new Chart(<any>$('#' + id), _myChar);

    //console.log(_data);
  }

  show_dropdown_v() {
    if (this.show_dropdown_vehicule) this.show_dropdown_vehicule = false;
    else this.show_dropdown_vehicule = true;
  }

  show_dropdown_c() {
    if (this.show_dropdown_conducteur) this.show_dropdown_conducteur = false;
    else this.show_dropdown_conducteur = true;
  }

}
