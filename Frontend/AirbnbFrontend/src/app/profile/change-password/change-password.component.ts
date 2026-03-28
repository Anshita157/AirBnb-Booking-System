import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  loading = false;
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup): any {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    return newPassword?.value === confirmPassword?.value ? null : { 'passwordMismatch': true };
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      this.loading = true;
      const changePasswordRequest = {
        oldPassword: this.passwordForm.get('oldPassword')?.value,
        newPassword: this.passwordForm.get('newPassword')?.value,
        confirmPassword: this.passwordForm.get('confirmPassword')?.value
      };

      this.authService.changePassword(changePasswordRequest).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Password changed successfully!');
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          this.loading = false;
          this.toastr.error(error.message || 'Failed to change password');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
