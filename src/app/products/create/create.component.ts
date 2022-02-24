import { Product, ProductDTO, ProductModel, ProductModelDTO } from 'src/app/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoPageFilter,
  PoSelectOption,
  PoTableAction,
  PoTableColumn,
  PoTableComponent,
} from '@po-ui/ng-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  columns!: Array<PoTableColumn>;
  itemsTable!: Array<any>;

  @ViewChild('poTable', { static: true }) poTable!: PoTableComponent;

  @ViewChild('poModal', { static: true }) poModal!: PoModalComponent;

  @ViewChild('modalDetails', { static: true }) modalDetails!: PoModalComponent;

  products: ProductModel = new ProductModel();
  newProduct: Product = new Product();

  detailProduct: ProductDTO = new ProductDTO();

  autoUpload: boolean = true;
  autoClose: boolean = false;

  public search!: string;

  actions: Array<PoTableAction> = [
    {
      action: this.openDetailModal.bind(this),
      icon: 'po-icon-info',
      label: 'Detalhes',
    },
    {
      action: this.remove.bind(this),
      icon: 'po-icon po-icon-delete',
      label: 'Remover',
    },
  ];

  constructor(
    private router: Router,
    private service: ProductService,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    this.initGrid("");
  }

  openDetailModal(event: any){
    this.searchDetail(event.id);
    this.modalDetails.open();
  }

  searchDetail(id: number){
    this.service.getDetail(id).subscribe((retorno) => {
      this.detailProduct = retorno.items;
    });
  }

  public readonly filtros: PoPageFilter = {
    action: (pesquisa: string) => {
      pesquisa = pesquisa.toUpperCase();
      this.search = pesquisa;
      this.initGrid(pesquisa);
    },

    placeholder: 'Filtrar ...',
  };

  initGrid(pesquisa: string) {
    this.columns = this.service.getColumns();
    this.service.getItems(pesquisa).subscribe((retorno) => {
      this.itemsTable = retorno.items;
    });
  }

  remove(event: any) {
    this.service.removeProduct(event.id).subscribe(
      (data) => {
        console.log(data);
        this.poNotification.success(Object.values(data)[0]);
        this.initGrid("");
      },
      (error) => {
        this.poNotification.error(
          `Ocorreu um erro ao se comunicar com o servidor. erro Detalhado : ${error}`
        );
      }
    );
  }

  openCreate() {
    this.router.navigate(['/create']);
  }

  public openModal() {
    this.newProduct.Status = false;
    this.newProduct.StatusPromo = false;
    this.poModal.open();
  }

  actionsPage: Array<PoPageAction> = [
    {
      action: async () => {
        this.poModal.open();
      },
      label: 'Novo',
      icon: 'po-icon po-icon-new',
    },
  ];

  close: PoModalAction = {
    action: () => {
      this.newProduct = new Product();
      this.poModal.close();
    },
    label: 'Fechar',
    danger: true,
  };

  confirm: PoModalAction = {
    action: () => {
      this.proccessItem(this.newProduct);
      this.initGrid("");
    },
    label: 'Confirmar',
  };

  private proccessItem(x: Product) {
    this.service.newProduct(x).subscribe(
      (data) => {
        this.poNotification.success(Object.values(data)[0]);
        this.initGrid("");
      },
      (error) => {
        this.poNotification.error(
          `Ocorreu um erro ao se comunicar com o servidor. erro Detalhado : ${error}`
        );
      }
    );

    setTimeout(() => {
      this.confirm.loading = false;
      this.poModal.close();
    }, 700);
  }

  nameImage(event: any) {
    this.newProduct.Image = event.body.nameFile;
  }

  eventEmitterStatus(event: any) {
    this.newProduct.Status = event ? true : false;
  }

  eventEmitterStatusPromo(event: any) {
    this.newProduct.StatusPromo = event ? true : false;
  }

  verifyImage(nameImage: string) {
    if (nameImage == null) return 'image-not-found.jpg';
    else return nameImage;
  }
}
