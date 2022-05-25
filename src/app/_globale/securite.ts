import { Injectable } from "@angular/core";
import { AuthService } from "../_services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class SecuriteClass {

    constructor(
        private authService: AuthService
    ) {}

    logout() {
        this.authService.logout();
    }
    
    async refreshToken() {
        return await this.authService.refresh() ? true : this.logout();
    }

}