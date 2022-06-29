import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonsReceptionDetailsService {

  constructor(private http: HttpClient) { }

  getAll(id:number) {
    return this.http.get<any>(environment.apiURL + '/stock/bons_reception/'+id+'/details')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/stock/bons_reception/details', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/stock/bons_reception/details/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/stock/bons_reception/details/' + id)
  }

  getDetailsBR(id:number){
    return this.http.get<any>(environment.apiURL + '/stock/bons_reception/details/'+id)
  }
  
}
