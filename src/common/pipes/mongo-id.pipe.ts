import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isMongoId(value)) {
      throw new BadRequestException(`${value} is not a mongoId`);
    }
    return value;
  }
}
