// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class StreamsService {
//   private inputValueSubject = new BehaviorSubject<number>(0);
//   inputValue$: Observable<number> = this.inputValueSubject.asObservable();

//   constructor() {}
//   sumValues$: Observable<number> = this.inputValue$.pipe(
//     startWith(0),
//     scan((acc: number, value: number) => acc + value, 0) // Réduction pour obtenir la somme
//   );
// }
