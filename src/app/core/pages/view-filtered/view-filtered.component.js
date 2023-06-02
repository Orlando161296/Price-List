import { html, LitElement } from "lit";
import { filter, map, tap } from "rxjs";

import { productsMediator } from "../../services/productsMediator.service";
import { favoriteService } from "../../services/favorite-service/favorite.service";
import { shoppingCartService } from '/src/app/features/shopping-cart/services/shopping-cart.service';

import "./view-filtered.styles.css";

export class ViewFilteredComponent extends LitElement {

  constructor() {
    super();
    this.productsMediator = productsMediator;
    this.favoriteSrv = favoriteService;
    this.shoppingCartSrv = shoppingCartService;

    this.listProduct = [];
    this.params = '';

    this.loader = false;
  }

  render() {
    return html`
    <div class="content">
      ${(this.loader)
        ? html`
          <div class="container-cards-filtered">
            ${
              (this.listProduct.length > 0)
              ? html`
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
                })}`
              : html`<div class="message">No hay productos que coincidan con tu búsqueda: <b>(${this.params})</b></div>`
            }  
          </div>`
        : html`
          <div class="loader-content">
            <loader-component></loader-component>
          </div>
        `      
      }
      <footer-component></footer-component>
    </div>
    `;
  }

  async onBeforeEnter(location) {
    const params = location.params.name;
    this.params = params;

    const getProductsFiltered$ = this.productsMediator.paginationProducts$
      .pipe(
        filter(response => response.length > 0),
        map(() => this.productsMediator.filterForName(params)),
        tap(filter => this.listProduct = filter),
        tap(() => this.loader = !this.loader),
        tap(() => this.requestUpdate()),
      )
    getProductsFiltered$.subscribe();

  }

  addProductToFavorites(event) {
    const product = event.detail.product;
    this.favoriteSrv.newFavorite$.next(product);
  }

  productToShoppingCart(event) {
    const product = event.detail.product;
    this.shoppingCartSrv.process(product);
  }

  getQuantity(product) {
    let existsProduct = this.shoppingCartSrv.verifyDoExist(product);
    return existsProduct;
  }

  createRenderRoot() {
    return this;
  }

}
customElements.define("view-filtered", ViewFilteredComponent);
