import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {Cv} from "../Model/Cv";
import {inject} from "@angular/core";
import {CvService} from "../services/cv.service";
import {Observable} from "rxjs";

  export const cvResolver:ResolveFn<Cv[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Cv[]>  => {
    const cvService = inject(CvService)
    return cvService.getCvs()
  };
