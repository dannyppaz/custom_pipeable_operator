# Custom Pipeable Operator

## Extends Subscriber

The Subscriber class exposes a `_next` method which you can override to handle how the destination's next function will be called. This allows you to create your own variations of the Subscriber class to
intercept what happens between the observable and the destination subscriber. 

```typescript
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
```

Instead of writing complex operators, it's usually best to write simple, single-purpose operators then chain them together when necessary. The pipe function takes functions as arguments, invokes each function with the value, then passes the returned result on to the next function.

```typescript
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
```

## Create custom operator with the create method

```typescript
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
```

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/rxjs-5gxsd3)

