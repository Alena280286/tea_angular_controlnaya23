import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductsType} from "../../../../types/products-type";




@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  products: ProductsType[] = [];

  ngOnInit() {
    this.http.get<ProductsType[]>('https://testologia.site/tea')
      .subscribe( {
              next: (data) => {
                this.products = data;
              }
      });
  }
}
