import { Component, OnInit } from '@angular/core';
import { Globale } from '../../_globale/globale';
import { SecuriteClass } from '../../_globale/securite';
import { BaliseService } from '../../_services/balise.service';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {

  balises: any = [];

  constructor(
    private securiteClass: SecuriteClass,
    public globale:Globale,
    private baliseService:BaliseService
  ) { }


  ngOnInit(): void {
    this.getAllBalise();
  }

  getAllBalise() {
    this.baliseService.getAll().subscribe(
      result => this.balises = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllBalise();
      });
  }

}
