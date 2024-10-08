import { Recruter } from '@application/entities/recruter';
import { Recruter as RawRecruter } from '@prisma/client';

export class PrismaRecruterMapper {
  static toPrisma(recruter: Recruter) {
    return {
      id: recruter.id,
      name: recruter.name,
      email: recruter.email,
      imageUrl: recruter.imageUrl,
      createdAt: recruter.createdAt,
    };
  }

  static toDomain(raw: RawRecruter): Recruter {
    return new Recruter(
      {
        name: raw.name,
        email: raw.email,
        imageUrl: raw.imageUrl,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
