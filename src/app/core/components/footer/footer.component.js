import { html, css, LitElement } from "lit";
import { tap } from "rxjs";
import "./footer.styles.css";

export class FooterComponent extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <div class="footer-container ">

        <div class="group-one">
          <div class="box" id="box-img">
            <!-- logo 1 de cecosesola -->

            <figure>
              <a href="https://cecosesola.org/" target="_blank">
                <img
                  class="logo-cecosesola"
                  src="https://i.ibb.co/4SwQST6/Logo-Cecosesola-RLH-White.png"
                  alt="logo de cecosesola"
                />
              </a>
            </figure>

          </div>
          <div class="box">
            <!-- logo 2 de cecosesola -->
            <figure>
            <img
                  class="logo-cecosesola-two"
                  src="https://i.ibb.co/2PPBhg8/Logo-White-PNG.png"
                  alt="logo de cecosesola"
                />
            </figure>
            
            
          </div>

          <div class="red-social">
            <h6 class="red-social-title" id="red-social-title">
              Redes Sociales
            </h6>
            <div class="red-social-icons">
              <div class="red-social-icons--container">
                <a
                  id="social-icons"
                  href="https://www.facebook.com/RedCecosesola/"
                  target="_blank"
                  class="fa fa-facebook fa-2x"
                ></a>
                <a
                  id="social-icons"
                  href="https://twitter.com/redcecosesola"
                  target="_blank"
                  class="fa-brands fa-x-twitter fa-2x"
                ><svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#564a00}</style><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg></a>
                <a
                  id="social-icons"
                  href="https://www.instagram.com/redcecosesola/"
                  target="_blank"
                  class="fa fa-instagram fa-2x"   
                ></a>
                <!-- YOUTUBE -->
                <a
                  id="social-icons"
                  href="https://www.youtube.com/channel/UC4Z6igtx966wHbfeumY9UwA"
                  target="_blank"
                  class="fa fa-youtube fa-2x"
                ></a>
                <!-- TELEGRAM -->
                <a
                  id="social-icons"
                  href="https://t.me/RedCecosesola"
                  target="_blank"
                  class="fa fa-telegram fa-2x"
                ></a>      
                 <!-- TIKTOK -->
                <a
                  id="social-icons"
                  href="https://www.tiktok.com/@redcecosesola"
                  target="_blank"
                  class="fa fa-tiktok fa-2x"
                ><svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 448 512"><style>svg{fill:#564a00}</style><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg></a>
              </div>
              <h6 class="red-social-title" id="red-social-title">
              Encuéntranos como @RedCecosesola
            </h6>
            

            </div>
          </div>
        </div>

        <div class="group-two">
          <small
            >&copy;2023 <b>Cecosesola </b>-Todos los Derechos reservados.
          </small>
        </div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("footer-component", FooterComponent);
