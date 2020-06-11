import {CardProfileComponent} from './card-profile.component';

import {fixture, html, expect} from '@open-wc/testing';

import sinon from 'sinon';

//Testing setup
mocha.setup('bdd');

const assert = chai.assert;

const MOCK_API_CARD = {
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

suite('Card Profile Component', () => {
  describe('Component initialized and renderized', () => {
    it('Should be defined', () => {
      const el = document.createElement('card-profile');
      assert.instanceOf(el, CardProfileComponent);
    });

    it('Should be renderer', async () => {
      const el = await fixture(html`
        <card-profile .cardprofileData="${MOCK_API_CARD}"></card-profile>
      `);
      assert.shadowDom.equal(
        el,
        `
        <div class="container__card">
          <div class="container__image-block">
            <div
              class="card__detail-icon"
              data-id="1"
            >
              <img
                alt="open-card"
                class="card-open-info"
                data-id="1"
                src="../../../assets/icons/open-info.png"
              >
            </div>
            <div
              class="image-block"
              style="background-image: url('http://www.fakeimage.com');"
            >
              <div class="image-block__name">
                <div class="name__text">
                  Jose
                </div>
                <div class="nickname__text">
                  MrCodeDev
                </div>
              </div>
            </div>
            <div class="container__detail-block">
              <div class="detail-block">
                <div
                  class="detail-block__icon"
                  data-id="1"
                >
                  <img
                    alt="close-card"
                    class="card-icon-detail__close"
                    data-id="1"
                    src="../../../assets/icons/close-info.png"
                    style="filter: invert(1)"
                  >
                </div>
                <div class="detail-info">
                  <div class="detailed-info">
                    <p class="info-category">
                      Name
                    </p>
                    <p class="info-result">
                      Jose
                    </p>
                  </div>
                  <div class="detailed-info">
                    <p class="info-category">
                      Nickname
                    </p>
                    <p class="info-result">
                      MrCodeDev
                    </p>
                  </div>
                  <div class="detailed-info">
                    <p class="info-category">
                      Birthday
                    </p>
                    <p class="info-result">
                      13-08-1985
                    </p>
                  </div>
                  <div class="detailed-info">
                    <p class="info-category">
                      Status
                    </p>
                    <p class="info-result">
                      very alive
                    </p>
                  </div>
                  <div class="detailed-info">
                    <p class="info-category">
                      Occupation
                    </p>
                    <p class="info-result">
                    </p>
                  </div>
                  <div class="detailed-info">
                    <p class="info-category">
                      Played By
                    </p>
                    <p class="info-result">
                      me
                    </p>
                  </div>
                  <div class="detailed-info">
                    <p class="info-category">
                      Sessions
                    </p>
                    <p class="info-result">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      );
    });
  });

  describe('Component check values', () => {
    let clickElement: any;

    beforeEach('', async () => {
      clickElement = document.createElement('card-profile');
      /* istanbul ignore next */
      document.querySelector('body')?.appendChild(clickElement);
      clickElement.cardprofileData = MOCK_API_CARD;
      clickElement.cardActive = '1';
      await clickElement.updateComplete;
    });
    afterEach('', () => {
      sinon.restore();
    });

    it('Checks that header tag was added to shadowRoot', async () => {
      const clickHTML = clickElement.shadowRoot.querySelector(
        'div.card__detail-icon'
      );
      assert.notEqual(await clickHTML, null);
    });

    it('Should click card to open and close calls to method', async () => {
      const clickOpenHTML = clickElement.shadowRoot.querySelector(
        'div.card__detail-icon'
      );

      const spyOpenCard = sinon.spy(clickOpenHTML, 'click');

      await clickOpenHTML.click();

      await expect(spyOpenCard).to.be.calledOnce;
    });

    it('', async () => {
      const clickCloseHTML = clickElement.shadowRoot.querySelector(
        'div.detail-block__icon'
      );

      const spyCloseCard = sinon.spy(clickCloseHTML, 'click');

      await clickCloseHTML.click();

      await expect(spyCloseCard).to.be.calledOnce;
    });
  });
});
