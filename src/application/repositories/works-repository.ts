import { Work } from '../entities/work';

export abstract class WorksRepository {
  abstract create(work: Work): Promise<void>;
  abstract save(work: Work): Promise<void>;
  abstract findById(workId: string): Promise<Work | null>;
  abstract findManyByRecruterId(recruiterId: string): Promise<Work[]>;
  abstract countManyByRecruterId(recruiterId: string): Promise<number>;
  abstract findManyByFreelancerId(freelancerId: string): Promise<Work[]>;
  abstract countManyByFreelancerId(freelancerId: string): Promise<number>;
}
