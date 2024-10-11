import { BadRequestException } from '@nestjs/common';
import * as dayjs from 'dayjs';

export class EndsAt {
  private readonly endsAt: Date;

  get value(): Date {
    return this.endsAt;
  }

  private validateEndsAtDate(endsAt: Date): boolean {
    return dayjs().isBefore(dayjs(endsAt));
  }

  constructor(endsAt: Date) {
    const isEndsAtDateValid = this.validateEndsAtDate(endsAt);

    if (!isEndsAtDateValid) {
      throw new BadRequestException('O tempo de entrega não é uma data válida');
    }

    this.endsAt = endsAt;
  }
}
