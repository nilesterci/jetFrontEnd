export class Product {
  Id: number;
  ProductName: string;
  DateCreation: Date | string;
  Image: string;
  Description: string;
  Stock: number;
  Status: boolean;
  Price: number;
  StatusPromo: boolean;
}

export class Item {
  id: number;
  productName: string;
  dateCreation: Date;
  image: string;
  description: string;
  stock: number;
  status: boolean;
  price: number;
  statusPromo: boolean;
  formattedPrice: string;
  labelPromo: string;
  labelStatus: string;
}

export class ProductModel {
  items: Item[];
  hasNext: boolean;
}

export class ProductModelDTO {
  items: ProductDTO;
  hasNext: boolean;
}

export class ProductDTO {
  id: number;
  productName: string;
  dateCreation: Date;
  image: string;
  description: string;
  stock: number;
  status: boolean;
  price: number;
  statusPromo: boolean;
  formattedPrice: string;
  labelPromo: string;
  labelStatus: string;
}
