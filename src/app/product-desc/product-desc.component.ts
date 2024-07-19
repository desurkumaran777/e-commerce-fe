import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-desc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-desc.component.html',
  styleUrl: './product-desc.component.css'
})
export class ProductDescComponent implements OnInit {

  constructor(private prodService: ProductsService, private route: ActivatedRoute, private router: Router) { };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.prodId = +params.get('id')!;
      this.product = this.prodService.getProductById(this.prodId);
    })
  };

  isAddingToCart: boolean = false;

  prodId!: number;

  product!: Product | undefined;

  addToShoppingCart(prod: Product) {
    if (this.isAddingToCart == true)
      return
    this.isAddingToCart = true;
    prod.isAddedToCart = true;

    this.prodService.addCart(prod).subscribe((data: any) => {
      this.isAddingToCart = false;
    });

    this.prodService.addToCartItem(prod);
    this.prodService.updateProduct(prod).subscribe((data: any) => { });
  };

  goToCart() {
    this.router.navigate(['cart']);
  };

}
