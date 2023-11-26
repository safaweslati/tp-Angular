import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CvService } from '../services/cv.service';
import { Cv } from '../Model/Cv';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-filtered-cv',
  templateUrl: './filtered-cv.component.html',
  styleUrls: ['./filtered-cv.component.css'],
})
export class FilteredCvComponent implements OnInit {
  isJrShown = true;
  cvs!: Cv[];
  juniors!: Observable<Cv[]>;
  seniors!: Observable<Cv[]>;
  constructor(private cvService: CvService, private router: Router) {}
  // ngOnInit(): void {
  //   this.cvService
  //     .getCvs()
  //     .pipe(
  //       map((cvs) => {
  //         const juniors = cvs.filter((cv) => cv.age < 40);
  //         const seniors = cvs.filter((cv) => cv.age >= 40);
  //         return { juniors, seniors };
  //       })
  //     )
  //     .subscribe({
  //       next: ({ juniors, seniors }) => {
  //         this.juniors = new Observable((observer) => {
  //           observer.next(juniors);
  //           observer.complete();
  //         });

  //         this.seniors = new Observable((observer) => {
  //           observer.next(seniors);
  //           observer.complete();
  //         });
  //       },
  //     });
  // }
  ngOnInit(): void {
    this.cvService.getCvsFiltered();
    this.juniors = this.cvService.juniors$;
    this.seniors = this.cvService.seniors$;
  }
}
