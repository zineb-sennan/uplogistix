import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EcoconduiteService {

  constructor(private http: HttpClient) { }

  resumeOfVehicule(id:number){
    return this.http.get<any>(environment.apiURL + '/geolocalisation/vehicule/' + id +'/resume')
  }

  historiqueVehicule(id:number,record: any){
    return this.http.post<any>(environment.apiURL + '/geolocalisation/vehicule/' + id +'/historique',record)
  }

  detailsTrajetVehicule(id:number){
    return this.http.get<any>(environment.apiURL + '/geolocalisation/trajet/' + id +'/details')
  }

  scoreByVehicule(record:any ){
    return this.http.post<any>(environment.apiURL + '/geolocalisation/eco-conduite', record)
  }

  evolutionScoreByVehicule(record:any ){
    return this.http.post<any>(environment.apiURL + '/vehicules/eco-evolution', record)
  }

}
