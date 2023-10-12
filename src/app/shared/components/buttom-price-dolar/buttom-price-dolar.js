import { LitElement, html, css } from "lit";

import { kanaService} from '../../../core/services/kana-service/kana.service'
import { tap } from "rxjs";

export class ButtomPriceDolar extends LitElement {

  static styles = css`
      
      .container-rate{
        display:flex;
        align-items:center;
        margin-bottom:10px;
        margin-right:5px;
      }
      img{
        width:1.1rem;
      }
      .price{
        font-size:1.1rem;
      }
      .text-bcv{
        font-size:1rem;
        word-spacing: 0.25rem;
      }
    `;

    constructor(){
       super();
       this.priceDolar = kanaService.divisa;
       
    }

  render() {
    return html`
        <div class="container-rate">
          <p>Tasa</p>
        <img src="https://i.ibb.co/59R6Lcb/dollar-04-2.png">
        <strong class="text-bcv">BCV &nbsp;</strong><strong class="price">${this.priceDolar}Bs</strong> 
        </div>
       
         
         `;
  }


}
customElements.define("buttom-price-dolar", ButtomPriceDolar);
