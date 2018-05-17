/**
 * Automatically connects multiple exert watchables to angular1 controller.
 * import { angular1Link } from 'exert';
 * import { myStore1Watcher, myStore2Watcher } from './mystores';
 * class MyController {
 *  constructor($scope) {
 *     this.stores = {
 *         myStore1: myStore1Watcher,
 *         myStore2: myStore2Watcher,
 *     }
 *     // Watch the stores and update controller when there is a change.
 *     angular1Link({
 *       scope: $scope,
 *       stores: this.stores
 *     })
 *   }
 * }
 */
const angular1Link = ({stores, scope}) => {
  for (var key in stores) {
    stores[key].watch(()=> {
      scope.$digest();
    })
  }
}
export default angular1Link;
