import {
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  Body,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ParseIdsPipe } from '../shared/pipes/parseids.pipe';
import { ProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  find(@Query('ids', ParseIdsPipe) ids: string[]): ProductDTO[] {
    return this.productsService
      .getProducts(ids)
      .map((product: Product) => new ProductDTO(product));
  }

  @Post()
  upsert(@Body() products: ProductDTO[]): ProductDTO[] {
    return this.productsService
      .upsertProducts(products)
      .map((product: Product) => new ProductDTO(product));
  }

  @Delete()
  delete(@Body() ids: string[]): string[] {
    return this.productsService.deleteProducts(ids);
  }
}
