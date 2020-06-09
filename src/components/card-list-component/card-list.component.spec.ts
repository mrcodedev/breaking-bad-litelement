import {CardListComponent} from './card-list.component';

import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';
import {DataModel} from '../../models/data-model.interface';

//Testing setup
mocha.setup('bdd');

const assert = chai.assert;

suite('Card List Component', () => {
  describe('Component initialized and renderized', () => {
    it('Should be component defined', () => {
      const el = document.createElement('card-list');
      assert.instanceOf(el, CardListComponent);
    });

    it('Should be render with default values', async () => {
      const el = await fixture(html`<card-list></card-list>`);
      assert.shadowDom.equal(el, `<div class="container__card-list"></div>`);
    });
  });

  describe('cardlistData', () => {
    const el = new CardListComponent();

    describe('cardlistData with values', () => {
      beforeEach(() => {
        el.cardlistData = [{id: 1}, {id: 2}];
      });

      afterEach(() => {
        sinon.restore();
      });

      it('Should be not empty cardlistData', () => {
        expect(el.isEmpty).to.be.false;
      });

      describe('Call _generateCardProfileHTML', () => {
        const successEvent = sinon.spy(el, '_generateCardProfileHTML');
        el._generateCardProfileHTML();

        it('Should be called _generateCardProfileHTML', () => {
          expect(successEvent).to.be.calledOnce;
        });
      });
    });

    describe('cardlistData without values', () => {
      beforeEach(() => {
        el.cardlistData = [];
      });

      afterEach(() => {
        sinon.restore();
      });

      it('Should be is empty cardlistData', () => {
        expect(el.isEmpty).to.be.true;
      });
    });
  });

  // describe('cardlistData values is empty', () => {
  //   const element = new CardListComponent();
  //   const calledHTML = sinon.spy(element, '_generateCardProfileHTML');

  //   element.firstTime = true;
  //   beforeEach(() => {
  //     element.cardlistData = [];
  //   });

  //   afterEach(() => {
  //     sinon.restore();
  //   });

  //   describe('mimimimi', () => {
  //     it('Should be memee', async () => {
  //       expect(calledHTML).is.not.called;
  //     });
  //   });
  // });
});
