import { html, css, LitElement } from "lit";
import { tap } from "rxjs";
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import "./footer.styles.css";

export class FooterComponent extends LitElement {
  constructor() {
    super();
  }

  firstUpdated() {}

  render() {
    return html`
      <div class="footer-container ">
        <div class="group-one">
          <div class="box" id="box-img">
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
            <!-- <h2 class="title-info-cecosesola">SOBRE NOSOTROS</h2> -->
            <img
                  class="logo-cecosesola"
                  src="https://i.ibb.co/2PPBhg8/Logo-White-PNG.png"
                  alt="logo de cecosesola"
                />
            
          </div>

          <div class="red-social">
            <h6 class="red-social-title" id="red-social-title">
              Redes Sociales:
            </h6>
            <div class="red-social-icons">
              <div class="red-social-icons--container">
                <a
                  id="social-icons"
                  href="https://www.facebook.com/RedCecosesola/"
                  target="_blank"
                  class="fa fa-facebook"
                ></a>
                <a
                  id="social-icons"
                  href="https://www.youtube.com/channel/UC4Z6igtx966wHbfeumY9UwA"
                  target="_blank"
                  class="fa fa-twitter"
                ></a>
                <a
                  id="social-icons"
                  href="https://www.instagram.com/redcecosesola/"
                  target="_blank"
                  class="fa fa-instagram"   
                ></a>
                <a
                  id="social-icons"
                  href="https://twitter.com/redcecosesola"
                  target="_blank"
                  class="fa fa-youtube"
                ></a>
                <a
                  id="social-icons"
                  href="https://www.youtube.com/channel/UC4Z6igtx966wHbfeumY9UwA"
                  target="_blank"
                  class="fa fa-telegram fa-2x"
                ></a>
                <a
                  id="social-icons"
                  href="https://www.youtube.com/channel/UC4Z6igtx966wHbfeumY9UwA"
                  target="_blank"
                  class="fa fa-tiktok"
                ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#f5f5f5}</style><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg></a>

              

              </div>

              <figure>
                <a
                  id="form"
                  href="https://forms.gle/APaFDevGbqwiF8ts9"
                  target="_blank"
                  ><p id="text-form">Tu Opinion es importante , Evaluanos</p>
                  <div id="btn-form--container">
                    <button class="pulse">
                      <i
                        style="font-size: 40px; color: #f4a534 "
                        class="material-icons"
                        id="icon-form"
                        >arrow_circle_right</i
                      >
                    </button>
                  </div>
                </a>
              </figure>
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
//
