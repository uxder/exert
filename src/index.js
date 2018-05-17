require("babel-core/register");
require("babel-polyfill");

import watchable from './watchable.js';
import change from './change.js';
import changeAsync from './change-async.js';

import angular1Link from './angular1-link.js';

export {
  watchable,
  change,
  changeAsync,
  angular1Link
};



