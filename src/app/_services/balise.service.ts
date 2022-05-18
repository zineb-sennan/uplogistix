import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaliseService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/balises')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/balises', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/balises/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/balises/' + id)
  }

  getBalise(id:number){
    return this.http.get<any>(environment.apiURL + '/balises/'+id)
  }
  
}
