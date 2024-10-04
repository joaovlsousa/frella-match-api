import { Submission } from '@application/entities/submission';
import { SubmissionsRepository } from '@application/repositories/submissions-repository';

export class InMemorySubmissionsRepository implements SubmissionsRepository {
  public submissions: Submission[] = [];

  async create(submission: Submission): Promise<void> {
    this.submissions.push(submission);
  }

  async findById(submissionId: string): Promise<Submission | null> {
    const submission = this.submissions.find(
      (item) => item.id === submissionId,
    );

    if (!submission) {
      return null;
    }

    return submission;
  }

  async save(submission: Submission): Promise<void> {
    const submissionIndex = this.submissions.findIndex(
      (item) => item.id === submission.id,
    );

    if (submissionIndex >= 0) {
      this.submissions[submissionIndex] = submission;
    }
  }

  async findManyByFreelancerId(freelancerId: string): Promise<Submission[]> {
    const submissions = this.submissions.filter(
      (item) => item.id === freelancerId,
    );

    return submissions;
  }

  async countManyByFreelancerId(freelancerId: string): Promise<number> {
    const submissions = this.submissions.filter(
      (item) => item.id === freelancerId,
    );

    return submissions.length;
  }
}
