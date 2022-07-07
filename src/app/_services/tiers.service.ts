import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TiersService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/maintenance/tiers')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/maintenance/tiers', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/maintenance/tiers/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/maintenance/tiers/' + id)
  }

  getRole(id: number) {
    return this.http.get<any>(environment.apiURL + '/maintenance/tiers/'+id)
  }
}
