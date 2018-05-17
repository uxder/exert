import { classMixin } from './mixin';

/**
 * A watchable class decorator.
 */
const watchable = (options)=> {
  return function decorator(targetClass) {
     return (...args) => {
      let patchClass = classMixin(targetClass, {
        // TODO (uxder): Expand options.  Currently unused.
        options: options,

        // Initial properties decorated to to class.
        properties: {
          subscriptions: [],
          watchers: [],
        },

        // Methods decorated to class.
        methods: {

          /**
           * Makes an immediate subscription.  Using watchNow will cause the
           * subscription to be invoked immediately.
           */
          watchNow(callback) {
            this.subscriptions.push(callback);
            // Immediately call the callback.
            let current = JSON.parse(JSON.stringify(this));
            callback(current, null);
          },


          /**
           * Makes a subscription but doesn't get called until the next publication.
           */
          watch(callback) {
            this.subscriptions.push(callback);
          },

          /**
           * Makes a subscription but doesn't get called until the next publication.
           * Removes the subscription after it is invokes once.
           */
          watchOnce(callback) {
            let wrappedCallback = ()=> {
              callback();
              this.unwatch(wrappedCallback);
            }
            this.subscriptions.push(wrappedCallback);
          },


          /**
           * Converts a subscription into a promise.
           * TODO (uxder): Reject case?
           */
          toPromise() {
            return new Promise((resolve, reject) => {
              let wrappedCallback = (current, prev)=> {
                resolve({ current: current, prev: prev});
                this.unwatch(wrappedCallback);
              }
              this.subscriptions.push(wrappedCallback);
            });
          },


          /**
           * Unsubscribes a particular method.
           */
          unwatch(callback) {
            const index = this.subscriptions.indexOf(callback);
            if (index !== -1) {
              this.subscriptions.splice(index, 1);
            }
          },


          /**
           * Makes a publication.  Publishes a change to all subscribers.
           * This method should generally be called via @change, @changeAsync
           * decorators as it needs to pass the previous and current states.
           * @private
           */
          publish_(current, prev) {
            this.subscriptions.forEach((subscription)=> {
              subscription(current, prev);
            });
          }

        }
      })

      return new patchClass(...args);
    }
  }
}
export default watchable;
