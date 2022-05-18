import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionsService {

  constructor(private http: HttpClient) { }

  getAllRolePermissions(id:number) {
    return this.http.get<any>(environment.apiURL + '/utilisateurs/roles/'+id+'/permissions')
  }

  create(record: any) {
    return this.http.post(environment.apiURL + '/utilisateurs/role-permissions', record)
  }

  update(record: any) {
    return this.http.put(environment.apiURL + '/utilisateurs/roles-permissions', record)
  }

  delete(role_id:number ,permission_id:number) {
    return this.http.delete(environment.apiURL + '/utilisateurs/roles/' + role_id+'/permissions/'+permission_id)
  }

  getRolePermission(role_id:number ,permission_id:number) {
    return this.http.get<any>(environment.apiURL + '/utilisateurs/roles/' + role_id+'/permissions/'+permission_id)
  }

}
