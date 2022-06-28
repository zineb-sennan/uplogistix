import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PieceCategoriesService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/stock/categories')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/stock/categories', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/stock/categories/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/stock/categories/' + id)
  }

  getPieceCat(id:number){
    return this.http.get<any>(environment.apiURL + '/stock/categories/'+id)
  }

}
