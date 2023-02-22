import {Component, Input, OnInit} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {ProductsType} from "../../../../types/products-type";


@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})


export class ProductComponent implements OnInit {
  @Input() products: ProductsType;

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
    this.products = {
      id: 0,
      image: '',
      title: '',
      price: '',
      description: ''
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productService.getProduct(+params['id'])
          .subscribe({
            next: (data) => {
              this.products = data;
            },
            error: (error) => {
              this.router.navigate(['/']);
            }
          })
      }
    });
  }

  byProduct() {
    this.router.navigate(['/order'], { queryParams: { product: this.products.title } });
  }

}
