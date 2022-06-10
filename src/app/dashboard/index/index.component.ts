import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { VehiculeService } from '../../_services/vehicule.service';
import * as $ from 'jquery';
import { GeoLocalisationService } from 'src/app/_services/geolocalisation.service';
import { EcoconduiteService } from 'src/app/_services/ecoconduite.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  //
  vehicules: any = []; moisEncours: any = {}; moisPrecedent: any = {}; etatVehicule: any = {}; vehiculesByScore: any = [];

  constructor(
    private vehiculeService: VehiculeService,
    private geoLocalisationService: GeoLocalisationService,
    private ecoconduiteService: EcoconduiteService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.getInfos();
    this.getEtatVehicule();
  }


  getInfos() {
    this.geoLocalisationService.getInfosDashboard().subscribe(
      res => {
        const mois = ["JAN", "FEV", "MAR", "AVR", "MAI", "JUN", "JUL", "AOU", "SEP", "OCT", "NOV", "DEC"];
        //01
        this.moisEncours = res.moisEncours;
        this.moisPrecedent = res.moisPrecedent;
        //02 Coût Total
        this.chart('chart-total-consommation', 'bar', res.coutTotal.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.coutTotal })));
        //03 Total Coût/1 Km Dh
        this.chart('chart-cout-km', 'bar', res.coutKM.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.coutKM })));
        //04 Évolution de compteur km
        this.chart('chart-evolution-compteur', 'bar', res.compteurTotal.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.distance })));
        //05 Évolution empreinte carbone Kg
        this.chart('chart-carbone', 'bar', res.carboneTotal.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.cKg })));
        //06 Co2 kg
        this.chart('chart-co2', 'bar', res.carboneTotal.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.co2Kg })));
        //07 Coût total du carburant
        this.chart('chart-consommation-carburant', 'bar', res.coutFuel.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.coutFuel })));
        //08-Coût maintenance
        this.chart('chart-maintenance', 'bar', res.coutMaintenance.map((ct: any) => ({ x: mois[ct.mois - 1], y: ct.coutTotal })));
      }
    )
  }

  chart(idChart: any, typeChart: any, _data: any) {
    new Chart(<any>$('#' + idChart), {
      type: typeChart,
      data: {
        datasets: [{
          data: _data,
          backgroundColor: 'rgba(44, 123, 228)',
          borderWidth: 0.3,
          borderRadius: 6,
          borderSkipped: false,
          barPercentage: 0.10,
          categoryPercentage: 0.5
        }]
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
    });
  }


  calc(val1: number, val2: number): string {
    return ((val1 / (val1 + val2)) * 100).toFixed(2);
  }

  getEtatVehicule() {
    this.vehiculeService.getAll().subscribe(
      res => {
        this.etatVehicule.eco_conduite = [...res].filter(v => v.eco_conduite).length;
        this.etatVehicule.gps = [...res].filter(v => v.balise).length;
        this.etatVehicule.non_gps = [...res].filter(v => !v.balise).length;
        this.etatVehicule.maintenance = [...res].filter(v => v.statut == "En maintenance").length;
        this.etatVehicule.actif = [...res].filter(v => v.statut == "Actif").length;
        this.etatVehicule.inactif = [...res].filter(v => v.statut == "Inactif").length;
        this.etatVehicule.occupe = [...res].filter(v => v.statut == "Occupé").length;
        //
        this.vehiculesByScore = [];
        [...res].filter(v => v.eco_conduite).forEach(v => this.getScoreByVehicule(v.id, v.matricule));
      }
    )
  }

  getScoreByVehicule(vehicule_id: number, matricule: string) {
    const date = new Date();

    const record = { vehicule_id: vehicule_id, date_debut: this.datePipe.transform((new Date(date.getFullYear(), date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datePipe.transform(date, 'yyyy-MM-dd') }
    this.ecoconduiteService.scoreByVehicule(record).subscribe(
      res => {
        this.vehiculesByScore.push({ id: vehicule_id, matricule, score: res.new_score ?? '100.00' });
        this.vehiculesByScore = [...this.vehiculesByScore].sort((a, b) => b.score - a.score);
      }
    )
  }


}
