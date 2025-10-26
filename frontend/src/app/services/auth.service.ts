import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AuthService {

  public apiUrl = environment.apiUrl;
  private readonly roleSubject = new BehaviorSubject<string | null>(localStorage.getItem('user_role'));
  public role$ = this.roleSubject.asObservable();
  private readonly userIdSubject = new BehaviorSubject<number | null>(localStorage.getItem('user_id') ? Number(localStorage.getItem('user_id')) : null);
  public userId$ = this.userIdSubject.asObservable();
  
  private readonly usernameSubject = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  public username$ = this.usernameSubject.asObservable();


  constructor(private readonly http: HttpClient) {}

  

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token'); 
    return !!token;
  }
  


  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/login`, login).pipe(
      map(res => {
        if (res?.token) {
          localStorage.setItem('auth_token', res.token);
          if (res.role) {
            localStorage.setItem('user_role', res.role);
            this.roleSubject.next(res.role);
          }
          if (res.userId) {
            localStorage.setItem('user_id', res.userId.toString());
            this.userIdSubject.next(res.userId);
          }
          if (res.username) {
            localStorage.setItem('username', res.username);
            this.usernameSubject.next(res.username);
          }
        }
        return res;
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    this.roleSubject.next(null);
    this.userIdSubject.next(null);
    this.usernameSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
}