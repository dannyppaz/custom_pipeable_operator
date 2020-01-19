/* The lift method on each source hides away the internals of RxJS so you can simply connect a source to the subscriber you're working with. The lift method take an object with a call function with subscriber and source arguments, then it's up to you how you want to connect them together. */

import { from, Subscriber, Observable } from "rxjs";

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

class MultiplySubscriber extends Subscriber {
  constructor(subscriber, number) {
    super(subscriber);

    this.number = number;
  }

  _next(value) {
    console.log(this.number);
    console.log(value);
    this.destination.next(value * this.number);
  }
}

export const multiply = (number: number) => (source: Observable) =>
  source.lift({
    call(sub, source) {
      source.subscribe(new MultiplySubscriber(sub, number));
    }
  });

observable$.pipe(multiply(3)).subscribe(subscriber);
observable$.pipe(multiply(4)).subscribe(subscriber);

