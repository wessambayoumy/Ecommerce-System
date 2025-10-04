import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/cart-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);

  cartId: string | null = null;
  isLoadingV: boolean = false;
  isLoadingC: boolean = false;
  visaSubscription: Subscription = new Subscription();
  cashSubscription: Subscription = new Subscription();

  checkoutForm!: FormGroup;

  form(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, Validators.required],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
        city: [null, Validators.required],
      }),
    });
  }

  submit(payment: string) {
    if (this.checkoutForm.valid) {
      if (payment == 'visa') {
        this.isLoadingV = true;
        this.visaSubscription.unsubscribe();
        this.cartService
          .checkOutVisa(this.cartId, this.checkoutForm.value)
          .subscribe({
            next: (res) => {
              if (res.status === 'success') {
                window.open(res.session.url, '_self');
              }
            },
          });
      } else if (payment == 'cash') {
        this.isLoadingC = true;
        this.cashSubscription.unsubscribe();
        this.cartService
          .checkOutCash(this.cartId, this.checkoutForm.value)
          .subscribe({
            next: () => {
              this.isLoadingC = false;
              this.router.navigateByUrl('/allorders');
              this.cartService.count.next(0);
            },
            error: () => {
              this.isLoadingC = false;
            },
          });
      }
    }
  }

  getCartId() {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
        console.log(this.cartId);
      },
    });
  }

  ngOnInit() {
    this.form();
    this.getCartId();
  }
}
