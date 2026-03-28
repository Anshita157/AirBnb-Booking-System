import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  loading = true;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.users = [
      { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'user', joinDate: '2024-01-15' },
      { id: 2, name: 'Priya Singh', email: 'priya@example.com', role: 'user', joinDate: '2024-01-20' },
      { id: 3, name: 'Amit Patel', email: 'amit@example.com', role: 'admin', joinDate: '2024-01-10' }
    ];
    this.loading = false;
  }

  changeRole(id: number, newRole: string): void {
    const user = this.users.find(u => u.id === id);
    if (user) {
      user.role = newRole;
      this.toastr.success(`User role updated to ${newRole}`);
    }
  }

  onRoleChange(id: number, event: any): void {
    const newRole = (event.target as HTMLSelectElement).value;
    this.changeRole(id, newRole);
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure?')) {
      this.users = this.users.filter(u => u.id !== id);
      this.toastr.success('User deleted successfully!');
    }
  }
}
