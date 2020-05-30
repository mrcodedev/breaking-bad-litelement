import {LitElement, html, customElement, css, property} from 'lit-element';

/**
 * Spinner-Component
 *
 */
@customElement('spinner-component')
export class SpinnerComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .container__spinner {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 100;
    }

    .spinner__icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .spinner__icon img {
      width: 12%;
      max-width: 150px;
      min-width: 100px;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  `;

  render() {
    `${
      this.stateSpinner ? html`<p>something</p>` : html`<p>something else</p>`
    }`;

    return html`
      ${this.stateSpinner
        ? html` <div class="container__spinner">
            <div class="spinner__icon">
              <img
                src="../../../assets/images/spinner.png"
                alt="Heisenberg Spinner"
              />
            </div>
          </div>`
        : html``}
    `;
  }

  @property({type: Boolean})
  stateSpinner = false;
}

declare global {
  interface HTMLElementTagNameMap {
    'spinner-component': SpinnerComponent;
  }
}
