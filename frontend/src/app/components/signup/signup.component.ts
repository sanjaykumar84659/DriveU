import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
  username: string;
  mobileNumber: string;
  userRole: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  message: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
        confirmPassword: ['', Validators.required],
        username: ['', Validators.required],
        mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        userRole: ['CUSTOMER', Validators.required] // keep consistent with backend roles
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(fg: FormGroup) {
    const p = fg.get('password')?.value;
    const cp = fg.get('confirmPassword')?.value;
    return p === cp ? null : { mismatch: true };
  }

  onSubmit() {
    this.message = null;
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    const user: User = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      username: this.signupForm.value.username,
      mobileNumber: this.signupForm.value.mobileNumber,
      userRole: this.signupForm.value.userRole
    };

    this.auth.register(user).subscribe({
      next: () => {
        this.loading = false;
        alert('Signup successful! Click OK to go to Login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.message = err?.error ?? 'Signup failed. Try again.';
      }
    });
  }
}