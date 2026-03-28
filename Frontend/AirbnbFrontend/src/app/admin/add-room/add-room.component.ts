import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {
  roomForm: FormGroup;
  loading = false;
  hotels = [
    { id: 1, name: 'Taj Hotel Mumbai' },
    { id: 2, name: 'Oberoi Delhi' },
    { id: 3, name: 'Marriott Bangalore' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.roomForm = this.fb.group({
      hotelId: ['', Validators.required],
      roomType: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1000)]],
      amenities: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('Room added successfully!');
        this.router.navigate(['/admin']);
      }, 1000);
    }
  }
}
