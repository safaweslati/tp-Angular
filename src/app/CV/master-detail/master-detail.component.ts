import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable, of} from "rxjs";
import {Cv} from "../Model/Cv";
import {CvService} from "../services/cv.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnInit {
  constructor(private cvService: CvService, private route: ActivatedRoute, private router: Router) {
  }

  cvs$: Observable<Cv[]> = of([]);
  selectedCv: Cv | undefined;


  ngOnInit() {
    this.cvs$ = this.route.data.pipe(
      map(data => data['cvs'])
    );


  }

  selectCv(cv : Cv) {
    this.router.navigate(["list", cv.id])
  }
}


