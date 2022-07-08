import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PiecesTachesService {

  constructor(private http: HttpClient) { }

  getAll(tache_id:number) {
    return this.http.get<any>(environment.apiURL + '/maintenance/taches/'+tache_id+'/pieces')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/maintenance/taches/'+record.oi_tache_id+'/pieces', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/maintenance/taches/'+record.oi_tache_id+'/pieces/' + record.id, record)
  }

  delete(oi_tache_id:number, id: any) {
    return this.http.delete(environment.apiURL + '/maintenance/taches/'+oi_tache_id+'/pieces/' + id)
  }
}
