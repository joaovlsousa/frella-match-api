import { NotFoundException } from '@nestjs/common';

export class SubmissionNotFound extends NotFoundException {
  constructor() {
    super('Submissão não encontrada');
  }
}
