import { Submission } from '@application/entities/submission';
import { SubmissionsRepository } from '@application/repositories/submissions-repository';
import { PrismaSubmissionMapper } from '@infra/database/prisma/mappers/prisma-submission-mapper';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaSubmissionsRepository implements SubmissionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(submission: Submission): Promise<void> {
    const raw = PrismaSubmissionMapper.toPrisma(submission);

    await this.prisma.submission.create({
      data: raw,
    });
  }

  async save(submission: Submission): Promise<void> {
    const raw = PrismaSubmissionMapper.toPrisma(submission);

    await this.prisma.submission.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async findById(submissionId: string): Promise<Submission | null> {
    const submission = await this.prisma.submission.findUnique({
      where: {
        id: submissionId,
      },
    });

    if (!submission) {
      return null;
    }

    return PrismaSubmissionMapper.toDomain(submission);
  }

  async findManyByFreelancerId(freelancerId: string): Promise<Submission[]> {
    const submissions = await this.prisma.submission.findMany({
      where: {
        freelancerId,
      },
    });

    return submissions.map((submission) =>
      PrismaSubmissionMapper.toDomain(submission),
    );
  }

  async countManyByFreelancerId(freelancerId: string): Promise<number> {
    const amountOfSubmissions = await this.prisma.submission.count({
      where: {
        freelancerId,
      },
    });

    return amountOfSubmissions;
  }
}
