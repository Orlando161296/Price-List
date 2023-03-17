import { LitElement, html } from 'lit';

import { shoppingCartService } from '/src/app/features/shopping-cart/services/shopping-cart.service';
import './shopping-cart-summary.style.css';
import { tap } from 'rxjs';
 
export class ShoppingCartSummary extends LitElement {

    static properties = {
        product: { type: Object },
    };

    constructor(){
        super();
        this.ammount = 0;
        this.shoppingCartSrv = shoppingCartService;

        this.shoppingCartSrv.ammount
            .pipe(
                tap(ammount => this.ammount = ammount),
                tap(() => this.requestUpdate()),
            )
            .subscribe();
    }

    render() {
        return html`
            <div class="shopping-cart-summary-container">
                <div class="summary-header">
                    <h1>Total Carrito</h1>
                </div>
                <div class="summary-body">
                    <img src="/src/assets/images/carrito.svg" >
                    <div class="summary-body_ammounts">
                        <div class="ammounts_bs">
                            <h1>Total</h1>
                            <h1>Bs. ${this.ammount}</h1>
                        </div>
                        <h1 class="ammounts_usd">$ 8.02</h1>
                    </div>
                </div>
                <div class="summary-footer">
                    El total no esta sujeto al impuesto IGTF, este valor será agregado dependiendo de su forma de pago
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
customElements.define('shopping-cart-summary', ShoppingCartSummary);