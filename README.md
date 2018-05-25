# Exert
Exert is a very simple library that allows to create watchables.
Watchables are subscribable classes in which you can control publish timings.

It works by taking advantage of ES next decorators.


# Installation


```
npm install exert
```

You will also want to setup your project to support class and object decorators.
See:  https://babeljs.io/docs/plugins/transform-decorators/


# How it works

Create a watchable class.
```javascript
import { watchable, change, changeAsync } from 'exert';

@watchable()
class MyWatchable {
  constructor() {
    this.firstName = 'Scott';
  }

  // @change decorator will automatically notify all subscriptions after
  // changes are made.  Works with synchronous methods.
  @change setName(firstName) {
    this.firstName = firstName;
  }

  // @changeAync will pass the "done" function as the last argument.
  // Use with async methods such as calling a backend REST call.
  @changeAsync setNameAsync(firstName, done) {
     window.setTimeout(()=> {
       this.firstName = firstName;
       done();
     }, 1000);
  }
}
```

In the above, we use @change and @changeAsync decorators to publish out to subscribers.
Generally any changes to public properties should be changed via a method decorated with @change or @changeAsync so that subscribers are correctly called.

Now that we have setup our class, we are ready to instantiate it and start
subscribing/watching the class.

```javascript
let myWatchable = new MyWatchable();

let onUpdate = (current, prev)=> {
  console.log('name was:' + prev.firstName);
  console.log('name is now:' + current.firstName);
  // Do whatever you want.
  // Typically, you may want to update/render the view.
}

// Subscribe to the stream updates. This will fire the next time a change is
// made.
myWatchable.watch(onUpdate);

// Subscribe and immediately calls onUpdate.
myWatchable.watchNow(onUpdate);

// Make a change.
myWatchable.setName('John'); // You should see onUpdate called.

// Unsubscribe.
myWatchable.unwatch(onUpdate);

// Subscribe Once
myWatchable.watchOnce(onUpdate);

// Make async change
myWatchable.setNameAsync('Michael');  // You should see onUpdate called again.

```


## Contribute

### Installation
```
npm install
```

### Scripts

* `yarn build` or `npm run build` - General lib files.
* `yarn dev` or `npm run dev` - Produce dev version of lib and watch files.
* `yarn test` or `npm run test` - Run tests
* `yarn test:watch` or `npm run test:watch` - Run tests and watch.

To publish:
`npm publish`


