/* The Subscriber class exposes a _next method which you can override to handle how the destination's next function will be called. This allows you to create your own variations of the Subscriber class to
intercept what happens between the observable and the destination subscriber. */

import { from, Subscriber } from "rxjs";

const observable$ = from([1, 2, 3, 4, 5]);

const subscriber = {
  next: value => {
    console.log("value = ", value);
  },
  complete: () => {
    console.log("COMPLETE");
  },
  error: value => {
    console.log("error === ", value);
  }
};

class DoubleSubscriber extends Subscriber<any> {
  constructor(subscriber) {
    super();
  }

  _next(value) {
    this.destination.next(2 * value);
  }
}

observable$.subscribe(new DoubleSubscriber(subscriber));
