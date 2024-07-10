import { Component, Input, OnInit } from '@angular/core';
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
export class CartPageComponent implements OnInit{

  ngOnInit() {
    this.updateTotal();
  }

  @Input() items: Product[] = [];

  totalCount: number = 0;

  totalPrice: number = 0;
  
  updateTotal() {
    this.totalCount = 0;
    this.totalPrice = 0;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      this.totalCount += item.order_qty;
      this.totalPrice += (item.order_qty * item.prodPrice);
    }
  };
}
