import { HttpStatus } from '@nestjs/common';

const SERVICE_PREFIX = 'sampleapi';
export const genericExceptions = {
  jsonLoadFailed: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: `${SERVICE_PREFIX}_001`,
    message: 'Failed to load JSON file',
  },
  jsonWriteFailed: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: `${SERVICE_PREFIX}_002`,
    message: 'Failed to write JSON file',
  },
  unauthorized: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: `${SERVICE_PREFIX}_003`,
    message: 'Unauthorized',
  },
  notFound: {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: `${SERVICE_PREFIX}_004`,
    message: 'Product Not Found',
  },
};
