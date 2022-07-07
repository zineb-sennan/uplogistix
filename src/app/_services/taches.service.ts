import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TachesService {

  constructor(private http: HttpClient) { }

  getAll(idOrdre:number) {
    return this.http.get<any>(environment.apiURL + '/maintenance/ordres/'+idOrdre+'/taches')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/maintenance/ordres/'+record.ordre_id_taches+'/taches', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/maintenance/ordres/'+record.ordre_id_taches+'/taches/' + record.id, record)
  }

  delete(ordre_id:any,id: any) {
    return this.http.delete(environment.apiURL + '/maintenance/ordres/'+ordre_id+'/taches/' + id)
  }

  getInterventions(){
    return this.http.get<any>(environment.apiURL + '/maintenance/interventions')
  }

}
