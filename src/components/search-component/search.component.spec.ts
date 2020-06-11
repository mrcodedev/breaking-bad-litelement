import {SearchComponent} from './search.component';
import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';
import {DataModel} from '../../models/data-model.interface';

//Testing setup
mocha.setup('bdd');

const assert = chai.assert;

const MOCK_ARRAY: DataModel[] = [
  {
    birthday: '13-08-1985',
    id: '1',
    image: 'http://www.fakeimage.com',
    name: 'Jose',
    nickname: 'MrCodeDev',
    occupation: [],
    playedBy: 'me',
    sessions: [],
    status: 'very alive',
  },
  {
    birthday: '28-05-1987',
    id: '2',
    image: 'http://www.fakeimage.com',
    name: 'Bea',
    nickname: 'Berenjena',
    occupation: [],
    playedBy: 'she',
    sessions: [],
    status: 'very alive',
  },
];

let statusEvent = false;

function eventFires() {
  statusEvent = true;
}

suite('Search Component', () => {
  describe('Componente is created', () => {
    test('Should be defined', () => {
      const el = document.createElement('search-component');
      assert.instanceOf(el, SearchComponent);
    });

    test('Should be render with default values', async () => {
      const el = await fixture(html`<search-component></search-component>`);
      assert.shadowDom.equal(
        el,
        `
        <div class="container-search">
          <input
            name="search"
            placeholder="Search..."
            type="text">
          <div type="submit">
            <img
              alt="search-icon"
              class="search-icon"
              src="../../../assets/icons/search-icon.png">
          </div>
      `
      );
    });
  });

  describe('Search Input fires event', () => {
    const callErrorDataSpy = sinon.spy();
    let inputElement: any;
    let inputHTML: any;

    const fireInputEvent = () => {
      callErrorDataSpy();
    };

    beforeEach('', async () => {
      inputElement = document.createElement('search-component');
      /* istanbul ignore next */
      document.querySelector('body')?.appendChild(inputElement);
      await inputElement.updateComplete;
      inputHTML = inputElement.shadowRoot.querySelector('input');
      inputHTML.addEventListener('input', fireInputEvent);
      inputHTML.dispatchEvent(new Event('input'));
    });

    afterEach('', () => {
      sinon.restore();
    });

    it('Should be input contains HTML', async () => {
      assert.notEqual(await inputHTML, null);
    });

    it('Should be input event fires', () => {
      expect(callErrorDataSpy).to.be.calledTwice;
    });
  });

  describe('SearchData Values', () => {
    const el = new SearchComponent();
    el.searchData = MOCK_ARRAY;

    describe('SearchData with values', () => {
      const el = new SearchComponent();
      const methodSearchEvent = sinon.spy(el, 'searchEvent');
      el.addEventListener('data-search', eventFires);

      el.searchData = MOCK_ARRAY;
      el._assignAndSearch('jose');

      test('Should be searchData have values', () => {
        expect(el.searchData).to.be.length(2);
      });

      describe('Show the event searchEvent', () => {
        test('Should be searchEventMethod called', () => {
          expect(methodSearchEvent).to.have.been.calledOnce;
          expect(statusEvent).to.be.true;
        });
      });
    });
  });
});
