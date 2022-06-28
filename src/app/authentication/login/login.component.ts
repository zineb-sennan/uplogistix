import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import { AuthService } from '../../_services/auth.service';
import { TokenService } from '../../_services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private utilisateurService: UtilisateurService
  ) { }

  message: string = ''; viewPWD:boolean=false;

  ngOnInit(): void {
    if(this.tokenService.isValid(true)) this.router.navigate(['dashboard']);
  }

  login(form: any) {
    this.authService.login(form).subscribe(
      async result => {
        this.tokenService.setToken(result.token);
        this.tokenService.setRefershToken(result.refreshToken);
        const utilisateur = await this.utilisateurService.getUtilisateur(Number(JSON.parse(atob(result.token.split('.')[1])).id)).toPromise();
        console.log()
        if( utilisateur.type_compte == "Super administrateur") this.router.navigate(['dashboard']);
        else{
          //*** les permi ***
          //console.log(utilisateur.);
        }
      },
      error => {
        if (error.status === 401) this.message = "Utilisateur ou mot de passe incorrect !";
        if (error.status === 500) this.message = "Error serveur !";
      }

    )
  }

  ChangeTypeInputPWD(){
    if(this.viewPWD==true) this.viewPWD=false;
    else this.viewPWD=true;
  }

}
