import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ParseIdsPipe implements PipeTransform {
  transform(val: string) {
    if (!val) return [];
    return val.split(',');
  }
}
