import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FournisseursService {

  constructor(private http: HttpClient) { }

  create(record: any) {
    return this.http.post<any>(environment.apiURL + '/fournisseurs', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/fournisseurs/' + record.id, record)
  }

  getAll(page: number) {
    return this.http.get(environment.apiURL + '/fournisseurs/page/'+page)
  }

  getAllfournisseurs(){
    return this.http.get(environment.apiURL + '/fournisseurs')
  }

  getClient(id: number) {
    return this.http.get(environment.apiURL + '/fournisseurs/'+id)
  }

  getContactByClientId(id:number){
    return this.http.get<any>(environment.apiURL + '/fournisseurs/'+id+'/contacts')
  }

  getContact(id:number){
    return this.http.get<any>(environment.apiURL + '/fournisseurs/contacts/'+id)
  }

  createContact(record: any) {
    return this.http.post<any>(environment.apiURL + '/fournisseurs/contacts', record)
  }

  updateContact(record: any) {
    return this.http.put(environment.apiURL + '/fournisseurs/contacts/' + record.id, record)
  }

  deleteContact(id:number){
    return this.http.delete(environment.apiURL + '/fournisseurs/contacts/'+ id)
  }

  search(record: any, page:any){
    return this.http.post(environment.apiURL + '/fournisseurs/find/page/'+ page ,record)
  }
}
