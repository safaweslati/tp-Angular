import {Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {CvService} from "../services/cv.service";
import {Cv} from "../Model/Cv";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  selectedCv!: Cv;
  searchControl = new FormControl();
  choices$: Observable<Cv[]> = of([]);

  ngOnInit(): void {
    this.choices$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm) => this.cvService.searchCvs(searchTerm))
    );
  }

  constructor(private cvService: CvService, private router: Router) {}

  selectCv(cv: Cv) {
    this.selectedCv = cv;
    const link = ['cv', this.selectedCv.id];
    this.router.navigate(link);
  }
}
