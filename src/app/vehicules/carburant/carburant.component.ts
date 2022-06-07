import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { VehiculeCarburantService } from '../../_services/vehicule-carburant.service';
import { VehiculeService } from '../../_services/vehicule.service';
import { SecuriteClass } from '../../_globale/securite';
import { Globale } from '../../_globale/globale';
import * as $ from 'jquery';

@Component({
  selector: 'app-carburant',
  templateUrl: './carburant.component.html',
  styleUrls: ['./carburant.component.css']
})
export class CarburantComponent implements OnInit {

  constructor(
    private securiteClass: SecuriteClass,
    public globale:Globale,
    private vehiculeCarburantService: VehiculeCarburantService,
    private vehiculeService: VehiculeService,
    private activatedRoute: ActivatedRoute,
    public datepipe: DatePipe
  ) { }


  message:any = null; page: any = null; date = new Date(); total = 200; type='details';
  carburants: any = []; vehicules: any = [];
  singleCarburant: any = { id: null, vehicule_id: null, qte: 0, prix: 0 };
  search: any = {
    vehicule_id: null,
    date_debut: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-01',
    date_fin: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + (this.date.getDate() + 1)).slice(-2) 
  }

  ngOnInit(): void {
    //01
    Chart.register(...registerables);
    //02
    this.activatedRoute.params.subscribe(
      param => {
        this.page = param['page'];
        if (this.page) {
          this.getAllVehicule();
          this.searchCarburant(this.search);
        }
    });
  }

  clear() {
    this.message = null;
    this.singleCarburant = { id: null, vehicule_id: this.search.vehicule_id, qtn: null, prix: null }
  }
  

  getAllVehicule() {
    this.vehiculeService.getAll().subscribe(
      result => this.vehicules = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllVehicule();
      }
    );
  }

  setCarburant(carburant: any) {
    //01
    this.message = null;
    this.singleCarburant = carburant;
    this.search.vehicule_id = carburant.vehicule_id;
    //02
    this.vehiculeCarburantService.getCarburant(carburant.id).subscribe(
      res=> this.singleCarburant = res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllVehicule();
      }
    )
  }

  update(form: any) {
    if (!form.id) {
      this.vehiculeCarburantService.create(form).subscribe(
        res => {
          this.searchCarburant(this.search);
          this.message = "Le carburant est ajouté avec succès !";
          this.globale.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
      })
    } else {
      this.vehiculeCarburantService.update(form).subscribe(
        res => {
          this.searchCarburant(this.search);
          this.message = "Le carburant est modifié avec succès !";
          this.globale.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
      })
    }
  }

  delete(id: any) {
    this.vehiculeCarburantService.delete(id).subscribe(
      res => {
        this.searchCarburant(this.search);
        this.message = "Le carburant est supprimé avec succès !";
        this.globale.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.delete(id);
      })
  }

  searchCarburant(record: any) {
    this.vehiculeCarburantService.search(record, this.page).subscribe(
      res => this.carburants = res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.searchCarburant(record);
      }
    );
  }

  generateChart(record: any){
    this.vehiculeCarburantService.search(record, this.page).subscribe(
      res => {
        let data=res['records'].map((t: any) => t.total);
        let lebels=res['records'].map((t: any) =>  this.datepipe.transform(t.created_at, 'dd/MM/yyyy HH:mm'));
        this.chartEvolutionCarburant(data, lebels);
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.searchCarburant(record);
      }
    );
  }
 
  myChart:any=null;
  chartEvolutionCarburant(data:any, labels:any){
    //01
    let chart:any=$('#chart-carburants');
    if(this.myChart) this.myChart.destroy();
    //02
    this.myChart = new Chart(chart,{
      type:'line',
      data:{
        datasets:[
          {
            data:data,
            label:"chart",
            backgroundColor: 'rgba(44, 123, 228)',
            borderColor: 'rgba(44, 123, 228)'
          }
        ],
        labels:labels
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
