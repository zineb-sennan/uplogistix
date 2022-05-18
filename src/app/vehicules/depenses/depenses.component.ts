import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { VehiculeService } from 'src/app/_services/vehicule.service';

import { Chart, registerables } from 'chart.js';

import * as $ from 'jquery';
import { VehiculeDepensesService } from 'src/app/_services/vehicule-depenses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private vehiculeService:VehiculeService,
    private vehiculeDepensesService:VehiculeDepensesService,
    private activatedRoute: ActivatedRoute
  ) { }

  message:any=null; page:number=1; date = new Date(); type='details';
  vehicules: any = []; depenses: any= [];
  singleDepense: any = { id: null, vehicule_id: null, type_depense:null, designation:null, montant:null, recurrence:'', fournisseur:null, note:null, commentaire:null};
  search: any = {
    vehicule_id: '',
    date_debut: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-01',
    date_fin: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + (this.date.getDate() + 1)).slice(-2) 
  }
 

  ngOnInit(): void {
    Chart.register(...registerables);

    this.getAllVehicule();

    this.activatedRoute.params.subscribe(param => {
      this.page = param['page'];
      if (this.page) {
        this.getAllVehicule();
        this.searchDepenses(this.search);
      }
    });
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

  getAllVehicule() {
    this.vehiculeService.getAll().subscribe(
      result => this.vehicules = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllVehicule();
      }
    );
  }

  clear(){
    this.singleDepense={ id: null, vehicule_id: null, type_depense:null, designation:null, montant:null, recurrence:'', fournisseur:null, note:null, commentaire:null};
  }
 
  update(form: any) {
    if (!form.id) {
      this.vehiculeDepensesService.create(form).subscribe(
        res => {
          this.searchDepenses(this.search);
          this.message = "La dépense est ajoutée avec succès !";
          this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      })
    } else {
      this.vehiculeDepensesService.update(form).subscribe(
        res => {
          this.searchDepenses(this.search);
          this.message = "La dépense est modifiée avec succès !";
          this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      })
    }
  }

  delete(id: any) {
    this.vehiculeDepensesService.delete(id).subscribe(
      res => {
        this.searchDepenses(this.search);
        this.message = "La dépense est supprimée avec succès !";
        this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.delete(id);
      })
  }

  getDepense(id:number){
    this.vehiculeDepensesService.getDepenses(id).subscribe(
      res=> this.singleDepense=res,
      error => {
        if(error.status==401 && this.refreshToken()) this.getDepense(id);
    })
  }

  searchDepenses(record: any) {
    this.vehiculeDepensesService.search(record, this.page).subscribe(
      res => this.depenses = res,
      error => {
        if(error.status==401 && this.refreshToken()) this.searchDepenses(record);
      }
    );
  }

  generateChart(record: any){
    this.chartEvolutionDepenses();
  }

  myChart:any=null;
  chartEvolutionDepenses(){
    let chart:any=$('#chart-depenses');
    if(this.myChart) this.myChart.destroy();
    this.myChart = new Chart(chart, {
      type: 'doughnut',
      data: {
          labels: ['Services', 'Autre', 'Aucun'],
          datasets: [{
              label: '# Total consommation',
              data:  [300, 50, 100],
              backgroundColor: [
                'rgb(44, 123, 226)',
                'rgb(165, 197, 246)',
                'rgb(210, 222, 236)'
              ],
              hoverOffset: 4
          }],
      },
      options:{
        cutout: 100,
        maintainAspectRatio:false,
        plugins: {
          legend: { position: 'left' }
        }
      }
    });
  }

}
