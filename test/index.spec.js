// https://devhints.io/chai
import chai from 'chai';
import { Stream } from '../lib/exert';

const assert = chai.assert;
const expect = chai.expect;

let ob;

describe('Stream', () => {
  before(() => {
    ob = new Stream();
  });
  it('should return the name', () => {
    expect(ob.name).to.equal('test');
  });
});

