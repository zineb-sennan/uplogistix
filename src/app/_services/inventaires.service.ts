import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventairesService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/stock/inventaires')
  }

  create(record: any) {
    return this.http.post<any>(environment.apiURL + '/stock/inventaires', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/stock/inventaires/' + record.id, record)
  }

  getInventaire(id:number){
    return this.http.get<any>(environment.apiURL + '/stock/inventaires/'+id)
  }

  valide(record:any){
    return this.http.post(environment.apiURL + '/stock/inventaires/'+record.id+'/validate', record)
  }

}
