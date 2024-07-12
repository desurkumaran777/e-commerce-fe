import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../shared/models/product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  constructor(private prodService: ProductsService) {};

  @Input() items: Product[] = [];

  @Input() toShowGoToCart: boolean = false;

  @Output() addProduct = new EventEmitter<any>();

  @Output() addToCart = new EventEmitter<Product>();

  @Output() goToCart = new EventEmitter<any>();

  addToShoppingCart(prod: Product) {
    prod.isAddedToCart = true;
    this.prodService.addCart(prod).subscribe((data: any) => {
      this.addToCart.emit(data);
    });
    this.prodService.updateProduct(prod).subscribe((data: any) => {});
  };

  goToCartPage() {
    this.goToCart.emit();
  };

  goToAddProduct() {
    this.addProduct.emit();
  };

}
