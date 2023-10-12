import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
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
      image: 'https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png',
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
}
