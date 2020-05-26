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
    }
  `;

  render() {
    return html`Hello Card-List-Component`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'card-list': CardListComponent;
  }
}
