import {LitElement, html, customElement, css} from 'lit-element';

/**
 * Search-Component
 *
 */
@customElement('search-component')
export class SearchComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`Hello Search-Component`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'search-component': SearchComponent;
  }
}
