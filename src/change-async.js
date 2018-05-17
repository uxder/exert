/**
 * A method decorator for asynchronous changes.  Calls this.publish_ on completion.
 * Usage:
 * @changeAsync (name, done)=> {
 *   setTimeout(()=> {
 *     this.name = 'John Doe';
 *     done();
 *   }, 50);
 * }
 */
const changeAsync = (target, name, descriptor)=> {
  var fn = descriptor.value;
  descriptor.value = function() {
    this.isBulkChanging_ = true;
    let prev = JSON.parse(JSON.stringify(this));
    var done = ()=> {
      let current = JSON.parse(JSON.stringify(this));
      this.publish_(current, prev);
    };
    fn.apply(this, [...arguments, done]);
  }
  return descriptor;
}
export default changeAsync;
