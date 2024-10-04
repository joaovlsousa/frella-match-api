import { BadRequestException } from '@nestjs/common';

export class Body {
  private readonly body: string;

  get value(): string {
    return this.body;
  }

  private validateBodyLength(body: string): boolean {
    return body.length > 5 && body.length <= 255;
  }

  constructor(body: string) {
    const isBodyLengthValid = this.validateBodyLength(body);

    if (!isBodyLengthValid) {
      throw new BadRequestException('Tamanho do corpo da submissão inválido');
    }

    this.body = body;
  }
}
