// The lift method on each source hides away the internals of RxJS so you can simply connect a source to the subscriber you're working with. The lift method take an object with a call function with subscriber and source arguments, then it's up to you how you want to connect them together.

import { from, Subscriber } from "rxjs";

const observable$ = from([1, 2, 3, 4, 5]);

const subscriber = {
  next: value => {
    console.log(value);
  },
  complete: () => {
    console.log("done");
  },
  error: value => {
    console.log(value);
  }
};

/* Custom map subscriber. */
class MapSubscriber extends Subscriber {
  constructor(subscriber, fn) {
    super(subscriber);

    this.fn = fn;
  }

  _next(value) {
    this.destination.next(this.fn(value));
  }
}

/* Custom map operator */
const map = fn => source =>
  source.lift({
    call(subscriber, source) {
      source.subscribe(new MapSubscriber(subscriber, fn));
    }
  });

export const multiply = number => map(value => value + number);

observable$.pipe(multiply(3)).subscribe(subscriber);
observable$.pipe(multiply(4)).subscribe(subscriber);
