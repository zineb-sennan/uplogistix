import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrepotsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/stock/entrepots')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/stock/entrepots', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/stock/entrepots/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/stock/entrepots/' + id)
  }

  getEntrepot(id:number){
    return this.http.get<any>(environment.apiURL + '/stock/entrepots/'+id)
  }
 
  getPiecesByEntrepot(id:number){
    return this.http.get<any>(environment.apiURL + '/stock/entrepots/'+id+'/stock')
  }

}
