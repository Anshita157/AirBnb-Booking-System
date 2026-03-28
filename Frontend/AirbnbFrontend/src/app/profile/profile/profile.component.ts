import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User | null = null;
  loading = false;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.minLength(5)]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.user = this.authService.currentUserValue;
    if (this.user) {
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone || '',
        address: this.user.address || ''
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.loadUserProfile();
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.user) {
      this.loading = true;
      const updatedUser = { ...this.user, ...this.profileForm.value };
      
      this.userService.updateUser(updatedUser.id, updatedUser).subscribe({
        next: () => {
          this.loading = false;
          this.isEditing = false;
          this.toastr.success('Profile updated successfully!');
          this.loadUserProfile();
        },
        error: (error) => {
          this.loading = false;
          this.toastr.error(error.message || 'Failed to update profile');
        }
      });
    }
  }

  goToChangePassword(): void {
    this.router.navigate(['/profile/change-password']);
  }

  logout(): void {
    this.authService.logout();
    this.toastr.success('Logged out successfully');
    this.router.navigate(['/auth/login']);
  }
}
