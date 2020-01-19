/* Instead of writing complex operators, it's usually best to write simple, single-purpose operators then chain them together when necessary. The pipe function takes functions as arguments, invokes each function with the value, then passes the returned result on to the next function.
 */

import { map, filter } from "rxjs/operators";
import { pipe, from } from "rxjs";

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

const observable$ = from([1, 2, 3, 4, 5]);

const multiple = number =>
  pipe(
    map(value => {return value * number}),
    filter(value => value < 10)
  );

observable$.pipe(multiple(2)).subscribe(subscriber);
