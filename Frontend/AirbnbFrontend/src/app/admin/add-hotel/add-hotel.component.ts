import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from '../../core/services/hotel.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent {
  hotelForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.hotelForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      pricePerNight: ['', [Validators.required, Validators.min(1000)]],
      rating: ['4.5', [Validators.required, Validators.min(0), Validators.max(5)]],
      image: ['', Validators.required],
      amenities: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.hotelForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('Hotel added successfully!');
        this.router.navigate(['/admin/manage-hotels']);
      }, 1000);
    }
  }
}
