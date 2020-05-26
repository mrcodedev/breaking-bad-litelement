import {LitElement, html, customElement, css} from 'lit-element';

/**
 * Data-Provider-Controller
 *
 */
@customElement('data-provider-controller')
export class DataProviderController extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`Hello Data-Provider-Controller`;
  }

  // private _onClick() {
  //   this.count++;
  // }

  // foo(): string {
  //   return 'foo';
  // }
}

declare global {
  interface HTMLElementTagNameMap {
    'data-provider-controller': DataProviderController;
  }
}
