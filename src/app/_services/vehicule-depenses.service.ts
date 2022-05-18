import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculeDepensesService {

  constructor(private http: HttpClient) { }

  search(record: any, page:any){
    return this.http.post(environment.apiURL + '/vehicules/depenses/find/page/'+ page ,record)
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/vehicules/depenses', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/vehicules/depenses/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/vehicules/depenses/' + id)
  }

  getDepenses(id: number) {
    return this.http.get(environment.apiURL + '/vehicules/depenses/'+id)
  }

}
