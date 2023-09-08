import { Router } from "@vaadin/router";
import { html, LitElement } from "lit";
import { tap } from "rxjs";

import { shoppingCartService } from '../../services/shopping-cart-service/shopping-cart.service';
// Import de las hojas de estilo para este componente
import './mobile-menu.styles.css';

export class MobileMenu extends LitElement {

    constructor() {
        super();
        this.counter = 0;
        this.shoppingCartSrv = shoppingCartService;
    }

    firstUpdated() {
        const result$ = this.shoppingCartSrv.counter
          .pipe(
            tap(counter => this.counter = counter),
            tap(() => this.requestUpdate()),
          );
        result$.subscribe();
    }

    render() {
        return html`
            <div class="mobile-menu-container">
                <i 
                    class="material-icons" 
                    @click=${() => Router.go('/browse/')}
                >home</i>

                <i 
                    class="material-icons" 
                    @click=${() => Router.go('/favorites/')}
                >favorite</i>

                <mobile-menu-shopping 
                    counter=${this.counter} 
                    @click=${() => Router.go('/shopping-cart/list/')}
                ></mobile-menu-shopping>
                
                <!--   -->
            </div>
        `;
    }
    
    createRenderRoot() {
        return this;
    }
}

customElements.define("mobile-menu", MobileMenu);
