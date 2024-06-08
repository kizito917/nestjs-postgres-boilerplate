import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(type: string): string {
    return `Hello World!, I am using ${type !== 'string' ? '' : type}`;
  }
}
