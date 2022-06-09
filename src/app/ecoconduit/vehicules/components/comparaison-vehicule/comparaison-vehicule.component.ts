import { Component, OnInit } from '@angular/core';
import { GeoLocalisationService } from 'src/app/_services/geolocalisation.service';
import { EcoconduiteService } from 'src/app/_services/ecoconduite.service';
import { VehiculeService } from '../../../../_services/vehicule.service';
import { SecuriteClass } from '../../../../_globale/securite';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';
import { DatePipe } from "@angular/common";


@Component({
  selector: 'app-comparaison-vehicule',
  templateUrl: './comparaison-vehicule.component.html',
  styleUrls: ['./comparaison-vehicule.component.css']
})
export class ComparaisonVehiculeComponent implements OnInit {
  //
  date: any = null;
  typeFilter = 'jour'; filter: any = { vehicule_id: 9, date_debut: "2022-03-10", date_fin: "2022-03-10" };
  colors = ['56, 95, 158', '247, 189, 1', '20, 156, 56', '94, 202, 223'];
  viewChartPrincipale: any = null; maxVehicule = 4; maxChart = 5;
  vehicules: any[] = []; vehiculesSelected: any[] = [];
  chartSelected: any = [
    { index: 1, checked: true, libelle: 'Vitesse maximale Km', slug: 'vitesse-moyenne', data: [] },
    { index: 2, checked: true, libelle: 'Vitesse moyenne Km', slug: 'vitesse-moyenne', data: [] },
    { index: 3, checked: true, libelle: 'Consommation carburant', slug: 'vitesse-moyenne', data: [] },
    { index: 4, checked: true, libelle: 'Distance parcourue Km', slug: 'distance-parcourue', data: [] },
    { index: 5, checked: true, libelle: 'Emission CO2 kg', slug: 'emission-co2', data: [], last: true },
    { index: 6, libelle: 'Temps de conduite', slug: 'temps-conduite', data: [] },
    { index: 7, libelle: 'Consommation l/100km', slug: 'Consommation-l-100km', data: [] },
    // { index: 8, libelle: 'Fuel consomme', slug: 'fuel-consomme', data: [] },
    // { index: 9, libelle: 'Fuel gaspillé', slug: 'Fuel-gaspille', data: [] }
  ];

  constructor(
    private vehiculeService: VehiculeService,
    private ecoconduiteService: EcoconduiteService,
    private securiteClass: SecuriteClass,
    private geoLocalisationService: GeoLocalisationService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.getVehiculeWitheEco();
    //
    // this.date=new Date();
    // let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    // console.log(latest_date);
  }

  getVehiculeWitheEco() {
    this.vehiculeService.getAll().subscribe(
      res => {
        this.vehicules = res.filter((v: any) => v.eco_conduite);
        for (let index = 0; index < this.maxVehicule; index++) {
          this.checkVehicules(null, this.vehicules[index]);
          this.vehicules[index].checked = true;
        }
      },
      error => {
        if (error.status == 401 && this.securiteClass.refreshToken()) this.getVehiculeWitheEco();
      }
    )
  }

