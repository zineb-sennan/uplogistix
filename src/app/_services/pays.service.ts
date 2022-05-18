import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaysService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/international/pays')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/international/pays', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/international/pays/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/international/pays/' + id)
  }

  getPays(id: number) {
    return this.http.get<any>(environment.apiURL + '/international/pays/'+id)
  }

}