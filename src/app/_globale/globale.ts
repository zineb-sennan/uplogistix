import { Injectable } from "@angular/core";
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { UtilisateurService } from "../_services/utilisateur.service";
import { TokenService } from "../_services/token.service";

@Injectable({
    providedIn: 'root'
})
export class Globale {
    payload:any=this.tokenService.payload(this.tokenService.getToken() ?? ''); 
    public utilisateur: any;
   
    constructor(
        private location: Location,
        private utilisateurService:UtilisateurService,
        private tokenService: TokenService
    ) { }

    async init() {
        //01-infos d'utilisateur
        this.utilisateur = await this.utilisateurService.getUtilisateur(this.payload.id).toPromise();
        //
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

}