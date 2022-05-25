import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globale',
  templateUrl: './globale.component.html',
  styleUrls: ['./globale.component.css']
})
export class GlobaleComponent implements OnInit {

  type:String='analyse-vehicule';

  constructor() { }

  ngOnInit(): void {
  }

}
