import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input';
import { AuthService } from '../../services/auth-service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  verifyEmail!: WritableSignal<FormGroup>;
  verifyCode!: WritableSignal<FormGroup>;
  resetPassword!: WritableSignal<FormGroup>;

  step: WritableSignal<number> = signal(1);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.verifyEmail.set(
      this.fb.group({
        email: [null, [Validators.required, Validators.email]],
      })
    );

    this.verifyCode.set(
      this.fb.group({
        resetCode: [null, [Validators.required, Validators.minLength(3)]],
      })
    );

    this.resetPassword.set(
      this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        newPassword: [null, [Validators.required, Validators.minLength(8)]],
      })
    );
  }

  vEmail() {
    if (this.verifyEmail().valid) {
      this.authService.verifyEmail(this.verifyEmail().value).subscribe({
        next: () => {
          this.step.set(2);
        },
      });
    }
  }
  vCode() {
    if (this.verifyCode().valid) {
      this.authService.verifyCode(this.verifyCode().value).subscribe({
        next: () => {
          this.step.set(3);
        },
      });
    }
  }
  resetPass() {
    if (this.resetPassword().valid) {
      this.authService.resetPassword(this.resetPassword().value).subscribe({
        next: (res) => {
          this.cookieService.set('token', res.token);
          this.router.navigateByUrl('/home');
        },
      });
    }
  }
}
