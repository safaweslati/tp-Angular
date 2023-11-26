import { Injectable } from '@angular/core';
import { Cv } from '../Model/Cv';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  private cvsSubject: BehaviorSubject<Cv[]> = new BehaviorSubject<Cv[]>([]);
  juniors$: Observable<Cv[]> = this.cvsSubject
    .asObservable()
    .pipe(map((cvs) => cvs.filter((cv) => cv.age < 40)));
  seniors$: Observable<Cv[]> = this.cvsSubject
    .asObservable()
    .pipe(map((cvs) => cvs.filter((cv) => cv.age >= 40)));
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  searchCvs(name: string): Observable<Cv[]> {
    if (!name.trim()) {
      return of([]);
    }
    const filter = {
      where: {
        name: {
          like: `%${name}%`,
        },
      },
    };

    return this.http
      .get<Cv[]>(this.link, {
        params: new HttpParams().set('filter', JSON.stringify(filter)),
      })
      .pipe(
        catchError((error) => {
          const filteredCvs = this.Fakecvs.filter((cv) =>
            (cv.name.toLowerCase() + ' ' + cv.firstname.toLowerCase()).includes(
              name.toLowerCase()
            )
          );
          console.log(filteredCvs);

          return of(filteredCvs);
        })
      );
  }

  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(this.link).pipe(
      tap((data) => (this.cvs = data)),
      catchError((error) => {
        this.toastr.error('Error fetching data from the API');
        return of(this.getFakeCvs());
      })
    );
  }
  getCvsFiltered(): void {
    this.http
      .get<Cv[]>(this.link)
      .pipe(
        tap((cvs) => this.cvsSubject.next(cvs)),
        catchError((error) => {
          this.toastr.error('Error fetching data from the API');
          this.cvsSubject.next(this.getFakeCvs());
          return of(this.getFakeCvs());
        })
      )
      .subscribe();
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
