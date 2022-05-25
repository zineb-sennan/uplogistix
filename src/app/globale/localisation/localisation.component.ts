import { Component, OnInit } from '@angular/core';
import { PaysService } from '../../_services/pays.service';
import { RegionsService } from '../../_services/regions.service';
import { VillesService } from '../../_services/villes.service';
import { AuthService } from '../../_services/auth.service';
import { SecuriteClass } from '../../_globale/securite';
import { GlobalFunctions } from '../../_globale/global-functions';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})

export class LocalisationComponent implements OnInit {

  pays: any[] = [];
  regions: any[] = [];
  villes: any[] = [];

  singlePays: any = { nom: null, indicatif: null, devise: null };
  singleRegion: any = { pays_id: null, nom: null };
  singleVille: any= { pays_id: null, nom: null, region_id: null };

  message: any = null;
  type: any = null;

  pays_id: any = null;
  region_id: any = null;

  constructor(
    private securiteClass: SecuriteClass,
    public globalFunctions:GlobalFunctions,
    private paysService: PaysService,
    private regionsService: RegionsService,
    private villesService: VillesService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllPays();
  }


  getAllPays() {
    this.paysService.getAll().subscribe(
      result => this.pays = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this. getAllPays();
      }
    );
  }

  getRegionsByPays(id: any) {
    this.clear(this.type);
    this.regionsService.regionsByPays(id).subscribe(
      result => this.regions = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getRegionsByPays(id);
    });
    this.region_id = null;
    this.pays_id = id;
    this.villes = [];
  }

  getVillesByRegion(id: any) {
    this.villesService.villesByRegion(id).subscribe(
      result => this.villes = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getVillesByRegion(id);
      });
    this.region_id = id;
  }

  clear(type: string) {
    this.type = type;
    this.message = null;
    if (type == "pays") { this.pays_id = null; this.region_id = null; this.regions = []; this.villes = []; }
    else {
      this.singleRegion = { pays_id: null, nom: null }
      this.singleVille = { nom: null, pays_id: null, region_id: null }
    }
  }

  clearPays() {
    this.type = 'pays';
    this.message = null;
    this.singlePays = { nom: null, indicatif: null, devise: null }
  }

  setData(data: any, type: string) {
    this.message = null;
    this.type = type;
    if (type == "pays") this.singlePays = data;
    else if (type == "region") this.singleRegion = data;
    else this.singleVille = data;
    //
    if (type == "pays") this.getPays(data.id);
    else if (type == "region") this.getRegion(data.id);
    else this.getVille(data.id);
  }

  getPays(id:number){
    this.paysService.getPays(id).subscribe(
      res=> this.singlePays=res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getPays(id);
      }
    )
  }

  getRegion(id:number){
    this.regionsService.getRegion(id).subscribe(
      res=> this.singleRegion=res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getRegion(id);
      }
    )
  }

  getVille(id:number){
    this.villesService.getVille(id).subscribe(
      res=> this.singleVille=res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getVille(id);
      }
    )
  }

  updatePays(form: any) {
    if (!form.id) {
      this.paysService.create(form).subscribe(
        res => {
          this.getAllPays();
          this.message = "Le pays est ajouté avec succès !";
          this.globalFunctions.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.updatePays(form);
      })
    } else {
      this.paysService.update(form).subscribe(
        res => {
          this.getAllPays();
          this.message = "Le pays est modifié avec succès !";
          this.globalFunctions.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.updatePays(form);
      })
    }
  }

  updateRegion(form: any) {
    if (!form.id) {
      this.regionsService.create(form).subscribe(
        res => {
          this.getRegionsByPays(form.pays_id);
          this.message = "La région est ajoutée avec succès !";
          this.globalFunctions.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.updateRegion(form);
      })
    }
    else {
      this.regionsService.update(form).subscribe(
        res => {
          this.getRegionsByPays(form.pays_id);
          this.message = "La région est modifiée avec succès !";
          this.globalFunctions.closeModal();
        },
        error => {
          if(error.status==401 && this.securiteClass.refreshToken()) this.updateRegion(form);
        })
    }
  }

  updateVille(form: any) {
    if (!form.id) {
      this.villesService.create(form).subscribe(
        res => {
          this.getVillesByRegion(form.region_id);
          this.message = "La ville est ajoutée avec succès !";
          this.globalFunctions.closeModal();
        },
        error => {
          if(error.status==401 && this.securiteClass.refreshToken()) this.updateVille(form);
        })
    }
    else {
      this.villesService.update(form).subscribe(
        res => {
          this.getVillesByRegion(form.region_id);
          this.message = "La ville est modifiée avec succès !";
          this.globalFunctions.closeModal();
        },
        error => {
          if(error.status==401 && this.securiteClass.refreshToken()) this.updateVille(form);
        })
    }
  }

  update(form: any) {
    if (this.type == "pays") this.updatePays(form);
    else if (this.type == "region") this.updateRegion(form);
    else this.updateVille(form);
  }

  deletePays(id: any) {
    this.paysService.delete(id).subscribe(
      res => {
        this.getAllPays();
        this.message = "Le pays est supprimé avec succès !";
        this.globalFunctions.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.deletePays(id);
      })
  }

  deleteRegion(id: any) {
    this.regionsService.delete(id).subscribe(
      res => {
        this.getRegionsByPays(this.singleRegion.pays_id);
        this.message = "La region est supprimée avec succès !";
        this.globalFunctions.closeModal();
      },error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.deleteRegion(id);
      })
  }

  deleteVille(id: any) {
    this.villesService.delete(id).subscribe(
      res => {
        this.getVillesByRegion(this.singleVille.region_id);
        this.message = "La ville est supprimée avec succès !";
        this.globalFunctions.closeModal();
    },
    error => {
      if(error.status==401 && this.securiteClass.refreshToken()) this.deleteVille(id);
    })
  }

  delete() {
    if (this.type == "pays") this.deletePays(this.singlePays.id);
    else if (this.type == "region") this.deleteRegion(this.singleRegion.id);
    else this.deleteVille(this.singleVille.id);
  }

}
