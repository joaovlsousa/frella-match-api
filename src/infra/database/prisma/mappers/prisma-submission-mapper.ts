import { Body } from '@application/entities/body';
import { EndsAt } from '@application/entities/ends-at';
import { Submission } from '@application/entities/submission';
import { Submission as RawSubmission } from '@prisma/client';

export class PrismaSubmissionMapper {
  static toPrisma(submission: Submission) {
    return {
      id: submission.id,
      body: submission.body.value,
      deliveryTime: submission.deliveryTime.value,
      amountCharged: submission.amountCharged,
      linkedinLink: submission.linkedinLink,
      portfolioLink: submission.portfolioLink,
      workId: submission.workId,
      freelancerId: submission.freelancerId,
      createdAt: submission.createdAt,
    };
  }

  static toDomain(raw: RawSubmission): Submission {
    return new Submission(
      {
        body: new Body(raw.body),
        deliveryTime: new EndsAt(raw.deliveryTime),
        amountCharged: raw.amountCharged,
        linkedinLink: raw.linkedinLink,
        portfolioLink: raw.portfolioLink,
        workId: raw.workId,
        freelancerId: raw.freelancerId,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
