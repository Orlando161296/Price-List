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
    const target = this.renderRoot?.querySelector("#increase") ?? { value: 0 };
    console.log(target);
    return target
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
                
                <button @click=${this.increment}>+</button>
              </div>
            `}
      </div>
    `;
  }

  modifyQuantityByInput() {
    const inputValue = this.input.value;
    if(inputValue <= 0) return;
    const quantity = this.counter = inputValue;
    console.log(" this.counter", this.counter);
    console.log(" this.counter", {inputValue});

    const options = {
      detail: { quantity },
    };
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('modifyQuantity', options));
  }

  increment() {
    this.counter++;
    const quantity = this.counter;
    this.input.value = this.counter;
    const options = {
      detail: { quantity },
    };

    this.dispatchEvent(new CustomEvent('modifyQuantity', options));
    this.requestUpdate();
  }

  decrement() {
    this.counter--;
    const quantity = this.counter;
    this.input.value = this.counter;

    const options = {
      detail: { quantity },
    };
    this.requestUpdate();

    this.dispatchEvent(new CustomEvent('modifyQuantity', options));
  }

  createRenderRoot() {
    return this;
  }

}

customElements.define('product-card-button', ProductCardButton);
