import { Injectable } from '@angular/core';
import { Cv } from '../Model/Cv';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MES_CONSTANTES } from '../../../config/constantes.config';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private cvs: Cv[] = [];
  private Fakecvs: Cv[] = [
    new Cv(1, 'Ouertani', 'Safa', 'Software Engineer', '   ', 18),
    new Cv(
      2,
      'Ouerghi',
      'Douaa',
      'Graphic Designer',
      'rotating_card_profile.png',
      45
    ),
    new Cv(3, 'Mahmoud', 'Ahmed', 'DevOps Engineer', 'as.png', 12),
  ];
  private link = MES_CONSTANTES.link;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(this.link).pipe(
      tap((data) => (this.cvs = data)),
      catchError((error) => {
        this.toastr.error('Error fetching data from the API');
        return of(this.getFakeCvs());
      })
    );
  }

  getFakeCvs() {
    return this.Fakecvs;
  }

  getCvById(id: number) {
    return this.http.get<Cv>(this.link + `/${id}`);
  }

  deleteCv(id: number) {
    return this.http.delete(this.link + `/${id}`);
  }
}
