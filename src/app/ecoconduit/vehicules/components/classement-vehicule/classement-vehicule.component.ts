import { DatePipe } from '@angular/common';
import { EcoconduiteService } from '../../../../_services/ecoconduite.service';
import { VehiculeService } from '../../../../_services/vehicule.service';
import { Pipe, PipeTransform } from '@angular/core' ;

import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GeoLocalisationService } from 'src/app/_services/geolocalisation.service';



@Component({
  selector: 'app-classement-vehicule',
  templateUrl: './classement-vehicule.component.html',
  styleUrls: ['./classement-vehicule.component.css']
})
export class ClassementVehiculeComponent implements OnInit {
  date:any=new Date(); vehicules: any = [];

  constructor(
    private ecoconduiteService: EcoconduiteService,
    private vehiculeService: VehiculeService,
    private datePipe: DatePipe,
    private geoLocalisationService:GeoLocalisationService
  ) { }

  async ngOnInit() {
    
    const vehicules$:any =await this.vehiculeService.getAll().pipe(
      map(vehicule => vehicule.filter((v: any) => v.eco_conduite)),
      switchMap(data => forkJoin(data.map(this.scoreByVehicule.bind(this))))
    ).toPromise();
    
    this.vehicules = [...vehicules$].sort((a:any, b:any) => b.score - a.score);
  
  }

  private scoreByVehicule(vehicule: any): any {
    const record = { vehicule_id: vehicule.id, date_debut: this.datePipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datePipe.transform(this.date, 'yyyy-MM-dd') };
    return this.ecoconduiteService.scoreByVehicule(record).pipe(
      map(resume => (
        {
          matricule: vehicule.matricule,
          vehicule_id: vehicule.id,
          score: resume.new_score
        }
      ))
    );
  }

}
