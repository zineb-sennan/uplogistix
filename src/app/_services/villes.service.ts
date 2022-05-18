import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VillesService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(environment.apiURL + '/international/villes')
  }

  villesByRegion(id:number){
    return this.http.get<any>(environment.apiURL + '/international/region/'+id+'/villes')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/international/villes', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/international/villes/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/international/villes/' + id)
  }

  getVille(id:number){
    return this.http.get<any>(environment.apiURL + '/international/villes/' + id)
  }
  
}