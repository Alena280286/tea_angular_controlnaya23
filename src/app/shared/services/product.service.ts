import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import {OrderProduct} from "../../../types/OrderProduct";
import {ProductsType} from "../../../types/products-type";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProduct(id: number): Observable<ProductsType> {
    return this.http.get<ProductsType>(`https://testologia.site/tea?id=${id}`)
  }

  createOrder(data: OrderProduct){
    return this.http.post<{ success: boolean, message?: string }>(`https://testologia.site/order-tea`, data);
  }

}
