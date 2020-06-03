import {DataProviderController} from './data-provider-controller';
import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';

const assert = chai.assert;

suite('Data Provider Controller', () => {
  test('is defined', () => {
    const el = document.createElement('data-provider-controller');
    assert.instanceOf(el, DataProviderController);
  });
});
