import {Component, Input, OnInit} from '@angular/core';
import {Cv} from "../Model/Cv";
import {CvService} from "../services/cv.service";
import {map, Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit{
  cvs$! : Observable<Cv[]>;
  selectedCv! : Cv;
  currentTab: 'juniors' | 'seniors' = 'juniors';
  juniors$!: Observable<Cv[]> ;
  seniors$!: Observable<Cv[]> ;

  constructor(private cvService: CvService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.juniors$ = this.cvService.getJuniors();
    this.seniors$ = this.cvService.getSeniors();
    this.cvs$=this.route.data.pipe(
      map(data => data['cvs'])

    )
  }

  selectTab(tab: 'juniors' | 'seniors'): void {
    this.currentTab = tab;
  }

  selectCv($event: any) {
    this.selectedCv = $event;
  }

}
