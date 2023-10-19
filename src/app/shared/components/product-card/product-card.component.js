import { html, LitElement } from "lit";

import { shoppingCartService } from "../../../core/services/shopping-cart-service/shopping-cart.service";
import { favoriteService } from "../../../core/services/favorite-service/favorite.service";
import './product-card.style.css';

export class ProductCard extends LitElement {

  static properties = {
    product: { type: Object },
    counter: { type: Number, Reflect: true },
    active: { type: Boolean },
  };

  constructor() {
    super();
    this.favoriteSrv = favoriteService;
    this.shoppingCartSrv = shoppingCartService;
    this.counter = 0;
    this.active = false;
  }

  render() {
    return html`
      <div class="card-content">
        
        <div class="card-image">
          <img class="image" src="${this.product.images}" />
        </div>
          
        <div class="card-description">
          <p class="title">${this.product.name} ${this.product.presentation}</p>
          <p class="description">Bs. ${this.product.price.toFixed(2)}</p>
          
          <product-card-favorites-button
            class="favorite"
            .active=${this.product.style}
            @addProductToFavorites=${this.addProductToFavorites}>
          </product-card-favorites-button>
          
        </div>

        <product-card-button
          class="card-button"
          counter=${this.product.quantity}
          @modifyQuantity=${this.quantityChange}
        ></product-card-button>

      </div>
    `;
  }


  addProductToFavorites(e) {
    const options = {
      detail: { product: this.product },
    };
    this.product.style = !this.product.style;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent("productFavorite", options,));
  }


  quantityChange(event) {
    const product = {
      ...this.product,
      quantity: event.detail.quantity,
    }

    const options = {
      detail: {
        product,
      },
    };

    this.dispatchEvent(new CustomEvent("quantityChange", options));
  }

  createRenderRoot() {
    return this;
  }

}

customElements.define('product-card', ProductCard);
