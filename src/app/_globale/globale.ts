import { Injectable } from "@angular/core";
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { UtilisateurService } from "../_services/utilisateur.service";
import { TokenService } from "../_services/token.service";

import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
 export class Globale {
    payload:any=this.tokenService.payload(this.tokenService.getToken() ?? ''); 
    utilisateur: any= null;
   
    constructor(
        private location: Location,
        private utilisateurService:UtilisateurService,
        private tokenService: TokenService
    ) { }

    async init() {
        //console.log("Bonjour !!!");

        //01-infos d'utilisateur
        //this.utilisateur = await this.utilisateurService.getUtilisateur(this.payload.id).toPromise();
        //this.getAuth();
        //

        // this.utilisateurService.getUtilisateur(this.payload.id).subscribe(
        //     res=> this.utilisateur= res
        // )

        //console.log('***',this.utilisateur);




    }
    
    //02-Function globale
    //01-
    closeModal() {
        $('.modal').hide();
        $('.modal-backdrop').remove();
        $('body').removeAttr("style");
    }
    //02-
    fermer() {
        this.location.back();
    }
    //03-
    getAuth(){
        const promise = this.utilisateurService.getUtilisateur(this.payload.id).toPromise();
    }

}