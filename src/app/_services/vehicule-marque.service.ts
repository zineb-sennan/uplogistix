import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculeMarqueService {

  constructor(private http: HttpClient) { }

  getAll() {
   return this.http.get(environment.apiURL + '/vehicules/marques/list')
  }

  getAllByPage(page: number) {
    return this.http.get(environment.apiURL + '/vehicules/marques/page/'+page)
  }

  uploadLogo(record: any){
    return this.http.post<any>(environment.apiURL + '/vehicules/marques/images',record)
  }

  create(record: any) {
    return this.http.post<any>(environment.apiURL + '/vehicules/marques', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/vehicules/marques/' + record.id, record)
  }

  delete(id: any) {
    return this.http.delete(environment.apiURL + '/vehicules/marques/' + id)
  }

  search(record: any, page:any){
    return this.http.post(environment.apiURL + '/vehicules/marques/find/page/'+ page ,record)
  }

  getMarquesByCategorieId(id:number){
    return this.http.get(environment.apiURL + '/vehicules/categorie/'+id+'/marques')
  }

  getMarque(id: number) {
    return this.http.get(environment.apiURL + '/vehicules/marques/'+id)
  }
  
}
