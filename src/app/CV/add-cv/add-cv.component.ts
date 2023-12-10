import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { switchMap } from "rxjs/operators";
import {CvService} from "../services/cv.service";
import {of} from "rxjs";
import {Cv} from "../Model/Cv";

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css']
})
export class AddCvComponent implements OnInit{
  cvForm!: FormGroup;
  private formSubmitted: boolean = false;

  constructor (private fb: FormBuilder, private route: ActivatedRoute, private cvService:CvService) {
  }
  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.cvForm = this.fb.group({
      name: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      job: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(55)]],
      cin: ['', [Validators.required]],
      path: [''],
    });

    this.route.params
      .pipe(
        switchMap((params) => {
          const id = params['id'];
          if (id) {
            return this.cvService.getCvById(id);
          }
          return of(new Cv())
        })
      )
      .subscribe((cv) => {
        this.cvForm.patchValue({
          name: cv.name,
          firstname: cv.firstname,
          job: cv.job,
          age: cv.age,
          cin: cv.cin,
          path: cv.path,
        });
      });
  }



  onFormSubmit() {
    this.formSubmitted = true
    this.route.params
      .pipe(
        switchMap((params) => {
          const id = params['id'];
          return id
            ? this.cvService.updateCv({ id, ...this.cvForm.value })
            : this.cvService.addCv(this.cvForm.value)
        })
      )
      .subscribe();
  }


  @HostListener('window:beforeunload')
  canDeactivate() {
    if (this.cvForm.dirty && !this.formSubmitted) {
      return window.confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
}
