import { tap, Subject } from 'rxjs';
import { shoppingCartService } from '../shopping-cart-service/shopping-cart.service';
import { productsMediator } from '../productsMediator.service';

class FavoriteService {
    newFavorite$ = new Subject();

    /**
     * Esta funcion ejecuta la logica del servicio, en cuanto si un producto sera agregado o eliminado de la lista de favoritos.
     * @param product objeto con la informacion del producto
     * @returns
     */
    favoriteInteractive(product) {
        const favoriteList = this.getFavorites();
        const verifyProduct = this.verifyProduct(product.id, favoriteList);

        if(!verifyProduct)  return this.addFavorite(product, favoriteList);
        if(verifyProduct) return this.removeFavorite(product, favoriteList); 
    }

    /**
     * Agrega un producto a la lista de favoritos ubicada en localStorage con el id "Favorites"
     * @param product objeto con la informacion del producto
     * @param list lista de favoritos
     */
    addFavorite(product, list) {
        list.push(product);
        localStorage.setItem('Favorites',JSON.stringify(list));
        //Añadir una funcion que muestre un mensaje del producto añadido
        return true;
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
        return false;
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
     * @returns de ser true, devuelve el producto. De ser false, devuelve false
    */
    verifyProduct(id) {
        const favoriteList = this.getFavorites();
        const verified = favoriteList.find(product => product.id === id);
        if(verified) return true;
        return false;
    }

    // Obtiene la lista de productos contenido en localStorage
    getFavorites() {
        const favorites = localStorage.getItem('Favorites');
        const verifiedProduct = JSON
                .parse(favorites)
                .map(product => {
                    const productKana = this.productsMediator.getProductById(product.id);
                    productKana.quantity = this.shoppingCartSrv.verifyDoExist(product);
                    return productKana;
                });
        console.log('en favoritos', verifiedProduct);
        return verifiedProduct;
    }

    constructor() {

        this.shoppingCartSrv = shoppingCartService;
        this.productsMediator = productsMediator;
        // Captura la accion del usuario en otros componentes si quiere almacenar o eliminar de favoritos un producto
        this.newFavorite$
            .pipe(
                tap(product => this.favoriteInteractive(product)),
            )
            .subscribe();
        this.initFavorites();
    }

}

export const favoriteService = new FavoriteService();   
