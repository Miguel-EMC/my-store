import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import {switchMap} from 'rxjs/operators';
import {zip} from 'rxjs'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  total = 0;
  myShoppingCart: Product[] = [];
  // today = new Date();
  // date = new Date(2023,5,11);
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
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    category: {
      id: '',
      name: '',
    },
    description: '',
  };

  limit = 10;
  offset = 0;
  statusDetail: 'loadind' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductByPage(10,0).subscribe((data) => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDatail() {
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail(id: string) {
    this.statusDetail = 'loadind';
    this.productsService.getProduct(id)
    .subscribe((data) => {
      // console.log('product', data);
      this.toggleProductDatail();
      this.productChosen = data;
      this.statusDetail = 'success';
    }, errorMsg => {
      window.alert(errorMsg);
      this.statusDetail = 'error';
    });
  }

  readAndUpdate(id: string){
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product)=> this.productsService.update(product.id, {title:'change'}))
      )
      .subscribe(data => {
        console.log(data);
      });
      this.productsService.fetchReadAndUpdate(id, {title:'change'})
      .subscribe(response => {
        const read = response[0];
        const update = response[1];
      })
  }

  createNewProduct(){
    const product : CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'Este es un producto nuevo',
      images: [''],
      price: 120,
      categoryId: 2,
    }
    this.productsService.create(product)
    .subscribe(data => {
      console.log('created', data);
    })
  }

  updateProduct(){
    const changes:UpdateProductDTO = {
      title: 'Nuevo Producto'
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }
  loadMore(){
    this.productsService.getProductByPage(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset+= this.limit;
    });
  }
}
