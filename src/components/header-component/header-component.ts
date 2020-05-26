import {LitElement, html, customElement, css} from 'lit-element';

/**
 * Pagination-Component
 *
 */
@customElement('header-component')
export class HeaderComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`Hello Header-Component`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'header-component': HeaderComponent;
  }
}
