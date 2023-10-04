import { map, tap, mergeMap, BehaviorSubject } from "rxjs";
import { fromFetch } from "rxjs/fetch";

class KanaService {
  constructor() {
    this.listProduct = new BehaviorSubject([]);
    this.dolarValue = new BehaviorSubject(1);
    this.divisa = 1;

    this.getListProductFromKana$()
      .pipe(tap((response) => this.listProduct.next(response)))
      .subscribe();

    this.getDolarValue$()
      .pipe(tap((response) => this.dolarValue.next(response)))
      .subscribe();
  }

  getQuery(query) {
    const url = "https://kana.develop.cecosesola.imolko.net/graphql";
    const dataQuery = {
      operationName: null,
      variables: {},
    };
    const payload = {
      ...dataQuery,
      query,
    };
    const option = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: new Headers({ "content-type": "application/json" }),
    };

    const data$ = fromFetch(url, option).pipe(
      mergeMap((response) => response.json())
    );

    return data$;
  }

  /**
   * Metodo que apunta a los productos en backend de kana
   * @returns un observable
   */
  getListProductFromKana$(limit = 1000) {
    const query = `
      query {
        currentPriceList{
          products(first: ${limit}){
            edges{
              node{
                product{
                  id
                  name
                  images
                  presentation
                  departments {
                    description
                  }
                  pricePublished{
                    priceBase {
                      amount
                    }
                  }
                }
              }
            }
            pageInfo{
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor  
            }
          }
        }
      }`;

    const data$ = this.getQuery(query).pipe(
      map((response) =>
        response.data.currentPriceList.products.edges.map((product) => {
          const { pricePublished, ...restProduct } = product.node.product;

          const productConstruted = {
            ...restProduct,
            price: Number(pricePublished?.priceBase.amount * this.divisa),
          };

          return productConstruted;
        })
      )
    );
    return data$;
  }

  getDolarValue$() {
    const query = `
      query{
        currentPriceList{
          officialRate{
            forSales{
              value
            }
          }
        }
      }`;

    const data$ = this.getQuery(query).pipe(
      map(
        (response) =>
          response.data.currentPriceList.officialRate.forSales[1].value
      ),
      tap((response) => (this.divisa = response))
    );

    return data$;
  }
}
export const kanaService = new KanaService();
