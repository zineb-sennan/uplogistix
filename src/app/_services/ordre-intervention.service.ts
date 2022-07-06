import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdreInterventionService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/maintenance/ordres')
  }

  create(record: any) {
    return this.http.post<any>(environment.apiURL + '/maintenance/ordres', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/maintenance/ordres/' + record.id, record)
  }

  getOrdreInterventionById(id:number){
    return this.http.get<any>(environment.apiURL + '/maintenance/ordres/'+id)
  }
}
