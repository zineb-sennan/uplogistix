import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-changement-pwd',
  templateUrl: './changement-pwd.component.html',
  styleUrls: ['./changement-pwd.component.css']
})
export class ChangementPwdComponent implements OnInit {

  password: any = { oldpassword: null, newpassword: null, confirmpassword: null };
  messageError: any; messageSuccess: any;

  constructor(
    private utilisateurService: UtilisateurService
  ) { }

  ngOnInit(): void {
  }

  changementPwd(form: any) {
    if($('.valid').length==4){
      if (form.newpassword == form.confirmpassword) {
        this.utilisateurService.changePassword(form).subscribe(
          res => {
            this.messageSuccess = "Le mot de passe est modifié avec succès !";
          },
          error => {
            if (error.status == 403) this.messageError = "Le mot de passe actuel est incorrect !";
          }
        )
      }
      else
        this.messageError = "La confirmation de mot de passe est différente de mot de nouveau mot de passe !";
    }
    else this.messageError = "Le mot de passe doit contenir, une lettre, une lettre majuscule, un numéro, 8 caractères.";
    
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
