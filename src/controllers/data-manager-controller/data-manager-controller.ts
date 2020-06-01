import {LitElement, html, customElement, property} from 'lit-element';
import '../data-provider-controller/data-provider-controller';

import {DataModel, DataModelAPI} from '../../models/data-model.interface';
/**
 * Data-Manager-Controller
 * Receive de data of data-provider-controller
 * @class DataManagerController
 */
@customElement('data-manager-controller')
export class DataManagerController extends LitElement {
  render() {
    return html`
      <data-provider-controller
        .host="${this.host}"
        .path="${this.path}"
        .headers="${this.headers}"
        .body="${this.body}"
        .params="${this.params}"
        .method="${this.method}"
        @request-success="${this._onRequestSuccess}"
        @request-error="${this._onRequestError}"
      >
      </data-provider-controller>
    `;
  }

  /**
   * The host to connect to API.
   */
  @property({type: String})
  private host = '';

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
  method = '';

  constructor() {
    super();
  }

  /**
   * Get de API data and transform the data and fire event
   */
  private _onRequestSuccess(event: CustomEvent): void {
    const data = event.detail.data.map((character: DataModelAPI) => {
      return {
        id: character.char_id,
        name: character.name,
        image: character.img,
        nickname: character.nickname,
        birthday: character.birthday,
        status: character.status,
        occupation: character.occupation,
        playedBy: character.portrayed,
        sessions: character.appearance,
      };
    });

    this._returnedDataEvent(data);
  }

  /**
   * Sent Event with the API returned-data
   */
  private _returnedDataEvent(data: DataModel): void {
    this.dispatchEvent(
      new CustomEvent('returned-data', {
        detail: {
          data,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Sent Event with the ERROR of API
   */
  private _onRequestError(event: CustomEvent): void {
    this.dispatchEvent(
      new CustomEvent('returned-data-error', {
        detail: {
          error: event.detail.error,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'data-manager-controller': DataManagerController;
  }
}
