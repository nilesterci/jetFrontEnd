import { ProductService } from './../../product.service';
import { Product, ProductModel } from './../../product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  constructor(
    private router: Router,
    private service: ProductService,
    private poNotification: PoNotificationService
  ) {}

  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  products: ProductModel = new ProductModel();
  newProduct: Product = new Product();

  autoUpload: boolean = true;
  autoClose: boolean = true;

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList() {
    this.service.getProducts().subscribe((retorno) => {
      this.products = retorno;
    });
  }

  verifyImage(nameImage: string) {
    if (nameImage == null) return 'image-not-found.jpg';
    else return nameImage;
  }
}
