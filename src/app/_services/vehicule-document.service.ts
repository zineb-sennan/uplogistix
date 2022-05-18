import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculeDocumentService {

  constructor(private http: HttpClient) { }

  create(record: any) {
    return this.http.post(environment.apiURL + '/international/vehicule_documents', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/international/vehicule_documents/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/international/vehicule_documents/' + id)
  }

  getDocumentsByPaysId(id:number){
    return this.http.get(environment.apiURL + '/international/pays/'+id+'/vehicule_documents')
  }

  getDocumentsByVehiculeId(id: number){
    return this.http.get<any>(environment.apiURL + '/vehicules/'+id+'/documents')
  }
  
  updateDocumentsByVehicule(record: any) {
    return this.http.put(environment.apiURL +'/vehicules/'+ record.vehicule_id+'/document/' + record.int_document_id, record)
  }

  getDocument(id: number) {
    return this.http.get(environment.apiURL + '/international/vehicule_documents/'+id)
  }
  
}
