import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { VehiculeHistoriqueCompteurService } from '../../_services/vehicule-historique-compteur.service';
import { VehiculeService } from '../../_services/vehicule.service';
import { SecuriteClass } from '../../_globale/securite';
import { Globale } from '../../_globale/globale';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historique-compteur',
  templateUrl: './historique-compteur.component.html',
  styleUrls: ['./historique-compteur.component.css']
})
export class HistoriqueCompteurComponent implements OnInit {

  constructor(
    private securiteClass: SecuriteClass,
    private globale: Globale,
    private activatedRoute: ActivatedRoute,
    private vehiculeHistoriqueCompteurService: VehiculeHistoriqueCompteurService,
    private vehiculeService: VehiculeService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  currentDate = new Date(); total = { manuel: 0, automatique: 0 };
  compteurs: any = []; compteurs_gps: any = []; vehicules_sans_balise: any = []; vehicules_avec_balise: any = []; vehicules: any = [];
  date = new Date(); page = 1; type = 'saisi-manuel'; message: any;
  singleCompteur = { id: null, vehicule_id: null, date_operation: null, compteur: null }
  search: any = {
    vehicule_id: null,
    date_debut: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-01',
    date_fin: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + (this.date.getDate() + 1)).slice(-2)
  }


  ngOnInit(): void {
    Chart.register(...registerables);
    this.getVehicules();

    this.activatedRoute.params.subscribe(param => {
      this.page = param['page'];
      if (this.page) {
        if (this.router.url.search('/vehicules/gps-compteurs/find/page/') != -1) {
          this.searchCompteursAutomatique(this.search);
          this.type = 'releve-automatique'
        }
        else { this.searchCompteurs(this.search); this.type = 'saisi-manuel' }
      }
    });
  }

  clear() {
    this.singleCompteur = { id: null, vehicule_id: null, date_operation: null, compteur: null };
  }


  getVehicules() {
    this.vehiculeService.getAll().subscribe(
      res => {
        this.vehicules = res;
        this.vehicules_avec_balise = res.filter((v: any) => v.balise);
        this.vehicules_sans_balise = res.filter((v: any) => !v.balise);
      },
      async error => {
        if (error.status == 401 && await this.securiteClass.refreshToken()) this.getVehicules();
      }
    )
  }

  searchCompteurs(data: any) {
    if (data.vehicule_id) {
      this.vehiculeHistoriqueCompteurService.search(this.page, data).subscribe(
        res => this.compteurs = res,
        async error => {
          if (error.status == 401 && await this.securiteClass.refreshToken()) this.searchCompteurs(data);
        }
      )

      this.vehiculeHistoriqueCompteurService.getAllCompteurManuel(data).subscribe(
        res => {
          const data = JSON.parse(JSON.stringify(res));
          this.total.manuel = data.reduce((prev: any, next: any) => prev + next.distance, 0);
        }
      )
    }
  }

  searchCompteursAutomatique(record: any) {
    if (record.vehicule_id) {
      this.vehiculeHistoriqueCompteurService.getGpsCompteur(this.page, this.search).subscribe(
        res => this.compteurs_gps = res,
        async error => {
          if (error.status == 401 && await this.securiteClass.refreshToken()) this.searchCompteursAutomatique(record);
        }
      )

      this.vehiculeHistoriqueCompteurService.getAllCompteurAutomatique(this.search).subscribe(
        res => {
          const data = JSON.parse(JSON.stringify(res));
          this.total.automatique = data.reduce((prev: any, next: any) => prev + next.distance, 0);
        }
      )
    }//
  }

  getCompteur(id: number) {
    this.message = null;
    this.vehiculeHistoriqueCompteurService.getCompteur(id).subscribe(
      res => this.singleCompteur = res,
      async error => {
        if (error.status == 401 && await this.securiteClass.refreshToken()) this.getCompteur(id);
      }
    )
  }

  update(form: any) {
    if (!form.id) {
      this.vehiculeHistoriqueCompteurService.create(form).subscribe(
        res => {
          this.searchCompteurs(null);
          this.message = "Le carburant est ajouté avec succès !";
          this.globale.closeModal();
        },
        async error => {
          if (error.status == 401 && await this.securiteClass.refreshToken()) this.update(form);
        }
      )
    } else {
      this.vehiculeHistoriqueCompteurService.update(form).subscribe(
        res => {
          this.searchCompteurs(null);
          this.message = "Le carburant est modifié avec succès !";
          this.globale.closeModal();
        },
        async error => {
          if (error.status == 401 && await this.securiteClass.refreshToken()) this.update(form);
        }
      )
    }
  }

  delete(id: any) {
    this.vehiculeHistoriqueCompteurService.delete(id).subscribe(
      res => {
        this.searchCompteurs(null);
        this.message = "Le carburant est supprimé avec succès !";
        this.globale.closeModal();
      },
      async error => {
        if (error.status == 401 && await this.securiteClass.refreshToken()) this.delete(id);
      }
    )
  }

  generateChart(record: any) {
    if ([...this.vehicules_avec_balise.filter((v: any) => v.id == record.vehicule_id)].length > 0) {
      this.vehiculeHistoriqueCompteurService.getAllCompteurAutomatique(this.search).subscribe(
        res => {
          const data = JSON.parse(JSON.stringify(res));
          this.chartEvolutionConpteur([...data].map((f: any) => ({ x: this.datePipe.transform(f.date_heure, 'dd/MM'), y: f.distance })));
        },
        async error => {
          if (error.status == 401 && await this.securiteClass.refreshToken()) this.generateChart(record);
        }
      )
    }
    else {
      //*** sans balise  pas de data ***
      this.vehiculeHistoriqueCompteurService.getAllCompteurManuel(this.search).subscribe(
        res => {
          //console.log('***',res);
          const data = JSON.parse(JSON.stringify(res));
          this.chartEvolutionConpteur([...data].map((f: any) => ({ x: this.datePipe.transform(f.date_operation, 'dd/MM'), y: f.distance })));
        }
      )
    }
  }

  mychart: any = null;
  chartEvolutionConpteur(_data: any) {
    let chart: any = $('#chart-compteurs');
    if (this.mychart) this.mychart.destroy();

    this.mychart = new Chart(chart, {
      type: 'line',
      data: {
        datasets: [
          {
            data: _data,
            label: "chart",
            backgroundColor: 'rgba(44, 123, 228)',
            borderColor: 'rgba(44, 123, 228)'
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { drawOnChartArea: false }
          },
          y: {
            grid: { drawOnChartArea: false }
          }
        },
        plugins: {
          legend: { display: false }
        }
      },

    })
  }

}
