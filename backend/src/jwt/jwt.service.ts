import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private nestJwtService: NestJwtService) {}

  sign(id: string) {
    return this.nestJwtService.sign({ id });
  }
}
