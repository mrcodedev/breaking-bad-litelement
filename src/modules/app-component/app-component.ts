import {LitElement, html, customElement, css} from 'lit-element';

//Controllers
import '../../controllers/data-provider-controller/data-provider-controller';
import '../../controllers/data-manager-controller/data-manager-controller';
import '../../controllers/data-manager/data-manager';

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
      <footer-component></footer-component>
      <data-provider-controller></data-provider-controller>
      <data-manager-controller></data-manager-controller>
      <data-manager></data-manager>
      <card-profile></card-profile>
      <card-list></card-list>
      <pagination-component></pagination-component>
      <search-component></search-component>
      <spinner-component></spinner-component>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-component': AppComponent;
  }
}
