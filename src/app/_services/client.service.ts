import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  create(record: any) {
    return this.http.post<any>(environment.apiURL + '/clients', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/clients/' + record.id, record)
  }

  getAll(page: number) {
    return this.http.get(environment.apiURL + '/clients/page/'+page)
  }

  getAllClients(){
    return this.http.get(environment.apiURL + '/clients')
  }

  getClient(id: number) {
    return this.http.get(environment.apiURL + '/clients/'+id)
  }

  getContactByClientId(id:number){
    return this.http.get<any>(environment.apiURL + '/clients/'+id+'/contacts')
  }

  getContact(id:number){
    return this.http.get<any>(environment.apiURL + '/clients/contacts/'+id)
  }

  createContact(record: any) {
    return this.http.post<any>(environment.apiURL + '/clients/contacts', record)
  }

  updateContact(record: any) {
    return this.http.put(environment.apiURL + '/clients/contacts/' + record.id, record)
  }

  deleteContact(id:number){
    return this.http.delete(environment.apiURL + '/clients/contacts/'+ id)
  }

  search(record: any, page:any){
    return this.http.post(environment.apiURL + '/clients/find/page/'+ page ,record)
  }

  /*** *** */
  getVehiculesByClientWithoutGPS(id:number){
    return this.http.get<any>(environment.apiURL + '/clients/'+id+'/vehicules')
  }

}
