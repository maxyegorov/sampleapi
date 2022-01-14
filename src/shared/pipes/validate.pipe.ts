import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ArraySchema, ObjectSchema } from 'joi';
import { genericExceptions } from '../exceptions/exceptions';

@Injectable()
export class ValidatePipe implements PipeTransform {
  constructor(private schema: ObjectSchema | ArraySchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      console.error(genericExceptions.validationFailed.message, error);
      throw new BadRequestException({
        ...genericExceptions.validationFailed,
        message: `${genericExceptions.validationFailed.message}: ${error.message}`,
      });
    }
    return value;
  }
}
