import { Work } from '../entities/work';

export abstract class WorksRepository {
  abstract create(work: Work): Promise<void>;
  abstract findById(workId: string): Promise<Work | null>;
  abstract save(work: Work): Promise<void>;
  abstract findManyByRecruterId(recruterId: string): Promise<Work[]>;
  abstract countManyByRecruterId(recruterId: string): Promise<number>;
  abstract findManyByFreelancerId(freelancerId: string): Promise<Work[]>;
  abstract countManyByFreelancerId(freelancerId: string): Promise<number>;
}
