import { Component, Input, OnInit } from '@angular/core';
import { Cv } from '../Model/Cv';
import { CvService } from '../services/cv.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent implements OnInit {
  cvs$!: Observable<Cv[]>;
  selectedCv!: Cv;

  constructor(private cvService: CvService) {}
  ngOnInit() {
    this.cvs$ = this.cvService.getCvs();
  }

  selectCv($event: any) {
    this.selectedCv = $event;
  }
}
