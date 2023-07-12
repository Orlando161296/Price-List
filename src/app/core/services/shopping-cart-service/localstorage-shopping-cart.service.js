class LocalStorageShoppingCartService {

    constructor() {
        this.init();
    }

    init() {
        const shoppingCart = localStorage.getItem('ShoppingCart');
        if(!shoppingCart) localStorage.setItem('ShoppingCart', '[]');
    }

    get() {
        const shoppingCart = localStorage.getItem('ShoppingCart');
        return JSON.parse(shoppingCart);
    }

    save(shoppingCart) {
        localStorage.setItem('ShoppingCart',JSON.stringify(shoppingCart));
    }

}

export const localStorageShoppingCartService = new LocalStorageShoppingCartService();