import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/utilisateurs/roles')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/utilisateurs/roles', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/utilisateurs/roles/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/utilisateurs/roles/' + id)
  }

  getRole(id: number) {
    return this.http.get<any>(environment.apiURL + '/utilisateurs/roles/'+id)
  }
}
