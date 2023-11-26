import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { Cv } from '../Model/Cv';
import { CvService } from '../services/cv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  selectedCv!: Cv;

  form!: FormGroup;
  cvs!: Observable<Cv[]>;
  constructor(private cvService: CvService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(),
    });

    this.cvs = this.form.get('search')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.cvService.searchCvs(term))
    );
  }

  selectCv($event: any) {
    this.selectedCv = $event;
    const link = ['cv', this.selectedCv.id];
    this.router.navigate(link);
  }
}
