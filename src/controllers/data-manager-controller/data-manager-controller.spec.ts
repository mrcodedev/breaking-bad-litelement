import {DataManagerController} from './data-manager-controller';

import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';

//Testing setup
mocha.setup('bdd');

const assert = chai.assert;

//Variables
const HOST = 'https://www.breakingbadapi.com/api/';
const PATH = 'characters';
const HEADERS = '{}';
const BODY = '';
const PARAMS = '';
const METHOD = 'GET';

const MOCK_API = [
  {
    apparence: [1, 2, 3, 4, 5],
    // eslint-disable-next-line @typescript-eslint/camelcase
    better_call_saul_apparence: [],
    birthday: '09-07-1958',
    category: 'Breaking Bad',
    // eslint-disable-next-line @typescript-eslint/camelcase
    char_id: 1,
    img:
      'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
    name: 'Walter White',
    nickname: 'Heisenberg',
    occupation: ['High School Chemistry Teacher', 'Meth King Pin'],
    portrayed: 'Bryan Cranston',
    status: 'Presumed dead',
  },
  {
    apparence: [1, 2, 3, 4, 5],
    // eslint-disable-next-line @typescript-eslint/camelcase
    better_call_saul_apparence: [],
    birthday: '09-07-1958',
    category: 'Breaking Bad',
    // eslint-disable-next-line @typescript-eslint/camelcase
    char_id: 1,
    img:
      'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
    name: 'Walter White Jr',
    nickname: 'EL cereales',
    occupation: ['High School'],
    portrayed: 'Random',
    status: 'Overeated',
  },
];

suite('Data-Manager Controller', () => {
  describe('Component initialized and renderized', () => {
    test('Should be defined', () => {
      const el = document.createElement('data-manager-controller');
      assert.instanceOf(el, DataManagerController);
    });

    test('Should be render with default values', async () => {
      const el = await fixture(
        html`<data-manager-controller
          host="${HOST}"
          path="${PATH}"
          headers="${HEADERS}"
          body="${BODY}"
          params="${PARAMS}"
          method="${METHOD}"
        ></data-manager-controller>`
      );
      assert.shadowDom.equal(
        el,
        `<data-provider-controller></data-provider-controller>`
      );
    });
  });

  describe('Testing Events', () => {
    describe('Testing onRequestSuccess', () => {
      const el = new DataManagerController();
      const successEvent = sinon.spy(el, '_onRequestSuccess');

      beforeEach(() => {
        el.dispatchEvent(
          new CustomEvent('request-success', {
            bubbles: true,
            composed: true,
            detail: {
              data: MOCK_API,
            },
          })
        );
      });

      afterEach(() => {
        sinon.restore();
      });

      describe('Listen the event and listen success', () => {
        el.addEventListener('request-success', el._onRequestSuccess);

        it('Should be fire request-success event', () => {
          expect(successEvent).is.calledOnce;
        });
      });
    });

    describe('Testing onRequestError', () => {
      const el = new DataManagerController();
      const errorEvent = sinon.spy(el, '_onRequestError');

      beforeEach(() => {
        el.dispatchEvent(
          new CustomEvent('request-error', {
            bubbles: true,
            composed: true,
            detail: {
              data: MOCK_API,
            },
          })
        );
      });

      afterEach(() => {
        sinon.restore();
      });

      describe('Listen the event and listen error', () => {
        el.addEventListener('request-error', el._onRequestError);

        it('Should be fire request-error event', () => {
          expect(errorEvent).is.calledOnce;
        });
      });
    });
  });
});
