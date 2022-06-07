import { Component, OnInit } from '@angular/core';
import { GeoLocalisationService } from '../../_services/geolocalisation.service';
import { Location } from '@angular/common';
import { SecuriteClass } from 'src/app/_globale/securite';

@Component({
  selector: 'app-geozones',
  templateUrl: './geozones.component.html',
  styleUrls: ['./geozones.component.css']
})
export class GeozonesComponent implements OnInit {

  zones: any = [];
  currId: number = 0;

  constructor(
    private _location: Location,
    private geoService: GeoLocalisationService,
    private securiteClass:SecuriteClass
  ) { }

  ngOnInit(): void {
    this.getZones();
  }

  getZones() {
    this.geoService.getAllZones().subscribe(
      result => this.zones = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getZones();
      });
  }

  currZone(id: number) {
    this.currId = id;
  }

  deleteZone() {
    this.geoService.deleteZoneById(this.currId).subscribe(
      result => this.getZones(),
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.deleteZone();
      });
  }

  fermer() {
    this._location.back();
  }
}