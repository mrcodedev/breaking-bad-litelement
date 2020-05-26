import {HeaderComponent} from './header.component';
//import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('header-component', () => {
  test('is defined', () => {
    const el = document.createElement('header-component');
    assert.instanceOf(el, HeaderComponent);
  });
});
