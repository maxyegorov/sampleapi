import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../interfaces/product.interface';

export class ProductDTO {
  @ApiProperty({ type: String, required: false })
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  constructor(raw: Product) {
    this.id = raw.id;
    this.name = raw.name;
    this.price = raw.price;
  }
}
