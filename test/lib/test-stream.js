
import { stream } from '../../lib/exert';

@stream({ moreoptions: true })
// @stream
class TestStream {

  constructor() {
    this.yo = 'shunta';
  }

}

export default TestStream;
