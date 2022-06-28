import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { VehiculeService } from '../../_services/vehicule.service';
import * as $ from 'jquery';
import { GeoLocalisationService } from 'src/app/_services/geolocalisation.service';
import { EcoconduiteService } from 'src/app/_services/ecoconduite.service';
import { DatePipe } from '@angular/common';
import { VehiculeDepensesService } from 'src/app/_services/vehicule-depenses.service';
import { ConducteurService } from 'src/app/_services/conducteur.service';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Globale } from 'src/app/_globale/globale';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  //
  vehicules: any = []; moisEncours: any = {}; moisPrecedent: any = {}; etatVehicule: any = {}; vehiculesByScore: any = [];
  date = new Date(); conducteurs:any=[]; classement:any={ min_v: '', min:'', minValeur_v:0, minValeur:0 };

  constructor(
    private vehiculeService: VehiculeService,
    private geoLocalisationService: GeoLocalisationService,
    private ecoconduiteService: EcoconduiteService,
    private datePipe: DatePipe,
    private vehiculeDepensesService:VehiculeDepensesService,
    private conducteurService:ConducteurService,
    private globale: Globale
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    //
    //console.log('***',(this.globale.getAuth()))
  }


  ngAfterViewInit() {
    this.getInfos();
    this.getEtatVehicule();
    this.depensesParType();
    this.conducteurByScore();
    this.vehiculeByScore();
  }

  /*** *** ** *** *** */
  async vehiculeByScore(){
    const vehicules$:any =await this.vehiculeService.getAll().pipe(
      map(vehicule => vehicule.filter((v: any) => v.eco_conduite)),
      switchMap(data => forkJoin(data.map(this.scoreByVehicule.bind(this))))
    ).toPromise();
    
    this.vehicules = [...vehicules$].sort((a:any, b:any) => b.score - a.score);
    this.classement.minValeur_v = Math.min(...this.vehicules.map((d: any) => d.score));
    if(this.classement.maxValeur_v > 70) this.classement.max_v = [...this.vehicules].filter(v=> v.score == this.classement.maxValeur);
  } 

  private scoreByVehicule(vehicule: any): any {
    const record = { vehicule_id: vehicule.id, date_debut: this.datePipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datePipe.transform(this.date, 'yyyy-MM-dd') };
    return this.ecoconduiteService.scoreByVehicule(record).pipe(
      map(resume => (
        {
          matricule: vehicule.matricule,
          vehicule_id: vehicule.id,
          score: resume.new_score == null? 100.00: resume.new_score
        }
      ))
    );
  }

  /*** *** **** **** */

  async conducteurByScore(){
     //01
     const conducteur$:any = this.conducteurService.getConducteurs().pipe(
      map(conducteur => conducteur.filter((c: any) => c.vehicule_id)),
      switchMap(data => forkJoin(data.map(this.getScoreByConducteur.bind(this))))
    );
    this.conducteurs = (await conducteur$.toPromise()).sort((a:any, b:any) => b.moy_score - a.moy_score);
    //02
    //this.classement.maxValeur = Math.max(...this.conducteurs.map((d: any) => d.moy_score));
    this.classement.minValeur = Math.min(...this.conducteurs.map((d: any) => d.moy_score));

    //if(this.classement.maxValeur > 70) this.classement.max = [...this.conducteurs].filter(v=> v.moy_score == this.classement.maxValeur);
    if(this.classement.minValeur < 30) this.classement.min = [...this.conducteurs].filter(v=> v.moy_score == this.classement.minValeur);

    //console.log(this.classement);
  }

  private getScoreByConducteur(conducteur: any): any {

    const record = { vehicule_id: conducteur.vehicule_id, date_debut: this.datePipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datePipe.transform(this.date, 'yyyy-MM-dd') };

    return this.geoLocalisationService.analyseConducteur(record).pipe(
      map(resume => (
        {
          matricule: conducteur.matricule,
          nom_complet: conducteur.prenom +' '+ conducteur.nom,
          moy_score : ([...resume.score].filter(s => s.score > 0)).reduce((prev: any, next: any) => prev + next.score, 0) / ([...resume.score].filter(s => s.score > 0)).length
        }
      ))
    );

  }

  //*** *** ** **  */

  getInfos() {
    this.geoLocalisationService.getInfosDashboard().subscribe(
      res => {
        const mois = ["JAN", "FEV", "MAR", "AVR", "MAI", "JUN", "JUL", "AOU", "SEP", "OCT", "NOV", "DEC"];
        //01
        this.moisEncours = res.moisEncours;
        this.moisPrecedent = res.moisPrecedent;
        this.moisEncours.cout_1km=[...res.coutKM].filter(c=>c.mois == (this.date.getMonth()+1))[0].coutKM;
        this.moisPrecedent.cout_1km=[...res.coutKM].filter(c=>c.mois == (this.date.getMonth()))[0].coutKM;
        //02 Coût Total
        this.chart('chart-total-consommation', 'bar', res.coutTotal.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.coutTotal })));
        //03 Total Coût/1 Km Dh
        this.chart('chart-cout-km', 'bar', res.coutKM.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.coutKM })));
        //04 Évolution de compteur km
        this.chart('chart-evolution-compteur', 'line', res.compteurTotal.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.distance })));
        //05 Évolution empreinte carbone Kg
        this.chart('chart-carbone', 'line', res.carboneTotal.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.cKg })));
        //06 Co2 kg
        this.chart('chart-co2', 'line', res.carboneTotal.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.co2Kg })));
        //07 Coût total du carburant
        this.chart('chart-consommation-carburant', 'bar', res.coutFuel.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.coutFuel })));
        //08-Coût maintenance
        this.chart('chart-maintenance', 'bar', res.coutMaintenance.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.coutTotal })));
      }
    )
  }

  chart(idChart: any, typeChart: any, _data: any) {
    const _myChar:any= {
      type: typeChart,
      data: {
        datasets: [{
          data: _data,
          backgroundColor: 'rgba(44, 123, 228)',
        }]
      },
      options: {
        scales: {
          x: { grid: { drawOnChartArea: false } },
          y: { grid: { drawOnChartArea: false } }
        },
        plugins: { legend: { display: false } }
      }
    };
    if(typeChart == 'bar'){
      _myChar.data.datasets[0].borderWidth='0.5';
      _myChar.data.datasets[0].borderRadius=6;
      _myChar.data.datasets[0].borderSkipped=false;
      if(idChart == "chart-total-consommation") _myChar.data.datasets[0].categoryPercentage=0.09;
      else _myChar.data.datasets[0].categoryPercentage=0.2;
    }
    new Chart(<any>$('#' + idChart), _myChar);
  }

  calc(val1: number, val2: number): string {
    return ((val1 / (val1 + val2)) * 100).toFixed(2);
  }

  getEtatVehicule() {
    this.vehiculeService.getAll().subscribe(
      res => {
        this.etatVehicule.eco_conduite = [...res].filter(v => v.eco_conduite).length;
        this.etatVehicule.gps = [...res].filter(v => v.balise).length;
        this.etatVehicule.non_gps = [...res].filter(v => !v.balise).length;
        this.etatVehicule.maintenance = [...res].filter(v => v.statut == "En maintenance").length;
        this.etatVehicule.actif = [...res].filter(v => v.statut == "Actif").length;
        this.etatVehicule.inactif = [...res].filter(v => v.statut == "Inactif").length;
        this.etatVehicule.occupe = [...res].filter(v => v.statut == "Occupé").length;
        //
        // this.vehiculesByScore = [];
        // [...res].filter(v => v.eco_conduite).forEach(v => this.getScoreByVehicule(v.id, v.matricule));
        //
      }
    )
  }

  depensesParType(){
    this.vehiculeDepensesService.getDepensesParType({date_debut:null, date_fin:null}).subscribe(
      res => {
        this.chartDepenses(res);
      }
    )
  }

  chartDepenses(_data:any){
    let chart:any=$('#chart-depenses');
    new Chart(chart, {
      type: 'doughnut',
      data: {
          labels: [..._data].map(v=>v.type_depense),
          datasets: [{
              label: '# Total consommation',
              data: [..._data].map(v=>v.cout),
              backgroundColor: [
                'rgba(44, 123, 228)',
                'rgb(3, 32, 76)',
                'rgb(100, 151, 178)',
                'rgb(179, 206, 225)'
              ],
              hoverOffset: 4
          }],
      },
      options:{
        cutout: 60,
        maintainAspectRatio:false,
        plugins: {
          legend: { position: 'left' }
        }
      }
    });
  }

}
