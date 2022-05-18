import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }


  login(data: any) {
    return this.http.post<any>(environment.apiURL + '/login', data);
  }

  async refresh() {
    const token = this.tokenService.getRefreshToken();
    try {
      const response = await this.http.post<any>(environment.apiURL + '/login/refresh', { refresh_token: token }).toPromise();
      if (response) {
        this.tokenService.setToken(response.token);
        return true;
      }
      
      return false;
    } catch (e) {
      return false;
    }
  }

  logout() {
    this.tokenService.logout();
    this.router.navigate(['login']);
  }

}
