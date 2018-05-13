import mixin from './mixin';

/**
 * A stream class decorator.
 */
const stream = (options)=> {
  return function decorator(targetClass) {
     return (...args) => {
      let patchClass = mixin(targetClass, {
        options: options,
        // Initial properties decorated to to class.
        properties: {
          subscriptions: [],
          name: 'test2'
        },

        // Methods decorated to class.
        methods: {
          test() {
            return 'asana';
          }
        }
      })
     return new patchClass(...args);
    }
  }
}
export default stream;
