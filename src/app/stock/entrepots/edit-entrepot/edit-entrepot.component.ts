import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecuriteClass } from 'src/app/_globale/securite';
import { EntrepotsService } from 'src/app/_services/entrepots.service';
import { PaysService } from 'src/app/_services/pays.service';
import { RegionsService } from 'src/app/_services/regions.service';
import { VillesService } from 'src/app/_services/villes.service';

@Component({
  selector: 'app-edit-entrepot',
  templateUrl: './edit-entrepot.component.html',
  styleUrls: ['./edit-entrepot.component.css']
})
export class EditEntrepotComponent implements OnInit {
  pays:any=[]; regions:any=[]; villes:any=[]; message:any='';

  singleEntrepot:any={id:null, nom:null, description:null, adresse:null, pays_id:null, region_id :null, ville_id :null, 	tel_mobile:null, 	tel_bureau:null, 	fax :null, email :null };


  constructor(
    private paysService:PaysService,
    private regionsService:RegionsService,
    private villesService:VillesService,
    private securiteClass:SecuriteClass,
    private entrepotsService:EntrepotsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllPays();

    //
    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id) this.getEntrepotById(id);
    });
  }

  getAllPays() {
    this.paysService.getAll().subscribe(
      result => this.pays = result,
      async error => {
        if(error.status==401 && await this.securiteClass.refreshToken()) this.getAllPays();
      });
  }

  getRegionsByPays(id: any) {
    this.regions = [];
    this.regionsService.regionsByPays(id).subscribe(
      result => {
        this.regions = result;
        this.singleEntrepot.pays_id = id;
      },
      async error => {
        if(error.status==401 && await this.securiteClass.refreshToken()) this.getRegionsByPays(id);
      });
  }

  getVillesByRegion(id: any) {
    this.villesService.villesByRegion(id).subscribe(
      result => {
        this.villes = result;
        this.singleEntrepot.region_id = id;
    },
    async error => {
      if(error.status==401 && await this.securiteClass.refreshToken()) this.getVillesByRegion(id);
    });
  }

  changePays(e: any) {
    this.getRegionsByPays(e.target.value);
  }

  changeRegion(e: any) {
    this.getVillesByRegion(e.target.value);
  }

  fermer(){
    console.log("bbbb");
  }

  update(form:any){
    if (!form.id) {
      this.entrepotsService.create(form).subscribe(
        res=>{
          console.log('Bien ajouter !!!');
        }
      )
    }
    else{
      this.entrepotsService.update(form).subscribe(
        res=>{
          console.log('Bien modifie !!!');
        }
      )
    }
  }

  getEntrepotById(id:number){
    this.entrepotsService.getEntrepot(id).subscribe(
      res=> this.singleEntrepot=res
    )
  }

}
