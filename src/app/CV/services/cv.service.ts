import { Injectable } from '@angular/core';
import { Cv } from '../Model/Cv';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, EMPTY, map, Observable, of, share, shareReplay, Subject} from 'rxjs';
import {tap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {MES_CONSTANTES} from "../../../config/constantes.config";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private selectCvSubject = new Subject<Cv>();
  selectCv$ = this.selectCvSubject.asObservable();

  private cvs:Cv[]=[];
  private cvs$!: Observable<Cv[]>
  private Fakecvs: Cv[] = [
    new Cv(1, 'Ouertani', 'Safa', 'Software Engineer', '   ', 25),
    new Cv(2, 'Ouerghi', 'Douaa', 'Graphic Designer', 'rotating_card_profile.png', 45),
    new Cv(3, 'Mahmoud', 'Ahmed', 'DevOps Engineer', 'as.png', 41),
  ];
  private link = MES_CONSTANTES.link;

  constructor(private http: HttpClient,private toastr: ToastrService, private router: Router) {}

  searchCvs(name: string): Observable<Cv[]> {
    if (!name.trim()) {
      return of([]);
    }
    const filter = { where: { name: { like: `%${name}%`, },}, };

    return this.http.get<Cv[]>(this.link, {
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
    if (!this.cvs$) {
      this.cvs$ = this.http.get<Cv[]>(this.link).pipe(
        tap((data) => (this.cvs = data)),
        catchError((error) => {
          this.toastr.error('Error fetching data from the API');
          return of(this.getFakeCvs());
        }),
        share()
      );
    }
    return this.cvs$;
  }


  getJuniors(): Observable<Cv[]> {
    return this.getCvs().pipe(map((cvs) => cvs.filter((cv) => cv.age !== null && cv.age < 40)));
  }

  getSeniors(): Observable<Cv[]> {
    return this.getCvs().pipe(map((cvs) => cvs.filter((cv) => cv.age !== null &&  cv.age >= 40)));
  }


  getFakeCvs() {
    return this.Fakecvs;
  }

  getCvById(id: number) {
    return this.http.get<Cv>(this.link + `/${id}`).pipe(
      catchError((error) => {
      this.toastr.error(`Le CV n'existe pas`);
      this.router.navigate(['cv']);
      return EMPTY ;
  }))
  }

  addCv(cv: Cv) {
    return this.http.post(this.link,cv).pipe(
      tap(()=>
      {
        this.toastr.success('Cv added successfully');
        this.router.navigate(['']);
      }),
      catchError((error) => {
        this.toastr.error(`Error adding cv`);
        return EMPTY
      })
    );
  }

  updateCv(cv: Cv) {
    console.log(cv);
    return this.http.put(this.link,cv).pipe(
      tap(()=>
        {
          this.toastr.success('Cv updated successfully');
          this.router.navigate(['cv', cv.id]);
        }
      ),
      catchError((error) => {
        this.toastr.error(`Error updating cv`);
        return EMPTY
      })
    )
  }

  deleteCv(id: number): Observable<any> {
    return this.http.delete(this.link + `/${id}`).pipe(
      catchError((error) => {
        console.log(error);
        this.toastr.error(`Erreur lors de la suppression du CV`);
        return EMPTY;
      })
    );
  }
  selectCv(cv: Cv) {
    this.selectCvSubject.next(cv);
  }
}
