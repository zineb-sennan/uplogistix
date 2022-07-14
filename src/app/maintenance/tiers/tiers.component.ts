import { Component, OnInit } from '@angular/core';
import { Globale } from 'src/app/_globale/globale';
import { TiersService } from 'src/app/_services/tiers.service';

@Component({
  selector: 'app-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.css']
})
export class TiersComponent implements OnInit {
  tiers:any=[]; message:any='';
  singleTier:any={ id:null, 	raison_sociale:null, 	adresse:null, email:null, 	tel_mobile:null, tel_bureau:null, fax:null};

  constructor(
    private tiersService: TiersService,
    private globale:Globale
  ) { }

  ngOnInit(): void {
    this.getAllTiers();
    this.globale.closeModal();
  }

  clear(){
    this.singleTier={ id:null, 	raison_sociale:null, 	adresse:null, email:null, 	tel_mobile:null, tel_bureau:null, fax:null};
  }


  getAllTiers(){
    this.tiersService.getAll().subscribe(
      res=> this.tiers=res
    )
  }

  update(form:any){
    if(!form.id){
      this.tiersService.create(form).subscribe(
        res=> {
          this.message="Le tiers est ajouté avec succès.";
          this.getAllTiers();
          this.globale.closeModal();
        }
      )
    }
    else{
      this.tiersService.update(form).subscribe(
        res=> {
          this.message="Le tiers est modifié avec succès.";
          this.getAllTiers();
          this.globale.closeModal();
        }
      )
    }
  }

  getTiersById(id:number){
    this.tiersService.getTier(id).subscribe(
       res => this.singleTier=res
    )
  }


  delete(id:number){
    this.tiersService.delete(id).subscribe(
      res => {
        this.message="Le tiers est supprimé avec succès.";
        this.getAllTiers();
        this.globale.closeModal();
      }
    )
  }

}
