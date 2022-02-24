import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
} from '@po-ui/ng-components';
import { Product, ProductModel } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private service: ProductService,
    private poNotification: PoNotificationService
  ) {}



  ngOnInit(): void {}


}
