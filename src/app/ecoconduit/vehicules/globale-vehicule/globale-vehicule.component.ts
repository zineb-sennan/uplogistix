import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globale-vehicule',
  templateUrl: './globale-vehicule.component.html',
  styleUrls: ['./globale-vehicule.component.css']
})
export class GlobaleVehiculeComponent implements OnInit {

  type:String='analyse-vehicule';

  constructor() { }

  ngOnInit(): void {
  }

}
