import { Recruter } from '../entities/recruter';

export abstract class RecrutersRepository {
  abstract findById(recruterId: string): Promise<Recruter | null>;
  abstract findByEmail(email: string): Promise<Recruter | null>;
  abstract create(recruter: Recruter): Promise<void>;
  abstract save(recruter: Recruter): Promise<void>;
}
