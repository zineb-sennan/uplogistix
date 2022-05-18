import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + '/utilisateurs/permissions')
  }

}
