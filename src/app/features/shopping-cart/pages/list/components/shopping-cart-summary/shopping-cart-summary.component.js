import { LitElement, html } from 'lit';

import { shoppingCartService } from '../../../../../../core/services/shopping-cart-service/shopping-cart.service';
import './shopping-cart-summary.style.css';
import { tap } from 'rxjs';
 
export class ShoppingCartSummary extends LitElement {

    static properties = {
        product: { type: Object },
        dolarValue: { type: Number },
        ammount: { type: Number },
    };

    constructor(){
        super();
        this.ammount = 0;
        this.shoppingCartSrv = shoppingCartService;
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
                        <h1 class="ammounts_usd">$ ${this.dolarValue.toFixed(2)}</h1>
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
