// import {LitElement, html, customElement, css, property} from 'lit-element';

// /**
//  * Search-Component
//  *
//  */
// @customElement('search-component')
// export class SearchComponent extends LitElement {
//   static styles = css`
//     :host {
//       display: block;
//       font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
//         Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
//     }

//     .container-search {
//       display: flex;
//       flex-direction: row;
//       align-items: center;
//       justify-content: center;
//       margin: 20px 25px;
//     }

//     .container-search input[type='text'] {
//       width: 100%;
//       max-width: 500px;
//       height: 30px;
//       padding: 6px 6px 6px 12px;
//       font-size: 17px;
//       border: none;
//       outline: none;
//     }

//     .container-search div {
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       height: 42px;
//       padding: 0px 10px 0 2px;
//       background: white;
//       font-size: 17px;
//       border: none;
//     }

//     .search-icon {
//       width: 20px;
//       height: 20px;
//       opacity: 0.3;
//       transition: all 0.5s ease;
//     }

//     .container-search:hover .search-icon {
//       opacity: 0.5;
//       transition: all 0.5s ease;
//     }
//   `;

//   render() {
//     return html`
//       <div class="container-search">
//         <input
//           type="text"
//           placeholder="Search..."
//           name="search"
//           value="{{valueToSearch::input}}"
//           @keyup="${this._searchFilter}"
//         />
//         <div type="submit">
//           <img
//             src="../../../assets/icons/search-icon.png"
//             class="search-icon"
//             alt="search-icon"
//           />
//         </div>
//       </div>
//     `;
//   }

//   // searchData: {
//   //   type: Array,
//   //   observer: '_searchData'
//   // },
//   // valueToSearch: {
//   //   type: String,
//   // },
//   // filteredData: {
//   //   type: Array,
//   // }
//   // FALTA VER COMO HACER EL OBSERVER

//   @property({type: Array)
//   searchData: any;

//   @property({type: String})
//   valueToSearch = '';

//   @property({type: Array})
//   filteredData: any;

//   updated(changedProperties: any) {
//     console.log(changedProperties); // logs previous values
//   }

//   _searchData(data: any) {
//     this.searchData = data;
//   }

//   _searchFilter() {
//     if (this.searchData.length > 0) {
//       this.filteredData = this.searchData.filter(
//         (search: any) =>
//           search.name
//             .toLowerCase()
//             .includes(this.valueToSearch.toLowerCase()) ||
//           search.nickname
//             .toLowerCase()
//             .includes(this.valueToSearch.toLowerCase()) ||
//           search.playedBy
//             .toLowerCase()
//             .includes(this.valueToSearch.toLowerCase()) ||
//           search.status.toLowerCase().includes(this.valueToSearch.toLowerCase())
//       );

//       this._searchEvent();
//     }
//   }

//   _searchEvent() {
//     this.dispatchEvent(
//       new CustomEvent('data-search', {
//         detail: {
//           data: this.filteredData,
//         },
//         bubbles: true,
//         composed: true,
//       })
//     );
//   }
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     'search-component': SearchComponent;
//   }
// }
