import {LitElement, html, customElement, css} from 'lit-element';

/**
 * Card-List-Component
 *
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

  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'card-list': CardListComponent;
  }
}
