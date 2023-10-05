class LocalStorageShoppingCartService {

    constructor() {
        this.init();
    }

    /**
     * Método que verifica en el localStorage del navegador si existe un Carrito de Compras activo
     * de lo contrario crea un arreglo vacio donde se procedera a almacenar una lista de mercado.
     */
    init() {
        const shoppingCart = localStorage.getItem('ShoppingCart');
        if(!shoppingCart) localStorage.setItem('ShoppingCart', '[]');
    }

    /**
     * Método para traer la información que esta en el localStorage.
     * @returns {shoppingCart} retorna un arreglo de Objetos.
     */
    get() {
        const shoppingCart = localStorage.getItem('ShoppingCart');
        return JSON.parse(shoppingCart);
    }

    /**
     * Método que guarda en el localStorage un arreglo de objetos, que contiene la lista de mercado que el usuario decide guardar.
     * @param {*arreglo*} shoppingCart un arreglo de objetos.
     */
    save(shoppingCart) {
        localStorage.setItem('ShoppingCart',JSON.stringify(shoppingCart));
    }

}

export const localStorageShoppingCartService = new LocalStorageShoppingCartService();
