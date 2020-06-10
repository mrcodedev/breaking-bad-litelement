import {ManagerController} from './manager-controller';

import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';

//Testing Setup
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

suite('Manager Controller', () => {
  describe('Component initialized and renderized', () => {
    test('Should be defined', () => {
      const el = document.createElement('manager-controller');
      assert.instanceOf(el, ManagerController);
    });
    test('Should be render with default values', async () => {
      const el = await fixture(
        html`<manager-controller
          host="${HOST}"
          path="${PATH}"
          headers="${HEADERS}"
          body="${BODY}"
          params="${PARAMS}"
          method="${METHOD}"
        ></manager-controller>`
      );
      assert.shadowDom.equal(
        el,
        `<data-manager-controller></data-manager-controller>`
      );
    });
  });

  describe('Testing Events', () => {
    describe('Testing _dataReturned', () => {
      const el = new ManagerController();
      const successEvent = sinon.spy(el, 'dataReturned');

      beforeEach(() => {
        el.dispatchEvent(
          new CustomEvent('returned-data', {
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
        el.addEventListener('returned-data', el.dataReturned);

        it('Should be fire request-success event', () => {
          expect(successEvent).is.calledOnce;
        });
      });
    });

    describe('Testing returned-data-error', () => {
      const el = new ManagerController();
      const errorEvent = sinon.spy(el, 'dataReturnedError');

      beforeEach(() => {
        el.dispatchEvent(
          new CustomEvent('returned-data-error', {
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
        el.addEventListener('returned-data-error', el.dataReturnedError);

        it('Should be fire returned-data-error event', () => {
          expect(errorEvent).is.calledOnce;
        });
      });
    });
  });
});
