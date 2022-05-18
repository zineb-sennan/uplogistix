import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from 'src/app/_services/token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private tokenService: TokenService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isValid = this.tokenService.isValid(true) ? true : this.tokenService.isValid(false) ? true : false;
        if(!isValid) this.router.navigate(['login']);
        return isValid;
    }

}