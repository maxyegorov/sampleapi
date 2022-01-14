export const PRODUCTS_STORE_PATH = './src/products/store/products.store.json';
import * as Joi from 'joi';

export enum ProductStatus {
  Active = 'active',
  Deleted = 'deleted',
}

export const ProductUpdateSchema = {
  body: Joi.array().items({
    id: Joi.string().optional(),
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

export const ProductDeleteSchema = {
  body: Joi.array().items(Joi.string().guid().required()),
};
