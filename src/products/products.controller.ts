import {
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  Body,
  Delete,
  UsePipes,
} from '@nestjs/common';
import {
  ApiQuery,
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { genericExceptions } from '..//shared/exceptions/exceptions';
import { ValidatePipe } from '../shared/pipes/validate.pipe';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ParseIdsPipe } from '../shared/pipes/ids.pipe';
import { ProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import {
  ProductDeleteSchema,
  ProductUpdateSchema,
} from './products.definition';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: genericExceptions.unauthorized.getDescription(),
})
@ApiNotFoundResponse({
  description: genericExceptions.notFound.getDescription(),
})
@ApiInternalServerErrorResponse({ description: 'Server error' })
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiQuery({
    name: 'ids',
    type: String,
    required: false,
    description: 'List of products ids',
  })
  @ApiOkResponse({
    description: 'Returns a list of products',
  })
  find(@Query('ids', ParseIdsPipe) ids: string[]): ProductDTO[] {
    return this.productsService
      .getProducts(ids)
      .map((product: Product) => new ProductDTO(product));
  }

  @Post()
  @ApiBody({ type: [ProductDTO] })
  @ApiOkResponse({
    description: 'Upserts and returns a list of products',
  })
  @UsePipes(new ValidatePipe(ProductUpdateSchema.body))
  upsert(@Body() products: ProductDTO[]): ProductDTO[] {
    return this.productsService
      .upsertProducts(products)
      .map((product: Product) => new ProductDTO(product));
  }

  @Delete()
  @ApiOkResponse({
    description: 'Deletes a list of products',
  })
  @UsePipes(new ValidatePipe(ProductDeleteSchema.body))
  delete(@Body() ids: string[]): string[] {
    return this.productsService.deleteProducts(ids);
  }
}
