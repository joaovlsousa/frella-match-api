import { NotFoundException } from '@nestjs/common';

export class RecruterNotFound extends NotFoundException {
  constructor() {
    super('Recrutador não encontrado');
  }
}
