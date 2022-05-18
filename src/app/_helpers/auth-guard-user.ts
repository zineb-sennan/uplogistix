import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from '../_services/token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardUser implements CanActivate {

    constructor(
        private tokenService: TokenService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isValid = this.tokenService.isValid(true) ? true : this.tokenService.isValid(false) ? true : false;
        const payload = this.tokenService.payload(this.tokenService.getToken() ?? '');
        const isUser = payload?.cid != null;
        if (!isValid || !isUser) this.router.navigate(['error']);
        return isValid;
    }

}