import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get user profile
   */
  getProfile(): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}${environment.endpoints.users.profile}`
    );
  }

  /**
   * Get all users (Admin)
   */
  getAllUsers(page: number = 1, limit: number = 10): Observable<{
    data: User[];
    total: number;
    page: number;
  }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<{
      data: User[];
      total: number;
      page: number;
    }>(`${this.apiUrl}${environment.endpoints.admin.users.list}`, { params });
  }

  /**
   * Get user by ID (Admin)
   */
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}${environment.endpoints.admin.users.list}/${id}`
    );
  }

  /**
   * Update user (Admin)
   */
  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}${environment.endpoints.admin.users.update.replace(':id', id)}`,
      userData
    );
  }

  /**
   * Delete user (Admin)
   */
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}${environment.endpoints.admin.users.delete.replace(':id', id)}`
    );
  }

  /**
   * Get user statistics (Admin)
   */
  getUserStats(): Observable<{
    totalUsers: number;
    activeUsers: number;
    newUsersThisMonth: number;
  }> {
    return this.http.get<{
      totalUsers: number;
      activeUsers: number;
      newUsersThisMonth: number;
    }>(`${this.apiUrl}/admin/users/stats`);
  }
}
