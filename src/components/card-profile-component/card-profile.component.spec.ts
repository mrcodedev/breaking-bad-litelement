import {CardProfileComponent} from './card-profile.component';

import {fixture, html, expect} from '@open-wc/testing';

import sinon from 'sinon';

//Testing setup
mocha.setup('bdd');

const assert = chai.assert;

suite('Card Profile Component', () => {
  describe('Component initialized and renderized', () => {
    it('Should be defined', () => {
      const el = document.createElement('card-profile');
      assert.instanceOf(el, CardProfileComponent);
    });
  });

  describe('pruebas', () => {
    const el = new CardProfileComponent();
  });
});
