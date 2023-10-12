import { map, tap, mergeMap, BehaviorSubject } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { environments } from "../../../../environments/environments";

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

  /**
   *Método para reutilizar lineas de código en cuanto al envío de Headers en la consulta del query en la API.
   * @param { string } query 
   * @returns { Observable: data$ }
   */
  getQuery(query) {
    const url = environments.baseUrl;
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
   * Método que consulta los productos en la API, mediante el Query.
   * @returns { Observable: data$ } Observable
   */
  getListProductFromKana$(limit = 100) {
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
      map(
        ({
          data: {
            currentPriceList: {
              products: { edges },
            },
          },
        }) =>
          edges.map(
            ({
              node: {
                product: { pricePublished, ...restProduct },
              },
            }) => ({
              ...restProduct,
              price: parseFloat(
                (pricePublished?.priceBase.amount * this.divisa).toFixed(2)
              ),
            })
          )
      )
    );
    return data$;
  }

  /**
   * Método que consulta a la API el dollar currency, mediante el envio de un Query.
   * @returns { Observable: data$ } 
   */
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
        ({
          data: {
            currentPriceList: {
              officialRate: { forSales },
            },
          },
        }) => forSales[1].value
      ),
      tap((response) => (this.divisa = response))
    );

    return data$;
  }
}
export const kanaService = new KanaService();
