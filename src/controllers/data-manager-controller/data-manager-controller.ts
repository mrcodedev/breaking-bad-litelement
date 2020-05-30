import {LitElement, html, customElement, property} from 'lit-element';
import '../data-provider-controller/data-provider-controller';
/**
 * Data-Manager-Controller
 *
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
  host: string | undefined;

  /**
   * The path to query API.
   */
  @property({type: String})
  path: string | undefined;

  /**
   * Header connction to API Request
   */
  @property({type: Object})
  headers = {};

  /**
   * Body connection to API Request
   */
  @property({type: String})
  body: string | undefined;

  /**
   * Parameters connection to API Request
   */
  @property({type: String})
  params: string | undefined;

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
  private _onRequestSuccess(event: any) {
    const data = event.detail.data.map((character: any) => {
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

  private _onRequestError(event: any) {
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
