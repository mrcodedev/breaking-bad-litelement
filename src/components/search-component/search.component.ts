import {LitElement, html, customElement, css, property} from 'lit-element';

import {DataModel} from '../../models/data-model.interface';

/**
 * Search-Component
 * Searcher to API
 * @class SearchComponent
 */
@customElement('search-component')
export class SearchComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    .container-search {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 20px 25px;
    }

    .container-search input[type='text'] {
      width: 100%;
      max-width: 500px;
      height: 30px;
      padding: 6px 6px 6px 12px;
      font-size: 17px;
      border: none;
      outline: none;
    }

    .container-search div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 42px;
      padding: 0px 10px 0 2px;
      background: white;
      font-size: 17px;
      border: none;
    }

    .search-icon {
      width: 20px;
      height: 20px;
      opacity: 0.3;
      transition: all 0.5s ease;
    }

    .container-search:hover .search-icon {
      opacity: 0.5;
      transition: all 0.5s ease;
    }
  `;

  render() {
    return html`
      <div class="container-search">
        <input
          type="text"
          placeholder="Search..."
          name="search"
          @input="${(event: InputEvent) =>
            this._assignAndSearch(
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              (<HTMLInputElement>event.target).value!
            )}"
        />
        <div type="submit">
          <img
            src="../../../assets/icons/search-icon.png"
            class="search-icon"
            alt="search-icon"
          />
        </div>
      </div>
    `;
  }

  /**
   * Data to search
   */
  @property({type: Array})
  private searchData: DataModel[] = [];

  /**
   * Value to search
   */
  @property({type: String})
  private valueToSearch = '';

  /**
   * Array filtered data searched
   */
  @property({type: Array})
  private filteredData: object[] = [];

  constructor() {
    super();
  }

  /**
   * Generate HTML previous page with actions
   */
  private _assignAndSearch(data: string): void {
    this.valueToSearch = data;
    this._searchFilter();
  }

  /**
   * Filter the data and invocate the searchEvent
   */
  private _searchFilter(): void {
    if (this.searchData.length > 0) {
      this.filteredData = this.searchData.filter(
        (search: DataModel) =>
          search.name
            .toLowerCase()
            .includes(this.valueToSearch.toLocaleLowerCase()) ||
          search.nickname
            .toLowerCase()
            .includes(this.valueToSearch.toLocaleLowerCase()) ||
          search.playedBy
            .toLowerCase()
            .includes(this.valueToSearch.toLocaleLowerCase()) ||
          search.status
            .toLowerCase()
            .includes(this.valueToSearch.toLocaleLowerCase())
      );

      this._searchEvent();
    }
  }

  /**
   * Generate HTML previous page with actions
   */
  private _searchEvent(): void {
    this.dispatchEvent(
      new CustomEvent('data-search', {
        detail: {
          data: this.filteredData,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'search-component': SearchComponent;
  }
}
