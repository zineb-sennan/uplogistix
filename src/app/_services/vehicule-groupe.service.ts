import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculeGroupeService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(environment.apiURL + '/vehicules/groupes/list')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/vehicules/groupes', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/vehicules/groupes/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/vehicules/groupes/' + id)
  }

  getGroupe(id: number) {
    return this.http.get(environment.apiURL + '/vehicules/groupes/'+id)
  }

}
