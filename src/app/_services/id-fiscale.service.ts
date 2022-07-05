import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdFiscaleService {

  constructor(private http: HttpClient) { }

  identifiantsByPays(id: number) {
    return this.http.get<any>(environment.apiURL + '/international/pays/' + id + '/identifiants_fiscaux')
  }

  identifiantsByClient(id: number) {
    return this.http.get<any>(environment.apiURL + '/clients/' + id + '/identifiants_fiscaux')
  }

  identifiantsByFournisseur(id: number) {
    return this.http.get<any>(environment.apiURL + '/fournisseurs/' + id + '/identifiants_fiscaux')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/international/identifiants_fiscaux', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/international/identifiants_fiscaux/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/international/identifiants_fiscaux/' + id)
  }

  updateIdentifiantsClient(record: any) {
    return this.http.put(environment.apiURL +'/clients/'+ record.client_id+'/identifiant_fiscale/' + record.identifiant_fiscale_id, record)
  }

  updateIdentifiantsFournisseur(record: any) {
    return this.http.put(environment.apiURL +'/fournisseurs/'+ record.fournisseur_id+'/identifiant_fiscale/' + record.identifiant_fiscale_id, record)
  }

  getIdFiscale(id:number){
    return this.http.get(environment.apiURL + '/international/identifiants_fiscaux/'+id)
  }

}
