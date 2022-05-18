import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(environment.apiURL + '/vehicules')
  }

  getAllByPage(page:number) {
    return this.http.get(environment.apiURL + '/vehicules/page/'+page)
  }

  create(record: any) {
    return this.http.post<any>(environment.apiURL + '/vehicules', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/vehicules/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/vehicules/' + id)
  }

  getVehiculeById(id:number){
    return this.http.get(environment.apiURL + '/vehicules/' + id)
  }

  search(record: any){
    return this.http.post(environment.apiURL + '/vehicules/find' ,record)
  }

  getEtatCarburant(id:number){
    return this.http.get<any>(environment.apiURL + '/vehicules/' + id +'/etat-carburant')
  }

}
