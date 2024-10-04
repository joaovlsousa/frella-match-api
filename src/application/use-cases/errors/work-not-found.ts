import { NotFoundException } from '@nestjs/common';

export class WorkNotFound extends NotFoundException {
  constructor() {
    super('Trabalho não encontrado');
  }
}