  checkVehicules(e: any, vehicule: any) {
    //01
    this.viewChartPrincipale = null;
    $('.tchart').removeClass('active');
    $('.col-chart').removeClass('border-bottom');
    //02
    if (e != null) {
      if (this.vehiculesSelected.length == this.maxVehicule) {
        if (e.currentTarget.checked) {
          e.currentTarget.checked = false;
          $('.mv-error').removeClass("d-none");
        }
        else {
          this.chartSelected.forEach((chart: any) => {
            chart.data = chart.data.filter((c: any) => c.matricule != vehicule.matricule);
          });

          this.vehiculesSelected = this.vehiculesSelected.filter(v => v.id != vehicule.id);
          $('.mv-error').addClass("d-none");
        }
      }
      else if (this.vehiculesSelected.length < this.maxVehicule) {
        if (e.currentTarget.checked) {
          vehicule.color = this.colors.filter(v => !this.vehiculesSelected.map((vs: any) => vs.color).includes(v))[0];
          this.vehiculesSelected.push(vehicule);

          this.chartSelected.forEach((chart: any) => {
            this.getInformationsVehicule(vehicule, (vehicule.id + '' + chart.index), chart.index);
          });
        }
        else if (!e.currentTarget.checked) {
          this.vehiculesSelected = this.vehiculesSelected.filter(v => v.id != vehicule.id);

          this.chartSelected.forEach((chart: any) => {
            chart.data = chart.data.filter((c: any) => c.matricule != vehicule.matricule);
          });
        }
      }
    }
    else {
      vehicule.color = this.colors[this.vehiculesSelected.length];
      this.vehiculesSelected.push(vehicule);
      //
      this.chartSelected.forEach((chart: any) => {
        this.getInformationsVehicule(vehicule, (vehicule.id + '' + chart.index), chart.index);
      });
    }
  }

