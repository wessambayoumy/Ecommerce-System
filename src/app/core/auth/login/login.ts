import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  subscription: Subscription = new Subscription();

  showPassword: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  loginForm!: FormGroup;

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  showPasswordFn(): void {
    this.showPassword = !this.showPassword;
  }

  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.subscription.unsubscribe();
      this.subscription = this.authService
        .loginUser(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.cookieService.set('token', res.token);
            this.router.navigate(['/home']);
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = err.error.message;
            this.loginForm.reset();
          },
        });
    }
  }

  ngOnInit(): void {
    this.initForm();
  }
}
