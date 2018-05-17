// https://devhints.io/chai
import chai from 'chai';

import TestWatchable from './lib/test-watchable';
const assert = chai.assert;
const expect = chai.expect;

let testWatchable;

describe('Watchable', () => {
  beforeEach(() => {
    testWatchable = new TestWatchable();
  });
  afterEach(() => {
    testWatchable = null;
  });

  it('should allow custom properties', () => {
    expect(testWatchable.firstName).to.equal('shunta');
  });


  it('@change on methods should call publish', () => {
    let callCount = 0;
    let update = ()=> {
      callCount++;
    }
    expect(callCount).to.equal(0);
    expect(testWatchable.firstName).to.equal('shunta');
    testWatchable.watchNow(update);
    // watchNow should immediately call update.
    expect(callCount).to.equal(1);

    testWatchable.updateFirstName('Scott');
    expect(testWatchable.firstName).to.equal('Scott');
    expect(callCount).to.equal(2);

    testWatchable.updateFirstName('John');
    expect(testWatchable.firstName).to.equal('John');
    expect(callCount).to.equal(3);
  });

  it('@changeAsync should call publish on calling done', function(done) {
    expect(testWatchable.firstName).to.equal('shunta');
    testWatchable.watch(()=> {
      expect(testWatchable.firstName).to.equal('Scott');
      done();
    });
    // Make async update call in the watchable.
    testWatchable.updateFirstNameAsync('Scott');
  });


  it('@changeAsync also work with es6 async/await', function(done) {
    expect(testWatchable.firstName).to.equal('shunta');
    testWatchable.watch(()=> {
      expect(testWatchable.firstName).to.equal('Roger');
      done();
    });

    // Make async call.
    testWatchable.updateFirstNameAsync2();
  });


  it('watch should wait to invoke until an update is made.', function(done) {
    let callCount = 0;
    let update = ()=> {
      callCount++;
    }
    expect(testWatchable.firstName).to.equal('shunta');
    testWatchable.watch(update);
    // At this point, update should have not been called.
    expect(callCount).to.equal(0);
    // Make a sync change.
    testWatchable.updateFirstName('Scott');

    // Now it should have been called.
    expect(callCount).to.equal(1);

    testWatchable.updateFirstName('John');
    expect(callCount).to.equal(2);
    done();
  });


  it('watchNow should immediately call the subscription', function(done) {
    let callCount = 0;
    let update = ()=> {
      callCount++;
    }
    expect(testWatchable.firstName).to.equal('shunta');
    expect(callCount).to.equal(0);
    testWatchable.watchNow(update);
    expect(callCount).to.equal(1);
    testWatchable.updateFirstName('Scott');
    expect(callCount).to.equal(2);
    done();
  });

  it('watch callback should report previous / current values', function(done) {
    let callCount = 0;
    let update = (current, prev)=> {
      expect(prev.firstName).to.equal('shunta');
      expect(current.firstName).to.equal('Scott');
      done();
    }
    expect(testWatchable.firstName).to.equal('shunta');
    testWatchable.watch(update);
    expect(callCount).to.equal(0);
    testWatchable.updateFirstName('Scott');
  });

  it('unwatch should unsubscribe a callback', function(done) {
    let callCount = 0;
    let update = ()=> {
      callCount++;
    }
    testWatchable.watch(update);
    expect(callCount).to.equal(0);
    testWatchable.updateFirstName('Scott');
    expect(callCount).to.equal(1);

    // Unsubscribe.
    testWatchable.unwatch(update);
    testWatchable.updateFirstName('John');
    // Should remain 1.
    expect(callCount).to.equal(1);
    done();
  });

  it('watchOnce should only subscribe once', function(done) {
    let callCount = 0;
    let update = ()=> {
      callCount++;
    }
    testWatchable.watchOnce(update);
    expect(callCount).to.equal(0);
    testWatchable.updateFirstName('Scott');
    expect(callCount).to.equal(1);
    testWatchable.updateFirstName('John');
    testWatchable.updateFirstName('Another Name');
    expect(callCount).to.equal(1);
    done();
  });


  it('toPromise should convert a subscription to a one time promise', function(done) {
    expect(testWatchable.firstName).to.equal('shunta');
    testWatchable.toPromise().then((data)=> {
      expect(data.prev.firstName).to.equal('shunta');
      expect(testWatchable.firstName).to.equal('Roger');
      expect(data.current.firstName).to.equal('Roger');
      done();
    });
    // Make async call.
    testWatchable.updateFirstNameAsync2();
  });
});

