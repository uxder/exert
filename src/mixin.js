/**
 * A way to extend and decorate an existing clas.
 * let patchedClass = mixin(targetClass,  {
 *   // Static props shared between all instances.
 *   staticProps: {
 *     count: []
 *   },
 *
 *   // Instance properties.  Equiv of adding this.name or this.lastName to class.
 *   properties: {
 *     name: 'John',
 *     lastName: 'Doe'
 *   }
 *
 *   // Method definitions.
 *   methods: {
 *     getName: ()=> {
 *       return this.name;
 *     },
 *     myName: 'John Doe' // Technically you can add props here too.
 *   }
 * })
 */
const classMixin = (targetClass, { staticProps = {}, methods = {}, properties = {}}) => {
  const typeTag = Symbol('isa');

  for (let key in staticProps) {
    Object.defineProperty(targetClass, key, {
      value: staticProps[key],
      writable: true
    });
  }

  for (let key in properties) {
    Object.defineProperty(targetClass.prototype, key, {
      value: properties[key],
      writable: true
    });
  }

  for (let key in methods) {
    Object.defineProperty(targetClass.prototype, key, {
      value: methods[key],
      writable: true
    });
  }


  Object.defineProperty(targetClass.prototype, typeTag, { value: true });
  return targetClass;
}

export {
  classMixin
}
