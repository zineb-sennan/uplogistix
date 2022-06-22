import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { VehiculeService } from '../../_services/vehicule.service';
import { SecuriteClass } from '../../_globale/securite';
import { Globale } from '../../_globale/globale';
import { VehiculeDepensesService } from '../../_services/vehicule-depenses.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent implements OnInit {

  constructor(
    private securiteClass: SecuriteClass,
    private globale:Globale,
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

  getAllVehicule() {
    this.vehiculeService.getAll().subscribe(
      result => this.vehicules = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllVehicule();
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
          this.globale.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
      })
    } else {
      this.vehiculeDepensesService.update(form).subscribe(
        res => {
          this.searchDepenses(this.search);
          this.message = "La dépense est modifiée avec succès !";
          this.globale.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
      })
    }
  }

  delete(id: any) {
    this.vehiculeDepensesService.delete(id).subscribe(
      res => {
        this.searchDepenses(this.search);
        this.message = "La dépense est supprimée avec succès !";
        this.globale.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.delete(id);
      })
  }

  getDepense(id:number){
    this.vehiculeDepensesService.getDepenses(id).subscribe(
      res=> this.singleDepense=res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getDepense(id);
    })
  }

  searchDepenses(record: any) {
    this.vehiculeDepensesService.search(record, this.page).subscribe(
      res => this.depenses = res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.searchDepenses(record);
      }
    );
  }

  generateChart(record: any){
    //this.chartEvolutionDepenses();
    this.depensesParType();
  }

  myChart:any=null;
  // chartEvolutionDepenses(){
  //   let chart:any=$('#chart-depenses');
  //   if(this.myChart) this.myChart.destroy();
  //   this.myChart = new Chart(chart, {
  //     type: 'doughnut',
  //     data: {
  //         labels: ['Services', 'Autre'],
  //         datasets: [{
  //             label: '# Total consommation',
  //             data:  [300, 50],
  //             backgroundColor: [
  //               'rgb(44, 123, 226)',
  //               'rgb(165, 197, 246)'
  //             ],
  //             hoverOffset: 20
  //         }],
  //     },
  //     options:{
  //       cutout: '85%',
  //       maintainAspectRatio:false,
  //       plugins: {
  //         legend: { position: 'left' }
  //       }
  //     }
  //   });
  // }

  depensesParType(){
    this.vehiculeDepensesService.getDepensesParType(this.search).subscribe(
      res => {
        this.chartDepenses(res);
      }
    )
  }

  //myChart:any=null;
  chartDepenses(_data:any){
    // let chart:any=$('#chart-depenses');
    // new Chart(chart, {
    //   type: 'doughnut',
    //   data: {
    //       labels: [..._data].map(v=>v.type_depense),
    //       datasets: [{
    //           label: '# Total consommation',
    //           data: [..._data].map(v=>v.cout),
    //           backgroundColor: [
    //             'rgb(44, 123, 226)',
    //             'rgb(165, 197, 246)',
    //             'rgb(210, 222, 236)'
    //           ],
    //           hoverOffset: 4
    //       }],
    //   },
    //   options:{
    //     cutout: 60,
    //     maintainAspectRatio:false,
    //     plugins: {
    //       legend: { position: 'left' }
    //     }
    //   }
    // });
    //
    let chart:any=$('#chart-depenses');
    if(this.myChart) this.myChart.destroy();
    this.myChart = new Chart(chart, {
      type: 'doughnut',
      data: {
          labels: [..._data].map(v=>v.type_depense),
          datasets: [{
              label: '# Total consommation',
              data:  [..._data].map(v=>v.cout),
              backgroundColor: [
                'rgb(3, 32, 76)',
                'rgb(3, 92, 150)',
                'rgb(100, 151, 178)',
                'rgb(179, 206, 225)'
              ],
              hoverOffset: 20
          }],
      },
      options:{
        cutout: '85%',
        maintainAspectRatio:false,
        plugins: {
          legend: { position: 'left' }
        }
      }
    });
  }

}
