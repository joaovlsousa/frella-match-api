import { Recruter } from '../entities/recruter';

export abstract class RecrutersRepository {
  abstract create(recruter: Recruter): Promise<void>;
  abstract findById(recruterId: string): Promise<Recruter | null>;
  abstract save(recruter: Recruter): Promise<void>;
}
