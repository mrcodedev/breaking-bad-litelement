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

  /**
   * Check if have data to load in de card profile
   */
  @property({type: Boolean})
  isEmpty = false;

  /**
   * Its the first time loaded
   */
  @property({type: Boolean})
  firstTime = true;

  /**
   * Card Id Active
   */
  @property({type: String})
  cardActive = '';

  /**
   * Getter/Setter paginationData
   */
  @property({type: Array})
  _cardlistData: object[] = [];

  /**
   * Data to create the pagination
   */
  @property({
    type: Array,
  })
  set cardlistData(value: object[]) {
    const oldVal: object[] = this._cardlistData;

    if (value === undefined) {
      this._cardlistData = [];
    } else {
      this._cardlistData = value;
    }

    this.requestUpdate('cardlistData', oldVal);

    if (oldVal !== value) {
      this.methodIsEmpty();
    }
  }

  get cardlistData() {
    return this._cardlistData;
  }

  render() {
    return html`${this.generateCardListHTML()}`;
  }

  /**
   * Generate all the card-list
   *
   * @return {TemplateResult} HTML of cardlist and cardprofile
   */
  public generateCardListHTML(): TemplateResult {
    const cardListHTML: TemplateResult = html`
      <div class="container__card-list" @card-active="${this.updateCardActive}">
        ${this.cardlistData.length > 0
          ? this.generateCardProfileHTML()
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
  public generateCardProfileHTML(): TemplateResult[] {
    const cardProfileHTML: TemplateResult[] = this.cardlistData.map(
      (item: object) => {
        return html`
          <card-profile
            .cardprofileData="${item}"
            .cardActive="${this.cardActive}"
          ></card-profile>
        `;
      }
    );

    return cardProfileHTML;
  }

  /**
   * Check if its first time to load and if have any elements in data
   */
  public methodIsEmpty(): void {
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
  public updateCardActive(event: CustomEvent): void {
    this.cardActive = event.detail.data;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'card-list': CardListComponent;
  }
}
