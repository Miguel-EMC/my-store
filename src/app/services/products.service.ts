import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode} from '@angular/common/http'
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { catchError, map, retry, throwError, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = '/api/v1/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?:number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl, {params})
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }


  fetchReadAndUpdate(id: string, dto: UpdateProductDTO){
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    );
  }
  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError('Ups Algo esta fallando en el server');
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe');
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('No estas autorizado');
        }
        return throwError('Ups Algo esta fallando en el server');
      })
    );
  }

  getProductByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}`, {params: {limit, offset}});
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id:string , dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`,dto);
  }
  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
