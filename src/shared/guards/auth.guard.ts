import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { genericExceptions } from '../exceptions/exceptions';

const TEMP_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNYXggWWVnb3JvdiIsImlhdCI6MTY0MjEzMjUzMCwiZXhwIjoxNjczNjY4NTMwLCJhdWQiOiJsb2NhbGhvc3Q6MzAwMCIsInN1YiI6InNhbXBsZWFwaUBleGFtcGxlLmNvbSJ9.h9RvvSp5fp4kbmw_wCeFASNmsgrhcpdq1rLoVy7GEMA';

const validateToken = (authHeader: string) => {
  const token = authHeader.split('Bearer ')[1];
  if (!token || token !== TEMP_TOKEN)
    throw new UnauthorizedException(genericExceptions.unauthorized);
  // TODO: validate JWT signature, expiry, and check blacklist
};

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader)
      throw new UnauthorizedException(genericExceptions.unauthorized);
    validateToken(authHeader);

    return true;
  }
}
