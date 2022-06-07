import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';

@Component({
  selector: 'app-pwd-oublie',
  templateUrl: './pwd-oublie.component.html',
  styleUrls: ['./pwd-oublie.component.css']
})
export class PwdOublieComponent implements OnInit {

  infosPwd = { user: null, verification: null, token: null, newPwd: null };
  message: any = null;
  //res:any={ expiration:null, token:null }
  res: any = [];

  constructor(
    private utilisateurService: UtilisateurService
  ) { }

  ngOnInit(): void {
    //
  }

  getElaspsedTime(dateExpiration: any): any {
    let totalSeconds = Math.floor(new Date().getTime() - new Date(dateExpiration).getTime());
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    // if (totalSeconds >= 3600) {
    //   hours = Math.floor(totalSeconds / 3600);
    //   totalSeconds -= 3600 * hours;
    // }

    // if (totalSeconds >= 60) {
    //   minutes = Math.floor(totalSeconds / 60);
    //   totalSeconds -= 60 * minutes;
    // }

    // seconds = totalSeconds;

    // return { hours: hours, minutes: minutes, seconds: seconds }

    var h = Math.floor(totalSeconds % (3600*24) / 3600);
    var m = Math.floor(totalSeconds % 3600 / 60);
    var s = Math.floor(totalSeconds % 60);

    return { hours: h, minutes: m, seconds: s }

    }

    forgetPwd(form: any){

      this.utilisateurService.forgetPwd(form).subscribe(
        res => {
          //console.log(res);
          this.res = res;
          console.log(this.getElaspsedTime(res.expiration));
        },
        error => {
          console.log(error.status);
          if (error.status == 404) {
            this.message = "E-mail ou numéro de téléphone incorrecte !";
          }
          else if (error.status == 403) {
            this.message = "Attendez 5 minute !";
          }
          else if (error.status == 406) {
            this.message = "Le code de vérification est incorrect !";
          }
        }
      )
    }

  }
