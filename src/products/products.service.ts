import { readFileSync, writeFileSync } from 'fs';
import { v4 } from 'uuid';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { genericExceptions } from '../shared/exceptions/exceptions';
import { Product } from './interfaces/product.interface';
import { ProductDTO } from './dto/product.dto';
import { PRODUCTS_STORE_PATH, ProductStatus } from './products.definition';

const loadFromJson = () => {
  try {
    const data = readFileSync(PRODUCTS_STORE_PATH);
    return JSON.parse(data as unknown as string);
  } catch (err) {
    console.error(genericExceptions.jsonLoadFailed.message, err);
    throw new InternalServerErrorException(genericExceptions.jsonLoadFailed);
  }
};

const writeToJson = (jsonData) => {
  try {
    writeFileSync(PRODUCTS_STORE_PATH, JSON.stringify(jsonData));
  } catch (err) {
    console.error(genericExceptions.jsonWriteFailed.message, err);
    throw new InternalServerErrorException(genericExceptions.jsonWriteFailed);
  }
};

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  /**
   * Get list of products by ids
   * @param ids
   */
  getProducts(ids: string[]): Product[] {
    if (!this.products.length) {
      this.products = loadFromJson() || [];
    }

    if (ids && ids.length) {
      const foundProducts = this.products.filter(
        (product) =>
          ids.includes(product.id) && product.status !== ProductStatus.Deleted,
      );

      if (foundProducts.length !== ids.length)
        throw new NotFoundException(genericExceptions.notFound);

      return foundProducts;
    }

    return this.products.filter(
      (product) => product.status !== ProductStatus.Deleted,
    );
  }

  /**
   * Update products or create new
   * @param products
   */
  upsertProducts(products: ProductDTO[]): Product[] {
    if (!this.products.length) {
      this.products = loadFromJson() || [];
    }

    const updated = products.map((product) => {
      if (product.id) {
        let currentIndex;
        const currentProduct = this.products.find((prod, index) => {
          currentIndex = index;
          return prod.id === product.id;
        });

        if (!currentProduct)
          throw new NotFoundException(genericExceptions.notFound);

        const updatedProduct = {
          ...currentProduct,
          status: ProductStatus.Active,
        };
        if (currentProduct.name !== product.name)
          updatedProduct.name = product.name;
        if (currentProduct.price !== product.price)
          updatedProduct.price = product.price;

        this.products[currentIndex] = updatedProduct;

        return updatedProduct;
      } else {
        const newProduct = {
          id: v4(),
          name: product.name,
          price: product.price,
          status: ProductStatus.Active,
        };

        this.products.push(newProduct);

        return newProduct;
      }
    });

    writeToJson(this.products);

    return updated;
  }

  /**
   * Delete products by ids
   * @param ids
   */
  deleteProducts(ids: string[]): string[] {
    if (!this.products.length) {
      this.products = loadFromJson() || [];
    }

    if (ids && ids.length) {
      const foundProducts = this.products.filter(
        (product) =>
          ids.includes(product.id) && product.status !== ProductStatus.Deleted,
      );

      if (foundProducts.length !== ids.length)
        throw new NotFoundException(genericExceptions.notFound);

      foundProducts.forEach((product) => {
        product.status = ProductStatus.Deleted;
      });

      writeToJson(this.products);
    }

    return ids;
  }
}
