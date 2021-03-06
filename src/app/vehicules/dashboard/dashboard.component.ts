import { Component, OnInit, ViewChild } from '@angular/core';
import { MaintenancePreventiveService } from 'src/app/_services/maintenance-preventive.service';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { VehiculeService } from '../../_services/vehicule.service';
import { GeoLocalisationService } from '../../_services/geolocalisation.service';
import { SecuriteClass } from '../../_globale/securite';
import { Globale } from '../../_globale/globale';
import * as $ from 'jquery';
import * as L from 'leaflet';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private securiteClass: SecuriteClass,
    private globale:Globale,
    private vehiculeService:VehiculeService,
    private activatedRoute: ActivatedRoute,
    private geoLocalisationService: GeoLocalisationService,
    private maintenancePreventiveService: MaintenancePreventiveService,
    private datePipe: DatePipe
  ) { }

  type='details'; myChart:any; date = new Date(); private map: any; markers: any = []; positions: any = [];  pieces:any={ maintenance:[], rappels:[], alerts:[], historiques:[] };
  singleVehicule: any = {
    //Générale
    id:null, groupe_id:null, marque_id:null, modele_id:null ,matricule:null ,statut:null ,boite_vitesse:null ,description:null ,puissance_cv: null,mise_en_circulation:null ,classe_energitique:null , compteur_initial:null ,periode_revision:null,km_revision: null,niveau_reservoir:null,type_contrat:null,
    //Cycle de vie
    cycle_vie_mois:null,cycle_vie_km:null,date_hors_service:null,
    //Spécifications
    longeur:null,largeur:null,hauteur:null,volume:null,poids:null,charge_maximale:null,capacite_remorquage:null,
    //Moteur/transmission
    technologie_moteur:null,energie: null, nbre_cylindre:null,volume_cylindre:null,puissance_fiscale: null,limite_vitesse:null,consommation_ville:null,consommation_autoroute:null,consommation_mixte:null,emission_co2:null,
    //Roues et pneus
    systeme_freinage:null,longeur_pneu:null,rapport_hauteur_longeur:null,indice_charge:null,indice_vitesse:null,empattement:null,diametre_roue_avant:null,diametre_roue_arriere:null,
    //Liquides
    capacite_huile:null,volume_reservoir:null
  };

  resume={ cout_km:0, montant_carburant:0, cout_total:0, cout_maintenance:0, autre_cout:0, km_aujourdhui:0 };
  search: any = { 
          vehicule_id: null, 
          date_debut: this.datePipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), 
          date_fin: this.datePipe.transform(this.date, 'yyyy-MM-dd') 
        };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      param => {
        const { id } = param;
        if (id) {
          this.getVehiculeById(id);
          //
          Chart.register(...registerables);
          this._test(id);
          this.getDistanceJour(id);
          this.getMaintenancePreventive(id);
          this.search.vehicule_id=id;
          this.searchHistorique();
        }
      });
  }

  getMaintenancePreventive(id: number){
    this.maintenancePreventiveService.getPiecesByVehicule(id).subscribe(
      res => {
        this.pieces.maintenance = res;
        this.pieces.rappels= [...res].filter(pr=> !pr.critique);
        this.pieces.alerts= [...res].filter(pr=> pr.critique);
      }
    )
  }

  searchHistorique() {
    this.maintenancePreventiveService.getHistorique(this.search).subscribe(
      res => {
        this.pieces.historiques = res;
      }
    )
  }

  getDistanceJour(vehicule_id: number){
    this.geoLocalisationService.getAnalyseVehicule({vehicule_id: vehicule_id, date_debut: this.datePipe.transform(this.date, 'yyyy-MM-dd') , date_fin:this.datePipe.transform(this.date, 'yyyy-MM-dd') }).subscribe(
      res => this.resume.km_aujourdhui= [...res.distance].reduce((prev: any, next: any) => prev + next.distance, 0)
    )
  }

  getVehiculeById(id:number){
    this.vehiculeService.getVehiculeById(id).subscribe(
      res=>{
        this.singleVehicule=res;
        //if(this.singleVehicule.eco_conduite) this.getResumeForVehicule(id);
        this.getPositions(id);
      },
      async error => {
        if(error.status==401 && await this.securiteClass.refreshToken()) this.getVehiculeById(id);
      }
      );
  }



  createChart(id:any, titre:any, _data:any){
    const months=["janv.", "févr.", "mars", "avr.", "mai", "juin", "juill.", "août", "sept.", "oct.", "nov.", "déc."];

    this.myChart = $('#'+id);
    new Chart(this.myChart,{
      type:'line',
      data:{
        datasets:[
          {
            data:_data,
            label:titre,
            backgroundColor: 'rgba(54, 162, 235)'
          }
        ],
      },
      options: {
        scales: {
          x: {
            grid: { drawOnChartArea: false },
          },
          y: { grid: { drawOnChartArea: false } }
        },
        plugins: { legend: { display: false } }
      }
    })
  }

  private initMap(lat: number, lon: number, zoom: number): void {
    const container = L.DomUtil.get('map');
    if (container != null && container.childElementCount > 0) {
      this.map.remove();
    }

    if (this.positions.length > 0) {
      this.map = L.map('map', {
        center: [lat, lon],
        zoom: zoom
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 2,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);

      this.createMarker(this.positions[0]);

      this.map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          this.markers.push(layer);
        }
      });

      if (this.markers.length > 0) {
        const markersBounds = L.latLngBounds([this.markers[0].getLatLng()]);
        this.markers.forEach((marker: any) => {
          markersBounds.extend(marker.getLatLng());
        });
        this.map.flyToBounds(markersBounds, {
          padding: L.point(36, 36), animate: true,
        });
      }
    } else {
      this.map = L.map('map', {
        center: [33.9727213, -6.8867775],
        zoom: 5
      });
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);
    }

    this.mapCorrections();
  }

  private mapCorrections(): void {
    this.map.whenReady(() => {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 500);
    });
  }

  getPositions(vehicule_id: any) {
    this.geoLocalisationService.getPositions(vehicule_id, null).subscribe(
      result => {
        this.positions = result;
        this.initMap(33.9727213, -6.8867775, 5);
      },
      // error => {
      //   if(error.status==401 && this.securiteClass.refreshToken()) this. getPositions(vehicule_id);
      // }
      );
  }

  private createMarker(point: any) {
    const myIcon = L.icon({
      iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
      iconSize: [20, 30],
      iconAnchor: [10, 30]
    });
    const marker = L.marker([point.latitude, point.longitude], { icon: myIcon });

    const date = new Date(point.timestamp);

    marker.bindPopup(`
      <p style="font-size: 13px">
        <b>Matricule: </b><br>
        ${point.matricule}<br><br>
        <b>Date :</b><br>         
        ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}<br><br>
        Adresse: <b>${point.adresse ? JSON.parse(point.adresse).label : ''}</b><br><br>
        <b>G.P.S : </b><br>
        Lat/lng : <b>${point.latitude}, ${point.longitude}</b><br>
        Altitude : <b>${point.altitude} (m)</b><br><br>
        Vitesse: <b>${point.speed} (km/h)</b><br><br>
        </p>`);
    marker.openPopup();

    marker.addTo(this.map);
  }

  /*** *** *** **** **** */
  _test(vehicule_id:number){
    const mois = ["JAN", "FEV", "MAR", "AVR", "MAI", "JUN", "JUL", "AOU", "SEP", "OCT", "NOV", "DEC"];

    this.geoLocalisationService.analyseParVehicule(vehicule_id).subscribe(
      res => {
        this.resume.cout_km = [...res.coutKM].filter(c=>c.mois == (this.date.getMonth()+1))[0].coutKM;
        this.resume.montant_carburant= res.moisEncours.cout_carburant;
        this.resume.cout_total=[...res.coutTotal].filter(c=>c.mois == (this.date.getMonth()+1))[0].coutTotal;
        this.resume.cout_maintenance=res.moisEncours.cout_maintenance;
        this.resume.autre_cout= this.resume.cout_total - (this.resume.montant_carburant + this.resume.cout_maintenance);
        //this.resume.km_aujourdhui= [...res.compteurTotal].reduce((prev: any, next: any) => prev + next.distance, 0);
        //
        this.createChart("chartCoutTotalCarburant","Cout total carburants",res.coutFuel.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.coutFuel }))); 
        this.createChart("chartCoutTotal","Cout total",res.coutTotal.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.coutTotal })));
      }
    )
  }

}
