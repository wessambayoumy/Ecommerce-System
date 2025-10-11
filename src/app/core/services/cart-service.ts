import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);

  count: WritableSignal<number> = signal(0);

  getCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart');
  }
  addToCart(productId: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'cart', {
      productId: productId,
    });
  }
  removeFromCart(productId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + 'cart/' + productId);
  }
  updateCartItem(productId: string, count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + 'cart/' + productId, {
      count,
    });
  }
  clearCart(): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + 'cart');
  }

  checkOutVisa(id: string | null, body: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        `orders/checkout-session/${id}?url=http://localhost:4200`,
      body
    );
  }

  checkOutCash(id: string | null, body: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/${id}`, body);
  }

  getUserOrders(): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + `orders/user/${this.authService.decodeToken().id}`
    );
  }
}
