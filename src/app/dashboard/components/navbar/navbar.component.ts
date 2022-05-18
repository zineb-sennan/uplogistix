import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../_services/token.service';
import { AuthService } from '../../../_services/auth.service';
import { UtilisateurService } from '../../../_services/utilisateur.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private utilisateurService:UtilisateurService
  ) { }

  singleUtilisateur: any={nom:null, prenom:null, type_compte:null, email:null}; singleClient: any; isClose:boolean=false;

  ngOnInit(): void {
    const payload = this.tokenService.payload(this.tokenService.getToken() ?? '');
    const isAdmin = payload?.cid == null;
    this.geUtlisateurById(payload.id)

    if($(window).width()! < 1426) this.isClose=true;
    this.closeSidebar();
    
  }

  async refreshToken() {
    return await this.authService.refresh() ? true : this.logout();
  }

  logout(){
    this.authService.logout();
  }

  geUtlisateurById(id:number){
    this.utilisateurService.getUtilisateur(id).subscribe(
      result =>{
        this.singleUtilisateur.nom = result.nom;
        this.singleUtilisateur.prenom = result.prenom;
        this.singleUtilisateur.type_compte = result.type_compte;
        this.singleUtilisateur.email=result.email;
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.geUtlisateurById(id);
    });
  }
  
  closeSidebar(){
    if(this.isClose){
      $("#sidebar").css("display","none");
      $(".main-content").css("margin-left", "0");
      if($(window).width()! < 1426) $(".btn-close-sidebar").css("margin-left", "0");
      this.isClose=false;
    }
    else{
      $("#sidebar").css("display","block");
      if($(window).width()! < 1426){
        $(".main-content").css("margin-left", "0");
        $(".btn-close-sidebar").css("margin-left", "245px");
      } 
      else $(".main-content").css("margin-left", "253px");
      this.isClose=true;
    }
  }

}
