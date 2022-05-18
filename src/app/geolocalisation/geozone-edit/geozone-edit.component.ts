import { Component, OnInit } from '@angular/core';
import { GeoLocalisationService } from '../../_services/geolocalisation.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as L from 'leaflet';
import 'leaflet-draw';

@Component({
  selector: 'app-geozone-edit',
  templateUrl: './geozone-edit.component.html',
  styleUrls: ['./geozone-edit.component.css']
})
export class GeozoneEditComponent implements OnInit {

  editMode: boolean = false;

  private map: any;
  zone: any = {
    nom: null,
    description: null,
    coords: null,
    couleur_contour: '#3388FF',
    couleur_remplissage: '#3388FF',
    on_enter: false,
    on_leave: false
  };

  drawControl: any;
  drawnItems: any;
  isDrawing: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    private geoService: GeoLocalisationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const { id } = params;
      if (id) {
        this.getZoneById(id);
        this.editMode = true;
      } else this.initMap(33.9727213, -6.8867775, 6);
    });
  }

  getZoneById(id: number) {
    this.geoService.getZoneById(id).subscribe(
      result => {
        this.zone = result;
        this.zone.coords = this.zone.coords ? JSON.parse(this.zone.coords) : null;
        this.initMap(33.9727213, -6.8867775, 6);
      });
  }

  drawPolygone() {
    new L.Draw.Polygon(this.map, {
      shapeOptions: {
        color: this.zone.couleur_contour,
        fillColor: this.zone.couleur_remplissage,
      }
    }).enable();
    this.clearDawedItems();
  }

  drawCercle() {
    new L.Draw.Circle(this.map, {
      shapeOptions: {
        color: this.zone.couleur_contour,
        fillColor: this.zone.couleur_remplissage,
      }
    }).enable();
    this.clearDawedItems();
  }

  private initMap(lat: number, lon: number, zoom: number): void {
    const container = L.DomUtil.get('map');
    if (container != null && container.childElementCount > 0) {
      this.map.remove();
    }

    this.map = L.map('map', {
      center: [lat, lon],
      zoom: zoom
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    L.Edit.Circle = L.Edit.CircleMarker.extend({
      _createResizeMarker: function () {
        var center = this._shape.getLatLng(),
          resizemarkerPoint = this._getResizeMarkerPoint(center)

        this._resizeMarkers = []
        this._resizeMarkers.push(this._createMarker(resizemarkerPoint, this.options.resizeIcon))
      },

      _getResizeMarkerPoint: function (latlng: any) {
        var delta = this._shape._radius * Math.cos(Math.PI / 4),
          point = this._map.project(latlng)
        return this._map.unproject([point.x + delta, point.y - delta])
      },

      _resize: function (latlng: any) {
        var moveLatLng = this._moveMarker.getLatLng()
        var radius

        if (L.GeometryUtil.isVersion07x()) {
          radius = moveLatLng.distanceTo(latlng)
        }
        else {
          radius = this._map.distance(moveLatLng, latlng)
        }

        this._shape.setRadius(radius)

        this._map.fire(L.Draw.Event.EDITRESIZE, { layer: this._shape })
      }
    });

    this.drawnItems = new L.FeatureGroup();
    if (this.zone.coords != null && typeof (this.zone.coords) == 'object') {
      const layer = this.zone.coords?.radius == null
        ? L.polygon(
          this.zone.coords.latlngs,
          { color: this.zone.couleur_contour, fillColor: this.zone.couleur_remplissage })
        : L.circle(
          this.zone.coords.latlngs,
          { color: this.zone.couleur_contour, fillColor: this.zone.couleur_remplissage, radius: this.zone.coords.radius });
      this.drawnItems.addLayer(layer);

      if (this.zone.coords?.radius == null) this.map.fitBounds(layer.getBounds());
      else {
        const circle = L.latLng(this.zone.coords.latlngs);
        this.map.fitBounds(circle.toBounds(this.zone.coords.radius + 6550));
      }

    }

    this.map.addLayer(this.drawnItems);
    this.drawControl = new L.Control.Draw({
      draw: {
        marker: false,
        circlemarker: false,
        polyline: false,
        rectangle: false,
        polygon: false,
        circle: false,
      },
      edit: {
        featureGroup: this.drawnItems,
        edit: false,
        remove: false,
      },
    });
    this.map.addControl(this.drawControl);

    this.map.on('draw:created', (e: any) => {
      const layer = e.layer;
      const type = e.layerType;
      this.drawnItems.addLayer(layer);
      this.zone.coords = {
        latlngs: type == 'polygon' ? layer._latlngs[0] : layer._latlng,
        radius: type == 'polygon' ? null : layer._mRadius
      }

      this.isDrawing = false;
    });

    this.drawnItems.addEventListener('click', (e: any) => {
      const layer = e.layer;
      this.isDrawing = !this.isDrawing;
      this.isDrawing ? e.layer.editing.enable() : e.layer.editing.disable();

      if (!this.isDrawing) {
        this.zone.coords.latlngs = layer._latlngs ? layer._latlngs[0] : layer._latlng;
        this.zone.coords.radius = layer._latlngs ? null : layer._mRadius;
      };
    });

    this.mapCorrections();
  }

  clearDawedItems(): void {
    this.drawnItems.clearLayers();
    this.isDrawing = false;
  }

  saveZone() {
    const zone = {
      id: this.zone.id,
      nom: this.zone.nom,
      description: this.zone.description,
      couleur_contour: this.zone.couleur_contour,
      couleur_remplissage: this.zone.couleur_remplissage,
      coords: this.zone.coords,
      on_enter: this.zone.on_enter,
      on_leave: this.zone.on_leave
    }
    this.editMode
      ? this.geoService.updateZoneById(zone).subscribe(result => this.fermer())
      : this.geoService.createZone(zone).subscribe(result => this.fermer());
  }

  private mapCorrections(): void {
    this.map.whenReady(() => {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 500);
    });
  }

  fermer() {
    this._location.back();
  }

}
