import { BehaviorSubject, tap, of } from 'rxjs';

import { kanaService } from './kana-service/kana.service';

class ProductsMediator {

  constructor() {
    this.kanaSrv = kanaService;
    this.listProduct = [];
    this.limit = 0;
    this.paginationProducts$ = new BehaviorSubject(this.listProduct);

    this.kanaSrv.listProduct.pipe(
        tap(response => this.listProduct = response),
        tap(() => this.limit = this.listProduct.length),
        tap(() => this.pagination(18)),
        tap(() => console.log('Traer lo de kana', this.listProduct))
      )
      .subscribe();

  }

  pagination(limit){
    const productsPaginated = this.listProduct.slice(0,limit)
    this.paginationProducts$.next(productsPaginated);
  }

  getProductById(id) {
    const product = this.listProduct.filter(product => product.id === id);
    return product[0];
  }

  filterForName(productName) {
    const products = this.listProduct.filter(product => product.name.toLowerCase().includes(productName.toLowerCase()));
    return products;
  }

  // esto ya no relaciona productos con los traidos de kana
  // conforman un set estatico para manejar categorias mientras imolko lo desarrolla

  getProductsForCategory(category) {
    const product = this.listProductCat.filter(product => product.category == category);
    return product;
  }

  listProductCat = [
    {
      id: 1,
      name: "GALLETA MARIA PUIG",
      images: [
        "https://palospanasfoodmarket.com/wp-content/uploads/2018/04/galletas-maria-1.jpg",
      ],
      price: 10.86,
      category: 'dulces y snacks',
    },
    {
      id: 2,
      name: "PASTA CORTA CAPRI CODITO",
      images: ["https://www.pastascapri.com/img/productos/imagenes/codito.png"],
      price: 11.5,
      category: 'alimentos basicos',
    },
    {
      id: 3,
      name: "MAYONESA MAVESA 910gr",
      images: [
        "https://labatata.com.ve/1085-large_default/mayonesa-mavesa-910g.jpg",
      ],
      category: 'salsas y aderezos',
      price: 36.0,
    },
    {
      id: 4,
      name: "CAFÉ FLOR DE ARAUCA",
      images: [
        "https://compraenavi.com/web/image/product.template/4800/image/300x300?unique=3fd0aaa",
      ],
      category: 'alimentos basicos',
      price: 20.0,
    },
    {
      id: 5,
      name: "MARGARINA MAVESA 500G",
      images: [
        "https://cdn.shopify.com/s/files/1/0571/3788/9442/products/mantequilla-mavesa-500g-1.png?v=1660312385",
      ],
      category: 'alimentos basicos',
      price: 19.0,
    },
    {
      id: 6,
      name: "ARROZ PRIMOR 1KG",
      images: [
        "https://d2j6dbq0eux0bg.cloudfront.net/images/28254021/2715085634.jpg",
      ],
      category: 'alimentos basicos',
      price: 13.10,
    },
    {
      id: 7,
      name: "HARINA PAN NORMAL",
      images: [
        "https://lh3.googleusercontent.com/p-K-FfFnpv0kgdVT1kNxI_lludARFkD-VpAFOimS0gbiIA9JxOP78PkQlhOnD6Q8W2cU-vvRkdLG0vdfvni86ChSo0UlXImPVYPJ2uUfAX78WSSd",
      ],
      price: 14.45,
    },
    {
      id: 8,
      name: "JABON EN POLVO LAS LLAVES",
      images: [
        "https://labatata.com.ve/2901-large_default/jabon-las-llaves-polvo-400k.jpg",
      ],
      category: 'detergentes',
      price: 16.20,
    },
    {
      id: 9,
      name: "GALLETA TIP-TOP MANI",
      images: ["https://gsi-food.com/wp-content/uploads/2017/01/gsi-tip-top-vainilla.jpg"],
      price: 8.50,
      category: 'dulces y snacks',
    },
    {
      id: 10,
      name: "GALLETA CLUB SOCIAL",
      images: ["https://lh3.googleusercontent.com/3S-IQKdJvPtnTXPL0crHXH_pcpjm7H5hdubpN2skm2gGF1yt83bpCDKmpfmPcrQ4zawBpqo-gbSmjaKt9O2gCvPIBb4xgpOxdsqoYuVnqQrcrMU"],
      price: 16.50,
      category: 'dulces y snacks',
    },
    {
      id: 11,
      name: "HARINA DOÑA EMILIA",
      images: ["https://inverloan.com/wp-content/uploads/2022/01/7592591000154-Harina-de-Maiz-Blanco-Dona-Emilia-1Kg.jpg"],
      category: 'alimentos basicos',
      price: 12.50,
    },
    {
      id: 12,
      name: "PASTA ESPECIAL LARGA",
      images: ["https://inversiones-valeria.quosmarket.com/wp-content/uploads/2021/08/10167.jpg"],
      category: 'alimentos basicos',
      price: 13.50,
    },
    {
      id: 13,
      name: "VINAGRE TIQUIRE",
      images: ["https://sambil.sigo.com.ve/images/thumbs/0004259_vinagre-tiquire-flores-1000-cc_450.jpeg"],
      price: 9.80,
      category: 'salsas y aderezos',
    },
    {
      id: 14,
      name: "MEGA ARO",
      images: ["https://tucentralonline.com/Bello-Campo-43/wp-content/uploads/sites/19/2021/12/100743899.jpg"],
      price: 19.50,
      category: 'cereales',
    },
    {
      id: 15,
      name: "FORORO VALLE HONDO",
      images: ["https://cerevenca.com/wp-content/uploads/2020/07/empaque-1024x1024.png"],
      category: 'alimentos basicos',
      price: 6.50,
    },
    {
      id: 16,
      name: "HUEVOS 1/2 CARTON",
      images: ["https://superfreshmarket.com.ve/wp-content/uploads/2021/02/medio-carton-Fresh.jpg"],
      category: 'alimentos basicos',
      price: 25.30,
    },
    {
      id: 17,
      name: "CARAOTAS PESADAS 1/2",
      images: ["https://labatata.com.ve/983-large_default/caraotas-arauquita-1k.jpg"],
      price: 8.90,
      category: 'alimentos basicos',
    },
  ];

}

export const productsMediator = new ProductsMediator();
