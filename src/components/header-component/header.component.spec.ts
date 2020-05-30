import {HeaderComponent} from './header.component';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('header-component', () => {
  test('is defined', () => {
    const el = document.createElement('header-component');
    assert.instanceOf(el, HeaderComponent);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<header-component></header-component>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="header_container">
        <img src="../../../assets/images/breaking-bad-logo.svg" />
      </div>
    `
    );
  });
});
