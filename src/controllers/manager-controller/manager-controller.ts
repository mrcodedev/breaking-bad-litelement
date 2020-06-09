import {LitElement, customElement, property, html} from 'lit-element';

import '../data-manager-controller/data-manager-controller';

/**
 * Manager-Controller
 * Controller sent the data to app
 * @class ManagerController
 */
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
  host: string;

  /**
   * The path to query API.
   */
  @property({type: String})
  path: string;

  /**
   * Header connction to API Request
   */
  @property({type: Object})
  headers: object;

  /**
   * Body connection to API Request
   */
  @property({type: String})
  body: string;

  /**
   * Parameters connection to API Request
   */
  @property({type: String})
  private params: string;

  /**
   * Method of connection to API Request
   */
  @property({type: String})
  method: string;

  constructor() {
    super();
    this.host = 'https://www.breakingbadapi.com/api/';
    this.path = 'characters';
    this.params = '';
    this.headers = {};
    this.body = '';
    this.method = 'GET';
  }

  /**
   * Sent Event with the data to mange the app
   */
  public _dataReturned(event: any): void {
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

  /**
   * Sent Event with the ERROR of API
   */
  public _dataReturnedError(event: any): void {
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
