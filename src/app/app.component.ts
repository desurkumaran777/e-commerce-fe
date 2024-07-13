import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../shared/models/product';
import { ProductsListComponent } from './products-list/products-list.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProductsListComponent, CartPageComponent, AddProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private prodService: ProductsService) {};

  ngOnInit(): void {
    this.prodService.getProducts().subscribe((data:any) => {
      this.products = data?.Products;
    })

    this.prodService.getCarts().subscribe((data:any) => {
      this.shoppingList = data?.Carts;
    })
  }

  products!: Product[];

  // products: Product[] = [

  //   new Product('Shoe', 'adidas Mens Drogo M Running Shoe', 'adidas', 1699),
  //   new Product('T-Shirt', 'Puma Men Regular Fit T-Shirt', 'Puma', 849),
  //   new Product('Back Bag', 'American Tourister Valex 28 Ltrs Large Laptop Backpack ', 'American Tourister', 1399),
  //   new Product('Phone', 'Apple iPhone 15 (128 GB) - Blue ', 'iPhone', 70999),
  //   new Product('Laptop', 'HP Laptop 15, 13th Gen Intel® Core™ i5-1334U, 15.6-inch(39.6 cm), FHD, 8GB DDR4(3200 MHZ),512GB SSD,MSO,Dual speakers,Win 11, Natural Silver, 1.6kg, 15-fd0220TU ', 'HP', 52990),
  //   new Product('Pant', "Peter England Men's Regular Casual Pants", 'Peter England', 1599),
  //   new Product('Shoe', 'adidas Mens Drogo M Running Shoe', 'adidas', 1699),
  //   new Product('T-Shirt', 'Puma Men Regular Fit T-Shirt', 'Puma', 849),
  //   new Product('Back Bag', 'American Tourister Valex 28 Ltrs Large Laptop Backpack ', 'American Tourister', 1399),
  //   new Product('Phone', 'Apple iPhone 15 (128 GB) - Blue ', 'iPhone', 70999),
  //   new Product('Laptop', 'HP Laptop 15, 13th Gen Intel® Core™ i5-1334U, 15.6-inch(39.6 cm), FHD, 8GB DDR4(3200 MHZ),512GB SSD,MSO,Dual speakers,Win 11, Natural Silver, 1.6kg, 15-fd0220TU ', 'HP', 52990),
  //   new Product('Pant', "Peter England Men's Regular Casual Pants", 'Peter England', 1599),

  // ];

  shoppingList: Product[] = [];

  current_page: number = 0;

  removeFromProducts(prodId: number) {
    let ind = this.products.findIndex(x => x.prodId === prodId);
    this.products[ind].isAddedToCart = false;
  };

}
