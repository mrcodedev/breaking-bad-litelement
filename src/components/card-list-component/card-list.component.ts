import {
  LitElement,
  html,
  customElement,
  css,
  property,
  TemplateResult,
} from 'lit-element';

import '../card-profile-component/card-profile.component';

/**
 * Card-List
 * List of cards to show into app
 * @class CardListComponent
 */
@customElement('card-list')
export class CardListComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      margin: 0 50px;
    }

    .container__card-list {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 30px;
      justify-items: center;
      margin: 30px 0px 50px 0px;
    }

    .card-list-empty {
      color: white;
      font-size: 22px;
      margin: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  `;

  @property({type: Boolean})
  public isEmpty = false;

  @property({type: Boolean})
  private firstTime = true;

  @property({type: String})
  private cardActive = '';

  /**
   * Getter/Setter paginationData
   */
  @property({type: Array})
  private _cardlistData: object[] = [];

  /**
   * Data to create the pagination
   */
  @property({
    type: Array,
  })
  private set cardlistData(value) {
    const oldVal = this._cardlistData;
    this._cardlistData = value;
    this.requestUpdate('cardlistData', oldVal);

    if (oldVal !== value && this.cardlistData !== undefined) {
      this._isEmpty();
    }
  }

  private get cardlistData() {
    return this._cardlistData;
  }

  render() {
    return html`${this._generateCardListHTML()}`;
  }

  /**
   * Generate all the card-list
   *
   * @return {TemplateResult} HTML of cardlist and cardprofile
   */
  private _generateCardListHTML(): TemplateResult {
    const cardListHTML = html`
      <div
        class="container__card-list"
        @card-active="${this._updateCardActive}"
      >
        ${this.cardlistData !== undefined
          ? this._generateCardProfileHTML()
          : html``}
      </div>
    `;

    return cardListHTML;
  }

  /**
   * Get HTML of cardprofile with data
   *
   * @return {TemplateResult} HTML of cardprofile
   */
  private _generateCardProfileHTML(): TemplateResult[] {
    const cardProfileHTML = this.cardlistData.map((item: object) => {
      return html`
        <card-profile
          .cardprofileData="${item}"
          .cardActive="${this.cardActive}"
        ></card-profile>
      `;
    });

    return cardProfileHTML;
  }

  /**
   * Check if its first time to load and if have any elements in data
   */
  private _isEmpty(): void {
    if (this.firstTime) {
      this.firstTime = false;
    } else {
      this.cardActive = '';
      this.cardlistData.length === 0
        ? (this.isEmpty = true)
        : (this.isEmpty = false);
    }
  }

  /**
   * Update Active Card
   */
  _updateCardActive(event: CustomEvent): void {
    this.cardActive = event.detail.data;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'card-list': CardListComponent;
  }
}
