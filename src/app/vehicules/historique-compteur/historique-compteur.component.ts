import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { VehiculeHistoriqueCompteurService } from 'src/app/_services/vehicule-historique-compteur.service';
import { VehiculeService } from 'src/app/_services/vehicule.service';
import * as $ from 'jquery';
import { EcoconduiteService } from 'src/app/_services/ecoconduite.service';

import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-historique-compteur',
  templateUrl: './historique-compteur.component.html',
  styleUrls: ['./historique-compteur.component.css']
})
export class HistoriqueCompteurComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private vehiculeHistoriqueCompteurService:VehiculeHistoriqueCompteurService,
    private vehiculeService: VehiculeService,
    private ecoconduiteService: EcoconduiteService
  ) { }

  currentDate = new Date();
  compteurs : any = []; message:any; vehicules_avec_balise:any=[]; vehicules_sans_balise:any=[]; date = new Date(); page=1; type='saisi-manuel';
  singleCompteur={ id:null, vehicule_id:null, date_operation:null, compteur:null }
  search: any = {
    vehicule_id: '',
    date_debut: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-01',
    date_fin: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + (this.date.getDate() + 1)).slice(-2) 
  }
  

  ngOnInit(): void {
    Chart.register(...registerables);

    this.searchCompteurs(null);

    this.activatedRoute.params.subscribe(param => {
      this.page = param['page'];
      if(this.page) this.searchCompteurs(null);
      this.getVehicules();
    });
  }

  clear(){
    this.singleCompteur = { id:null, vehicule_id:null, date_operation:null, compteur:null };
  }

  closeModal() {
    $('.modal').hide();
    $('.modal-backdrop').remove();
    $('body').removeAttr("style");
  }

  logout() {
    this.authService.logout();
  }

  async refreshToken() {
    return await this.authService.refresh() ? true : this.logout();
  }

  getVehicules(){
    this.vehiculeService.getAll().subscribe(
      res=> {
        //01
        this.vehicules_avec_balise=res.filter((v: any) => v.balise);
        this.vehicules_avec_balise.map(async (v: any) => v.compteur = v.eco_conduite ? (await this.ecoconduiteService.resumeOfVehicule(v.id).toPromise()).compteur_km : null);
        //02
        this.vehicules_sans_balise=res.filter((v: any) => !v.balise);
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.getVehicules();
      }
    )
  }

  searchCompteurs(data:any){
    this.vehiculeHistoriqueCompteurService.search(this.page,data).subscribe(
      res=> this.compteurs=res,
      error => {
        if(error.status==401 && this.refreshToken()) this.searchCompteurs(data);
      }
    )
  }

  getCompteur(id:number){
    this.message=null;
    this.vehiculeHistoriqueCompteurService.getCompteur(id).subscribe(
      res=> this.singleCompteur=res,
      error => {
        if(error.status==401 && this.refreshToken()) this.getCompteur(id);
      }
    )
  }

  update(form: any) {
    if (!form.id) {
      this.vehiculeHistoriqueCompteurService.create(form).subscribe(
        res => {
          this.searchCompteurs(null);
          this.message = "Le carburant est ajouté avec succès !";
          this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      })
    } else {
      this.vehiculeHistoriqueCompteurService.update(form).subscribe(
        res => {
          this.searchCompteurs(null);
          this.message = "Le carburant est modifié avec succès !";
          this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      })
    }
  }

  delete(id: any) {
    this.vehiculeHistoriqueCompteurService.delete(id).subscribe(
      res => {
        this.searchCompteurs(null);
        this.message = "Le carburant est supprimé avec succès !";
        this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.delete(id);
      })
  }

  generateChart(record: any){
    this.chartEvolutionCarburant();
  }

  mychart:any=null;
  chartEvolutionCarburant(){
    let chart:any=$('#chart-compteurs');
    if(this.mychart) this.mychart.destroy();

    this.mychart = new Chart(chart,{
      type:'line',
      data:{
        datasets:[
          {
            data:[
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0),
              (Math.floor(Math.random() * (100 - 0 + 1)) + 0)
            ],
            label:"chart",
            backgroundColor: 'rgba(44, 123, 228)',
            borderColor: 'rgba(44, 123, 228)'
          }
        ],
        labels:["	06/05/2022 18:25", "16/05/2022 12:31", "16/05/2022 12:35"]
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
