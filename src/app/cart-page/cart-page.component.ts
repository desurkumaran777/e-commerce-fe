import { Component, OnInit } from '@angular/core';
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
    this.prodService.currentCartItems.subscribe((products: Product[]) => {
      this.items = products;
      this.updateTotal();
    });
  };

  imageFilePath:string = 'http://localhost:5000//image/';

  items: Product[] = [];

  totalCount: number = 0;

  totalPrice: number = 0;

  removeFromCart(item: Product) {
    item.orderQty = 1;
    item.isAddedToCart = false;
    this.prodService.updateProduct(item).subscribe((data: any) => {});
    this.prodService.deleteCart(item).subscribe((data: any) => {});
    this.prodService.removeFromCart(item.prodId);
    this.updateTotal();
    this.prodService.updateSingleProduct(item);
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
