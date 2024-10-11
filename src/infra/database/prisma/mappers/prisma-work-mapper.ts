import { Body } from '@application/entities/body';
import { EndsAt } from '@application/entities/ends-at';
import { Work } from '@application/entities/work';
import { Work as RawWork } from '@prisma/client';

export class PrismaWorkMapper {
  static toPrisma(work: Work) {
    return {
      id: work.id,
      title: work.title,
      description: work.description.value,
      endsAt: work.endsAt.value,
      amountCharged: work.amountCharged,
      recruiterId: work.recruiterId,
      freelancerId: work.freelancerId,
      status: work.status,
      createdAt: work.createdAt,
    };
  }

  static toDomain(raw: RawWork): Work {
    return new Work(
      {
        title: raw.title,
        description: new Body(raw.description),
        endsAt: new EndsAt(raw.endsAt),
        amountCharged: raw.amountCharged,
        recruiterId: raw.recruiterId,
        freelancerId: raw.freelancerId,
        status: raw.status,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
