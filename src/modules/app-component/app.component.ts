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

/**
 * App-Component.
 *
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
      <manager-controller @data="${this._updateData}"></manager-controller>
      <search-component
        .searchData="${this.data}"
        @data-search="${this._dataSearch}"
      ></search-component>
      <pagination-component
        .paginationData="${this.dataFiltered}"
        pagelimit="12"
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
  data: any;

  @property({type: Array})
  dataset: any;

  @property({type: Array})
  dataFiltered: any;

  @property({type: Array})
  dataPage: any;

  @property({type: Boolean})
  showSpinner = true;

  constructor() {
    super();
  }

  _updateData(event: any) {
    this.data = event.detail.data;
    this.dataFiltered = event.detail.data;
  }

  _dataSearch(event: any) {
    this.dataFiltered = event.detail.data;
  }

  _dataPage(event: any) {
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
