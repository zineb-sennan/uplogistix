import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConducteurService {

  constructor(private http: HttpClient) { }

  getAll(page: number) {
    return this.http.get<any>(environment.apiURL + '/conducteurs/page/' + page)
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/conducteurs', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/conducteurs/' + record.id, record)
  }

  delete(id:number){
    return this.http.delete(environment.apiURL + '/conducteurs/' + id)
  }

  getConducteur(id: number){
    return this.http.get<any>(environment.apiURL + '/conducteurs/' + id)
  }


}
