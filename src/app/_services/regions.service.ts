import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  
  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(environment.apiURL + '/international/regions')
  }

  regionsByPays(id:number){
    return this.http.get<any>(environment.apiURL + '/international/pays/'+id+'/regions')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/international/regions', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/international/regions/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/international/regions/' + id)
  }

  getRegion(id: number) {
    return this.http.get<any>(environment.apiURL + '/international/regions/'+id)
  }

}
