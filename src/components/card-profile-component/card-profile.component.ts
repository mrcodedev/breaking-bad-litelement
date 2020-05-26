import {LitElement, html, customElement, css} from 'lit-element';

/**
 * Card-Component
 *
 */
@customElement('card-profile')
export class CardProfileComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`Hello Card-Component`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'card-profile': CardProfileComponent;
  }
}
