import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  @Output() goToProductsFrom = new EventEmitter<any>();

  addProductForm = new FormGroup({
    prodName: new FormControl('', Validators.required),
    prodDesc: new FormControl('', [Validators.required, Validators.minLength(25)]),
    prodBrand: new FormControl('', Validators.required),
    prodPrice: new FormControl('', Validators.required),
  });

  goToProductsPage() {
    this.goToProductsFrom.emit();
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
    if (field !== null) {
      if ((field.invalid) && ((field.dirty) || (field.touched))) {
        return true;
      }
    }
    return false;
  };

  submitForm() {
    debugger;
    console.log(this.addProductForm.value);
    // this.addProductForm.
  };
}
