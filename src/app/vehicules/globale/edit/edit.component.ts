import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VehiculeGroupeService } from '../../../_services/vehicule-groupe.service';
import { VehiculeModeleService } from '../../../_services/vehicule-modele.service';
import { VehiculeService } from '../../../_services/vehicule.service';
import { VehiculeDocumentService } from '../../../_services/vehicule-document.service';
import { VehiculeMarqueService } from '../../../_services/vehicule-marque.service';
import { AuthService } from '../../../_services/auth.service';
import { VehiculeCategorieService } from '../../../_services/vehicule-categorie.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  clients: any = []; groupes: any = []; marques: any = []; modeles: any = []; categories: any = []; categorie_id=0;
  vehiculeDoc: any[] = [];
  message:any = null; type='generale';

  singleVehicule: any = {
    //Générale
    id: null, groupe_id: null, marque_id:null, modele_id: null,matricule: null,statut:null,boite_vitesse:null,description: null,puissance_cv: null,mise_en_circulation:null,classe_energitique: null, compteur_initial: null,periode_revision: null,km_revision: null,niveau_reservoir:null,type_contrat:null,categorie_id:null,
    //Cycle de vie
    cycle_vie_mois:null,cycle_vie_km:null,date_hors_service:null,
    //Spécifications
    longeur:null,largeur:null,hauteur:null,volume:null,poids:null,charge_maximale:null,capacite_remorquage:null,
    //Moteur/transmission
    technologie_moteur:null,energie: null, nbre_cylindre:null,volume_cylindre:null,puissance_fiscale: null,limite_vitesse:null,consommation_ville:null,consommation_autoroute:null,consommation_mixte:null,emission_co2:null,
    //Roues et pneus
    systeme_freinage:null,longeur_pneu:null,rapport_hauteur_longeur:null,indice_charge:null,indice_vitesse:null,empattement:null,diametre_roue_avant:null,diametre_roue_arriere:null,
    //Liquides
    capacite_huile:null,volume_reservoir:null
  };

  constructor(
    private vehiculeGroupeService: VehiculeGroupeService,
    private vehiculeModeleService: VehiculeModeleService,
    private vehiculeService: VehiculeService,
    private vehiculeDocumentService: VehiculeDocumentService,
    private vehiculeMarqueService:VehiculeMarqueService,
    private vehiculeCategorieService:VehiculeCategorieService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id) this.getVehiculeById(id);
    });

    this.getAllGroupes();
    this.getAllMarques();
    this.getAllCategorie();
  }

  async refreshToken() {
    return await this.authService.refresh() ? true : this.logout();
  }

  logout(){
    this.authService.logout();
  }

  getAllMarques(){
    this.vehiculeMarqueService.getAll().subscribe(
      res=>this.marques=res,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllMarques();
      }
    )
  }

  getAllCategorie(){
    this.vehiculeCategorieService.getAll().subscribe(
      res=>this.categories=res,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllCategorie();
      }
    )
  }

  getMarquesByCategorieId(id:number){
    this.vehiculeMarqueService.getMarquesByCategorieId(id).subscribe(
      res=>{
        this.marques=res;
        this.categorie_id=id;
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.getMarquesByCategorieId(id);
      }
    )
  }

  changeMarque(e: any) {
    this.getModelesByMarqueId(e.target.value);
  }

  getModelesByCategorieAndMarque(categorie_id:number,marque_id:number){
    console.log('categorie_id',this.categorie_id);
    this.vehiculeModeleService.getModelesByCategorieAndMarque(categorie_id, marque_id).subscribe(
      res => this.modeles=res,
      error => {
        if(error.status==401 && this.refreshToken()) this.getModelesByCategorieAndMarque(categorie_id, marque_id);
      }
    )
  }
  
  getVehiculeById(id: number) {
    this.vehiculeService.getVehiculeById(id).subscribe(res => {
      this.singleVehicule = res;
      this.getDocumentsByVehiculeId(id);
      this.getModelesByMarqueId(this.singleVehicule.marque_id);
    },
      error => {
        if(error.status==401 && this.refreshToken()) this.getVehiculeById(id);
    });
  }

  getAllGroupes() {
    this.vehiculeGroupeService.getAll().subscribe(
      result => this.groupes = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllGroupes();
      }
    );
  }

  getModelesByMarqueId(id:number) {
    this.vehiculeModeleService.getModelesByMarqueId(id).subscribe(
      result => this.modeles = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getModelesByMarqueId(id);
      }
    );
  }

  update(form: any) {
    if (!form.id) {
      this.vehiculeService.create(form).subscribe(
        res => {
          this.message = "Le vehicule est ajouté avec succès !";
          this.singleVehicule.id = res.id;
          this.getDocumentsByVehiculeId(res.id);
          this.type="documents";
        },
        error => {
          if(error.status==401 && this.refreshToken()) this.update(form);
        }
      )
    }
    else {
      this.vehiculeService.update(form).subscribe(res => {
        this.vehiculeDoc.forEach(element => {
          this.updateDocumentByVehicule(element);
        });
        this.message = "Le vehicule est modifié avec succès !";
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      });
    }
  }

  getDocumentsByVehiculeId(id: number) {
    this.vehiculeDocumentService.getDocumentsByVehiculeId(id).subscribe(
      result => this.vehiculeDoc = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getDocumentsByVehiculeId(id);
      }
    );
  }

  updateDocumentByVehicule(doc: any) {
    this.vehiculeDocumentService.updateDocumentsByVehicule(doc).subscribe(
      res => console.log(res),
      error => {
        if(error.status==401 && this.refreshToken()) this.updateDocumentByVehicule(doc);
      }
    );
  }

  fermer() {
    this.location.back();
  }

}
