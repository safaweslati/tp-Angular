import { Component, OnInit } from '@angular/core';
import { Cv } from '../Model/Cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap } from 'rxjs/operators';
import {EMPTY, map, Observable} from 'rxjs';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent implements OnInit {
  cv$!: Observable<Cv>;

  constructor(
    private cvService: CvService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cv$ = this.route.data.pipe(
      map(data => data['cv'])
    );
  }

  delete(): void {
    this.cv$.pipe(
      switchMap((cv) => this.cvService.deleteCv(cv.id))
    ).subscribe(() => this.router.navigate(['cv']));
  }

  update(id: number) {
    const link=['cv/add',id];
    this.router.navigate(link);
  }
}
