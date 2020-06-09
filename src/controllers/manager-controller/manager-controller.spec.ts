import {ManagerController} from './manager-controller';
import sinon from 'sinon';
import {fixture, html, expect} from '@open-wc/testing';

const assert = chai.assert;

suite('Manager Controller', () => {
  test('is defined', () => {
    const el = document.createElement('manager-controller');
    assert.instanceOf(el, ManagerController);
  });
});
