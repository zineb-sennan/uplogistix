import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConducteurService } from 'src/app/_services/conducteur.service';
import { GeoLocalisationService } from 'src/app/_services/geolocalisation.service';

@Component({
  selector: 'app-classement-conducteurs',
  templateUrl: './classement-conducteurs.component.html',
  styleUrls: ['./classement-conducteurs.component.css']
})
export class ClassementConducteursComponent implements OnInit {

  date = new Date(); conducteurs:any=[];  classement:any={ max: '', min:'', maxValeur:0, minValeur:0 };

  constructor(
    private conducteurService: ConducteurService,
    private geoLocalisationService: GeoLocalisationService,
    private datePipe:DatePipe
  ) { }

  async ngOnInit(){
    //01
    const conducteur$:any = this.conducteurService.getConducteurs().pipe(
      map(conducteur => conducteur.filter((c: any) => c.vehicule_id)),
      switchMap(data => forkJoin(data.map(this.getScoreByConducteur.bind(this))))
    );
    this.conducteurs = (await conducteur$.toPromise()).sort((a:any, b:any) => b.moy_score - a.moy_score);
    //02
    this.classement.maxValeur = Math.max(...this.conducteurs.map((d: any) => d.moy_score));
    this.classement.minValeur = Math.min(...this.conducteurs.map((d: any) => d.moy_score));

    if(this.classement.maxValeur > 70) this.classement.max = [...this.conducteurs].filter(v=> v.moy_score == this.classement.maxValeur);
    if(this.classement.minValeur < 30) this.classement.min = [...this.conducteurs].filter(v=> v.moy_score == this.classement.maxValeur);
  }

  private getScoreByConducteur(conducteur: any): any {

    const record = { vehicule_id: conducteur.vehicule_id, date_debut: this.datePipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datePipe.transform(this.date, 'yyyy-MM-dd') };

    return this.geoLocalisationService.analyseConducteur(record).pipe(
      map(resume => (
        {
          matricule: conducteur.matricule,
          nom_complet: conducteur.prenom +' '+ conducteur.nom,
          moy_score : ([...resume.score].filter(s => s.score > 0)).reduce((prev: any, next: any) => prev + next.score, 0) / ([...resume.score].filter(s => s.score > 0)).length
        }
      ))
    );

  }

}
