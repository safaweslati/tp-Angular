import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Cv} from "../Model/Cv";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input({
    required: true,
  })
  cv!: Cv ;
  @Output() selectedCv = new EventEmitter();

  selectCv() {
    this.selectedCv.emit(this.cv);
  }
}
