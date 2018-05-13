/**
 * A way to extend / monkey patch an existing clas.
 * let patchedClass = mixin(targetClass,  {
 *   // Static props shared between all instances.
 *   staticProps: {
 *     count: []
 *   },
 *
 *   // Instance properties.  Equiv of adding this.name or this.lastName to class.
 *   properties: {
 *     name: 'Scott',
 *     lastName: 'Murphy'
 *   }
 *
 *   // Method definitions.
 *   methods: {
 *     getName: ()=> {
 *       return this.name;
 *     },
 *     myName: 'yoyo' // Technically you can add props here too.
 *   }
 * })
 */
const mixin = (targetClass, { staticProps = {}, methods = {}, properties = {}}) => {
  const typeTag = Symbol('isa');

  for (let key in staticProps) {
    console.log(key)
    Object.defineProperty(targetClass, key, {
      value: staticProps[key],
      writable: true
    });
  }

  for (let key in properties) {
    console.log(key)
    Object.defineProperty(targetClass.prototype, key, {
      value: properties[key],
      writable: true
    });
  }

  for (let key in methods) {
    console.log(key)
    Object.defineProperty(targetClass.prototype, key, {
      value: methods[key],
      writable: true
    });
  }


  Object.defineProperty(targetClass.prototype, typeTag, { value: true });
  return targetClass;
}

export default mixin;
