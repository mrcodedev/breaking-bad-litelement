import {LitElement, html, customElement, css} from 'lit-element';

/**
 * Footer-Component
 *
 */
@customElement('footer-component')
export class FooterComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`Hello Footer-Component`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'footer-component': FooterComponent;
  }
}
