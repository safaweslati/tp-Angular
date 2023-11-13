import { Component } from '@angular/core';
import {Cv} from "../Model/Cv";
import {EmbaucheService} from "../services/embauche.service";

@Component({
  selector: 'app-embauche',
  templateUrl: './embauche.component.html',
  styleUrls: ['./embauche.component.css']
})
export class EmbaucheComponent {

  cvs: Cv[];
  constructor(private embaucheService: EmbaucheService) {
    this.cvs = this.embaucheService.getEmbauchees();
  }
}
