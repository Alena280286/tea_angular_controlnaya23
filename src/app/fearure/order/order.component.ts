import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    product: [''],
    comment: [''],
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
    country: ['', Validators.required],
    zip: ['', Validators.required],
    address: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я0-9\s/-]*$/)]],
  });

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private productService: ProductService) {

  }

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.form.controls.product.setValue(params['product']);
        this.form.get('product')?.disable();
        this.form.patchValue({
          product: this.form.controls.product.value
        });
      }
    });

    this.form.valueChanges.subscribe(() => {
      const button = document.getElementById('btn') as HTMLButtonElement;
      if (button) {
        button.disabled = this.form.invalid || this.form.disabled;
      }
    });
  }


  ngOnDestroy(){
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();

  }
  acceptData() {
    this.subscriptionOrder = this.productService.createOrder({
      name: this.form.controls.name.value,
      last_name: this.form.controls.last_name.value,
      phone:this.form.controls.phone.value,
      country: this.form.controls.country.value,
      zip: this.form.controls.zip.value,
      product: this.form.controls.product.value,
      address:this.form.controls.address.value,
      comment: this.form.controls.comment.value,
    })
      .subscribe({
        next: (response) => {
          if(response.success){
            const showForm = document.getElementById('form');
            const hideForm = document.getElementById('form-open');
            if (showForm && hideForm) {
              showForm.classList.add('d-none');
              hideForm.classList.remove('d-none');
            }
          }
        },
        error: (err) => {
          if(err){
            const errorText = document.querySelector('.invalid-feedback');
            if (errorText) {
              errorText.classList.remove('d-none');
            }
          }
        }
      });
  }


  get name() {
    return this.form.get('name');
  };

  get lastName() {
    return this.form.get('last_name');
  };

  get phone() {
    return this.form.get('phone');
  };

  get address() {
    return this.form.get('address');
  };


}
