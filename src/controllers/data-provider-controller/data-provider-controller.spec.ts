//BUENO

import {DataProviderController} from './data-provider-controller';
import {expect} from '@open-wc/testing';
import sinon from 'sinon';

// Testing setup
mocha.setup('bdd');

const assert = chai.assert;

//Variables
let firedEvent = false;

const HOST = 'https://www.breakingbadapi.com/api/';
const PATH = 'characters';
const HEADERS = {};
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

//Methods
const jsonOk = (body: object): Promise<Response> => {
  const mockResponse: Response = new window.Response(JSON.stringify(BODY), {
    status: 200,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return Promise.resolve(mockResponse);
};

const jsonError = (): Promise<Response> => {
  const mockResponse: Response = new window.Response('', {
    status: 400,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return Promise.resolve(mockResponse);
};

const fireEvent = (): void => {
  firedEvent = true;
};

describe('Data-Provider testing', () => {
  const el = new DataProviderController();

  el.host = HOST;
  el.path = PATH;
  el.headers = HEADERS;
  el.body = BODY;
  el.params = PARAMS;
  el.method = METHOD;

  it('Should component be created', () => {
    const component = document.createElement('data-provider-controller');
    assert.instanceOf(component, DataProviderController);
  });

  it('Should be data of body is defined', () => {
    expect(el.host).to.contain('https://www.breakingbadapi.com/api/');
    expect(el.path).to.contain('characters');
    expect(el.headers).to.contain({});
    expect(el.body).to.contain('');
    expect(el.params).to.contain('');
    expect(el.method).to.contain('GET');
  });

  describe('Using method fetch in the life cycle', () => {
    const generateRequestSpy = sinon.spy(el, 'connectedCallback');

    beforeEach(() => {
      el.connectedCallback();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should be call connectedCallback', () => {
      assert.isTrue(generateRequestSpy.calledOnce);
    });

    describe('Fetching OK and sending a event', () => {
      const el = new DataProviderController();

      beforeEach(async () => {
        el.addEventListener('request-success', fireEvent);

        const fakeFetch = sinon.stub(window, 'fetch');
        fakeFetch.onCall(0).returns(jsonOk(MOCK_API));

        el.connectedCallback();
      });

      afterEach(() => {
        firedEvent = false;
        sinon.restore();
      });

      describe('To capture the event', () => {
        it('Should be event request-success fired', () => {
          expect(firedEvent).to.be.true;
        });
      });
    });

    describe('Fetching ERROR and sending a event', () => {
      const el = new DataProviderController();

      beforeEach(async () => {
        el.addEventListener('request-error', fireEvent);

        const fakeFetch = sinon.stub(window, 'fetch');
        fakeFetch.onCall(0).returns(jsonError());

        el.connectedCallback();
      });

      afterEach(() => {
        firedEvent = false;
        sinon.restore();
      });

      describe('To capture the event', () => {
        it('Should be event request-error fired', () => {
          expect(firedEvent).to.be.true;
        });
      });
    });
  });
});
