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
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, InputComponent,TranslatePipe],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;

  step: WritableSignal<number> = signal(1);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required, Validators.minLength(3)]],
    });

    this.resetPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  vEmail() {
    if (this.verifyEmail.valid) {
      this.authService.verifyEmail(this.verifyEmail.value).subscribe({
        next: () => {
          this.step.set(2);
        },
      });
    }
  }
  vCode() {
    if (this.verifyCode.valid) {
      this.authService.verifyCode(this.verifyCode.value).subscribe({
        next: () => {
          this.step.set(3);
        },
      });
    }
  }
  resetPass() {
    if (this.resetPassword.valid) {
      this.authService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.cookieService.set('token', res.token);
          this.router.navigateByUrl('/home');
        },
      });
    }
  }
}
