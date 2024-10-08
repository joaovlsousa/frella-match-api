import { Freelancer } from '@application/entities/freelancer';
import { FreelancersRepository } from '@application/repositories/freelancers-repository';
import { PrismaFreelancerMapper } from '@infra/database/prisma/mappers/prisma-freelancer-mapper';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaFreelancersRepository implements FreelancersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(freelancerId: string): Promise<Freelancer | null> {
    const freelancer = await this.prisma.freelancer.findUnique({
      where: {
        id: freelancerId,
      },
    });

    if (!freelancer) {
      return null;
    }

    return PrismaFreelancerMapper.toDomain(freelancer);
  }

  async findByEmail(email: string): Promise<Freelancer | null> {
    const freelancer = await this.prisma.freelancer.findUnique({
      where: {
        email,
      },
    });

    if (!freelancer) {
      return null;
    }

    return PrismaFreelancerMapper.toDomain(freelancer);
  }

  async create(freelancer: Freelancer): Promise<void> {
    const raw = PrismaFreelancerMapper.toPrisma(freelancer);

    await this.prisma.freelancer.create({
      data: raw,
    });
  }

  async save(freelancer: Freelancer): Promise<void> {
    const raw = PrismaFreelancerMapper.toPrisma(freelancer);

    await this.prisma.freelancer.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
