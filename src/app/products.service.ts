import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }

  private rootAPIUrl: string = 'http://localhost:5000/';

  private productsSource = new BehaviorSubject<Product[]>([]);

  private cartItemsSource = new BehaviorSubject<Product[]>([]);

  currentProducts = this.productsSource.asObservable();

  currentCartItems = this.cartItemsSource.asObservable();

  getProducts() {
    let url: string = this.rootAPIUrl + 'products';
    return this.http.get(url);
  };

  addProduct(prodItem: Product) {
    let url: string = this.rootAPIUrl + 'products';
    return this.http.post(url, prodItem);
  };

  updateProduct(prodItem: Product) {
    let url: string = this.rootAPIUrl + 'product/' + prodItem.prodId;
    return this.http.put(url, prodItem);
  };

  getCarts() {
    let url: string = this.rootAPIUrl + 'carts';
    return this.http.get(url);
  };

  addCart(cartItem: Product) {
    let url: string = this.rootAPIUrl + 'carts';
    return this.http.post(url, cartItem);
  };

  updateCart(cartItem: Product) {
    let url: string = this.rootAPIUrl + 'cart/' + cartItem.prodId;
    return this.http.put(url, cartItem);
  };

  deleteCart(cartItem: Product) {
    let url: string = this.rootAPIUrl + 'cart/' + cartItem.prodId;
    return this.http.delete(url);
  };

  updateSourceProducts(products: Product[]) {
    this.productsSource.next(products);
  };

  addToSourceProducts(newProduct: Product) {
    const curProducts: Product[] = this.productsSource.value;
    const newProducts: Product[] = [...curProducts, newProduct];
    this.productsSource.next(newProducts);
  };

  updateSingleProduct(product: Product) {
    const curProducts: Product[] = this.productsSource.value;
    const updatedProducts: Product[] = curProducts.map(prod => 
      prod.prodId === product.prodId ? {...prod, ...product} : prod
    );
    this.productsSource.next(updatedProducts);
  };

  updateCartItems(products: Product[]) {
    this.cartItemsSource.next(products);
  };

  addToCartItem(newCartItem: Product) {
    const curCartItems: Product[] = this.cartItemsSource.value;
    const newCartItems: Product[] = [...curCartItems, newCartItem];
    this.cartItemsSource.next(newCartItems);
  };

  removeFromCart(itemId: number) {
    const curCartItems: Product[] = this.cartItemsSource.value;
    const updatedItems: Product[] = curCartItems.filter(item => item.prodId !== itemId);
    this.cartItemsSource.next(updatedItems);
  };

  getProductById(prodId: number) {
    const curProducts: Product[] = this.productsSource.value;
    return curProducts.find(prod => prod.prodId === prodId);
  };

}
