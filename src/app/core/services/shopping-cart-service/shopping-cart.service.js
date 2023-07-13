import { BehaviorSubject } from "rxjs";

import { localStorageShoppingCartService } from "./localstorage-shopping-cart.service";

class ShoppingCartService {

    constructor() {
        this.localStorageSrv = localStorageShoppingCartService;

        this.products = this.localStorageSrv.get() || [];
        this.list = new BehaviorSubject(this.products);
        this.counter = new BehaviorSubject(this.products.length);
        this.ammount = new BehaviorSubject(0);
        this.calculateTotal();
    }

    process(product) {
        if(product.quantity > 0) this.addProduct(product);
        if(product.quantity === 0) this.removeProduct(product);
        this.counter.next(this.products.length);
        this.calculateTotal();
        this.list.next(this.products);
        this.localStorageSrv.save(this.products);
    }

    addProduct(product) {
        const verifyProduct = this.products.find(productInShopping => productInShopping.id === product.id);
        if(!verifyProduct) this.products.push(product);
        if(verifyProduct) this.modifyProductQuantity(product);
    }

    removeProduct(product) {
        this.products = this.products.filter(productInShopping => productInShopping.id !== product.id);
    }

    modifyProductQuantity(product) {
        this.products.forEach(productInShopping => {
            if(productInShopping.id === product.id) productInShopping.quantity = product.quantity;
        })
    }

    calculateTotal() {
        let shoppingAmmount = 0;
        this.products.forEach(product => shoppingAmmount += product.price * product.quantity);
        this.ammount.next(shoppingAmmount.toFixed(2));
    }

    cleanProduct(product) {
        this.removeProduct(product);
        this.counter.next(this.products.length);
        this.calculateTotal();
        this.list.next(this.products);
        this.localStorageSrv.save(this.products);
    }

    clean() {
        this.products = [];
        this.ammount.next(0);
        this.counter.next(0);
        this.list.next(this.products);
        this.localStorageSrv.save(this.products);
    }

    verifyDoExist(product) {
        const productVerified = this.products.find(productInShopping => product.id === productInShopping.id);
        if(productVerified) return productVerified.quantity;
        return 0;
    }

    getShareUrl() {
        let url = '';
        this.products.forEach(product => url += `${product.id}=${product.quantity}-`);
        return url.slice(0, -1);
    }

}

export const shoppingCartService = new ShoppingCartService();