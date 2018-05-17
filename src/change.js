/**
 * A method decorator for synchronous changes.  Calls this.publish_ on completion.
 * Usage:
 * @change ()=> {
 *   this.name = 'John Doe';
 * }
 */
const change = (target, name, descriptor)=> {
  var fn = descriptor.value;
  descriptor.value = function() {
    this.isBulkChanging_ = true;
    let prev = JSON.parse(JSON.stringify(this));
    fn.apply(this, arguments);
    // Call publish.
    let current = JSON.parse(JSON.stringify(this));
    this.publish_(current, prev);
  }
  return descriptor;
}
export default change;
