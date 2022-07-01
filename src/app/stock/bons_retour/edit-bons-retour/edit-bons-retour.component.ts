import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Globale } from 'src/app/_globale/globale';
import { BonsReceptionService } from 'src/app/_services/bons-reception.service';
import { BonsRetourDetailsService } from 'src/app/_services/bons-retour-details.service';
import { BonsRetourService } from 'src/app/_services/bons-retour.service';
import { EntrepotsService } from 'src/app/_services/entrepots.service';
import { PiecesRechangeService } from 'src/app/_services/pieces-rechange.service';

@Component({
  selector: 'app-edit-bons-retour',
  templateUrl: './edit-bons-retour.component.html',
  styleUrls: ['./edit-bons-retour.component.css']
})
export class EditBonsRetourComponent implements OnInit {

  list_bons_reception:any=[]; pieces:any=[]; detailsBRs:any=[]; message:any=''; entrepots:any= [];
  singleDetailBR:any={id:null, bon_retour_id:null, piece_id:null, qte:null, prix_unitaire:null };
  singleBonR:any={id:null, entrepot_id:null, bon_reception_id:null, commentaire:null };

  constructor(
    private bonsReceptionService:BonsReceptionService,
    private bonsRetourDetailsService:BonsRetourDetailsService,
    private bonsRetourService:BonsRetourService,
    private activatedRoute: ActivatedRoute,
    private piecesRechangeService: PiecesRechangeService,
    private entrepotsService: EntrepotsService,
    private globale:Globale
  ) { }

  getAllBonReceptions(){
    this.bonsReceptionService.getAll().subscribe(
      res=> this.list_bons_reception=res
    )
  }

  ngOnInit(): void {
    this.getAllBonReceptions();
    this.getAllEntrepots();

    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id){
        this.getBonRetourById(id);
        this.getAllDetailsBR(id);
        this.getAllpiecesRechange();
      } 
    });
  }

  getDetailBrById(id:number){
    this.bonsRetourDetailsService.getDetailsBR(id).subscribe(
      res => this.singleDetailBR= res
    )
  }

  updateDetailsBonR(form:any){
    if(!form.id){
      this.bonsRetourDetailsService.create(form).subscribe(
        res=>{
          this.message="Bien ajouter !";
          this.getAllDetailsBR(form.bon_retour_id);
          this.globale.closeModal();
        } 
      )
    }
    else{
      this.bonsRetourDetailsService.update(form).subscribe(
        res=>{
          this.message="Bien modifie !";
          this.getAllDetailsBR(form.bon_retour_id);
          this.globale.closeModal();
        } 
      )
    }
  }

  cleareDetailBR(){
    this.singleDetailBR ={id:null, piece_id:null, bon_retour_id:this.singleDetailBR.bon_retour_id, qte:null, prix_unitaire:null };
  }

  deleteDetailBR(id:number){
    this.bonsRetourDetailsService.delete(id).subscribe(
      res=>{
        this.message='bien sup !';
        this.getAllDetailsBR(this.singleDetailBR.bon_retour_id);
        this.globale.closeModal();
      } 
    )
  }

  getAllpiecesRechange(){
    this.piecesRechangeService.getAll().subscribe(
      res=> this.pieces =res
    )
  }

  getAllDetailsBR(id:number){
    this.bonsRetourDetailsService.getAll(id).subscribe(
      res=> this.detailsBRs=res
    )
  }

  getBonRetourById(id:number){
    this.bonsRetourService.getBonReception(id).subscribe(
     res =>{
       this.singleBonR=res;
       this.singleDetailBR.bon_retour_id =this.singleBonR.id;
     } 
    )
 }

 updateBonR(form:any){
  this.bonsRetourService.update(form).subscribe(
    res => this.message="Bon retour bien modifie"
  )
}

getAllEntrepots(){
  this.entrepotsService.getAll().subscribe(
    res=> this.entrepots=res
  )
}

fermer(){
  this.globale.fermer();
}

}
