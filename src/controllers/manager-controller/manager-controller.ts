import {LitElement, customElement, property, html} from 'lit-element';

import '../data-manager-controller/data-manager-controller';

@customElement('manager-controller')
export class ManagerController extends LitElement {
  render() {
    return html`
      <data-manager-controller
        .host="${this.host}"
        .path="${this.path}"
        .headers="${this.headers}"
        .body="${this.body}"
        .params="${this.params}"
        .method="${this.method}"
        @returned-data="${this._dataReturned}"
        @returned-data-error="${this._dataReturnedError}"
      >
      </data-manager-controller>
    `;
  }

  /**
   * The host to connect to API.
   */
  @property({type: String})
  private host: string | undefined;

  /**
   * The path to query API.
   */
  @property({type: String})
  private path = '';

  /**
   * Header connction to API Request
   */
  @property({type: Object})
  private headers = {};

  /**
   * Body connection to API Request
   */
  @property({type: String})
  private body = '';

  /**
   * Parameters connection to API Request
   */
  @property({type: String})
  private params = '';

  /**
   * Method of connection to API Request
   */
  @property({type: String})
  private method = '';

  constructor() {
    super();
    this.host = 'https://www.breakingbadapi.com/api/';
    this.path = 'characters';
    this.params = '';
    this.headers = {};
    this.body = '';
    this.method = 'GET';
  }

  private _dataReturned(event: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('data', {
        detail: {
          data: event.detail.data,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _dataReturnedError(event: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('data', {
        detail: {
          data: event.detail.error,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'manager-controller': ManagerController;
  }
}
