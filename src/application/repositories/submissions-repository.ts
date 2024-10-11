import { Submission } from '../entities/submission';

export abstract class SubmissionsRepository {
  abstract create(submission: Submission): Promise<void>;
  abstract save(submission: Submission): Promise<void>;
  abstract findById(submissionId: string): Promise<Submission | null>;
  abstract findManyByFreelancerId(freelancerId: string): Promise<Submission[]>;
  abstract countManyByFreelancerId(freelancerId: string): Promise<number>;
}
