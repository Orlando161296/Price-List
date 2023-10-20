import { html, LitElement } from "lit";
import { debounceTime, filter, tap } from "rxjs";

import { productsMediator } from "../../services/productsMediator.service";
import { favoriteService } from "./../../services/favorite-service/favorite.service";
import { shoppingCartService } from '../../services/shopping-cart-service/shopping-cart.service';

import "./home-browse.style.css";

export class HomeBrowse extends LitElement {

  constructor() {
    super();
    this.productsMediator = productsMediator;
    this.favoriteSrv = favoriteService;
    this.shoppingCartSrv = shoppingCartService;

    this.listProduct = [];
    this.limit = 0;
    this.loader = false;
  }

  render() {
    return html`
      <div class="container-home">
      ${
        (this.loader)
        ? html`
          <div class="container-cards">
            ${this.listProduct.map((product) => {
              product.style = this.favoriteSrv.verifyProduct(product.id)
              return html`
                <product-card
                  counter=${this.getQuantity(product)}
                  @quantityChange=${this.productToShoppingCart}
                  .product=${product}
                  @productFavorite=${this.addProductToFavorites}
                >
                </product-card>
              `;
            })}
          </div>`
        : html`<loader-component ></loader-component>`
      }
      
      ${
        (this.loader && this.listProduct.length < this.limit)
        ? html`
          <div class="container-button">
            <button
              class="${this.activeButton ? 'active' : ''}"
              @click="${this.incrementProducts}"
            >
              Ver más
            </button>
          </div>`
        : html``
      }
      </div>
      <footer-component></footer-component>
    `;
  }
  firstUpdated() {
    const getProducts$ = this.productsMediator.paginationProducts$
      .pipe(
        filter(response => response.length > 0),
        debounceTime(200),
        tap(response =>  this.listProduct = response),
        tap(() => this.limit = this.productsMediator.limit),
        tap(() => this.loader = true),
        tap(() => this.requestUpdate()),
      )
      
    getProducts$.subscribe();
  }

  //METODO PARA AGREGAR A FAVORITOS
  addProductToFavorites(event) {
    const product = event.detail.product;
    this.favoriteSrv.newFavorite$.next(product);
  }

  productToShoppingCart(event) {
    const product = event.detail.product;
    this.shoppingCartSrv.process(product);
  }

  incrementProducts(){
    this.productsMediator.pagination(this.listProduct.length+8);
  }

  getQuantity(product) {
    const existsProduct = this.shoppingCartSrv.verifyDoExist(product);
    return existsProduct;
  }

  createRenderRoot() {
    return this;
  }
}
customElements.define("home-browse", HomeBrowse);
