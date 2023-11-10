import {Component, Input} from '@angular/core';
import {Cv} from "../Model/Cv";
import {EmbaucheService} from "../services/embauche.service";
import {CvService} from "../services/cv.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
    @Input() cv!: Cv;

    constructor(private embaucheService : EmbaucheService,
                private cvService : CvService,
                private router : Router) {
    }

  Embaucher() {
      this.embaucheService.embaucher(this.cv);
      console.log(this.embaucheService.getEmbauchees());
  }

  moreInfo() {
      const link = ['cv',this.cv.id];
      this.router.navigate(link);

  }
}
