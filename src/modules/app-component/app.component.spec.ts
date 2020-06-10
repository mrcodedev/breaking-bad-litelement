import {AppComponent} from './app.component';
import {fixture, html, expect} from '@open-wc/testing';

import sinon from 'sinon';

//Testing Setup
mocha.setup('bdd');

const assert = chai.assert;

suite('App Component', () => {
  describe('Component initialized and renderized', () => {
    test('Sould be defined', () => {
      const el = document.createElement('app-component');
      assert.instanceOf(el, AppComponent);
    });

    test('renders with default values', async () => {
      const el = await fixture(html`<app-component></app-component>`);
      assert.shadowDom.equal(
        el,
        `
      <spinner-component>
      </spinner-component>
      <header-component>
      </header-component>
      <manager-controller>
      </manager-controller>
      <search-component>
      </search-component>
      <pagination-component pagelimit="10">
      </pagination-component>
      <card-list>
      </card-list>
      <footer-component>
      </footer-component>
    `
      );
    });
  });

  describe('Testing events', () => {
    const el = new AppComponent();

    describe('Test updateData', () => {
      const callUpdateSpy = sinon.spy();

      const callUpdateMock = () => {
        el.updateData(eventMOCK);
        callUpdateSpy();
      };

      const eventMOCK = new CustomEvent('data', {
        detail: {
          data: '2',
        },
      });

      beforeEach(() => {
        el.dispatchEvent(
          new CustomEvent('data', {
            bubbles: true,
            composed: true,
            detail: {
              data: 'a',
            },
          })
        );
      });

      afterEach(() => {
        sinon.restore();
      });

      describe('Listen the event updateData', () => {
        el.addEventListener('data', callUpdateMock);

        it('Should be fired and called event and fire updateData', () => {
          expect(callUpdateSpy).to.be.calledOnce;
        });
      });
    });

    describe('Test dataSearch', () => {
      const callDataSearchSpy = sinon.spy();

      const callUpdateMock = () => {
        el.dataSearch(eventMOCK);
        callDataSearchSpy();
      };

      const eventMOCK = new CustomEvent('data', {
        detail: {
          data: '2',
        },
      });

      beforeEach(() => {
        el.dispatchEvent(
          new CustomEvent('data-search', {
            bubbles: true,
            composed: true,
            detail: {
              data: 'a',
            },
          })
        );
      });

      afterEach(() => {
        sinon.restore();
      });

      describe('Listen the event data-search', () => {
        el.addEventListener('data-search', callUpdateMock);

        it('Should be fired and called event and fire dataSearch', () => {
          expect(callDataSearchSpy).to.be.calledOnce;
        });
      });
    });

    describe('Test dataPage', () => {
      const callDataPageSpy = sinon.spy();

      const callUpdateMock = () => {
        el._dataPage(eventMOCK);
        callDataPageSpy();
      };

      const eventMOCK = new CustomEvent('data', {
        detail: {
          data: '2',
        },
      });

      beforeEach(() => {
        el.dispatchEvent(
          new CustomEvent('data-page', {
            bubbles: true,
            composed: true,
            detail: {
              data: '',
            },
          })
        );
      });

      afterEach(() => {
        sinon.restore();
      });

      describe('Listen the event _dataPage', () => {
        el.addEventListener('data-page', callUpdateMock);

        it('Should be fired and called event and fire _dataPage without data', () => {
          expect(callDataPageSpy).to.be.calledOnce;
        });
      });
    });

    describe('Test dataPage without data', () => {
      const callDataPageSpy = sinon.spy();

      const callUpdateMock = () => {
        el._dataPage(eventMOCK);
        callDataPageSpy();
      };

      const eventMOCK = new CustomEvent('data', {
        detail: {
          data: '',
        },
      });

      beforeEach(() => {
        el.dispatchEvent(
          new CustomEvent('data-page-no-data', {
            bubbles: true,
            composed: true,
            detail: {
              data: '',
            },
          })
        );
      });

      afterEach(() => {
        sinon.restore();
      });

      describe('Listen the event _dataPage', () => {
        el.addEventListener('data-page-no-data', callUpdateMock);

        it('Should be fired and called event and fire _dataPage without data', () => {
          expect(callDataPageSpy).to.be.calledOnce;
        });
      });
    });
  });
});
