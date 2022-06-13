import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculeHistoriqueCompteurService {

  constructor(private http: HttpClient) { }

  // getAll() {
  //   return this.http.get(environment.apiURL + '/vehicules/groupes/list')
  // }

  search(page:number,record: any){
    return this.http.post(environment.apiURL + '/vehicules/compteurs/find/page/'+page ,record)
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/vehicules/compteurs', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/vehicules/compteurs/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/vehicules/compteurs/' + id)
  }

  getCompteur(id: number) {
    return this.http.get<any>(environment.apiURL + '/vehicules/compteurs/'+id)
  }

  getGpsCompteur(record:any){
    return this.http.post<any>(environment.apiURL + '/vehicules/gps-compteurs/find',record)
  }

}
