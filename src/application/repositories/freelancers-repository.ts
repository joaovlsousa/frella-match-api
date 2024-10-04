import { Freelancer } from '../entities/freelancer';

export abstract class FreelancersRepository {
  abstract create(freelancer: Freelancer): Promise<void>;
  abstract findById(freelancerId: string): Promise<Freelancer | null>;
  abstract save(freelancer: Freelancer): Promise<void>;
}
