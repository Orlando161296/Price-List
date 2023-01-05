import { tap, Subject } from 'rxjs';

class FavoriteService {
    newFavorite$ = new Subject();

    /**
     * Esta funcion ejecuta la logica del servicio, en cuanto si un producto sera agregado o eliminado de la lista de favoritos.
     * @param product objeto con la informacion del producto
     * @returns
     */
    favoriteInteractive(product) {
        const favoriteList = this.getFavorites();
        console.log(product)
        const verifyProduct = this.verifyProduct(product.id, favoriteList);

        if(!verifyProduct) return this.addFavorite(product, favoriteList);
        if(verifyProduct) return this.removeFavorite(verifyProduct, favoriteList);
    }

    /**
     * Agrega un producto a la lista de favoritos ubicada en localStorage con el id "Favorites"
     * @param product objeto con la informacion del producto
     * @param list lista de favoritos
     */
    addFavorite(product, list) {
        const listUpdated = list;
        const { url, type, ...restProduct } = product;
        listUpdated.push(restProduct);
        const newFavorite = JSON.stringify(listUpdated);
        localStorage.setItem('Favorites', newFavorite);
        //Añadir una funcion que muestre un mensaje del producto añadido
    }

    /**
     * Elimina un producto a la lista de favoritos ubicada en localStorage con el id "Favorites"
     * @param product objeto con la informacion del producto
     * @param list lista de favoritos
     */
    removeFavorite(product, list) {
        const removeFavorite = list.filter(favorite => favorite.id !== product.id);
        const listUpdated = JSON.stringify(removeFavorite);
        localStorage.setItem('Favorites', listUpdated);
        //Añadir una funcion que muestre un mensaje del producto eliminado
    }

    // Inicializa la lista de favoritos en el localStorage en el caso que no exista
    initFavorites() {
        const favoritesAll = localStorage.getItem('Favorites');
        if(!favoritesAll) localStorage.setItem('Favorites', '[]');
    }

    /**
     * Verifica que un producto exista en la lista de productos
     * @param id string que es el id del producto
     * @param favorieList array con la lista de productos en favoritos
     * @returns de ser true, devuelve el producto. De ser false, devuelve undefined
    */
    verifyProduct(id, favorieList) {
        return favorieList.find(product => product.id === id);
    }

    // Obtiene la lista de productos contenido en localStorage
    getFavorites() {
        const favorites = localStorage.getItem('Favorites');
        if(favorites) return JSON.parse(favorites);
    }

    constructor() {

        // Captura la accion del usuario en otros componentes si quiere almacenar o eliminar de favoritos un producto
        this.newFavorite$
            .pipe(
                tap(product => this.favoriteInteractive(product)),
                tap(product => console.log('Producto seleccionado', product)),
            )
            .subscribe();

        this.initFavorites();
    }

}

export const favoriteService = new FavoriteService();