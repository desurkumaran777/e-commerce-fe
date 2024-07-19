import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../shared/models/product';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {

  constructor(private prodService: ProductsService, private router: Router) {};

  ngOnInit(): void {
    this.prodService.currentProducts.subscribe((products: Product[]) => {
      this.items = products;
    });
  }

  items: Product[] = [];

  addToShoppingCart(prod: Product) {
    prod.isAddedToCart = true;
    this.prodService.addCart(prod).subscribe((data: any) => {});
    this.prodService.addToCartItem(prod);
    this.prodService.updateProduct(prod).subscribe((data: any) => {});
  };

  seeProductDesc(prod: Product) {
    this.router.navigate(['product', prod.prodId.toString()])
  };

}
