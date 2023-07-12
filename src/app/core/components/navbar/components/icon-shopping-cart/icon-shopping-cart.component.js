import { Router } from "@vaadin/router";
import { html, css, LitElement } from "lit";
import { tap } from "rxjs";

import { shoppingCartService } from '../../../../services/shopping-cart-service/shopping-cart.service';
import './icon-shopping-cart.style.css';

export class IconShoppingCart extends LitElement {
  static properties = {};

  constructor() {
    super();
    this.counter = 0;
    this.shoppingCartSrv = shoppingCartService;
  }

  firstUpdated() {
    const result$ = this.shoppingCartSrv.counter
      .pipe(
        tap(counter => this.counter = counter),
        tap(() => this.requestUpdate()),
      );
    result$.subscribe();
  }

  render() {
    return html`
      <div class="shoppint-card-container">
        <div class="counter-card-container">
          <span class="card-counter">${this.counter}</span>
        </div>  

        <img
          class="img-card" 
          src="/src/assets/images/el_shopping-cart-sign.svg" 
          @click=${this.goToShoppingCart}
        >
      </div> 
    `;
  }

  goToShoppingCart() {
    Router.go('/shopping-cart/list/');
  }

  createRenderRoot() {
    return this;
  }
}
customElements.define("shoppingcart-component", IconShoppingCart);
