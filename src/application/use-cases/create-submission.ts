import { Body } from '@application/entities/body';
import { EndsAt } from '@application/entities/ends-at';
import { Submission } from '@application/entities/submission';
import { SubmissionsRepository } from '@application/repositories/submissions-repository';
import { UsersRepository } from '@application/repositories/users-repository';
import { WorksRepository } from '@application/repositories/works-repository';
import { Injectable } from '@nestjs/common';

import { FreelancerNotFound } from './errors/freelancer-not-found';
import { WorkNotFound } from './errors/work-not-found';

interface CreateSubmissionRequest {
  description: string;
  amountCharged: number;
  endsAt: Date;
  linkedinLink?: string;
  portfolioLink?: string;
  freelancerId: string;
  workId: string;
}

interface CreateSubmissionResponse {
  submission: Submission;
}

@Injectable()
export class CreateSubmission {
  constructor(
    private readonly submissionsRepository: SubmissionsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly worksRepository: WorksRepository,
  ) {}

  async execute(
    request: CreateSubmissionRequest,
  ): Promise<CreateSubmissionResponse> {
    const {
      description,
      amountCharged,
      endsAt,
      freelancerId,
      workId,
      linkedinLink,
      portfolioLink,
    } = request;

    const isFreelancerAlheadyExists =
      await this.usersRepository.findById(freelancerId);

    if (
      !isFreelancerAlheadyExists ||
      isFreelancerAlheadyExists.role !== 'FREELANCER'
    ) {
      throw new FreelancerNotFound();
    }

    const isWorkAlheadyExists = await this.worksRepository.findById(workId);

    if (!isWorkAlheadyExists) {
      throw new WorkNotFound();
    }

    const submission = new Submission({
      body: new Body(description),
      deliveryTime: new EndsAt(endsAt),
      amountCharged,
      linkedinLink,
      portfolioLink,
      freelancerId,
      workId,
    });

    await this.submissionsRepository.create(submission);

    return {
      submission,
    };
  }
}
