import {CardListComponent} from './card-list.component';

import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';

//Testing setup
mocha.setup('bdd');

const assert = chai.assert;

const DATA_MOCK = {
  birthday: '13-08-1985',
  id: '1',
  image: 'http://www.fakeimage.com',
  name: 'Jose',
  nickname: 'MrCodeDev',
  occupation: [],
  playedBy: 'me',
  sessions: [],
  status: 'very alive',
};

const MOCK_EVENT = new CustomEvent('mock-event', {
  detail: DATA_MOCK,
});

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
    el.cardlistData = [{id: 1}, {id: 2}];

    describe('cardlistData with values', () => {
      const updateCardSpy = sinon.spy(el, 'updateCardActive');

      beforeEach(() => {
        el.generateCardListHTML();
        el.cardlistData = [{id: 1}, {id: 2}];
        el.updateCardActive(MOCK_EVENT);
      });

      afterEach(() => {
        sinon.restore();
      });

      it('Should be not empty cardlistData', () => {
        expect(el.isEmpty).to.be.false;
      });

      describe('Call _generateCardProfileHTML', () => {
        const successEvent = sinon.spy(el, 'generateCardProfileHTML');

        it('Should be called _generateCardProfileHTML', () => {
          expect(successEvent).to.be.calledOnce;
        });
      });

      it('Should be called updateCardActive', () => {
        expect(updateCardSpy).to.be.calledOnce;
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
});
