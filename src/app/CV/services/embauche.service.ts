import { Injectable } from '@angular/core';
import {Cv} from "../Model/Cv";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class EmbaucheService {

  private cvs: Cv[];

  constructor(private toastr: ToastrService) {
    this.cvs = [];
  }

  getEmbauchees(): Cv[] {
    return this.cvs;
  }

  embaucher(cv: Cv) : void{
    const index = this.cvs.indexOf(cv);
    if(index < 0)  this.cvs.push(cv);
    else this.toastr.error(`${cv.name} ${cv.firstname} a été déjà sélectionnée`);
  }
}
