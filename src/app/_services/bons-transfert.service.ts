import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonsTransfertService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/stock/bons_transfert')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/stock/bons_transfert', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/stock/bons_transfert/' + record.id, record)
  }

  delete(id: number){
    return this.http.delete(environment.apiURL + '/stock/bons_transfert/details/' + id)
  }

  getBonTransfert(id:number){
    return this.http.get<any>(environment.apiURL + '/stock/bons_transfert/'+id)
  }

  valide(record:any){
    return this.http.post(environment.apiURL + '/stock/bons_transfert/'+record.id+'/validate', record)
  }


}
