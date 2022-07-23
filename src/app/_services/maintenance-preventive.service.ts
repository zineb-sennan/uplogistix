import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenancePreventiveService {

  constructor(private http: HttpClient) { }

  getAllPieces() {
    return this.http.get<any>(environment.apiURL + '/maintenance/preventive')
  }

  getPiecesByVehicule(id:number) {
    return this.http.get<any>(environment.apiURL + '/maintenance/preventive/'+id)
  }

  getHistorique(record:any) {
    return this.http.post(environment.apiURL + '/maintenance/historique', record)
  }

  getCoutMaintenance(record:any){
    return this.http.post<any>(environment.apiURL + '/maintenance/cout', record)
  }

  getStatistiquesByOrder(){
    return this.http.get<any>(environment.apiURL + '/maintenance/ordres/statistiques')
  }

}
