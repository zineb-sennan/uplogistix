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
    var intervalId = setInterval(() => {
      this.time =new Date((new Date(date_expiration)).getTime() - (new Date()).getTime()).toISOString().slice(11, 19);
      if(this.time == '00:00:00') clearInterval(intervalId);
    }, 1000);
  }

  //intervalId
  intervalId:any=null;
  forgetPwd(form: any) {
    //01
    this.utilisateurService.forgetPwd(form).subscribe(
      res => {
        this.res = res;  this.intervalId ?? stop();
        this.intervalId=null;

        this.intervalId = setInterval(() => {
          this.getElaspsedTime(res.expiration);
        }, 1000);

        //res.expiration
        this.getElaspsedTime(res.expiration);

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
          //error.error.expiration
          this.getElaspsedTime(error.error.expiration);

        }
        else if (error.status == 406) {
          this.message = "Le code de vérification est incorrect !";
        }
      }
    )
  }

  validationPWD(e: any) {
    var pswd = e.target.value;
    $('#pswd_info').removeClass('d-none');

    //validate the length  
    if (pswd.length < 8) $('#length').removeClass('valid').addClass('invalid');
    else $('#length').removeClass('invalid').addClass('valid');

    //validate letter
    if (pswd.match(/[A-z]/)) $('#letter').removeClass('invalid').addClass('valid');
    else $('#letter').removeClass('valid').addClass('invalid');

    //validate uppercase letter
    if (pswd.match(/[A-Z]/)) $('#capital').removeClass('invalid').addClass('valid');
    else $('#capital').removeClass('valid').addClass('invalid');
    
    //validate number
    if (pswd.match(/\d/)) $('#number').removeClass('invalid').addClass('valid');
    else $('#number').removeClass('valid').addClass('invalid');
  }

}
