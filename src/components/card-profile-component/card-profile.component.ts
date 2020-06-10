import {LitElement, html, customElement, css, property} from 'lit-element';

import {DataModel} from '../../models/data-model.interface';

/**
 * Card-Component
 * Element showing pagination for elements
 * @class PaginationComponent
 */
@customElement('card-profile')
export class CardProfileComponent extends LitElement {
  static styles = css`
    :host {
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    .container__card {
      position: relative;
      width: 280px;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
        0 6px 25px 0 rgba(0, 0, 0, 0.19);
      transform: rotateY(0deg);
      transition: transform 0.5s;
    }

    .container__card[active] {
      transform: rotateY(180deg);
      transition: transform 0.5s;
    }

    .container__card[active] .card__detail-icon {
      display: none;
    }

    .card__detail-icon {
      position: absolute;
      right: 0;
      padding: 15px;
      transition: filter 0.3s;
    }

    .card__detail-icon:hover {
      cursor: pointer;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 1));
      filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 1));
      transition: filter 0.3s;
    }

    .card-open-info {
      width: 25px;
      height: 20px;
      -webkit-filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.8))
        invert(1);
      filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.8)) invert(1);
    }

    .image-block {
      z-index: 0;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background-size: cover;
    }

    .image-block__name {
      background-color: black;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 15px 0px;
      font-size: 0.9em;
      text-align: center;
      color: white;
    }

    .name__text {
      font-size: 18px;
      font-weight: 700;
      padding: 0 0 4px 0;
    }

    .nickname__text {
      font-size: 14px;
      font-weight: 400;
    }

    .detail-block__icon {
      position: absolute;
      right: 0;
      color: red;
      padding: 10px;
      font-size: 30px;
    }

    .detail-block__icon:hover {
      cursor: pointer;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .detail-block {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 400px;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      transform: rotateY(180deg);
    }

    .detail-block[active] {
      display: block;
    }

    .detail-info {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0 20px;
    }

    .detailed-info {
      margin-bottom: 10px;
    }

    .detailed-info:last-child {
      margin-bottom: 0px;
    }

    .detailed-info .info-category {
      font-weight: 300;
      font-size: 14px;
      padding-bottom: 2px;
    }

    .card-icon-detail__close {
      width: 20px;
      height: 20px;
      padding: 0 7px 0 0;
    }

    .detailed-info .info-result {
      font-weight: 700;
      font-size: 16px;
    }

    .detail-info p {
      margin-block-start: 0em;
      margin-block-end: 0em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
  `;

  render() {
    return html`
      <div
        class="container__card"
        ?active="${this.isActiveContainerCard(this.cardStatus)}"
      >
        <div class="container__image-block">
          <div
            class="card__detail-icon"
            @click="${(event: MouseEvent) =>
              this.cardActionOpen(
                // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                (<HTMLInputElement>event.target).dataset.id!
              )}"
            data-id="${this.cardprofileData.id}"
          >
            <img
              src="../../../assets/icons/open-info.png"
              class="card-open-info"
              data-id="${this.cardprofileData.id}"
              alt="open-card"
            />
          </div>
          <div
            class="image-block"
            style="background-image: url('${this.cardprofileData.image}');"
          >
            <div class="image-block__name">
              <div class="name__text">
                ${this.cardprofileData.name}
              </div>
              <div class="nickname__text">
                ${this.cardprofileData.nickname}
              </div>
            </div>
          </div>
          <div class="container__detail-block">
            <div
              class="detail-block"
              ?active="${this.isActiveContainerCard(this.cardStatus)}"
            >
              <div
                class="detail-block__icon"
                @click="${this.cardActionClose}"
                data-id="${this.cardprofileData.id}"
              >
                <img
                  src="../../../assets/icons/close-info.png"
                  class="card-icon-detail__close"
                  style="filter: invert(1)"
                  data-id="${this.cardprofileData.id}"
                  alt="close-card"
                />
              </div>
              <div class="detail-info">
                <div class="detailed-info">
                  <p class="info-category">Name</p>
                  <p class="info-result">${this.cardprofileData.name}</p>
                </div>
                <div class="detailed-info">
                  <p class="info-category">Nickname</p>
                  <p class="info-result">${this.cardprofileData.nickname}</p>
                </div>
                <div class="detailed-info">
                  <p class="info-category">Birthday</p>
                  <p class="info-result">${this.cardprofileData.birthday}</p>
                </div>
                <div class="detailed-info">
                  <p class="info-category">Status</p>
                  <p class="info-result">${this.cardprofileData.status}</p>
                </div>
                <div class="detailed-info">
                  <p class="info-category">Occupation</p>
                  <p class="info-result">${this.cardprofileData.occupation}</p>
                </div>
                <div class="detailed-info">
                  <p class="info-category">Played By</p>
                  <p class="info-result">${this.cardprofileData.playedBy}</p>
                </div>
                <div class="detailed-info">
                  <p class="info-category">Sessions</p>
                  <p class="info-result">${this.cardprofileData.sessions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Data of the card
   */
  @property({type: Object})
  cardprofileData: any;

  /**
   * Id of the card
   */
  @property({type: String})
  cardProfile = '';

  /**
   * Status of card, if open is true
   */
  @property({type: Boolean})
  cardStatus = false;

  /**
   * Getter/Setter paginationData
   */
  @property({type: String})
  _cardActive = '';

  /**
   * Data to create the card
   */
  @property({type: String})
  set cardActive(value: string) {
    const oldVal: string = this._cardActive;
    this._cardActive = value;
    this.requestUpdate('cardActive', oldVal);
    if (oldVal !== value) {
      this.cardActiveEvent();
      this.checkActiveCard(this.cardActive);
    }
  }

  get cardActive(): string {
    return this._cardActive;
  }

  /**
   * Open Select Card
   */
  public cardActionOpen(data: string): void {
    this.cardActive = data;
  }

  /**
   * Close the select card
   */
  public cardActionClose(): void {
    this.cardStatus = !this.cardStatus;
    this.cardActive = '';
  }

  /**
   * Check in container if active or not
   *
   * @return {Boolean} The card is active
   */
  public isActiveContainerCard(cardStatus: boolean): boolean {
    return cardStatus ? true : false;
  }

  /**
   * Check if the card is active
   */
  public checkActiveCard(actualValue: string): void {
    parseInt(this.cardprofileData.id) === parseInt(actualValue)
      ? (this.cardStatus = true)
      : (this.cardStatus = false);
  }

  /**
   * Dispatch event to the data to show
   */
  public cardActiveEvent(): void {
    this.dispatchEvent(
      new CustomEvent('card-active', {
        detail: {
          data: this.cardActive,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'card-profile': CardProfileComponent;
  }
}
