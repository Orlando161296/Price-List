import { html, LitElement } from "lit";

// Import de las hojas de estilo para este componente
import "./loader.styles.css";

export class LoaderComponent extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <div class="loader-container">
        <div class="loader"></div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("loader-component", LoaderComponent);
