import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import { TokenService } from '../../../_services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  singleUtilisateur: any={nom:null, prenom:null, type_compte:null, email:null};
  permissions:any=[]; permission:any;

  constructor(
    private tokenService: TokenService,
    private utilisateurService:UtilisateurService,
    private authService: AuthService
  ) { }

  isAdmin:boolean=false;

  ngOnInit(): void {
    const payload = this.tokenService.payload(this.tokenService.getToken() ?? '');
    this.isAdmin = payload?.cid == null;
    this.geUtlisateurById(payload.id);
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
        this.singleUtilisateur.nom = result;
        //console.log('result',result);
        this.permissions=result.permissions;
        //console.log('Permissions:',this.permissions);
        this.getPermissionsBySlug("compteurs");
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.geUtlisateurById(id);
    });
  }

  getPermissionsBySlug(slug: any){
    this.permission=this.permissions.filter((x:any) => x.slug === slug);
    if(this.permission.length) this.permission=this.permissions.filter((x:any) => x.slug === slug).shift();
    else   this.permission=null;
  }

}
