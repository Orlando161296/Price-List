import { BehaviorSubject, filter, tap, map } from "rxjs";

import { localStorageShoppingCartService } from "./localstorage-shopping-cart.service";
import { productsMediator } from "../productsMediator.service";

class ShoppingCartService {

    constructor() {
        /*Inyección de dependencias del servicio de localStorage*/
        this.localStorageSrv = localStorageShoppingCartService;
        this.productsMediator = productsMediator;
        /**busca la lista de productos almacenada en el localStorage */
        this.products = this.localStorageSrv.get() || [];
        this.currentList = [];
        this.currentList$ = new BehaviorSubject(this.currentList);
        this.counter = new BehaviorSubject(this.products.length);
        this.ammount = new BehaviorSubject(0);

        this.productsMediator.paginationProducts$
            .pipe(
                filter(response => response.length > 0),
                map(() => this.products.map(product => this.productConstructed(product))),
              
                tap(newList => this.currentList = newList),
                tap(newList => this.currentList$.next(newList)),
                tap(() => this.calculateTotal()),
            )
            .subscribe();

        this.calculateTotal();
    }

    productConstructed(product) {
        const productKana = this.productsMediator.getProductById(product.id);
        productKana.quantity = product.quantity;
        return productKana;
      }

    generateNewListProduct(productFromKana, productsFromLocalStorage){
        // traer la nueva lista de precios desde Kana
        
        //tener los datos del localStrorage
        //comparar dos listas y generar una nueva

    }

    process(product) {
        if(product.quantity > 0) this.addProduct(product);
        if(product.quantity === 0) this.removeProduct(product);
        this.counter.next(this.currentList.length);
        this.calculateTotal();
        this.currentList$.next(this.currentList);
        this.localStorageSrv.save(this.currentList);
    }

    addProduct(product) {
        const verifyProduct = this.currentList.find(productInShopping => productInShopping.id === product.id);
        if(!verifyProduct) this.currentList.push(product);
        if(verifyProduct) this.modifyProductQuantity(product);
    }

    removeProduct(product) {
        this.currentList = this.currentList.filter(productInShopping => productInShopping.id !== product.id);
    }

    modifyProductQuantity(product) {
        this.currentList.forEach(productInShopping => {
            if(productInShopping.id === product.id) productInShopping.quantity = product.quantity;
        })
    }

    calculateTotal() {
        let shoppingAmmount = 0;
        this.currentList.forEach(product => shoppingAmmount += product.price * product.quantity);
        this.ammount.next(shoppingAmmount.toFixed(2));
    }

    cleanProduct(product) {
        this.removeProduct(product);
        this.counter.next(this.currentList.length);
        this.calculateTotal();
        this.currentList$.next(this.currentList);
        this.localStorageSrv.save(this.currentList);
    }

    clean() {
        this.currentList = [];
        this.ammount.next(0);
        this.counter.next(0);
        this.currentList$.next(this.currentList);
        this.localStorageSrv.save(this.currentList);
    }

    verifyDoExist(product) {
        const productVerified = this.currentList.find(productInShopping => product.id === productInShopping.id);
        if(productVerified) return productVerified.quantity;
        return 0;
    }

    getShareUrl() {
        let url = '';
        this.currentList.forEach(product => url += `${product.id}=${product.quantity}-`);
        return url.slice(0, -1);
    }

}

export const shoppingCartService = new ShoppingCartService();
