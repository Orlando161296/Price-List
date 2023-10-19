import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";

import { favoriteService } from "../../core/services/favorite-service/favorite.service";
import { shoppingCartService } from '../../core/services/shopping-cart-service/shopping-cart.service'

import './favorites-browse.styles.css';
import { filter, tap } from "rxjs";
import { productsMediator } from "../../core/services/productsMediator.service";

export class FavoritesBrowse extends LitElement {

  constructor() {
    super();
    this.favoriteSrv = favoriteService;
    this.shoppingCartSrv = shoppingCartService;
    this.productsMediator = productsMediator;

    this.loader = false;
    this.favoriteList = [];
  
    this.productsMediator.paginationProducts$
      .pipe(
        filter(response => response.length > 0),
        tap(() => this.favoriteList = this.favoriteSrv.getFavorites()),
        tap(() => this.loader = true),
        tap(() => this.requestUpdate()),
      )
      .subscribe();
  }

  firstUpdated() {
    
  }

  render() {
    return html`
      <div class="favorite-container">
        
        <div class="options">
          <i class="material-icons" @click=${this.goBack}>arrow_back</i>
          <span>Mis Favoritos</span>
        </div>

        ${
          (this.loader)
          ? html`
            <div class="products">
              ${this.favoriteList.map(product => {
                product.style = this.favoriteSrv.verifyProduct(product.id)
                return html`<product-card
                  @quantityChange=${this.productToShoppingCart}
                  @productFavorite=${this.addProductToFavorites}
                  .product="${product}"></product-card>`;
              })}
            </div>
          `
          : html`<loader-component></loader-component>`
        }

      </div>
      <footer-component></footer-component>
    `;
  }

  // funcion de prueba 
  productToShoppingCart(event) {
    const product = event.detail.product;
    this.shoppingCartSrv.process(product);
  }

  addProductToFavorites(event) {
    let product = event.detail.product;
    const active = this.favoriteSrv.favoriteInteractive(product);
    let list = favoriteService.getFavorites();
    this.favoriteList = list;
    this.requestUpdate();
  }

  /**
   * verifica el producto y obtiene las cantidad
   * @param {object} product 
   * @returns {number} cantidad del producto pasado
   */
  getQuantity(product){
    let verifiedProduct = this.shoppingCartSrv.verifyDoExist(product);
    return verifiedProduct;
  }

  goBack(){
    Router.go("/browse/");
  }

  createRenderRoot() {
    return this;
  }

}
customElements.define("favorites-browse", FavoritesBrowse);
