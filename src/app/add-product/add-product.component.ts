import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../shared/models/product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  constructor(private prodService: ProductsService) {};

  // @Output() addProduct = new EventEmitter<Product>();

  // @Output() goToProductsFrom = new EventEmitter<any>();

  addProductForm = new FormGroup({
    prodName: new FormControl('', Validators.required),
    prodDesc: new FormControl('', [Validators.required, Validators.minLength(25)]),
    prodBrand: new FormControl('', Validators.required),
    prodPrice: new FormControl('', Validators.required),
  });

  goToProductsPage() {
    // this.goToProductsFrom.emit();
  };

  hasError(attr: string) {
    let formCont: string = 'prodDesc';
    if ((this.isInvalidField(formCont) === true) &&
      (this.addProductForm.get(formCont)?.hasError(attr))) {
      return true;
    }
    return false;
  };

  isInvalidField(attr: string) {
    let field: any = this.addProductForm.get(attr);
    if ((field?.invalid) && ((field?.dirty) || (field?.touched))) {
      return true;
    }
    return false;
  };

  submitForm() {
    let form = this.addProductForm.value;
    let item: Product = new Product(1, form.prodName!, form.prodDesc!, form.prodBrand!, Number(form.prodPrice!));
    this.prodService.addProduct(item).subscribe((data: any) => {
      // this.addProduct.emit(data);
      this.prodService.addToSourceProducts(data);
      this.addProductForm.reset();
    })
  };
}
