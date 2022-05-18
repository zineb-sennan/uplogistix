import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculeModeleService {

  constructor(private http: HttpClient) { }

  getModelesByMarqueId(id:number) {
    return this.http.get(environment.apiURL + '/vehicules/marque/'+id+'/modeles')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/vehicules/modeles', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/vehicules/modeles/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/vehicules/modeles/' + id)
  }

  getModelesByCategorieAndMarque(categorie_id:number,marque_id:number){
    return this.http.get(environment.apiURL + '/vehicules/categorie/'+categorie_id+'/marques/'+marque_id)
  }

  getModele(id: number) {
    return this.http.get(environment.apiURL + '/vehicules/modeles/'+id)
  }

}
