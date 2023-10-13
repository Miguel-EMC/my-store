import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import {StoreService} from '../../services/store.service';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  total = 0;
  myShoppingCart: Product[] = [];
  today = new Date();
  date = new Date(2023,5,11);
  
  products: Product[] = [
    // {
    //   id: '1',
    //   name: 'Producto 1',
    //   image: 'https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png',
    //   price: 12.20
    // },
    // {
    //   id: '2',
    //   name: 'Producto 2',
    //   image: 'https://hips.hearstapps.com/hmg-prod/images/best-skincare-products-1656081764.jpg',
    //   price: 12.20
    // },
    // {
    //   id: '3',
    //   name: 'Producto 3',
    //   image: 'https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png',
    //   price: 12.20
    // },
    // {
    //   id: '4',
    //   name: 'Producto 4',
    //   image: 'https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png',
    //   price: 12.20
    // }
  ];

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ){
    this.myShoppingCart = this.storeService.getShoppingCart()
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data =>{
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
