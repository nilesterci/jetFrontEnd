import { Product, ProductModel, ProductModelDTO } from './product';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { first, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiBaseUrl: string;

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {
    this.apiBaseUrl = this.appConfigService.apiBaseUrl;
  }

  public getProducts() {
    try {
      return this.http
        .get<ProductModel>(`${this.apiBaseUrl}/api/products?status=true`)
        .pipe(first());
    } catch (error) {
      throw error;
    }
  }

  public newProduct(Parameter: Product): Observable<string> {
    try {
      return this.http.post<string>(
        `${this.apiBaseUrl}/api/products`,
        Parameter
      );
    } catch (error) {
      throw error;
    }
  }

  public getDetail(id: number){
    try {
      return this.http
        .get<ProductModelDTO>(`${this.apiBaseUrl}/api/products/${id}`)
        .pipe(first());
    } catch (error) {
      throw error;
    }
  }

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'id', type: 'number', width: '8%' },
      { property: 'productName', label: 'Produto' },
      { property: 'description', label: 'Descrição' },
      { property: 'formattedPrice', label: 'Preço' },
      { property: 'stock', label: 'Estoque', type: 'number' },
      {
        property: 'labelPromo',
        label: 'Promoção',
        type: 'label',
        width: '8%',
        labels: [
          { value: 'Promocional', color: 'color-11', label: 'Promocional' },
        ],
      },
      {
        property: 'labelStatus',
        label: 'Status',
        type: 'label',
        width: '8%',
        labels: [
          { value: 'Ativo', color: 'color-11', label: 'Ativo' },
          { value: 'Inativo', color: 'color-07', label: 'Inativo' },
        ],
      },
    ];
  }

  public getItems(pesquisa: string) {
    try {
      return this.http
        .get<ProductModel>(`${this.apiBaseUrl}/api/products?search=${pesquisa}`)
        .pipe(first());
    } catch (error) {
      throw error;
    }
  }

  public removeProduct(id: number){
    debugger
    try {
      return this.http
        .delete<string>(`${this.apiBaseUrl}/api/products/${id}`)
        .pipe(first());
    } catch (error) {
      throw error;
    }
  }
}
