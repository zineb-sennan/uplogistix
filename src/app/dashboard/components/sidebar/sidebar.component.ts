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

  isAdmin:boolean=false; idUtilisateur=0; permissions:any=[]; type_compte:any="";

  async ngOnInit() {
    const payload = this.tokenService.payload(this.tokenService.getToken() ?? '');
    this.isAdmin = payload?.cid == null;
    
    //01
    const utilsateur$ = await this.utilisateurService.getUtilisateur(payload.id).toPromise();
    this.permissions=utilsateur$.permissions;
    this.type_compte=utilsateur$.type_compte;

    console.log("type compte",this.type_compte)
  }

  permissionExiste(slug: any){
    let p_length=this.permissions.filter((x:any) => x.slug === slug).length;
    if(p_length==1) return true;
    else return false;
  }

}
