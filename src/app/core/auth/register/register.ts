import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  subscription: Subscription = new Subscription();
  showPassword: boolean = false;
  showrePassword: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  registerForm!: FormGroup;
  initForm(): void {
    this.registerForm = this.fb.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        rePassword: [null, [Validators.required]],
        phone: [null, [Validators.pattern(/^01[0125][0-9]{8}$/)]],
      },
      { validators: this.confirmPassword }
    );
  }
  regSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.subscription.unsubscribe();
      this.subscription = this.authService
        .registerUser(this.registerForm.value)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/login']);
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = err.error.message;
            this.registerForm.reset();
          },
        });
    }
  }
  confirmPassword(group: AbstractControl) {
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  showPasswordFn(): void {
    this.showPassword = !this.showPassword;
  }
  showrePasswordFn(): void {
    this.showrePassword = !this.showrePassword;
  }

  ngOnInit(): void {
    this.initForm();
  }
}
