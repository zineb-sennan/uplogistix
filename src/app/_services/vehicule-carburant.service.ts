import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculeCarburantService {

  constructor(private http: HttpClient) { }

  create(record: any) {
    return this.http.post(environment.apiURL + '/vehicules/carburants', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/vehicules/carburants/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/vehicules/carburants/' + id)
  }

  search(record: any, page:any){
    return this.http.post<any>(environment.apiURL + '/vehicules/carburants/find/page/'+ page ,record)
  }

  getCarburant(id: number) {
    return this.http.get(environment.apiURL + '/vehicules/carburants/'+id)
  }

}