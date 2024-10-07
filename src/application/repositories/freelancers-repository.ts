import { Freelancer } from '../entities/freelancer';

export abstract class FreelancersRepository {
  abstract findById(freelancerId: string): Promise<Freelancer | null>;
  abstract findByEmail(email: string): Promise<Freelancer | null>;
  abstract create(freelancer: Freelancer): Promise<void>;
  abstract save(freelancer: Freelancer): Promise<void>;
}
