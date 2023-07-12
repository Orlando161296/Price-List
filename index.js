// Componente raiz
import { AppComponent } from "./src/app.component";

// Servicios
import { localStorageShoppingCartService } from "./src/app/core/services/shopping-cart-service/localstorage-shopping-cart.service";
//Navbar
import { NavbarComponent } from "./src/app/core/components/navbar/navbar.component";
import { IconShoppingCart } from "./src/app/core/components/navbar/components/icon-shopping-cart/icon-shopping-cart.component";
import { SearchBoxComponent } from "./src/app/core/components/navbar/components/searchbox/searchbox.component";
import { NavBarMenuComponent } from "./src/app/core/components/navbar/components/navbar-menu/navbar-menu.component";
import { SelectCategories } from "/src/app/core/components/navbar/components/select-categories/select-categories.component";
import { CategoryComponent } from "/src/app/core/components/navbar/components/select-categories/components/category.component";

// Mobile Menu
import { MobileMenu } from "./src/app/core/components/mobile-menu/mobile-menu.component";
import { MobileMenuShopping } from "./src/app/core/components/mobile-menu/components/mobile-menu-shopping.component";

// Home
import { HomeBrowse } from "./src/app/core/pages/home/home-browse.component";
import { ProductCard } from "./src/app/shared/components/product-card/product-card.component";
import { ProductCardButton } from "./src/app/shared/components/product-card/components/product-card-button.component";
import { ProductCardFavoritesButton } from "./src/app/shared/components/product-card/components/product-card-favorites-button.component";

// View filtered
import { ViewFilteredComponent } from "./src/app/core/pages/view-filtered/view-filtered.component";

// Page not Found
import { PageNotFound } from "./src/app/features/page-not-found/page-not-found.component";

// Shopping Cart
import { ShoppingCartList } from "./src/app/features/shopping-cart/pages/list/shopping-cart-list.component";
import { ShoppingCartDetail } from "./src/app/features/shopping-cart/pages/list/components/shopping-cart-detail/shopping-cart-detail.component";
import { ShoppingCartSummary } from "./src/app/features/shopping-cart/pages/list/components/shopping-cart-summary/shopping-cart-summary.component";
import { ShareComponent } from "./src/app/features/shopping-cart/pages/share/share.component";
import { ShareDetailComponent } from "./src/app/features/shopping-cart/pages/share/component/share-detail/share-detail.component";
import { ShareSummaryComponent } from "./src/app/features/shopping-cart/pages/share/component/share-summary/share-summary.component";

// Favorites
import { FavoritesBrowse } from "./src/app/features/favorites/favorites-browse.component";

// Categories
import { CategoriesBrowse } from "./src/app/features/categories/categories-browse.component";
import { CategoriesListComponent } from "./src/app/features/categories/components/categories-list.component";

//footer
import { FooterComponent } from "./src/app/core/components/footer/footer.component"

// loader
import { LoaderComponent } from "./src/app/core/components/loader/loader.component";
