import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import {StoreService} from '../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  total = 0;
  myShoppingCart: Product[] = [];

  products: Product[] = [
    {
      id: '1',
      name: 'Producto 1',
      image: 'https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png',
      price: 12.20
    },
    {
      id: '2',
      name: 'Producto 2',
      image: 'https://hips.hearstapps.com/hmg-prod/images/best-skincare-products-1656081764.jpg',
      price: 12.20
    },
    {
      id: '3',
      name: 'Producto 3',
      image: 'https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png',
      price: 12.20
    },
    {
      id: '4',
      name: 'Producto 4',
      image: 'https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png',
      price: 12.20
    }
  ];

  constructor(
    private storeService: StoreService
  ){
    this.myShoppingCart = this.storeService.getShoppingCart()
  }


  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
