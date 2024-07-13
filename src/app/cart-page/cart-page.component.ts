import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../shared/models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{

  constructor(private prodService: ProductsService) {};

  ngOnInit() {
    this.updateTotal();
  }

  @Input() items: Product[] = [];

  @Output() goToProducts = new EventEmitter<any>();

  @Output() removeProduct = new EventEmitter<number>();

  totalCount: number = 0;

  totalPrice: number = 0;

  goToProductsPage() {
    this.goToProducts.emit();
  };

  removeFromCart(item: Product) {
    item.orderQty = 1;
    item.isAddedToCart = false;
    this.prodService.updateProduct(item).subscribe((data: any) => {});
    this.prodService.deleteCart(item).subscribe((data: any) => {});
    let ind = this.items.findIndex(e=> e === item);
    this.items.splice(ind, 1);
    this.updateTotal();
    this.removeProduct.emit(item.prodId);
  };
  
  updateTotal(item?: Product) {
    if (item !== undefined)
      this.prodService.updateCart(item).subscribe((data: any) => {});
    this.totalCount = 0;
    this.totalPrice = 0;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      this.totalCount += item.orderQty;
      this.totalPrice += (item.orderQty * item.prodPrice);
    }
  };
}
