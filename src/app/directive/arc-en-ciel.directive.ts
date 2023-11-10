import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appArcEnCiel]'
})
export class ArcEnCielDirective {
  tableau = ['blue', 'lightblue', 'red', 'pink', 'green', 'lightgreen', 'purple']

  constructor() {
  }

  @HostBinding('style.borderColor') bc = '';
  @HostBinding('style.color') color = '';

  @HostListener('keypress') changeColor() {
    const index = Math.floor(Math.random() * (this.tableau.length - 1));
    this.bc = this.tableau[index];
    this.color = this.tableau[index];
  }
}