  async getInformationsVehicule(vehicule: any, index: any, indexChart: any) {
    var _data: any = null;
    this.filter.vehicule_id = vehicule.id;
    //MaxSpeed | Vitesse maximale Km
    if (indexChart == 1) {
      _data = (await this.geoLocalisationService.getMaxSpeed(this.filter).toPromise());
      _data = _data.map((v: any) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y: v.average }));
      console.log(_data);
      this.chartSelected[indexChart - 1].data.push({ values: _data, matricule: vehicule.matricule, color: vehicule.color });
    }
    //SpeedAverage| Vitesse moyenne Km
    else if (indexChart == 2) {
      _data = (await this.geoLocalisationService.getSpeedAverage(this.filter).toPromise());
      _data = _data.map((v: any) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y: v.average }));
      this.chartSelected[indexChart - 1].data.push({ values: _data, matricule: vehicule.matricule, color: vehicule.color });
    }
    //Fuel | Consommation carburant
    else if (indexChart == 3) {
      _data = (await this.geoLocalisationService.getFuel(this.filter).toPromise());
      _data = _data.map((v: any) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y: Number(v.montant_carburant) }));
      this.chartSelected[indexChart - 1].data.push({ values: _data, matricule: vehicule.matricule, color: vehicule.color });
    }
    //Distance | Distance parcourue Km
    else if (indexChart == 4) {
      _data = (await this.geoLocalisationService.getDistance(this.filter).toPromise());
      _data = _data.map((v: any) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y: v.distance }));
      this.chartSelected[indexChart - 1].data.push({ values: _data, matricule: vehicule.matricule, color: vehicule.color });
    }
    //carbone | Emission CO2 kg
    else if (indexChart == 5) {
      _data = (await this.geoLocalisationService.getCarbone(this.filter).toPromise());
      _data = _data.map((v: any) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y: Number(v.CO2g) }));
      this.chartSelected[indexChart - 1].data.push({ values: _data, matricule: vehicule.matricule, color: vehicule.color });
    }
    //DriveTime | Temps de conduite
    else if (indexChart == 6) {
      _data = (await this.geoLocalisationService.getDriveTime(this.filter).toPromise());
      console.log(_data);
      _data = _data.map((v: any,index:any=2) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y:index , z: v.duree }));
     
      this.chartSelected[indexChart - 1].data.push({ values: _data, matricule: vehicule.matricule, color: vehicule.color });
    }
    //L100 | Consommation l/100km
    else if (indexChart == 1) {
      _data = (await this.geoLocalisationService.getL100(this.filter).toPromise());
      _data = _data.map((v: any) => ({ x: this.typeFilter == 'jour' ? v.date_heure.toString() + ':00' : this.datepipe.transform(v.date_heure, 'dd-MM-yyyy'), y: Number(v.consommation) }));
      console.log(vehicule.matricule, _data);
      this.chartSelected[indexChart - 1].data.push({ values: _data, matricule: vehicule.matricule, color: vehicule.color });
    }

    //La creation d'une chart
    this.createChart(index, _data, vehicule, 100, indexChart);
  }

  mChart: any = [];
  createChart(index: any, data: any, vehicule: any, maxValue: any, indexChart:any) {

    var chart: any = $('#chart_' + index);
    if (this.mChart[index]) this.mChart[index].destroy();
    this.mChart[index] = new Chart(chart, {
      type: 'line',
      data: {
        datasets: [{
          data: data,
          label: vehicule.matricule,
          borderColor: 'rgb(' + vehicule.color + ')',
          fill: {
            target: 'origin',
            above: 'rgba(' + vehicule.color + ',0.2)',
          },
          pointBackgroundColor: 'rgba(76, 132, 255,0)',
          pointHoverBackgroundColor: 'rgb(44, 122, 228)',
          pointBorderWidth: 0,
          pointStyle: 'rectRounded',
          borderWidth: 1.5
        }],
      },
      options: {
        responsive: true,
        scales: {
          x: { display: false },
          y: { display: false }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
    
    //temps de conduite
    if(indexChart == 6){
      this.mChart[index].options.scales.y.ticks.callback='Bonjour !';
    }

    $('#max_' + index).text(maxValue);
  }

  remplissageChartPrincipale(index: any) {
    if (this.chartSelected[index - 1].data.length >= this.maxVehicule) {
      this.viewChartPrincipale = true;
      $('.tchart').removeClass('active'); $('.chart-' + index).addClass('active');
      $('.col-chart').removeClass('border-bottom'); $('.col-chart-' + index).addClass('border-bottom');
      this.createChartPrincipale(this.chartSelected[index - 1]);
    }
    else
      this.viewChartPrincipale = false;
  }

  myChart: any = null;
  createChartPrincipale(infosChart: any) {
    //01
    var chart: any = $('#chart-principal');
    if (this.myChart) this.myChart.destroy();
    var _infosChart: any = {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { drawOnChartArea: false }
          },
          y: {
            grid: { drawOnChartArea: false }
          }
        }
      }
    }
    //02
    infosChart.data.forEach((chart: any) => {
      var item = { data: chart.values, label: chart.matricule, borderColor: 'rgba(' + chart.color + ',1)' };
      _infosChart.data.datasets.push(item);
    })
    //03
    this.myChart = new Chart(chart, _infosChart);
  }

  changeData(type: any) {
    if (type == "jour") this.filter.date_fin = this.filter.date_debut;
    //01
    this.typeFilter = type; this.viewChartPrincipale = null;
    $('.tchart').removeClass('active'); $('.col-chart').removeClass('border-bottom');
    //02
    this.chartSelected.forEach((chart: any) => {
      delete chart.data; chart.data = [];
    });
    //03
    this.vehiculesSelected.forEach(vehicule => {
      this.chartSelected.forEach((chart: any) => {
        this.getInformationsVehicule(vehicule, (vehicule.id + '' + chart.index), chart.index);
      });
    });
  }

  checkChart(e: any, index: number) {
    //01
    this.viewChartPrincipale = null;
    $('.tchart').removeClass('active');
    $('.col-chart').removeClass('border-bottom');
    //02
    let checkedChart = this.chartSelected.filter((c: any) => c.checked == true);
    this.chartSelected[(checkedChart[checkedChart.length - 1].index) - 1].last = false;
    //03
    if (e.currentTarget.checked) {
      if (this.maxChart > checkedChart.length) this.chartSelected[index - 1].checked = true;
      else {
        e.currentTarget.checked = false;
        $('.mc-error').removeClass('d-none');
      }
    }
    else {
      if (checkedChart.length == 1) e.currentTarget.checked = true;
      else this.chartSelected[index - 1].checked = null;
    }
    //04
    checkedChart = this.chartSelected.filter((c: any) => c.checked == true);
    this.chartSelected[(checkedChart[checkedChart.length - 1].index) - 1].last = true;
  }

  entierAleatoire(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
