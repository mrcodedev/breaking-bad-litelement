import {DataProviderController} from './data-provider-controller';
import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';

mocha.setup('bdd');
const assert = chai.assert;

const body = [
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

describe('Data Provider Controller', () => {
  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });

  it('is defined', () => {
    const el = document.createElement('data-provider-controller');
    assert.instanceOf(el, DataProviderController);
  });

  it('When the component is init, _generateRequest is called', () => {
    const el = new DataProviderController();
    const generateRequestSpy = sinon.spy(el, 'connectedCallback');
    el.connectedCallback();
    assert.isTrue(generateRequestSpy.calledOnce);
  });

  it('it should run fetch', () => {});
});
