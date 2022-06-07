import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fiche-vehicule',
  templateUrl: './fiche-vehicule.component.html',
  styleUrls: ['./fiche-vehicule.component.css']
})
export class FicheVehiculeComponent implements OnInit {
  //
  typeFilter='jour';

  constructor() { }

  ngOnInit(): void {
  }

}
