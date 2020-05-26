import {LitElement, html, customElement, css} from 'lit-element';

/**
 * Data-Manager-Controller
 *
 */
@customElement('data-manager-controller')
export class DataManagerController extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`Hello Data-Manager-Controller`;
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
    'data-manager-controller': DataManagerController;
  }
}
