import {LitElement, html, customElement, css, property} from 'lit-element';

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
  `;

  render() {
    return html`
      <spinner-component
        .stateSpinner="${this.showSpinner}"
      ></spinner-component>
      <header-component></header-component>
      <manager-controller @data="${this.updateData}"></manager-controller>
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

  constructor() {
    super();
  }

  /**
   * Update data of API
   */
  public updateData(event: CustomEvent): void {
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
}

declare global {
  interface HTMLElementTagNameMap {
    'app-component': AppComponent;
  }
}
