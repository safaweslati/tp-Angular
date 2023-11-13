import {Component, Input} from '@angular/core';
import {Cv} from "../Model/Cv";
import {CvService} from "../services/cv.service";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent {
  cvs$! : Cv[];
  selectedCv! : Cv;
  constructor(private cvService: CvService,private toastr: ToastrService) {
    this.cvService.getCvs().subscribe({
      next: (cvs) => this.cvs$ = cvs,
      error : () => {
        this.toastr.error('Probléme Accés Api, les données affichées sont fake');
        this.cvs$ = this.cvService.getFakeCvs();
      }
    })
  }

  selectCv($event: any) {
    this.selectedCv = $event;
  }
}
