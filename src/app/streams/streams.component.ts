import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, merge, reduce, scan, takeUntil } from 'rxjs';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css'],
})
export class StreamsComponent implements OnInit {
  form!: FormGroup;
  scan!: Observable<number>;
  merge!: Observable<number>;
  reduce!: Observable<number>;
  private terminate1 = new Subject<number | null>();
  private terminate2 = new Subject<number | null>();
  // private input1Stream$ = new Subject<number>();
  // private input2Stream$ = new Subject<number>();
  ngOnInit(): void {
    this.form = new FormGroup({
      input1: new FormControl(null, {
        validators: [],
        asyncValidators: [],
        updateOn: 'blur',
      }),
      input2: new FormControl(null, {
        validators: [],
        asyncValidators: [],
        updateOn: 'blur',
      }),
    });

    const in1: Observable<number> = this.form
      .get('input1')!
      .valueChanges.pipe(takeUntil(this.terminate1));
    const in2: Observable<number> = this.form
      .get('input2')!
      .valueChanges.pipe(takeUntil(this.terminate2));

    this.merge = merge(in1, in2);

    this.reduce = this.merge.pipe(
      reduce((total, currentvalue) => total + currentvalue, 0)
    );

    this.scan = this.merge.pipe(
      scan((total, currentValue) => total + currentValue, 0)
    );
  }

  terminateStream1() {
    this.terminate1.next(null);
    this.terminate1.complete();
  }

  terminateStream2() {
    this.terminate2.next(null);

    this.terminate2.complete();
  }
}
