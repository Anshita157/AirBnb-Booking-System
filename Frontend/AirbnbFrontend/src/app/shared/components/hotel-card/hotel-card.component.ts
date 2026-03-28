import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hotel } from '../../../core/models';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent {
  @Input() hotel!: Hotel;
  @Output() cardClick = new EventEmitter<string>();
  @Output() bookNow = new EventEmitter<string>();

  onCardClick(): void {
    this.cardClick.emit(this.hotel.id);
  }

  onBookNow(): void {
    this.bookNow.emit(this.hotel.id);
  }

  getRatingColor(): string {
    if (this.hotel.rating >= 4.5) return 'excellent';
    if (this.hotel.rating >= 4) return 'very-good';
    if (this.hotel.rating >= 3) return 'good';
    return 'fair';
  }

  getStarArray(): number[] {
    const stars = Math.round(this.hotel.rating);
    return Array(5).fill(0).map((_, i) => i < stars ? 1 : 0);
  }
}
