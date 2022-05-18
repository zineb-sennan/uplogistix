import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token:string) {
    window.sessionStorage.removeItem('session');
    window.sessionStorage.setItem('session', token);
  }

  setRefershToken(token:string) {
    window.sessionStorage.removeItem('_phpSID');
    window.sessionStorage.setItem('_phpSID', token);
  }

  getToken() {
    return window.sessionStorage.getItem('session');
  }

  getRefreshToken() {
    return window.sessionStorage.getItem('_phpSID');
  }

  isValid(isToken: boolean) {
    const token = isToken ? this.getToken() : this.getRefreshToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        const expDate = new Date(0).setUTCSeconds(payload.exp).valueOf();
        const newDate = new Date().valueOf();
        return expDate > newDate;
      }
    }
    return false;
  }

  payload(token:string) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload:any) {
    return JSON.parse(atob(payload));
  }

  logout(): void {
    window.sessionStorage.clear();
  }
}
