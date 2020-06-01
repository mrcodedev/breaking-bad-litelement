import {LitElement, customElement, property} from 'lit-element';

import {MyFetchData} from '../../models/controllers.interface';

/**
 * Data-Provider
 * Connect to the API and return the data
 * @class DataProviderController
 */
@customElement('data-provider-controller')
export class DataProviderController extends LitElement {
  /**
   * The host to connect to API.
   */
  @property({type: String})
  host = '';

  /**
   * The path to query API.
   */
  @property({type: String})
  path = '';

  /**
   * Header connction to API Request
   */
  @property({type: Object})
  headers = {};

  /**
   * Body connection to API Request
   */
  @property({type: String})
  body = '';

  /**
   * Parameters connection to API Request
   */
  @property({type: String})
  params = '';

  /**
   * Method of connection to API Request
   */
  @property({type: String})
  method = '';

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this._generateRequest();
  }

  /**
   * Generate the API Request with the params
   */
  private _generateRequest(): void {
    const controller = new AbortController();
    const signal = controller.signal;

    const realPath = `${this.host}${this.path}${this.params}`;

    const methodsWithoutBody = ['GET', 'HEAD', 'CONNECT', 'OPTIONS', 'TRACE'];

    const myFetchData: MyFetchData = {
      method: this.method,
      headers: this.headers,
      signal,
    };

    if (!methodsWithoutBody.includes(this.method)) {
      myFetchData.body = JSON.stringify(this.body);
    }

    fetch(realPath, myFetchData)
      .then((response) => {
        if (response.ok) {
          this._requestSuccess(response.json());
        } else {
          controller.abort();
          throw new Error(`${response.statusText}, status: ${response.status}`);
        }
      })
      .catch((error: object) => {
        controller.abort();
        this._requestError(error);
      });
  }

  /**
   * When the Request is success pass the data
   */
  private _requestSuccess(apiData: Promise<object>) {
    apiData.then((data: object) => {
      this.dispatchEvent(
        new CustomEvent('request-success', {
          bubbles: true,
          composed: true,
          detail: {
            data,
          },
        })
      );
    });
  }

  /**
   * When the Request is unsuccess pass the error
   */
  private _requestError(errorData: object): void {
    this.dispatchEvent(
      new CustomEvent('request-error', {
        bubbles: true,
        composed: true,
        detail: {
          error: errorData,
        },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'data-provider-controller': DataProviderController;
  }
}
