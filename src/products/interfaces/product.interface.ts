import { ProductStatus } from '../products.definition';

export interface Product {
  id: string;
  name: string;
  price: number;
  status: ProductStatus;
}
