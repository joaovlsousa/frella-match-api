import { Recruter } from '@application/entities/recruter';
import { RecrutersRepository } from '@application/repositories/recruters-repository';
import { PrismaRecruterMapper } from '@infra/database/prisma/mappers/prisma-recruter-mapper';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaRecrutersRepository implements RecrutersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(recruterId: string): Promise<Recruter | null> {
    const recruter = await this.prisma.recruter.findUnique({
      where: {
        id: recruterId,
      },
    });

    if (!recruter) {
      return null;
    }

    return PrismaRecruterMapper.toDomain(recruter);
  }

  async findByEmail(email: string): Promise<Recruter | null> {
    const recruter = await this.prisma.recruter.findUnique({
      where: {
        email,
      },
    });

    if (!recruter) {
      return null;
    }

    return PrismaRecruterMapper.toDomain(recruter);
  }

  async create(recruter: Recruter): Promise<void> {
    const raw = PrismaRecruterMapper.toPrisma(recruter);

    await this.prisma.recruter.create({
      data: raw,
    });
  }

  async save(recruter: Recruter): Promise<void> {
    const raw = PrismaRecruterMapper.toPrisma(recruter);

    await this.prisma.recruter.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
