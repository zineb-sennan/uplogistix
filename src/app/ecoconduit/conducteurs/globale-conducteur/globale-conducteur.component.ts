import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globale-conducteur',
  templateUrl: './globale-conducteur.component.html',
  styleUrls: ['./globale-conducteur.component.css']
})
export class GlobaleConducteurComponent implements OnInit {

  type:String='analyse-conducteurs';
  
  constructor() { }

  ngOnInit(): void {
  }

}
