import { Component } from '@angular/core';
import { Cv } from '../Model/Cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent {
  cv!: Cv;
  constructor(
    private cvService: CvService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.cvService.getCvById(params['id']).subscribe({
          next: (cv) => (this.cv = cv),
          error: (error) => {
            console.log(error);
            this.toastr.error(`le cv n'existe pas`);
            this.router.navigate(['cv']);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  delete() {
    this.cvService.deleteCv(this.cv.id).subscribe(
      (response) => {
        this.router.navigate(['cv']);
      },
      (error) => {
        console.log(error);
        this.router.navigate(['cv']);
      }
    );
  }
}
