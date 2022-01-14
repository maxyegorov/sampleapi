import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { genericExceptions } from '../shared/exceptions/exceptions';
import { ProductDTO } from './dto/product.dto';
import { ProductsController } from './products.controller';
import { ProductStatus } from './products.definition';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  const mockUpdate = new ProductDTO({
    id: 'edfbb178-7ce1-4477-9cf0-3de5780aa184',
    name: 'Product1',
    price: 10.99,
    status: ProductStatus.Active,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('[GIVEN] array of ids [WHEN] delete request is called [THEN] should mark product as deleted', () => {
    const idList = ['edfbb178-7ce1-4477-9cf0-3de5780aa184'];
    expect(controller.delete(idList)).toEqual(idList);
  });

  it('[GIVEN] array of bad ids [WHEN] delete request is called [THEN] should return not found error', () => {
    const idList = ['test'];
    try {
      controller.delete(idList);
    } catch (err) {
      expect(err).toEqual(new NotFoundException(genericExceptions.notFound));
    }
  });

  it('[GIVEN] array of deleted ids [WHEN] get request is called [THEN] should return not found error', () => {
    try {
      controller.find(['edfbb178-7ce1-4477-9cf0-3de5780aa184']);
    } catch (err) {
      expect(err).toEqual(new NotFoundException(genericExceptions.notFound));
    }
  });

  it('[GIVEN] array of ids [WHEN] get request is called [THEN] should return not found error', () => {
    try {
      controller.find(['test']);
    } catch (err) {
      expect(err).toEqual(new NotFoundException(genericExceptions.notFound));
    }
  });

  it('[GIVEN] array of products [WHEN] post request is called [THEN] should update the product and mark it as active', () => {
    expect(controller.upsert([mockUpdate])).toEqual([mockUpdate]);
  });

  it('[GIVEN] array of ids [WHEN] get request is called [THEN] should return list of products', () => {
    expect(
      controller.find(['edfbb178-7ce1-4477-9cf0-3de5780aa184'])[0],
    ).toEqual(mockUpdate);
  });
});
