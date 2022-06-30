import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventaireDetailsService {

  constructor(private http: HttpClient) { }

  getAll(id:number) {
    return this.http.get<any>(environment.apiURL + '/stock/inventaire/'+id+'/details')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/stock/inventaire/details', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/stock/inventaire/details/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/stock/inventaire/details/' + id)
  }

  getDetailsBT(id:number){
    return this.http.get<any>(environment.apiURL + '/stock/inventaire/details/'+id)
  }
}
