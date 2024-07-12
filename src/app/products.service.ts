import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';

const rootUrl: string = 'http://localhost:5000/';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    let url: string = rootUrl + 'products';
    return this.http.get(url);
  };

  addProduct(prodItem: Product) {
    let url: string = rootUrl + 'products';
    return this.http.post(url, prodItem);
  };

  updateProduct(prodItem: Product) {
    let url: string = rootUrl + 'product/' + prodItem.prodId;
    return this.http.put(url, prodItem);
  };

  getCarts() {
    let url: string = rootUrl + 'carts';
    return this.http.get(url);
  };

  addCart(cartItem: Product) {
    let url: string = rootUrl + 'carts';
    return this.http.post(url, cartItem);
  };

  updateCart(cartItem: Product) {
    let url: string = rootUrl + 'cart/' + cartItem.prodId;
    return this.http.put(url, cartItem);
  };

  deleteCart(cartItem: Product) {
    let url: string = rootUrl + 'cart/' + cartItem.prodId;
    return this.http.delete(url);
  };
}
