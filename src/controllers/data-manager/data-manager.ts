import {LitElement, html, customElement, css} from 'lit-element';

/**
 * Data-Manager
 *
 */
@customElement('data-manager')
export class DataManager extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`Hello Data-Manager`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'data-manager': DataManager;
  }
}
