import {
  LitElement,
  html,
  customElement,
  css,
  property,
  TemplateResult,
} from 'lit-element';

import {PageLinks, DataSection} from '../../models/page-component.interface';

/**
 * Pagination-Component
 * Element showing pagination for elements
 * @class PaginationComponent
 */
@customElement('pagination-component')
export class PaginationComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    .container-pagination {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 25px 10px 20px 10px;
      flex-wrap: wrap;
    }

    a {
      font-size: 16px;
      color: white;
      padding: 12px 20px;
      border: 1px solid #093009;
      text-decoration: none;
      background-color: #032202;
      margin: 2px;
      cursor: pointer;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .container-pagination a[active] {
      color: white;
      background: #29773e;
    }

    .container-pagination a:hover {
      background: #1f6032;
      transition: all 0.5s ease;
    }
  `;

  @property({type: Number})
  _pageLimit = 10;

  /**
   * Elements limit per page
   */
  @property({type: Number})
  set pageLimit(value) {
    /* istanbul ignore else */
    if (value !== undefined && value > 0) {
      this._pageLimit = value;
    }

    const oldVal: number = this._pageLimit;

    this.requestUpdate('pageLimit', oldVal);
  }

  get pageLimit() {
    return this._pageLimit;
  }

  /**
   * Total number of elements in the query
   */
  @property({type: Number})
  numberElements = 0;

  /**
   * What is the page that is active
   */
  @property({type: Number})
  activePageIndex = 0;

  /**
   * Array with the pages to show with information about each one
   */
  @property({type: Array})
  numberPages: PageLinks[] = [];

  /**
   * Getter/Setter paginationData
   */
  @property({type: Array})
  _paginationData: object[] = [];

  /**
   * Data to create the pagination
   */
  @property({
    type: Array,
  })
  set paginationData(value) {
    const oldVal: object[] = this._paginationData;
    this._paginationData = value;
    this.requestUpdate('paginationData', oldVal);

    /* istanbul ignore else */
    if (oldVal !== value && this.paginationData !== undefined) {
      this._updateDataPages();
    }
  }
  get paginationData() {
    return this._paginationData;
  }

  /**
   * Data to show per page
   */
  @property({
    type: Array,
  })
  dataPage: object[] = [];

  constructor() {
    super();
  }

  render() {
    return html`
      <div id="pagination" class="container-pagination">
        ${this.generatePreviousActionHTML()} ${this.generateLinkPagesHTML()}
        ${this.generateNextActionHTML()}
      </div>
    `;
  }

  /**
   * Generate HTML previous page with actions
   *
   * @return {object} Data previous page HTML
   */
  public generatePreviousActionHTML(): object {
    const previousAction: TemplateResult = html`<a
      id="previous"
      @click="${this.previousPage}"
      >&laquo;</a
    >`;

    return previousAction;
  }

  /**
   * Generate HTML next page with actions
   *
   * @return {object} Data next page HTML
   */
  public generateNextActionHTML(): object {
    const nextAction: TemplateResult = html`<a
      id="next"
      @click="${this.nextPage}"
      >&raquo;</a
    >`;

    return nextAction;
  }

  /**
   * Generate HTML numbers of pages with actions
   *
   * @return {object} Number pages to show in HTML
   */
  public generateLinkPagesHTML(): object[] {
    const pagesMap: TemplateResult[] = this.numberPages.map(
      (item: PageLinks) => {
        return html`<a
          id="${item.id}"
          ?active="${this.isActive(item.active)}"
          @click="${() => this.changeActivePage(item)}"
          >${item.page}</a
        >`;
      }
    );

    return pagesMap;
  }

  /**
   * Generate the data of pages in Array
   */
  public generatePageIndexes(): void {
    let numberPages: number = this.numberElements / this.pageLimit;
    numberPages =
      numberPages % 1 === 0 ? numberPages : Math.floor(numberPages) + 1;

    const result: PageLinks[] = Array.from(
      {
        length: numberPages,
      },
      (element: undefined, index: number) => {
        return {
          id: index,
          page: index + 1,
          active: this.activePageIndex === index,
        };
      }
    );

    this.numberPages = result;
    this.pageEvent();
  }

  /**
   * Change the active page
   */
  public changeActivePage(event: PageLinks): void {
    if (event.page - 1 !== this.activePageIndex) {
      this.activePageIndex = event.id;
      this._updateDataPages('change-active-page');
    }
  }

  /**
   * Action to previous page
   */
  public previousPage(): void {
    if (this.activePageIndex >= 1) {
      this.activePageIndex = this.activePageIndex - 1;
      this._updateDataPages('previous-page');
    }
  }

  /**
   * Action to next page
   */
  public nextPage(): void {
    if (this.activePageIndex < this.numberPages.length - 1) {
      this.activePageIndex = ++this.activePageIndex;
      this._updateDataPages('next-page');
    }
  }

  /**
   * Check if the actual page is active
   *
   * @return {boolean} show if page is active
   */
  public isActive(active: boolean): boolean {
    return active ? true : false;
  }

  /**
   * Generate the number of page according items
   */
  private _updateDataPages(dataSection?: DataSection): void {
    this.numberElements = this.paginationData.length;
    this.dataPage = [];
    let firstElement: number;
    let lastElement: number;

    if (
      dataSection !== 'change-active-page' &&
      dataSection !== 'previous-page' &&
      dataSection !== 'next-page'
    ) {
      this.activePageIndex = 0;
    }

    if (this.numberElements > this.pageLimit) {
      firstElement = this.pageLimit * this.activePageIndex;
      lastElement = firstElement + (this.pageLimit - 1);
    } else {
      firstElement = 0;
      lastElement = this.numberElements - 1;
    }

    for (let i: number = firstElement; i <= lastElement; i++) {
      /* istanbul ignore else */
      /* istanbul ignore next */
      if (i < this.numberElements || this.pageLimit > this.numberElements) {
        this.dataPage.push(this.paginationData[i]);
      } else {
        break;
      }
    }

    this.generatePageIndexes();
  }

  /**
   * Dispatch event to the data to show
   */
  public pageEvent(): void {
    this.dispatchEvent(
      new CustomEvent('data-page', {
        detail: {
          data: this.dataPage,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pagination-component': PaginationComponent;
  }
}
