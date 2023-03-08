
import { routes as routes_browse } from "./src/app/features/shopping-cart/shopping-cart.routes";
import { routes as favorite_browse } from './src/app/features/favorites/favorites.routes';

export const routes = [
    { path: '/', component: 'home-browse' },
    { path: '/browse/',  children: routes_browse, component: 'home-browse' },
    { path: '/shoppinglist/', component: 'shopping-cart-list' },
    { path: '/favorites/',  children: favorite_browse, component: 'favorites-browse' },
    { path: '/page-not-found/', component: 'page-not-found' },
    { path: '(.*)', redirect: '/page-not-found/' },
  ]