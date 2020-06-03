import {DataManagerController} from './data-manager-controller';
import {fixture, html, expect} from '@open-wc/testing';

const assert = chai.assert;

suite('Data Provicer Controller', () => {
  test('is defined', () => {
    const el = document.createElement('data-manager-controller');
    assert.instanceOf(el, DataManagerController);
  });
});
