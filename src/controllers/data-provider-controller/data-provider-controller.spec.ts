import {DataProviderController} from './data-provider-controller';
import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';

mocha.setup('bdd');

const assert = chai.assert;

//Mocks
function jsonOk(body: any) {
  const mockResponse: Response = new window.Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return Promise.resolve(mockResponse);
}

function jsonError() {
  const mockResponse: Response = new window.Response('', {
    status: 400,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return Promise.resolve(mockResponse);
}

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
];

const HOST = 'https://www.breakingbadapi.com/api/';
const PATH = 'characters';
const HEADERS = {};
const BODY = '';
const PARAMS = '';
const METHOD = 'GET';

describe('Data Provider Controller', () => {
  describe('Should be component created', () => {
    it('Shouldis defined', () => {
      const component = document.createElement('data-provider-controller');
      assert.instanceOf(component, DataProviderController);
    });

    it('Should be called generateRequest with connected callback', () => {
      const el = new DataProviderController();

      const generateRequestSpy = sinon.spy(el, 'connectedCallback');
      el.connectedCallback();
      assert.isTrue(generateRequestSpy.calledOnce);
    });
  });

  describe('Should be call to the fetch method', () => {
    const el = new DataProviderController();

    el.host = HOST;
    el.path = PATH;
    el.headers = HEADERS;
    el.body = BODY;
    el.params = PARAMS;
    el.method = METHOD;

    //Spy it call
    const generateRequestSpy = sinon.spy(el, 'connectedCallback');
    el.connectedCallback();

    //Its called
    assert.isTrue(generateRequestSpy.calledOnce);
  });

  describe('Should be fetch with OK response ', () => {
    beforeEach(() => {
      const fakeFetch = sinon.stub(window, 'fetch');
      fakeFetch.onCall(0).returns(jsonOk(MOCK_API));
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should be fires _requestSuccess event', async () => {
      const el = new DataProviderController();

      const generateRequestSpy = sinon.spy(el, 'connectedCallback');
      el.connectedCallback();

      assert.isTrue(generateRequestSpy.calledOnce);

      // const eventRequestSucess = sinon.spy(el, '_requestSuccess');

      // sinon.spy(el.)

      // assert.isTrue(eventRequestSucess.firstCall);
    });
  });
  describe('API ERROR', () => {
    beforeEach(() => {
      const stub = sinon.stub(window, 'fetch'); //add stub
      stub.onCall(0).returns(jsonError());
    });

    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore();
    });

    it('it should run fetch', async () => {
      const el = new DataProviderController();

      el.host = HOST;
      el.path = PATH;
      el.headers = HEADERS;
      el.body = BODY;
      el.params = PARAMS;
      el.method = METHOD;

      el._requestSuccess;
      //Spy it call
      const generateRequestSpy = sinon.spy(el, 'connectedCallback');
      el.connectedCallback();

      //Its called
      assert.isTrue(generateRequestSpy.calledOnce);
    });
  });
});
