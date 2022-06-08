import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/_services/token.service';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';

@Component({
  selector: 'app-pwd-oublie',
  templateUrl: './pwd-oublie.component.html',
  styleUrls: ['./pwd-oublie.component.css']
})
export class PwdOublieComponent implements OnInit {

  infosPwd = { user: null, verification: null, token: null, newpassword: null };
  message: any = null;
  //res:any={ expiration:null, token:null }
  res: any = [];

  constructor(
    private utilisateurService: UtilisateurService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  time: any = null;
  getElaspsedTime(date_expiration: any) {
    let m = (new Date(date_expiration)).getMinutes() - (new Date()).getMinutes();
    let s = (new Date(date_expiration)).getSeconds() - (new Date()).getSeconds() + 31;
    this.time = m.toString().padStart(2, '0') + ":" + s.toString().padStart(2, '0');

    // if (m == 0 && s == 0) return true;
    // return false;
    if( m== 0 && s==0 ){
      this.intervalId.stop();
    }
    
  }

  //intervalId:ReturnType<typeof setTimeout>;
  intervalId:any=null;
  forgetPwd(form: any) {
    this.utilisateurService.forgetPwd(form).subscribe(
      res => {
        this.res = res;  this.intervalId ?? stop();
        this.intervalId=null;

        this.intervalId = setInterval(() => {
          this.getElaspsedTime(res.expiration);
        }, 1000);


        
        // var intervalId = setInterval(() => {
        //   this.getElaspsedTime(res.expiration) ? stop() : this.getElaspsedTime(res.expiration);
        // }, 1000);

        //console.log(typeof this.intervalId);

        //function stop() {
          //console.log("ssss");
          //window.clearInterval(Number(this.intervalId));
        //}
        //intervalId ?? stop();

        if (res.refreshToken) {
          this.tokenService.setToken(res.token);
          this.tokenService.setRefershToken(res.refreshToken);
          this.router.navigate(['dashboard']);
        }
      },
      error => {
        if (error.status == 404) {
          this.message = "E-mail ou numéro de téléphone incorrecte !";
        }
        else if (error.status == 403) {
          //
          this.message = "Attendez 3 minutes !";
          
          // const intervalId = setInterval(() => {
          //   this.getElaspsedTime(error.error.expiration) ? stop() : this.getElaspsedTime(error.error.expiration);
          // }, 1000);
          
          // function stop() {
          //   console.log("ssss");
          //   clearInterval(intervalId);
          // }
          // intervalId ?? stop();

        }
        else if (error.status == 406) {
          this.message = "Le code de vérification est incorrect !";
        }
      }
    )
  }

}
