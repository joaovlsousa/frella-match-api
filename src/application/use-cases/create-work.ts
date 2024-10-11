import { Body } from '@application/entities/body';
import { EndsAt } from '@application/entities/ends-at';
import { Work } from '@application/entities/work';
import { UsersRepository } from '@application/repositories/users-repository';
import { WorksRepository } from '@application/repositories/works-repository';
import { Injectable } from '@nestjs/common';

import { RecruiterNotFound } from './errors/recruiter-not-found';

interface CreateWorkRequest {
  title: string;
  description: string;
  amountCharged: number;
  endsAt: Date;
  recruiterId: string;
}

interface CreateWorkResponse {
  work: Work;
}

@Injectable()
export class CreateWork {
  constructor(
    private readonly worksRepository: WorksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(request: CreateWorkRequest): Promise<CreateWorkResponse> {
    const { title, description, amountCharged, endsAt, recruiterId } = request;

    const isRecruiterAlheadyExists =
      await this.usersRepository.findById(recruiterId);

    if (
      !isRecruiterAlheadyExists ||
      isRecruiterAlheadyExists.role !== 'RECRUITER'
    ) {
      throw new RecruiterNotFound();
    }

    const work = new Work({
      title,
      description: new Body(description),
      amountCharged,
      endsAt: new EndsAt(endsAt),
      recruiterId,
    });

    await this.worksRepository.create(work);

    return {
      work,
    };
  }
}
