import { Freelancer } from '@application/entities/freelancer';
import { Freelancer as RawFreelancer } from '@prisma/client';

export class PrismaFreelancerMapper {
  static toPrisma(freelancer: Freelancer) {
    return {
      id: freelancer.id,
      name: freelancer.name,
      email: freelancer.email,
      imageUrl: freelancer.imageUrl,
      createdAt: freelancer.createdAt,
    };
  }

  static toDomain(raw: RawFreelancer): Freelancer {
    return new Freelancer(
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
