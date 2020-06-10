import {PaginationComponent} from './pagination.component';
import {DataModel} from '../../models/data-model.interface';
import {PageLinks} from '../../models/page-component.interface';
import {fixture, html, expect} from '@open-wc/testing';

import sinon from 'sinon';

//Testing setup
mocha.setup('bdd');

const assert = chai.assert;

const MOCK_DATA_API: DataModel[] = [
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
  {
    birthday: '13-08-1985',
    id: '3',
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
    id: '4',
    image: 'http://www.fakeimage.com',
    name: 'Bea',
    nickname: 'Berenjena',
    occupation: [],
    playedBy: 'she',
    sessions: [],
    status: 'very alive',
  },
  {
    birthday: '13-08-1985',
    id: '5',
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
    id: '6',
    image: 'http://www.fakeimage.com',
    name: 'Bea',
    nickname: 'Berenjena',
    occupation: [],
    playedBy: 'she',
    sessions: [],
    status: 'very alive',
  },
];

const ACTIVE_PAGE_LINK_MOCK: PageLinks = {
  id: 2,
  page: 2,
  active: true,
};

const NUMBER_PAGES_MOCK: PageLinks[] = [
  {
    id: 1,
    page: 1,
    active: true,
  },
  {
    id: 2,
    page: 2,
    active: false,
  },
];

let fireEventStatus = false;

const fireEvent = () => {
  fireEventStatus = true;
};

suite('Pagination Component', () => {
  describe('Component is defined', () => {
    test('is defined', () => {
      const el = document.createElement('pagination-component');
      assert.instanceOf(el, PaginationComponent);
    });

    test('renders with default values', async () => {
      const el = await fixture(
        html`<pagination-component></pagination-component>`
      );
      assert.shadowDom.equal(
        el,
        `
        <div class="container-pagination" id="pagination">
          <a id="previous">«</a>
          <a id="next">»</a>
        </div>
      `
      );
    });
  });

  describe('Data Pages values', () => {
    const el = new PaginationComponent();
    el.addEventListener('data-page', fireEvent);

    describe('Data Pages with values', () => {
      el.paginationData = MOCK_DATA_API;
      el.numberPages = NUMBER_PAGES_MOCK;
      el.pageLimit = 1;
      el.activePageIndex = 0;

      test('Should be data defined', () => {
        expect(el._pageLimit).to.be.equal(1);
        expect(el._paginationData.length).to.be.equal(6);
      });

      test('Should be returns number elements', () => {
        expect(el.numberElements).to.be.equal(6);
      });

      test('Should be change active page', () => {
        expect(el.activePageIndex).to.be.equal(0);
        el.changeActivePage(ACTIVE_PAGE_LINK_MOCK);
        expect(el.activePageIndex).to.be.equal(2);
      });

      test('Should be pass to next page', () => {
        expect(el.activePageIndex).to.be.equal(2);
        el.nextPage();
        expect(el.activePageIndex).to.be.equal(3);
      });

      test('Should be pass to previous page', () => {
        expect(el.activePageIndex).to.be.equal(3);
        el.previousPage();
        expect(el.activePageIndex).to.be.equal(2);
      });

      test('Should be active page', () => {
        let activePage = el.isActive(true);
        expect(activePage).to.be.true;

        activePage = el.isActive(false);
        expect(activePage).to.be.false;
      });

      test('Should be fire data-page event', () => {
        expect(fireEventStatus).to.be.true;
      });
    });
  });

  describe('Data Pages values with else states', () => {
    const el = new PaginationComponent();

    describe('Else States', () => {
      const nextPageEvent = sinon.spy(el, 'nextPage');
      const previousPageEvent = sinon.spy(el, 'previousPage');
      const changePageActiveEvent = sinon.spy(el, 'changeActivePage');

      el.paginationData = MOCK_DATA_API;
      el.pageLimit = 30;
      el.numberPages = NUMBER_PAGES_MOCK;

      describe('Launch method nextPage', () => {
        el.activePageIndex = 300;
        el.nextPage();
        test('Should be call nextPage and put in else', () => {
          expect(nextPageEvent).to.be.calledOnce;
        });
      });

      describe('Launch method previousPage', () => {
        el.activePageIndex = -3;
        el.previousPage();
        test('Should be call previousPage and put in else', () => {
          expect(previousPageEvent).to.be.calledOnce;
        });
      });

      describe('Launch method changeActivePage', () => {
        el.activePageIndex = 1;
        el.changeActivePage(ACTIVE_PAGE_LINK_MOCK);
        test('Should be call changeActivePage and put in else', () => {
          expect(changePageActiveEvent).to.be.calledOnce;
        });
      });
    });
  });
});
