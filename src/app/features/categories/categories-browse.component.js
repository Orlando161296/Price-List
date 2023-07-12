import { LitElement, html } from "lit";

import './categories-browse.styles.css';
import { productsMediator } from '/src/app/core/services/productsMediator.service'
import { categoriesBrowseState } from "./services/categorie-browse-state.service";
import { shoppingCartService } from '../../core/services/shopping-cart-service/shopping-cart.service';
import { favoriteService } from "../../core/services/favorite-service/favorite.service";
import { categoriesList } from './categories.list';

export class CategoriesBrowse extends LitElement {

  constructor() {
    super();
    this.productsMediator = productsMediator;
    this.categoriesSrv = categoriesBrowseState;
    this.shoppingCartSrv = shoppingCartService;
    this.favoriteSrv = favoriteService;

    this.productList = [];
    this.categoriesList = categoriesList;
  }

  async onBeforeEnter(location) {
    const params = location.params.name.replace(/-/g, ' ');
    this.productList = this.productsMediator.getProductsForCategory(params);
    this.categoriesSrv.currentPosition.next(params);
  }

  async onBeforeLeave() {
    this.categoriesSrv.currentPosition.next();
  }

  render() {
    return html`
      <div class="categories-container">

        <div class='categories-body'>
          <categories-list .categoriesList=${this.categoriesList}></categories-list>

          <div class="products">
            ${this.productList.length > 0
              ? html`
                ${this.productList.map((product) => {
                  product.style = this.favoriteSrv.verifyProduct(product.id);
                  return html`
                    <product-card
                      counter=${this.getQuantity(product)}
                      .product="${product}"
                      @quantityChange=${this.productToShoppingCart}
                      @productFavorite=${this.addProductToFavorites}
                    ></product-card>
                  `;
                })}`
              : html`<div>No hay productos en esta categoría aún</div>`
            }
          </div>
        </div>

      </div>
    `;
  }

  productToShoppingCart(event) {
    const product = event.detail.product;
    this.shoppingCartSrv.process(product);
  }

  addProductToFavorites(event) {
    const product = event.detail.product;
    this.favoriteSrv.newFavorite$.next(product);
  }

  getQuantity(product) {
    let existsProduct = this.shoppingCartSrv.verifyDoExist(product);
    return existsProduct;
  }

  createRenderRoot() {
    return this;
  }

}
customElements.define("categories-browse", CategoriesBrowse);
