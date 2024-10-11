import { NotFoundException } from '@nestjs/common';

export class RecruiterNotFound extends NotFoundException {
  constructor() {
    super('Recrutador não encontrado');
  }
}
