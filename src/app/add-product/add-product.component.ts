import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  constructor(private prodService: ProductsService) { };

  addProductForm = new FormGroup({
    prodName: new FormControl('', Validators.required),
    prodDesc: new FormControl('', [Validators.required, Validators.minLength(25)]),
    prodBrand: new FormControl('', Validators.required),
    prodPrice: new FormControl('', Validators.required),
    prodImg: new FormControl('', Validators.required),
  });

  selectedFile: File | null = null;

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

  onImgSelect(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    } else {
      this.selectedFile = null;
    }
  };

  submitForm() {
    let form = this.addProductForm.value;
    const formData = new FormData();
    formData.append('prodName', form.prodName!);
    formData.append('prodDesc', form.prodDesc!);
    formData.append('prodBrand', form.prodBrand!);
    formData.append('prodPrice', form.prodPrice!);
    formData.append('file', this.selectedFile!);
    this.prodService.addProduct(formData).subscribe((data: any) => {
      this.prodService.addToSourceProducts(data);
      this.addProductForm.reset();
      this.selectedFile = null;
    });
  };
}
