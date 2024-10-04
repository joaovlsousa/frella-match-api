import { NotFoundException } from '@nestjs/common';

export class FreelancerNotFound extends NotFoundException {
  constructor() {
    super('Freelancer não encontrado');
  }
}
