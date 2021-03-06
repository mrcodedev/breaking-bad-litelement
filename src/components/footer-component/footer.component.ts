import {LitElement, html, customElement, css} from 'lit-element';

/**
 * Footer-Component
 * Footer Component to show footer text
 * @class FooterComponent
 */
@customElement('footer-component')
export class FooterComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    .footer_container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      margin: 0px 25px;
      border-top: 1px solid #255303;
      padding: 20px 20px 5px 20px;
    }

    .author,
    .api-author {
      font-size: 12px;
      text-align: center;
    }

    a {
      color: white;
    }

    p {
      margin-block-start: 0em;
      margin-block-end: 0em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }

    .repositories {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .repositories img {
      padding: 4px;
    }

    .gitlab {
      margin-top: 2px;
      width: 35x;
      height: 35px;
    }

    .github {
      width: 22px;
      height: 22px;
    }
  `;

  render() {
    return html`
    <div class="footer_container">
      <p class="api-author">API Rest of <a href="https://breakingbadapi.com/" target="_blank">API Breaking Bad</a> - All trademarks are the property of their respective owners</a></p>
      <p class="author">Developed and designed by <a href="http://www.mrcodedev.com" target="_blank">MrCodeDev</a></p>
      <p class="repositories"><a href="https://gitlab.com/mrcodedev/breaking-litelement" target="_blank"><img
            src="../../../assets/icons/gitlab.svg" class="gitlab" alt="GitLab Logo"></a>
            <a href="https://github.com/mrcodedev/breaking-bad-litelement" target="_blank"><img src="../../../assets/icons/github.png" class="github" alt="GitHub Logo"></a>
      </p>
    </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'footer-component': FooterComponent;
  }
}
