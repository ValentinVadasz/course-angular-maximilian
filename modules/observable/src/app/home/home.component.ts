import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {map, filter} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private observableSub: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.observableSub = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    let customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count++);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
      }, 1000);
    });

    customIntervalObservable = customIntervalObservable.pipe(
      filter((data: number) => {
        return data > 0;
      }),
      map((data: number) => {
        return 'Round ' + (data + 1);
      })
    )


    this.observableSub = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      alert(error.message);
    }, () => {
      console.log('Completed')
    });
  }

  ngOnDestroy(): void {
    this.observableSub.unsubscribe();
  }
}
