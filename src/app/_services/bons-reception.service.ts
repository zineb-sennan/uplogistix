import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonsReceptionService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/stock/bons_reception')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/stock/bons_reception', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/stock/bons_reception/' + record.id, record)
  }

  valideStock(record:any){
    return this.http.post(environment.apiURL + '/stock/bons_reception/'+record.id+'/validate', record)
  }

  getBonReception(id:number){
    return this.http.get<any>(environment.apiURL + '/stock/bons_reception/'+id)
  }

}
