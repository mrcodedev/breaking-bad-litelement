import {ManagerController} from './manager-controller';

import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';

//Testing Setup
mocha.setup('bdd');

const assert = chai.assert;

//Variables
let firedEvent = false;

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

const MOCK_EVENT_DATA: CustomEvent = new CustomEvent('returned-data', {
  detail: MOCK_API,
});

const fireEvent = (): void => {
  firedEvent = true;
};

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
        firedEvent = false;
        el.addEventListener('returned-data', fireEvent);

        it('Should be fire request-success event', () => {
          expect(firedEvent).to.be.true;
          el.dataReturned(MOCK_EVENT_DATA);
        });

        describe('Event dataReturned', () => {
          el.addEventListener('data', fireEvent);
          el.dataReturnedError(MOCK_EVENT_DATA);

          it('Should be data event is fired', () => {
            expect(firedEvent).to.be.true;
          });
        });
      });
    });

    describe('Testing returned-data-error', () => {
      const el = new ManagerController();

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
        firedEvent = false;
        el.addEventListener('returned-error', fireEvent);

        it('Should be fire returned-data-error event', async () => {
          expect(firedEvent).to.be.true;
        });

        describe('Event dataReturnedError', () => {
          el.addEventListener('data', fireEvent);
          el.dataReturnedError(MOCK_EVENT_DATA);

          it('Should be data event is fired', () => {
            expect(firedEvent).to.be.true;
          });
        });
      });
    });
  });
});
