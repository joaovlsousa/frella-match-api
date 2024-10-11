import { Work } from '@application/entities/work';
import { WorksRepository } from '@application/repositories/works-repository';
import { PrismaWorkMapper } from '@infra/database/prisma/mappers/prisma-work-mapper';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaWorksRepository implements WorksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(work: Work): Promise<void> {
    const raw = PrismaWorkMapper.toPrisma(work);

    await this.prisma.work.create({
      data: raw,
    });
  }

  async save(work: Work): Promise<void> {
    const raw = PrismaWorkMapper.toPrisma(work);

    await this.prisma.work.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async findById(workId: string): Promise<Work | null> {
    const work = await this.prisma.work.findUnique({
      where: {
        id: workId,
      },
    });

    if (!work) {
      return null;
    }

    return PrismaWorkMapper.toDomain(work);
  }

  async findManyByRecruterId(recruiterId: string): Promise<Work[]> {
    const works = await this.prisma.work.findMany({
      where: {
        recruiterId,
      },
    });

    return works.map((work) => PrismaWorkMapper.toDomain(work));
  }

  async countManyByRecruterId(recruiterId: string): Promise<number> {
    const amountOfWorks = await this.prisma.work.count({
      where: {
        recruiterId,
      },
    });

    return amountOfWorks;
  }

  async findManyByFreelancerId(freelancerId: string): Promise<Work[]> {
    const works = await this.prisma.work.findMany({
      where: {
        freelancerId,
      },
    });

    return works.map((work) => PrismaWorkMapper.toDomain(work));
  }

  async countManyByFreelancerId(freelancerId: string): Promise<number> {
    const amountOfWorks = await this.prisma.work.count({
      where: {
        freelancerId,
      },
    });

    return amountOfWorks;
  }
}
