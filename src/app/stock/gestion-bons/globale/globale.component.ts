import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globale',
  templateUrl: './globale.component.html',
  styleUrls: ['./globale.component.css']
})
export class GlobaleComponent implements OnInit {

  type:any="bons-reception";

  constructor() { }

  ngOnInit(): void {
  }

}
