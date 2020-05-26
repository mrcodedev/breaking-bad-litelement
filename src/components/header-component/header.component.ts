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
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    .header_container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .header_container img {
      width: 20%;
      min-width: 160px;
      margin: 20px 0px 10px 0px;
    }
  `;

  render() {
    return html`
      <div class="header_container">
        <img src="../../../assets/images/breaking-bad-logo.svg" />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'header-component': HeaderComponent;
  }
}
