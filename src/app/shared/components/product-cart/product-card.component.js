import { html, css, LitElement } from "lit";

export class ProductCard extends LitElement {
  static properties = {
    listProductDetail: { type: Object },
    counter: { type: Number, Reflect: true },
  };

  static styles = css`
    .card {
      background: #ffff;
      border-radius: 2px;
      display: inline-block;
      padding: 20px;
      height: auto;
      width: 360px;
      margin: 1rem;
      position: relative;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.3s cubic-bezier(0.25 0.8 0.25, 1);
    }

    .image{
      width: 70%
    }
  `;

  constructor() {
    super();
    this.listProductDetail = {};
    this.counter = 0;
  }

  render() {
    return html`
      <div class="card">
        <div class="card-content">
        <product-card-favorites-button @favorites=${this.listenerEvent}></product-card-favorites-button>
        <img class="image" src="${this.listProductDetail.images}">
          <p>${this.listProductDetail.name}</p>     
          <p>Bs. ${this.listProductDetail.price}</p>
          <product-card-button-component
            @counterChangeFromButton=${this.increment}
            @counterChangeFromButton=${this.decrement}
          ></product-card-button-component>
        </div>
      </div>
    `;
  }

  listenerEvent(e){
      console.log("esto llega al padre",e);
  }

  increment(e) {
    const productId = this.listProductDetail.id;
    const counterChange = e.detail.counterChangeB;
    const price = this.listProductDetail.price;
    const options = {
      detail: {
        counterChange,
        productId,
        price,
      },
    };
    this.dispatchEvent(new CustomEvent("counterChangeFromButton", options));
  }

  decrement(e) {
    const productId = this.listProductDetail.id;
    const counterChange = e.detail.counterChangeB;
    const price = this.listProductDetail.price;
    const options = {
      detail: {
        counterChange,
        productId,
        price,
      },
    };
    this.dispatchEvent(new CustomEvent("counterChangeFromButton", options));
  }
}

customElements.define("card-component", ProductCard);
