import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {map, take} from "rxjs";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.currentUser.pipe(take(1),map(user => {
    const isAuth = !!user;
    if (isAuth) {
      return true;
    } else {
      return router.createUrlTree(['/auth']);
    }
  }));
}

