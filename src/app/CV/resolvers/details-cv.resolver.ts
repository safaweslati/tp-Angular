import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs";
import {Cv} from "../Model/Cv";
import {inject} from "@angular/core";
import {CvService} from "../services/cv.service";

export const detailsCvResolver: ResolveFn<Cv> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Cv> => {
  const cvService = inject(CvService)
  const id = route.params['id']
  return cvService.getCvById(id)
};
