import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EcoconduiteService } from '../../../../_services/ecoconduite.service';
import { VehiculeService } from '../../../../_services/vehicule.service';
import { Pipe, PipeTransform } from '@angular/core' ;

// @Pipe({
//   name: 'filter'
// })

@Component({
  selector: 'app-classement-vehicule',
  templateUrl: './classement-vehicule.component.html',
  styleUrls: ['./classement-vehicule.component.css']
})
export class ClassementVehiculeComponent implements OnInit {
  date:any=new Date();

  constructor(
    private ecoconduiteService: EcoconduiteService,
    private vehiculeService: VehiculeService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.getScoreByVehicule();

  }

  vehicules: any = [];
  getScoreByVehicule() {
    this.vehiculeService.getAll().subscribe(
      res => {
        [...res].filter(v => v.eco_conduite).forEach(async v => {
          this.date = new Date();
          const record = { vehicule_id: v.id, date_debut: this.datePipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datePipe.transform(this.date, 'yyyy-MM-dd') };
          this.vehicules.push({ id: v.id,matricule: v.matricule, marque: v.marque,score: (await this.ecoconduiteService.scoreByVehicule(record).toPromise()).new_score ?? '100.00' });
          //this.vehicules = [...this.vehicules].sort((a:any, b:any) => b.score - a.score);
        }); //fin forEach
      }
    )



    // const _vehicules= await this.vehiculeService.getAll().toPromise();
    // [..._vehicules].filter(v => v.eco_conduite).forEach(v => {
    //   const date=new Date();
    //   const record = { vehicule_id: v.id, date_debut: this.datePipe.transform((new Date(date.getFullYear(), date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datePipe.transform(date, 'yyyy-MM-dd') };
    //   this.ecoconduiteService.scoreByVehicule(record).subscribe(
    //     res => {
    //       this.vehicules.push({ id: v.id, maticule: v.matricule, score: res.new_score ?? '100.00' });
    //       [...this.vehicules].sort((a, b) => b.score - a.score);
    //     }
    //   )     
    // }); //fin forEach

    // console.log(this.vehicules);

    //console.log(vehicules);
    //_vehicules.forEach((veh:any) => {
    //01
    // const date=new Date();
    // const record = { vehicule_id: veh.id, date_debut: this.datePipe.transform((new Date(date.getFullYear(), date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datePipe.transform(date, 'yyyy-MM-dd') };

    // this.ecoconduiteService.scoreByVehicule(record).subscribe(
    //     res => {
    //       this.vehicules.push({ id: veh.id, maticule: veh.matricule, score: res.new_score ?? '100.00' });
    //       [...this.vehicules].sort((a, b) => b.score - a.score);
    //     }
    // )        
    // });

    // console.log(this.vehicules);
    //console.log('***',this.vehicules);

    // const record = { vehicule_id: vehicule_id, date_debut: this.datePipe.transform((new Date(date.getFullYear(), date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datePipe.transform(date, 'yyyy-MM-dd') }
    // this.ecoconduiteService.scoreByVehicule(record).subscribe(
    //   res => {
    //     // this.vehiculesByScore.push({ id: vehicule_id, matricule, score: res.new_score ?? '100.00' });
    //     // this.vehiculesByScore = [...this.vehiculesByScore].sort((a, b) => b.score - a.score);
    //     // console.log( this.vehiculesByScore[0]);
    //   }
    // )


  }

}
