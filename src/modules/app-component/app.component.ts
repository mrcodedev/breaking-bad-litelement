import {
  LitElement,
  html,
  customElement,
  css,
  property,
  TemplateResult,
} from 'lit-element';

//Controllers
import '../../controllers/data-provider-controller/data-provider-controller';
import '../../controllers/data-manager-controller/data-manager-controller';
import '../../controllers/manager-controller/manager-controller';

//Components
import '../../components/card-profile-component/card-profile.component';
import '../../components/card-list-component/card-list.component';
import '../../components/header-component/header.component';
import '../../components/footer-component/footer.component';
import '../../components/pagination-component/pagination.component';
import '../../components/search-component/search.component';
import '../../components/spinner-component/spinner.component';

//Interfaces
import {DataModel} from '../../models/data-model.interface';

/**
 * App-Component
 * Component to link the controller and Components
 * @class AppComponent
 */
@customElement('app-component')
export class AppComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    p {
      display: block;
      margin-block-start: 0em;
      margin-block-end: 0em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }

    .container-error {
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 40px 20px;
      text-align: center;
    }

    .emoticon {
      margin: 30px 20px;
      font-size: 72px;
      font-weight: bold;
    }

    .text-message,
    .text-error {
      font-size: 20px;
    }
  `;

  render() {
    return html`
      <spinner-component
        .stateSpinner="${this.showSpinner}"
      ></spinner-component>
      <header-component></header-component>
      <manager-controller
        @data="${this.updateData}"
        @data-error="${this.errorData}"
      ></manager-controller>

      ${this.errorEventStatus
        ? this.generateHTMLError()
        : this.generateHTMLData()}

      <footer-component></footer-component>
    `;
  }

  /**
   * Data return of API
   */
  @property({type: Array})
  data: DataModel[] = [];

  /**
   * Data Filtered of Search
   */
  @property({type: Array})
  dataFiltered: DataModel[] = [];

  /**
   * Data Elements of Pagination
   */
  @property({type: Array})
  dataPage: DataModel[] = [];

  /**
   * Show spinner of not
   */
  @property({type: Boolean})
  showSpinner = true;

  /**
   * Data event fired
   */
  @property({type: Boolean})
  dataEventStatus = false;

  /**
   * Error event fired
   */
  @property({type: Boolean})
  errorEventStatus = false;

  /**
   * Error message
   */
  @property({type: String})
  errorMessage = '';

  constructor() {
    super();
  }

  /**
   * Generate HTML Data API
   */
  public generateHTMLData(): TemplateResult {
    const htmlDataEvent: TemplateResult = html`
      <search-component
        .searchData="${this.data}"
        @data-search="${this.dataSearch}"
      ></search-component>
      <pagination-component
        .paginationData="${this.dataFiltered}"
        pageLimit="10"
        @data-page="${this._dataPage}"
      ></pagination-component>
      <card-list .cardlistData="${this.dataPage}"></card-list>
    `;

    return htmlDataEvent;
  }

  /**
   * Generate HTML Data Error
   */
  public generateHTMLError(): TemplateResult {
    const htmlErrorEvent: TemplateResult = html` <div class="container-error">
      <p class="text-message">Lo sentimos, hemos encontrado un error</p>
      <p class="emoticon">:(</p>
      <p class="text-error">Error - ${this.errorMessage}</p>
    </div>`;

    return htmlErrorEvent;
  }

  /**
   * Update data of API
   */
  public updateData(event: CustomEvent): void {
    this.dataEventStatus = true;
    this.data = event.detail.data;
    this.dataFiltered = event.detail.data;
  }

  /**
   * Update data of search
   */
  public dataSearch(event: CustomEvent): void {
    this.dataFiltered = event.detail.data;
  }

  /**
   * Update data of pagination
   */
  public _dataPage(event: CustomEvent): void {
    this.dataPage = event.detail.data;
    if (event.detail.data.length > 0) {
      this.showSpinner = false;
    }
  }

  /**
   * Error data
   */
  public errorData(error: CustomEvent): void {
    this.errorEventStatus = true;
    this.errorMessage = error.detail.data;
    this.showSpinner = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-component': AppComponent;
  }
}
