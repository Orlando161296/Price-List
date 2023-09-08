import { LitElement, html, css } from "lit";
import { tap, Subject, takeUntil, mergeMap, takeWhile } from "rxjs";
import { Router } from "@vaadin/router";

import { shoppingCartService } from '../../../../core/services/shopping-cart-service/shopping-cart.service';
import { kanaService } from "../../../../core/services/kana-service/kana.service";
import './shopping-cart-list.style.css';

export class ShoppingCartList extends LitElement {
  static properties = {
    list: { type: Array },
  };

  constructor() {
    super();
    this.shoppingCartSrv = shoppingCartService;
    this.kanaSrv = kanaService;

    this.list = [];
    this.ammount = 0;
    this.dolarValue = 0;
    this.divisaValue = 0;
    this.shareUrl = "";

    this.componentDestroyed$ = new Subject();
  }

  firstUpdated() {
    this.shoppingCartSrv.list
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(products => this.list = products),
        mergeMap(() => this.shoppingCartSrv.ammount),
        tap(ammount => this.ammount = ammount),
        mergeMap(() => this.kanaSrv.dolarValue),
        tap(value => this.divisaValue = value),
        tap(value => (value > 1) ? this.calculatePricesToUSD(value) : ''),
        tap(() => this.requestUpdate()),
      )
      .subscribe();
  }

  render() {
    return html`
      <div class="shopping-cart-header">
        <i class="material-icons" @click=${this.goBack}>arrow_back</i>
        <span>Mi Carrito</span>
      </div>
      <div class='shopping-cart-container'>
        
        <div class='shopping-cart-detail'>
          ${this.list.length > 0
            ? this.list.map(product => {
              return html`
                <shopping-cart-detail 
                  .product=${product}
                  divisaValue=${this.divisaValue}
                  @removeProduct=${this.removeProduct}
                  @quantityChange=${this.productToShoppingCart}
                >
                </shopping-cart-detail>`;
              })
            : html`<h1 class="shopping-cart-empty">No hay productos en el carrito aún.</h1>`
          }
          ${this.list.length > 0
            ? html`<a @click='${this.cleanList}'>Limpiar Lista</a>`
            : html``
          }
        </div>

        <div class='shopping-cart-summary'>
          <shopping-cart-summary 
            dolarValue=${this.dolarValue}
            ammount=${this.ammount}
          ></shopping-cart-summary>
          ${this.list.length > 0
            ? html`
              <div class='shopping-cart-options'>
                <a 
                  @click=${this.shareList}
                  href="https://api.whatsapp.com/send?text=www.ceco-market.web.app/shopping-cart/share/${this.shareUrl}"
                  data-action="share/whatsapp/share"
                  target="_blank"
                >
                  Compartir
                </a>
              </div>
            `
            : html``
          }
        </div>

      </div>
      <footer-component></footer-component>
    `;
  }

  calculatePricesToUSD() {
    this.dolarValue = this.ammount / this.divisaValue;
    // this.list.forEach(product => product.priceUsd = product.price / this.divisaValue);
  }

  removeProduct(event) {
    const product = event.detail;
    this.shoppingCartSrv.cleanProduct(product);
  }

  productToShoppingCart(event) {
    const product = event.detail.product;
    this.shoppingCartSrv.process(product);
  }

  cleanList() {
    this.shoppingCartSrv.clean();
  }

  goBack() {
    Router.go('/browse/');
  }

  shareList() {
    const url = this.shoppingCartSrv.getShareUrl();
    this.shareUrl = url;
    this.requestUpdate();
  }

  createRenderRoot() {
    return this;
  }

  disconnectedCallback() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
customElements.define("shopping-cart-list", ShoppingCartList);
