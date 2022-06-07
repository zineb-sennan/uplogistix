import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/utilisateurs')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/utilisateurs', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/utilisateurs/' + record.id, record)
  }

  lock(state: boolean, id: number) {
    return this.http.post(environment.apiURL + '/utilisateurs/' + id + '/lock', { state: state })
  }

  getUtilisateur(id:number){
    return this.http.get<any>(environment.apiURL + '/utilisateurs/' + id)
  }

  changePassword(record:any){
    return this.http.post(environment.apiURL + '/login/password', record)
  }

  forgetPwd(record: any){
    return this.http.post<any>(environment.apiURL + '/login/forget-password', record)
  }
}
