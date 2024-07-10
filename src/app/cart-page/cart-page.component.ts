import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  @Input() items: Product[] = [];
  @Input() totalQty: number = 0;
  @Input() totalPrice: number = 0;
}
