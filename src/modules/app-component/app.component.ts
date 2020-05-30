import {LitElement, html, customElement, css, property} from 'lit-element';

//Controllers
import '../../controllers/data-provider-controller/data-provider-controller';
import '../../controllers/data-manager-controller/data-manager-controller';
import '../../controllers/manager-controller/manager-controller';

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
      <header-component></header-component>
      <manager-controller @data="${this._updateData}"></manager-controller>
      <pagination-component
        .paginationData="${this.data}"
        page-limit="10"
        @data-page="${this._dataPage}"
      ></pagination-component>
      <footer-component></footer-component>

      <!-- 
      <card-profile></card-profile>
      <card-list></card-list>
      <search-component></search-component>
      <spinner-component></spinner-component>
      -->
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

  // _dataSearch(event: any) {
  //   this.dataFiltered = event.detail.data;
  // }

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
