import { Component, OnInit } from '@angular/core';
import { VehiculeService } from 'src/app/_services/vehicule.service';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';
import { MaintenancePreventiveService } from 'src/app/_services/maintenance-preventive.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pieces:any=[]; search:any={vehicule_id:null, date_debut:null, date_fin:null}; date=new Date();
  historiques:any=[]; type:any='infos-vehicule'; singleVehicule:any=[];

  constructor(
    private vehiculeService:VehiculeService,
    private maintenancePreventiveService:MaintenancePreventiveService,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    
    this.chartOrderIntervention();
    
    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id){
        this.getPiecesByVehicule(id);
        this.getVehiculeById(id);
        this.search={
          vehicule_id:id, 
          date_debut: this.datepipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), 
          date_fin: this.datepipe.transform(this.date, 'yyyy-MM-dd')
        };

        this.searchHistorique();
      } 
    });

  }

  getVehiculeById(id:number){
    this.vehiculeService.getVehiculeById(id).subscribe(
      res => this.singleVehicule = res
    )
  }

  chartOrderIntervention(){
    new Chart(<any>$('#chart-cout-maintenance'), {
      type: 'bar',
      data: {
        labels: ['01/07', '02/07', '03/07','04/07', '05/07', '06/07', '07/07','08/07'],
        datasets: [{
          data: [300, 50, 100,40, 100, 500, 10,40],
          label: 'Coût de maintenance',
          backgroundColor:'rgba(54, 162, 235)',
          borderWidth: 1,
          borderRadius: 10,
          borderSkipped: false,
          barPercentage: 0.40,
          categoryPercentage: 0.3
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: { grid: { drawOnChartArea: false } },
          y: { grid: { drawOnChartArea: false } }
        }
      }
    });
  }

  getPiecesByVehicule(id:number){
     this.maintenancePreventiveService.getPiecesByVehicule(id).subscribe(
        res =>{
          this.pieces=res;
        }
     )
  }

  searchHistorique(){
    this.maintenancePreventiveService.getHistorique(this.search).subscribe(
      res =>{
        this.historiques=res;
      } 
    )
  }

}
