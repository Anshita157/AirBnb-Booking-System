import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  User,
  AuthResponse,
  LoginRequest,
  SignupRequest,
  PasswordResetRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  ProfileUpdateRequest,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private authStatusSubject: BehaviorSubject<boolean>;
  public authStatus$: Observable<boolean>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();

    const token = localStorage.getItem('token');
    this.authStatusSubject = new BehaviorSubject<boolean>(!!token);
    this.authStatus$ = this.authStatusSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * User Login
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}${environment.endpoints.auth.login}`,
        credentials
      )
      .pipe(
        tap((response) => {
          this.setAuthData(response);
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * User Signup
   */
  signup(data: SignupRequest): Observable<AuthResponse> {
    // Remove confirmPassword before sending to API
    const signupData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}${environment.endpoints.auth.signup}`,
        signupData
      )
      .pipe(
        tap((response) => {
          this.setAuthData(response);
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * User Logout
   */
  logout(): void {
    // Call logout endpoint
    this.http
      .post(`${this.apiUrl}${environment.endpoints.auth.logout}`, {})
      .subscribe({
        next: () => {
          this.clearAuthData();
        },
        error: () => {
          // Clear data even if API call fails
          this.clearAuthData();
        },
      });
  }

  /**
   * Forgot Password
   */
  forgotPassword(email: string): Observable<PasswordResetRequest> {
    return this.http.post<PasswordResetRequest>(
      `${this.apiUrl}${environment.endpoints.auth.forgotPassword}`,
      { email }
    );
  }

  /**
   * Reset Password
   */
  resetPassword(data: ResetPasswordRequest): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${environment.endpoints.auth.resetPassword}`,
      data
    );
  }

  /**
   * Refresh Token
   */
  refreshToken(refreshToken: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}${environment.endpoints.auth.refresh}`,
        { refreshToken }
      )
      .pipe(
        tap((response) => {
          this.setAuthData(response);
        }),
        catchError((error) => {
          this.clearAuthData();
          return throwError(() => error);
        })
      );
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  /**
   * Update User Profile
   */
  updateProfile(data: ProfileUpdateRequest): Observable<User> {
    return this.http
      .put<User>(
        `${this.apiUrl}${environment.endpoints.users.update}`,
        data
      )
      .pipe(
        tap((user) => {
          this.currentUserSubject.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }

  /**
   * Change Password
   */
  changePassword(data: ChangePasswordRequest): Observable<any> {
    // Remove confirmPassword before sending
    const passwordData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    return this.http.post(
      `${this.apiUrl}${environment.endpoints.users.changePassword}`,
      passwordData
    );
  }

  /**
   * Set authentication data
   */
  private setAuthData(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
    this.authStatusSubject.next(true);
  }

  /**
   * Clear authentication data
   */
  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.authStatusSubject.next(false);
  }
}
