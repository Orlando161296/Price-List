import { html, LitElement } from "lit";

import './product-card-button.style.css';

export class ProductCardButton extends LitElement {
  static properties = {
    counter: { 
      type: Number, 
      Reflect: true,
    },
  };

  get input() {
    return this.renderRoot?.querySelector("#increase") ?? -1;
  }

  constructor() {
    super();
    this.counter = 0;
  }

  render() {
    const validateCounter = this.counter === 0;
    return html`
      <div class="card-product-button-container">
        ${validateCounter
          ? html`
              <button 
                class="addButton" 
                @click=${this.increment}
              >
                Agregar
              </button>
            `
          : html`
              <div class="button-container">\
                <button @click=${this.decrement}>-</button>
                <input
                  id="increase"
                  type="number"
                  @keyup=${this.modifyQuantityByInput}
                  value=${this.counter}
                >
                </input>
                <button @click=${this.increment}>+</button>
              </div>
            `}
      </div>
    `;
  }

  modifyQuantityByInput() {
    const inputValue = Number(this.input.value);
    if(inputValue < 0) inputValue = 0;
    const quantity = this.counter = inputValue;
    console.log(this.counter, inputValue);
    const options = {
      detail: { quantity },
    };

    this.dispatchEvent(new CustomEvent('modifyQuantity', options));
  }

  increment() {
    this.counter++;
    const quantity = this.counter;
    console.log(this.counter);
    const options = {
      detail: { quantity },
    };

    this.dispatchEvent(new CustomEvent('modifyQuantity', options));
  }

  decrement() {
    this.counter--;
    const quantity = this.counter;
    const options = {
      detail: { quantity },
    };

    this.dispatchEvent(new CustomEvent('modifyQuantity', options));
  }

  createRenderRoot() {
    return this;
  }

}

customElements.define('product-card-button', ProductCardButton);
