import {property} from 'lit-element';
import {SpinnerComponent} from './spinner.component';
import {fixture, html, expect} from '@open-wc/testing';

const assert = chai.assert;
suite('Spinner', () => {
  test('is defined', () => {
    const el = document.createElement('spinner-component');
    assert.instanceOf(el, SpinnerComponent);
  });

  test('renders with default values', async () => {
    const stateSpinner = false;

    const el = await fixture(
      html`<spinner-component
        .stateSpinner=${stateSpinner}
      ></spinner-component>`
    );
    assert.shadowDom.equal(el, '');
  });

  test('renders with default values', async () => {
    const stateSpinner = true;

    const el = await fixture(
      html`<spinner-component
        .stateSpinner=${stateSpinner}
      ></spinner-component>`
    );
    assert.shadowDom.equal(
      el,
      `
    <div class="container__spinner">
      <div class="spinner__icon">
        <img alt="Heisenberg Spinner" src="../../../assets/images/spinner.png"></div></div>
    `
    );
  });
});
