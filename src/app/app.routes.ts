import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartPageComponent } from './cart-page/cart-page.component';

export const routes: Routes = [
    {path: '', component: ProductsListComponent},
    {path: 'add-product', component: AddProductComponent},
    {path: 'cart', component: CartPageComponent},
    {path: '**', component: PageNotFoundComponent},
];
