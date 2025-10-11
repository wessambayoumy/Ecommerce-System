import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  showPassword: WritableSignal<boolean> = signal(false);
  decoded!: WritableSignal<any>;

  registerUser(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }

  loginUser(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data);
  }

  decodeToken() {
    try {
      this.decoded.set(jwtDecode(this.cookieService.get('token')));
      return this.decoded();
    } catch (err) {
      this.router.navigate(['/login']);
    }
  }

  verifyEmail(body: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'auth/forgotPasswords',
      body
    );
  }
  verifyCode(body: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'auth/verifyResetCode',
      body
    );
  }
  resetPassword(body: object): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + 'auth/resetPassword',
      body
    );
  }
}
