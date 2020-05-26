import {LitElement, html, customElement, css} from 'lit-element';

/**
 * Spinner-Component
 *
 */
@customElement('spinner-component')
export class SpinnerComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`Hello Spinner-Component`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spinner-component': SpinnerComponent;
  }
}
