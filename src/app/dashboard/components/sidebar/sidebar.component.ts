import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../../_services/utilisateur.service';
import { TokenService } from '../../../_services/token.service';
import { Globale } from '../../../_globale/globale';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private utilisateurService:UtilisateurService,
    private globale:Globale
  ) { }

  isAdmin:boolean=false; utilisateur:any=null; permissions:any=[]; type_compte:any="";

  async ngOnInit() {
    const payload = this.tokenService.payload(this.tokenService.getToken() ?? '');
    this.isAdmin = payload?.cid == null;
    //01
    this.utilisateur = await this.utilisateurService.getUtilisateur(payload.id).toPromise();
    this.permissions=this.utilisateur.permissions;
  }

  permissionExiste(slug: any){
    let p_length=this.permissions.filter((x:any) => x.slug === slug).length;
    if(p_length==1) return true;
    else return false;
  }

}
