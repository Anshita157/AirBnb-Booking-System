import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from '../../core/services/hotel.service';

@Component({
  selector: 'app-manage-hotels',
  templateUrl: './manage-hotels.component.html',
  styleUrls: ['./manage-hotels.component.css']
})
export class ManageHotelsComponent implements OnInit {
  hotels: any[] = [];
  loading = true;

  constructor(
    private hotelService: HotelService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.loading = true;
    this.hotels = [
      { id: 1, name: 'Taj Hotel Mumbai', location: 'Mumbai', rating: 4.8, rooms: 150, revenue: 750000 },
      { id: 2, name: 'Oberoi Delhi', location: 'Delhi', rating: 4.6, rooms: 120, revenue: 680000 },
      { id: 3, name: 'Marriott Bangalore', location: 'Bangalore', rating: 4.7, rooms: 180, revenue: 820000 }
    ];
    this.loading = false;
  }

  editHotel(id: number): void {
    this.toastr.info(`Edit hotel: ${id}`);
  }

  deleteHotel(id: number): void {
    if (confirm('Are you sure?')) {
      this.hotels = this.hotels.filter(h => h.id !== id);
      this.toastr.success('Hotel deleted successfully!');
    }
  }
}
