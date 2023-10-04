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
                <!-- ivoox -->
                <a
                  id="social-icons"
                  class="social-icons--link-ivoox"
                  href="https://www.ivoox.com/https:www.ivoox.comperfil-red-cecosesola_a8_podcaster_7202376_1.html"
                  target="_blank"
    
                >
                <svg id="social-icons--ivoox" class="social-icons--svg-ivoox"  viewBox="0 0 50 50" width="32" height="32" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <g>
                    <path d="m49.19365,19.34909c0.0091,-0.0902 0.0091,-0.1811 0,-0.2712c-2.3101,-10.0758 -11.6784,-18.2125 -21.8721,-18.9954c-10.709,-0.8212 -20.1657,4.5317 -24.858,14.1359c-1.7425,3.554 -2.6164,7.3265 -2.4416,11.3157c-0.0595,4.6227 1.1838,8.8941 3.5822,12.7977c3.7679,6.1448 9.1756,10.0138 16.169,11.6106c0.7208,0.1675 0.8217,-0.0201 0.8199,-0.6955c-0.0192,-7.8497 -0.0192,-15.6993 0,-23.549c0,-0.6591 -0.1298,-0.8794 -0.8289,-0.8685c-2.3678,0.0346 -4.7374,-0.0109 -7.1051,-0.0273c0,-2.5489 0.0432,-5.0979 -0.0235,-7.6469c-0.0216,-0.8394 0.2379,-0.9504 0.9929,-0.9504c4.0508,0.04 8.1088,0.0601 12.1524,0c1.7335,-0.0255 2.9678,0.5462 3.6039,2.234l0.0757,0.5589c0.1802,0.2404 0.1171,0.5226 0.1171,0.7902l0,30.1709c0.1164,0.0091 0.2333,0.0091 0.3496,0c4.8653,-0.854 8.8765,-3.3574 12.4335,-6.6511c3.2525,-3.0132 5.3644,-6.7985 6.588,-11.0607c1.2235,-4.2623 1.364,-8.5773 0.245,-12.8979zm-24.739,-5.1999c-2.229,0.1093 -4.6148,-2.4962 -4.6184,-5.0451c-0.0115,-0.6474 0.1047,-1.2907 0.3418,-1.8922c0.2371,-0.6016 0.5904,-1.1494 1.0392,-1.6116c0.4489,-0.4621 0.9843,-0.8293 1.5751,-1.0802s1.2251,-0.3805 1.8659,-0.3811c1.3004,0.0029 2.5467,0.5265 3.4658,1.4562c0.919,0.9296 1.4359,2.1894 1.4373,3.5034c-0.009,2.7128 -2.2272,4.9104 -5.1067,5.0506z" fill="#564a00" />
                  </g>
                </svg>

                
              </a>
              <!-- TIKTOK -->
                <a
                  id="social-icons"
                  href="https://www.tiktok.com/@redcecosesola"
                  target="_blank"
                  class="fa fa-tiktok fa-2x"
                ><svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 448 512"><style>svg{fill:#564a00}</style><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg></a>

              

              </div>

            

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
