import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globale } from 'src/app/_globale/globale';
import { ConducteurService } from 'src/app/_services/conducteur.service';
import { OrdreInterventionService } from 'src/app/_services/ordre-intervention.service';
import { TiersService } from 'src/app/_services/tiers.service';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import { VehiculeService } from 'src/app/_services/vehicule.service';

import { map, switchMap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { TachesService } from 'src/app/_services/taches.service';

@Component({
  selector: 'app-index-ordre-intervention',
  templateUrl: './index-ordre-intervention.component.html',
  styleUrls: ['./index-ordre-intervention.component.css']
})
export class IndexOrdreInterventionComponent implements OnInit {
  ordres:any=[]; vehicules:any=[]; conducteurs:any=[]; utilisateurs:any=[]; tiers:any=[];
  singleOrder:any={ vehicule_id:null, conducteur_id:null, utilisateur_id:null, tiers_id:null, priorite:null, date_limite:null, note:null, user_affecter:null }

  constructor(
    private ordreInterventionService:OrdreInterventionService,
    private vehiculeService:VehiculeService,
    private conducteurService:ConducteurService,
    private utilisateurService:UtilisateurService,
    private tiersService:TiersService,
    private tachesService:TachesService,
    private router: Router,
    private globale:Globale,
  ) { }

  ngOnInit(): void {
    this.getAllOrder();
    this.getAllVehicules();
    this.getAllConducteurs();
    this.getAllUtilisateurs();
    this.getAllTiers();
  }

  getAllTiers(){
    this.tiersService.getAll().subscribe(
      res=> this.tiers=res
    )
  }

  getAllVehicules(){
    this.vehiculeService.getAll().subscribe(
      res=> this.vehicules=res
    )
  }

  getAllConducteurs(){
    this.conducteurService.getConducteurs().subscribe(
      res=> {
        this.conducteurs=res;
      }
    )
  }

  getAllUtilisateurs(){
    this.utilisateurService.getAll().subscribe(
      res=> {
        this.utilisateurs=res;
      } 
    )
  }

  update(form:any){
    const id = form.user_affecter.split('.');

    this.ordreInterventionService.create({...form, [id[0] == 'c' ? 'conducteur_id' : id[0] == 'u' ? 'utilisateur_id' : 'tiers_id']: id[1] }).subscribe(
      res => {
        this.globale.closeModal();
        this.router.navigate(['maintenance/ordre-intervention/'+res.id+'/edit']);
      }
    )
  }

  //01 
  async getAllOrder(){
    const taches$ = this.ordreInterventionService.getAll().pipe(
      switchMap(data => forkJoin(data.map(this.getProgresOrder.bind(this))))
    );
    this.ordres= await taches$.toPromise();
  }

  getProgresOrder(order: any){
    return this.tachesService.getAll(order.id).pipe(
      map(resume => (
        {
          ... order,
          _nbOrders: [...resume]?.length,
          _nbOrderValides: [...resume].filter(t=> t.terminated_at)?.length
        }
      ))
    );
 }

}
