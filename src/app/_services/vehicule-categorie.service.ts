import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculeCategorieService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(environment.apiURL + '/vehicules/categories/list')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/vehicules/categories', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/vehicules/categories/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/vehicules/categories/' + id)
  }

  getCategorie(id: number) {
    return this.http.get(environment.apiURL + '/vehicules/categories/'+id)
  }

}
