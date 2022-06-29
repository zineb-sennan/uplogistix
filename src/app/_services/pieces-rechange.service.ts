import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PiecesRechangeService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/stock/pieces')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/stock/pieces', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/stock/pieces/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/stock/pieces/' + id)
  }

  getPieceRechange(id:number){
    return this.http.get<any>(environment.apiURL + '/stock/pieces/'+id)
  }

}
