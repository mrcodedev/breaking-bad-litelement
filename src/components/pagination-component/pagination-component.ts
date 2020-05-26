import {LitElement, html, customElement, css} from 'lit-element';

/**
 * Pagination-Component
 *
 */
@customElement('pagination-component')
export class PaginationComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`Hello Pagination-Component`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pagination-component': PaginationComponent;
  }
}
