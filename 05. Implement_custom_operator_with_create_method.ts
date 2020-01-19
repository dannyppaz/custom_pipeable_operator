/* Another implementation */

import { Observable, interval } from "rxjs";

const sqrt = source$ =>
  Observable.create(observer =>
    source$.subscribe(
      value => {
        const result = Math.sqrt(value);

        if (typeof value !== "number" || isNaN(result)) {
          observer.error(`Square root of ${value} doesn't exist`);
        } else {
          observer.next(result);
        }
      },
      err => observer.error(err),
      () => observer.complete()
    )
  );

interval(1000).pipe(sqrt);