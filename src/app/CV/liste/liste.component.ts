import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Cv} from "../Model/Cv";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {

  @Input() cvs!: Cv[];
  @Output() selectedCv = new EventEmitter();

  selectCv($event: any) {
    this.selectedCv.emit($event);
  }
}
