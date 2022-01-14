import { HttpStatus } from '@nestjs/common';

function getDescription() {
  return `${this.errorCode}: ${this.message}`;
}

const SERVICE_PREFIX = 'sampleapi';
export const genericExceptions = {
  jsonLoadFailed: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: `${SERVICE_PREFIX}_001`,
    message: 'Failed to load JSON file',
    getDescription,
  },
  jsonWriteFailed: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: `${SERVICE_PREFIX}_002`,
    message: 'Failed to write JSON file',
    getDescription,
  },
  unauthorized: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: `${SERVICE_PREFIX}_003`,
    message: 'Unauthorized',
    getDescription,
  },
  notFound: {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: `${SERVICE_PREFIX}_004`,
    message: 'Product Not Found',
    getDescription,
  },
  validationFailed: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: `${SERVICE_PREFIX}_005`,
    message: 'Validation failed',
    getDescription,
  },
};
