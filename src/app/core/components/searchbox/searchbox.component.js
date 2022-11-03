import { html, css, LitElement } from "lit";
import {Router} from '@vaadin/router';


export class SearchboxComponent extends LitElement {

    static styles = css `
  .search{
    margin-top: 90px;
    width: 260px;
    margin-left: 5%;
    padding:10px;
    border-radius: 10px;
    }
    
    `;

  constructor() {
    super();
  }
  

  render() {
    return html`
    <div class="Boxcontainer">
          <input type="text" placeholder="Buscar Producto" class="search">
          <quantityproducts-component></quantityproducts-component>
    </div>
    

    `;
  }
}

customElements.define("searchbox-component", SearchboxComponent);