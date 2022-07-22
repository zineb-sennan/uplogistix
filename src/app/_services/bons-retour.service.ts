import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonsRetourService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/stock/bons_retour')
  }

  create(record: any) {
    return this.http.post<any>(environment.apiURL + '/stock/bons_retour', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/stock/bons_retour/' + record.id, record)
  }

  getBonReception(id:number){
    return this.http.get<any>(environment.apiURL + '/stock/bons_retour/'+id)
  }

  valide(record:any){
    return this.http.post(environment.apiURL + '/stock/bons_retour/'+record.id+'/validate', record)
  }
  
}
