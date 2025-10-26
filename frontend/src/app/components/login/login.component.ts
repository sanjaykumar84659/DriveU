import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loading = false;
  errorMsg: string | null = null;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  
onSubmit() {
  this.errorMsg = null;

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }
  this.loading = true;

  const { email, password } = this.loginForm.value as { email: string; password: string };
  console.log("email",email);
  console.log("password" , password);

  this.auth.login({ email, password }).subscribe({
    next: (res) => {
      const role = res?.role ?? res?.userRole ?? localStorage.getItem('user_role');
      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/customer']);
      }
    },
    error: (err) => {
      console.error('Login failed:', err);
      this.errorMsg = 'Login failed. Please check your credentials.';
    },
    complete: () => (this.loading = false)
  });
}
}