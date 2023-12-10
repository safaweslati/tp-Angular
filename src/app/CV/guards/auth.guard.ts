import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {map, Observable} from "rxjs";
import {AuthentificationService} from "../../login-form/service/authentification.service";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) : Observable<boolean>=> {
  const authService = inject(AuthentificationService);
  const router = inject(Router)

  return authService.isLogged$. pipe(
    map((isLogged) => {
      if (isLogged) {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    }
  )
  )
}
