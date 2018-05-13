// https://devhints.io/chai
import chai from 'chai';

import TestStream from './lib/test-stream';
const assert = chai.assert;
const expect = chai.expect;

let testStream;

describe('Stream decorator', () => {
  before(() => {
    testStream = new TestStream();
  });
  it('should be decorated with a name', () => {
    expect(testStream.yo).to.equal('shunta');
    expect(testStream.name).to.equal('test2');
    expect(testStream.test()).to.equal('asana');
  });
});

