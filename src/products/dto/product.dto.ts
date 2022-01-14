import { Product } from '../interfaces/product.interface';

export class ProductDTO {
  id: string;
  name: string;
  price: number;

  constructor(raw: Product) {
    this.id = raw.id;
    this.name = raw.name;
    this.price = raw.price;
  }
}
