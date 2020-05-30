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
      <p class="api-author">API Rest of <a href="https://breakingbadapi.com/" target="_blank">API Breaking Bad</a> - All
        trademarks are
        the
        property of their respective owners</a></p>
      <p class="author">Developed and designed by <a href="http://www.mrcodedev.dev" target="_blank">MrCodeDev</a></p>
      <p class="repositories"><a href="https://gitlab.com/mrcodedev/breaking-polymer" target="_blank"><img
            src="../../../assets/icons/gitlab.svg" class="gitlab" alt="GitLab Logo"></a>
      </p>
    </div>
    `
    );
  });
});
