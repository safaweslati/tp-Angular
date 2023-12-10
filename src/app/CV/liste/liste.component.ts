import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Cv} from "../Model/Cv";
import {Observable} from "rxjs";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {

  @Input() cvs: Cv[]|null=[];
  @Output() selectedCv = new EventEmitter();


  selectCv($event: any) {
    this.selectedCv.emit($event);
  }
}
