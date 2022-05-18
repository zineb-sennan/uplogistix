import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { VehiculeCarburantService } from '../../_services/vehicule-carburant.service';
import { VehiculeService } from '../../_services/vehicule.service';
import { Chart, registerables } from 'chart.js';

import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-carburant',
  templateUrl: './carburant.component.html',
  styleUrls: ['./carburant.component.css']
})
export class CarburantComponent implements OnInit {

  constructor(
    private vehiculeCarburantService: VehiculeCarburantService,
    private vehiculeService: VehiculeService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public datepipe: DatePipe
  ) { }


  message:any = null; page: any = null; date = new Date(); total = 200; type='details';
  carburants: any = []; vehicules: any = [];
  singleCarburant: any = { id: null, vehicule_id: null, qte: 0, prix: 0 };
  search: any = {
    vehicule_id: '',
    date_debut: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-01',
    date_fin: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + (this.date.getDate() + 1)).slice(-2) 
  }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.activatedRoute.params.subscribe(param => {
      this.page = param['page'];
      if (this.page) {
        this.getAllVehicule();
        this.searchCarburant(this.search);
      }
    });

    let date=new Date();
    
  }

  closeModal() {
    $('.modal').hide();
    $('.modal-backdrop').remove();
    $('body').removeAttr("style");
  }

  clear() {
    this.message = null;
    this.singleCarburant = { id: null, vehicule_id: this.search.vehicule_id, qtn: null, prix: null }
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

  setCarburant(carburant: any) {
    this.message = null;
    this.singleCarburant = carburant;
    this.search.vehicule_id = carburant.vehicule_id;

    this.vehiculeCarburantService.getCarburant(carburant.id).subscribe(
      res=> this.singleCarburant = res,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllVehicule();
      }
    )
  }

  update(form: any) {
    if (!form.id) {
      this.vehiculeCarburantService.create(form).subscribe(
        res => {
          this.searchCarburant(this.search);
          this.message = "Le carburant est ajouté avec succès !";
          this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      })
    } else {
      this.vehiculeCarburantService.update(form).subscribe(
        res => {
          this.searchCarburant(this.search);
          this.message = "Le carburant est modifié avec succès !";
          this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      })
    }
  }

  delete(id: any) {
    this.vehiculeCarburantService.delete(id).subscribe(
      res => {
        this.searchCarburant(this.search);
        this.message = "Le carburant est supprimé avec succès !";
        this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.delete(id);
      })
  }

  searchCarburant(record: any) {
    this.vehiculeCarburantService.search(record, this.page).subscribe(
      res => this.carburants = res,
      error => {
        if(error.status==401 && this.refreshToken()) this.searchCarburant(record);
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
        if(error.status==401 && this.refreshToken()) this.searchCarburant(record);
      }
    );
  }
 
  myChart:any=null;
  chartEvolutionCarburant(data:any, labels:any){
    let chart:any=$('#chart-carburants');
    if(this.myChart) this.myChart.destroy();

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
