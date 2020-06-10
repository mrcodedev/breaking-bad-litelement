import {FooterComponent} from './footer.component';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('footer-component', () => {
  test('is defined', () => {
    const el = document.createElement('footer-component');
    assert.instanceOf(el, FooterComponent);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<footer-component></footer-component>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="footer_container">
        <p class="api-author">
          API Rest of
          <a
            href="https://breakingbadapi.com/"
            target="_blank"
          >
            API Breaking Bad
          </a>
          - All trademarks are the property of their respective owners
        </p>
        <p class="author">
          Developed and designed by
          <a
            href="http://www.mrcodedev.com"
            target="_blank"
          >
            MrCodeDev
          </a>
        </p>
        <p class="repositories">
          <a
            href="https://gitlab.com/mrcodedev/breaking-litelement"
            target="_blank"
          >
            <img
              alt="GitLab Logo"
              class="gitlab"
              src="../../../assets/icons/gitlab.svg"
            >
          </a>
          <a
            href="https://github.com/mrcodedev/breaking-bad-litelement"
            target="_blank"
          >
            <img
              alt="GitHub Logo"
              class="github"
              src="../../../assets/icons/github.png"
            >
          </a>
        </p>
      </div>
    `
    );
  });
});
